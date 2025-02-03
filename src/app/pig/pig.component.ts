import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PigService } from '../services/pig.service';

@Component({
  selector: 'app-pig',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, HttpClientModule],
  templateUrl: './pig.component.html',
  styleUrl: './pig.component.css',
})
export class PigComponent implements OnInit {
  imageUrl: string = 'assets/images/pig.jpg';
  happyImageUrl: string = 'assets/images/happypig.jpg';
  status: string = '';
  type: string = 'Farm Pig';
  initialStatus: string = '';
  putinStatus: string = '';
  initialImageUrl: string = this.imageUrl;
  audioContext: AudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  audioBuffer: AudioBuffer | null = null;
  currentSource: AudioBufferSourceNode | null = null;
  isPlaying: boolean = false;
  isPlayPauseIconVisible: boolean = false;

  constructor(private pigService: PigService) {}

  ngOnInit(): void {
    this.pigService.getPigData().subscribe(
      (data) => {
        console.log(data);
        this.status = data.initial;
        this.putinStatus = data.putin;
        this.initialStatus = data.initial;
      },
      (error) => {
        console.error('Error fetching pig data:', error);
      }
    );
  }

  changeImage(): void {
    if (this.imageUrl === 'assets/images/pig.jpg') {
      this.imageUrl = 'assets/images/putin.jpg';
      this.status = this.putinStatus;
    } else {
      this.imageUrl = 'assets/images/pig.jpg';
      this.status = this.initialStatus;
    }
  }

  onVolumeIconClick(): void {
    this.isPlayPauseIconVisible = true;

    if (this.imageUrl === 'assets/images/putin.jpg') {
      this.pigService.sendMessage('putin').subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          this.playAudio(response.audioUrl);
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
      return;
    }

    if (this.imageUrl === 'assets/images/pig.jpg') {
      this.pigService.sendMessage('georgia').subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          this.playAudio(response.audioUrl);
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    try {
      if (this.currentSource) {
        this.currentSource.stop();
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();

      const buffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioBuffer = buffer;

      const source = this.audioContext.createBufferSource();
      source.buffer = this.audioBuffer;

      source.connect(this.audioContext.destination);

      source.start();
      console.log('Audio playing...');

      this.currentSource = source;
      this.isPlaying = true;
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  async playHappySound(): Promise<void> {
    try {
      const feedAudioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      const response = await fetch('audio/thanks.mp3');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await feedAudioContext.decodeAudioData(arrayBuffer);

      const source = feedAudioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(feedAudioContext.destination);

      source.start();
      console.log('Playing happy sound...');

      source.onended = () => {
        feedAudioContext.close();
      };
    } catch (error) {
      console.error('Error playing happy sound:', error);
    }
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.audioContext.suspend().then(() => {
        this.isPlaying = false;
      });
    } else {
      this.audioContext.resume().then(() => {
        this.isPlaying = true;
      });
    }
  }

  showHappyStatus(happyMessage: string): void {
    this.status = happyMessage;
    this.imageUrl = this.happyImageUrl;
    this.playHappySound();

    setTimeout(() => {
      this.status = this.initialStatus;
      this.imageUrl = this.initialImageUrl;
    }, 5000);
  }
}
