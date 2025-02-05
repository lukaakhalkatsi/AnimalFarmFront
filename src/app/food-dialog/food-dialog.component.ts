import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FoodService } from '../services/food.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-food-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './food-dialog.component.html',
  styleUrl: './food-dialog.component.css',
})
export class FoodDialogComponent {
  foodList: string[] = ['საკენკი', 'ჩალა', 'თივა', 'ხორცხი', 'ბალახი'];
  selectedFood: string | null = null;
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: string },
    private foodService: FoodService
  ) {}

  selectFood(food: string) {
    this.selectedFood = food;
  }

  sendFoodSelection(food: string): void {
    this.isLoading = true;
    this.foodService.sendFoodSelection(this.data.id, food).subscribe(
      (response) => {
        this.isLoading = false;
        this.dialogRef.close({
          animalId: this.data.id,
          feedNumber: response.feedNumber,
          happy: response.happy,
        });
      },
      (error) => {
        console.error('❌ Error sending food:', error);
        this.isLoading = false;
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
