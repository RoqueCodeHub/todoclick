import { Component, computed, input, output, signal } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ProductPrice } from '../product-price/product-price';
import { ProductRating } from '../product-rating/product-rating';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format-pipe';

@Component({
  selector: 'app-product-card',
  imports: [ProductPrice, ProductRating, CurrencyFormatPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();
  readonly toggleWishlist = output<Product>();

  protected readonly currentImageIndex = signal(0);
  protected readonly isModalOpen = signal(false);

  protected readonly productImages = computed(() => {
    const p = this.product();
    if (p.images && p.images.length > 0) {
      return p.images;
    }
    return [p.image];
  });

  protected readonly currentImage = computed(() => {
    const images = this.productImages();
    const idx = this.currentImageIndex();
    return images[idx] || images[0];
  });

  protected readonly hasDiscount = computed(() => {
    const { price, oldPrice } = this.product();
    return !!oldPrice && oldPrice > price;
  });

  nextImage(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const total = this.productImages().length;
    if (total <= 1) return;
    this.currentImageIndex.update((i) => (i + 1) % total);
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const total = this.productImages().length;
    if (total <= 1) return;
    this.currentImageIndex.update((i) => (i - 1 + total) % total);
  }

  setImageIndex(index: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.currentImageIndex.set(index);
  }

  openModal(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.isModalOpen.set(true);
  }

  closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.isModalOpen.set(false);
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product());
  }

  onToggleWishlist(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.toggleWishlist.emit(this.product());
  }
}