import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WeatherService } from '../../shared/services/weather.service';
import { map, Observable, switchMap } from 'rxjs';
import { Forecast } from '../../shared/models/forecast';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '../../shared/pipes/timestamp-to-date.pipe';
import { ConditionToImgPipe } from '../../shared/pipes/condition-to-img.pipe';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, TimestampToDatePipe, ConditionToImgPipe],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css',
})
export class ForecastComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);
  protected forecast$!: Observable<Forecast>;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params: ParamMap) => params.get('zipcode')!),
        switchMap((zip: string) => {
          return (this.forecast$ = this.weatherService.getDailyForecast(zip));
        })
      )
      .subscribe();
  }

  moveBackToHome() {
    this.router.navigate(['']);
  }
}
