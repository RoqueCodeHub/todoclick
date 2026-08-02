import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  private readonly formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  });

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return this.formatter.format(value);
  }
}