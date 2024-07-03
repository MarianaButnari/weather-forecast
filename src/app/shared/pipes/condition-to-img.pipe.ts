import {Pipe, PipeTransform} from '@angular/core';
import {weatherImages} from '../constants/weather-img';

@Pipe({
  name: 'conditionToImg',
  standalone: true
})
export class ConditionToImgPipe implements PipeTransform {

  transform(value: string): string {
    // @ts-ignore
    return weatherImages[value];
  }

}
