import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.separateThousands(value);
  }

  separateThousands(inputNumber: any): string {
    if(inputNumber === undefined) return '';
    let numberToString = inputNumber.toString();
    numberToString = numberToString.replace(',', '');
    let x = numberToString.split('.');
    let y = x[0];
    let z = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
      y = y.replace(rgx, '$1' + ',' + '$2');
    return (y + z);
  }
}
