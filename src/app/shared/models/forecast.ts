import {City} from './city';
import {List} from './list';

export interface Forecast {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: List[];
}
