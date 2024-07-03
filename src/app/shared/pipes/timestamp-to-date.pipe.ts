import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timestampToDate',
  standalone: true,
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date(value * 1000);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    return weekdays[dayIndex];
  }

}
