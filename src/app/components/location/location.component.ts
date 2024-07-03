import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {WeatherService} from '../../shared/services/weather.service';
import {Location} from '../../shared/models/location';
import {CommonModule, JsonPipe} from '@angular/common';
import {ConditionToImgPipe} from '../../shared/pipes/condition-to-img.pipe';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ConditionToImgPipe
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnChanges {
  private weatherService = inject(WeatherService);
  @Input({required: true}) locationZip!: string;
  @Output() panelClosed = new EventEmitter<void>();
  locationWeather!: Location;

  ngOnChanges(changes: SimpleChanges): void {
    const currentZip = changes[`locationZip`]?.currentValue!;
    this.weatherService.getLocationWeather(currentZip)
      .subscribe((response: Location) => {
        this.locationWeather = response;
      })
  }
}
