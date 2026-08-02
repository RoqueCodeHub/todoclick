import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart';

interface NavCategory {
  label: string;
  targetId: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly cart = inject(CartService);
  protected readonly isMenuOpen = signal(false);
  protected readonly isMobileSearchOpen = signal(false);

  /** Expuesto al template como alias corto */
  protected readonly cartCount = this.cart.totalItems;

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