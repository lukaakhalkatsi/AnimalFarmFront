import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PigComponent } from './pig/pig.component';

@Component({
  selector: 'app-root',
  imports: [PigComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
