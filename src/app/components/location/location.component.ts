import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { Location } from '../../shared/models/location';
import { CommonModule, JsonPipe } from '@angular/common';
import { ConditionToImgPipe } from '../../shared/pipes/condition-to-img.pipe';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ConditionToImgPipe, RouterLink],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnChanges {
  private weatherService = inject(WeatherService);
  @Input({ required: true }) locationZip!: string;
  @Output() panelClosed = new EventEmitter<void>();
  protected locationWeather$!: Observable<Location>;

  ngOnChanges(changes: SimpleChanges): void {
    const currentZip = changes[`locationZip`]?.currentValue!;
    this.locationWeather$ = this.weatherService.getLocationWeather(currentZip);
  }
}
