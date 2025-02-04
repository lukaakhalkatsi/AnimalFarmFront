import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnimalsService } from '../services/animals.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';

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
    this.animalsService.getAnimals().subscribe(
      (data) => {
        console.log(data);
        this.animals = data.map((animal: any) => ({
          ...animal,
          imageUrl: `assets/images/${animal.name
            .toLowerCase()
            .replace(' ', '_')}.jpg`,
        }));
        this.loadingService.setLoading(false);
      },
      (error) => {
        console.error('Error fetching animals:', error);
        this.errorMessage = 'Failed to fetch animals. Please try again later.';
        this.loadingService.setLoading(false);
      }
    );
  }

  openFoodDialog(animal: any): void {
    const dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '400px',
      data: { name: animal.name, id: animal.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.animalId) {
        const animal = this.animals.find((a) => a.id === result.animalId);
        if (animal) {
          animal.feedNumber = result.feedNumber;
        }

        if (result.happy) {
          this.animalFed.emit(result.happy);
        }
      }
    });
  }
}
