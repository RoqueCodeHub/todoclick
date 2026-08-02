import { Component, computed, input } from '@angular/core';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-product-price',
  imports: [CurrencyFormatPipe],
  templateUrl: './product-price.html',
  styleUrl: './product-price.css',
})
export class ProductPrice {
  readonly price = input.required<number>();
  readonly oldPrice = input<number | undefined>(undefined);

  protected readonly discountPercent = computed(() => {
    const old = this.oldPrice();
    if (!old || old <= this.price()) {
      return null;
    }
    return Math.round(((old - this.price()) / old) * 100);
  });
}