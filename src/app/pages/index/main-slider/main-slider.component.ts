import { Component, OnInit } from '@angular/core';
import { SliderModel } from '@app_models/slider/slider';
import { SliderService } from '@app_services/slider/slider.service';

@Component({
  selector: 'index-main-slider',
  templateUrl: './main-slider.component.html'
})
export class MainSliderComponent implements OnInit {

  isDataLoaded: boolean = false;
  sliders: SliderModel[] = [];

  constructor(
    private sliderService: SliderService
  ) { }

  ngOnInit(): void {

    setInterval(() => {
      this.isDataLoaded = true;

    }, 3000)

  }
}
