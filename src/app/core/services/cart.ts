import { Injectable, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../shared/interfaces/product';
import { CartItem } from '../../shared/interfaces/cart-item';

const CART_STORAGE_KEY = 'store2026_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _items = signal<CartItem[]>(this.loadCartFromStorage());
  private readonly _isOpen = signal(false);

  constructor() {
    // Persistencia automática: guarda en localStorage cada vez que los items cambian
    effect(() => {
      const currentItems = this._items();
      if (this.isBrowser) {
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentItems));
        } catch (e) {
          console.error('Error guardando carrito en localStorage:', e);
        }
      }
    });
  }

  private loadCartFromStorage(): CartItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        return saved ? (JSON.parse(saved) as CartItem[]) : [];
      } catch (e) {
        console.error('Error cargando carrito de localStorage:', e);
        return [];
      }
    }
    return [];
  }

  /** Lista reactiva de items del carrito */
  readonly items = this._items.asReadonly();

  /** ¿El panel del carrito está visible? */
  readonly isOpen = this._isOpen.asReadonly();

  /** Cantidad total de unidades en el carrito */
  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  /** Precio total del carrito */
  readonly totalPrice = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  );

  /** Agrega un producto al carrito o incrementa su cantidad */
  addProduct(product: Product): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.open();
  }

  /** Reduce la cantidad de un producto (elimina si llega a 0) */
  decreaseQuantity(productId: string): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product.id === productId);
      if (!existing) return items;
      if (existing.quantity <= 1) {
        return items.filter((i) => i.product.id !== productId);
      }
      return items.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }

  /** Elimina completamente un producto del carrito */
  removeProduct(productId: string): void {
    this._items.update((items) =>
      items.filter((i) => i.product.id !== productId),
    );
  }

  /** Vacía el carrito */
  clear(): void {
    this._items.set([]);
  }

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }

  toggle(): void {
    this._isOpen.update((v) => !v);
  }
}
