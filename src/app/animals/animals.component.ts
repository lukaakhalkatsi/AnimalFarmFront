import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
})
export class AnimalsComponent implements OnInit {
  animals: any[] = [];
  errorMessage: string = '';

  constructor(private animalsService: AnimalsService) {}

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalsService.getAnimals().subscribe(
      (data) => {
        console.log(data);
        this.animals = data.map((animal: any) => ({
          ...animal,
          imageUrl: `assets/images/${animal.name
            .toLowerCase()
            .replace(' ', '_')}.jpg`,
        }));
      },
      (error) => {
        console.error('Error fetching animals:', error);
        this.errorMessage = 'Failed to fetch animals. Please try again later.'; // Display an error message if request fails
      }
    );
  }
}
