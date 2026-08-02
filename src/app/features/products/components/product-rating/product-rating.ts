import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  imports: [],
  templateUrl: './product-rating.html',
  styleUrl: './product-rating.css',
})
export class ProductRating {
  readonly rating = input(0);
  readonly reviewsCount = input<number | undefined>(undefined);

  protected readonly stars = computed(() =>
    Array.from({ length: 5 }, (_, i) => i < Math.round(this.rating())),
  );
}