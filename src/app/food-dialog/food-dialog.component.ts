import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-food-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './food-dialog.component.html',
  styleUrl: './food-dialog.component.css',
})
export class FoodDialogComponent {
  foodList: string[] = ['Grass', 'Carrots', 'Apples', 'Corn', 'Hay'];
  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: string },
    private foodService: FoodService
  ) {}

  sendFoodSelection(food: string): void {
    this.foodService.sendFoodSelection(this.data.id, food).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close({
          animalId: this.data.id,
          feedNumber: response.feedNumber,
          happy: response.happy,
        });
      },
      (error) => {
        console.error('❌ Error sending food:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
