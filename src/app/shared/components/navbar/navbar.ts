import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { CatalogService } from '../../../core/services/catalog';
import { Product } from '../../interfaces/product';
import { DecimalPipe } from '@angular/common';

interface NavCategory {
  label: string;
  targetId: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly cart = inject(CartService);
  private readonly catalog = inject(CatalogService);
  protected readonly isMenuOpen = signal(false);
  protected readonly isMobileSearchOpen = signal(false);

  /** Expuesto al template como alias corto */
  protected readonly cartCount = this.cart.totalItems;

  // Search
  protected readonly searchQuery = signal('');
  protected readonly showDropdown = signal(false);
  protected readonly searchResults = computed(() =>
    this.catalog.search(this.searchQuery()).slice(0, 7)
  );

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.showDropdown.set(value.trim().length > 0);
  }

  goToProduct(product: Product): void {
    this.showDropdown.set(false);
    this.searchQuery.set('');
    const slug = this.catalog.categorySlug(product.category);
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  closeDropdown(): void {
    setTimeout(() => this.showDropdown.set(false), 150);
  }

  protected readonly categories: NavCategory[] = [
    { label: 'Tecnología', targetId: 'tecnologia' },
    { label: 'Fitness', targetId: 'fitness' },
    { label: 'Hogar', targetId: 'hogar' },
    { label: 'Accesorios', targetId: 'accesorios' },
    { label: 'Electrodomésticos', targetId: 'electrodomesticos', disabled: true },
    { label: 'Hogar Inteligente', targetId: 'hogar-inteligente', disabled: true },
    { label: 'Juguetes', targetId: 'juguetes', disabled: true },
    { label: 'Joyería', targetId: 'joyeria', disabled: true },
    { label: 'Otros', targetId: 'otros' },
  ];

  scrollToCategory(targetId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMenu();

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleMobileSearch(): void {
    this.isMobileSearchOpen.update((open) => !open);
  }
}