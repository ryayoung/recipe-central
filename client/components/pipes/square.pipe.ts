// Maintainer:     Ryan Young
// Last Modified:  Feb 15, 2022
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square'
})
export class SquarePipe implements PipeTransform {
  transform(value: number): number {
    return value * value;
  }
}
