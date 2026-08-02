import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../../../core/services/cart';
import { CatalogService } from '../../../../core/services/catalog';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;
  type?: 'image' | 'video';
}

interface SidePromo {
  id: number;
  label: string;
  title: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  protected readonly slides: Slide[] = [
    {
      id: 1,
      title: 'Nueva Colección 2026',
      subtitle: 'Descuentos Hasta 25%',
      ctaLabel: 'Comprar ahora',
      ctaLink: '#productos',
      image: '/images/products/smartwh.f30.mp4',
      type: 'video',
    },
    {
      id: 2,
      title: 'Envíos Gratis A Nivel Nacional',
      subtitle: 'Recibe tus productos favoritos sin costo de envío',
      ctaLabel: 'Ver productos',
      ctaLink: '#productos',
      image: '/images/products/bandaresis.mp4',
      type: 'video',
    },
    {
      id: 3,
      title: 'Ofertas de temporada',
      subtitle: 'Precios exclusivos por tiempo limitado',
      ctaLabel: 'Ver ofertas',
      ctaLink: '#productos',
      image: '/images/products/culercel.mp4',
      type: 'video',
    },
  ];



  protected readonly currentSlide = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;
  private readonly autoplayDelayMs = 5000;

  private readonly catalog = inject(CatalogService);
  private readonly cartService = inject(CartService);

  protected get newProducts() { return this.catalog.newProducts; }
  protected get allProducts() { return this.catalog.allProducts; }


  protected readonly categoriesWithProducts = computed(() => {
    const products = this.allProducts;
    const map = new Map<string, { name: string; slug: string; products: Product[] }>();

    const categoriesOrder = [
      { name: 'Tecnología', slug: 'tecnologia' },
      { name: 'Fitness', slug: 'fitness' },
      { name: 'Hogar', slug: 'hogar' },
      { name: 'Accesorios', slug: 'accesorios' },
      { name: 'Cuidado Personal', slug: 'cuidado-personal' },
      { name: 'Herramientas', slug: 'herramientas' },
      { name: 'Otros', slug: 'otros' },
    ];

    categoriesOrder.forEach((cat) => {
      map.set(cat.name, {
        name: cat.name,
        slug: cat.slug,
        products: [],
      });
    });

    products.forEach((p) => {
      if (map.has(p.category)) {
        map.get(p.category)!.products.push(p);
      } else {
        const slug = p.category.toLowerCase().replace(/\s+/g, '-');
        map.set(p.category, { name: p.category, slug, products: [p] });
      }
    });

    return Array.from(map.values()).filter((c) => c.products.length > 0);
  });


  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  next(): void {
    this.currentSlide.update((i) => (i + 1) % this.slides.length);
  }

  prev(): void {
    this.currentSlide.update(
      (i) => (i - 1 + this.slides.length) % this.slides.length,
    );
  }

  goTo(index: number): void {
    this.currentSlide.set(index);
    this.restartAutoplay();
  }

  scrollToProducts(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('productos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToCategories(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('categorias-secciones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onAddToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  onToggleWishlist(product: Product): void {
    console.log('Agregar a favoritos', product);
  }

  private startAutoplay(): void {
    this.intervalId = setInterval(() => this.next(), this.autoplayDelayMs);
  }

  private stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}