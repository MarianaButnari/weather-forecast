import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {WeatherService} from '../../shared/services/weather.service';
import {map, switchMap} from 'rxjs';
import {Forecast} from '../../shared/models/forecast';
import {NgIf, SlicePipe} from '@angular/common';
import {TimestampToDatePipe} from '../../shared/pipes/timestamp-to-date.pipe';
import {ConditionToImgPipe} from '../../shared/pipes/condition-to-img.pipe';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    NgIf,
    TimestampToDatePipe,
    ConditionToImgPipe,
    SlicePipe
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);
  protected forecast!: Forecast;

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => params.get('zipcode')!),
      switchMap(zip => this.weatherService.getDailyForecast(zip))
    ).subscribe((result: Forecast) => {
      this.forecast = result;
    });
  }

  moveBackToHome() {
    this.router.navigate(['']);
  }

}
