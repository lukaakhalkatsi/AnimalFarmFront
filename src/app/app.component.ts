import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PigComponent } from './pig/pig.component';
import { AnimalsComponent } from './animals/animals.component';

@Component({
  selector: 'app-root',
  imports: [PigComponent, AnimalsComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
