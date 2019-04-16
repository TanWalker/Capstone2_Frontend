import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/share/services/youtube.service';
import { Result } from 'src/app/share/models/result';
import { ExerciseService } from 'src/app/share/services/exercise.service';
import { SwimStyle } from 'src/app/share/models/swimStyle';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.css']
})
export class TechniquesComponent implements OnInit {
  public youtubeLink: String;
  public count;
  public color: String;
  public randColor: String = '';
  public swimStyles: SwimStyle[] = [];
  public colors = [
    'Blue ',
    'Green',
    'Red',
    'Orange',
    'Violet',
    'Indigo',
    'DarkSalmon ',
    'DarkSeaGreen ',
    'DarkSlateBlue ',
    'DeepPink ',
    'DeepSkyBlue ',
    'DimGray '
  ];
  constructor(private exerciseService: ExerciseService) {}
  ngOnInit() {
    this.youtubeLink = 'https://www.youtube.com/watch?v=J_ub7Etch2U';
    console.log(this.getRandomColor());
    this.randColor = this.getRandomColor();
    this.exerciseService.getAllStyle().subscribe((data: Result) => {
      if (data.success) {
        this.swimStyles = data.values;
      }
    });
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    this.color = '#';
    for (this.count = 0; this.count < 6; this.count++) {
      this.color += letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }
}
