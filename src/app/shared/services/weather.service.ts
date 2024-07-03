import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Location} from '../models/location';
import {Forecast} from '../models/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private httpClient = inject(HttpClient);
  private LOCATION_WEATHER_URL = environment.weatherForecast.apiUrl
  private DAILY_WEATHER_URL = environment.weatherForecast.dailyUrl
  private API_KEY = environment.weatherForecast.apiKey

  getLocationWeather(zip: string): Observable<Location> {
    return this.httpClient.get<Location>(`${this.LOCATION_WEATHER_URL}${zip},us&appid=${this.API_KEY}`);
  }

  getDailyForecast(zip: string): Observable<Forecast> {
    return this.httpClient.get<Forecast>(`${this.DAILY_WEATHER_URL}${zip},us&appid=${this.API_KEY}`)
  }
}
