import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnimalsService } from '../services/animals.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
})
export class AnimalsComponent implements OnInit {
  animals: any[] = [];
  errorMessage: string = '';

  @Output() animalFed = new EventEmitter<string>();

  constructor(
    private animalsService: AnimalsService,
    public loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.loadingService.setLoading(true);
    this.animalsService
      .getAnimals()
      .pipe(
        catchError((error) => {
          console.error('Error fetching animals:', error);
          this.errorMessage =
            'Failed to fetch animals. Please try again later.';
          this.loadingService.setLoading(false);
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        if (!Array.isArray(data)) {
          this.errorMessage = 'Invalid data received from server.';
          this.loadingService.setLoading(false);
          return;
        }

        this.animals = data.map((animal: any) => {
          if (!animal.name) {
            console.warn('Animal data missing name:', animal);
            return { ...animal, imageUrl: 'assets/images/default.jpg' };
          }
          return {
            ...animal,
            imageUrl: `assets/images/${animal.name
              .toLowerCase()
              .replace(' ', '_')}.jpg`,
          };
        });
        this.loadingService.setLoading(false);
      });
  }

  openFoodDialog(animal: any): void {
    if (!animal || !animal.id || !animal.name) {
      console.error('Invalid animal data:', animal);
      this.errorMessage = 'Invalid animal data. Please try again later.';
      return;
    }

    const dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '400px',
      data: { name: animal.name, id: animal.id },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (!result) return;
        if (result.error) {
          console.error('Error in food dialog:', result.error);
          this.errorMessage = 'Something went wrong while feeding the animal.';
          return;
        }
        if (result.animalId) {
          const animalToUpdate = this.animals.find(
            (a) => a.id === result.animalId
          );
          if (animalToUpdate) {
            animalToUpdate.feedNumber = result.feedNumber;
          } else {
            console.warn(
              'Animal not found for feeding update:',
              result.animalId
            );
          }
        }
        if (result.happy) {
          this.animalFed.emit(result.happy);
        }
      },
      (error) => {
        console.error('Dialog error:', error);
        this.errorMessage = 'Failed to open the feeding dialog.';
      }
    );
  }
}
