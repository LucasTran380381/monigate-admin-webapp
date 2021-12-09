import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {

  transform(value: string | Date): number {
    return new Date(value).getTime() + 420 * 60 * 1000;
  }

}
