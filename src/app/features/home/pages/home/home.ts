import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../../../core/services/cart';

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

  protected readonly newProducts: Product[] = [
    {
      id: 'p1',
      slug: 'cooler-para-celular',
      name: 'Cooler para celular',
      image: '/images/products/culercel.avif',
      images: [
        '/images/products/culercel.avif',
        '/images/products/culercel2.avif',
      ],
      price: 25.90,
      oldPrice: 30.00,
      rating: 4.5,
      reviewsCount: 85,
      isNew: true,
      stock: 15,
      category: 'Accesorios',
    },
    {
      id: 'p2',
      slug: 'banda-de-resistencia',
      name: 'Banda de resistencia',
      image: '/images/products/banderesis.avif',
      images: [
        '/images/products/banderesis.avif',
        '/images/products/bandaresis2.avif',
      ],
      price: 27.90,
      oldPrice: 35.00,
      rating: 4.3,
      reviewsCount: 42,
      isNew: true,
      stock: 25,
      category: 'Fitness',
    },
    {
      id: 'p3',
      slug: 'smart-watch',
      name: 'Smart watch',
      image: '/images/products/smartwa.avif',
      images: [
        '/images/products/smartwa.avif',
        '/images/products/smartwa2.avif',
        '/images/products/smartwa3.avif',
      ],
      price: 99.90,
      oldPrice: 130.00,
      rating: 4.7,
      reviewsCount: 120,
      isNew: true,
      stock: 10,
      category: 'Tecnología',
    },
    {
      id: 'p4',
      slug: 'peine-de-masaje-electrico-portatil-con-nano-spray',
      name: 'Peine de masaje eléctrico portátil con nano-spray',
      image: '/images/products/peine.avif',
      images: [
        '/images/products/peine.avif',
        '/images/products/peine2.avif',
        '/images/products/peine3.avif',
      ],
      price: 30.20,
      oldPrice: 35.00,
      rating: 4.6,
      reviewsCount: 58,
      isNew: true,
      stock: 20,
      category: 'Accesorios',
    },
  ];

  protected readonly allProducts: Product[] = [
    ...this.newProducts,
    {
      id: 'p5',
      slug: 'lampara-de-luz-recargable',
      name: 'Lámpara de luz recargable',
      image: '/images/products/lampara.avif',
      images: [
        '/images/products/lampara.avif',
        '/images/products/lampara2.avif',
        '/images/products/lampara3.avif',
      ],
      price: 17.20,
      oldPrice: 20.00,
      rating: 4.2,
      reviewsCount: 34,
      stock: 18,
      category: 'Hogar',
    },
    {
      id: 'p6',
      slug: 'alexa-ninos',
      name: 'Alexa Niños',
      image: '/images/products/alexawebp.webp',
      images: ['/images/products/alexawebp.webp'],
      price: 45.30,
      oldPrice: 55.00,
      rating: 4.8,
      reviewsCount: 92,
      stock: 8,
      category: 'Tecnología',
    },
    {
      id: 'p7',
      slug: 'cepillo-electrico-inalambrico',
      name: 'Cepillo eléctrico inalámbrico',
      image: '/images/products/cleaning.png',
      images: [
        '/images/products/cleaning.png',
        '/images/products/cleaning2.png',
        '/images/products/cleaning3.png',
      ],
      price: 55.50,
      oldPrice: 62.00,
      rating: 4.4,
      reviewsCount: 29,
      stock: 14,
      category: 'Hogar',
    },
    {
      id: 'p8',
      slug: 'disco-solido-netac-512gb-sata',
      name: 'Disco sólido Netac 512GB sata',
      image: '/images/products/solidonetac512.avif',
      images: [
        '/images/products/solidonetac512.avif',
        '/images/products/solidonetac5122.avif',
      ],
      price: 259.90,
      oldPrice: 280.00,
      rating: 4.9,
      reviewsCount: 150,
      stock: 22,
      category: 'Tecnología',
    },
    {
      id: 'p9',
      slug: 'multitester',
      name: 'Multímetro Digital Profesional',
      image: '/images/products/multitester.avif',
      images: [
        '/images/products/multitester.avif',
        '/images/products/multitester2.avif',
      ],
      price: 30.50,
      oldPrice: 40.00,
      rating: 4.1,
      reviewsCount: 15,
      stock: 12,
      category: 'Tecnología',
    },
    {
      id: 'p10',
      slug: 'moto-zongshen-rx1-200-2019',
      name: 'Moto Zongshen RX1 200 — 2do uso (2019)',
      image: '/images/products/moto-zongshen.avif',
      images: [
        '/images/products/moto.avif',
        '/images/products/moto2.avif',
        '/images/products/moto-zongshen3.avif',
      ],
      price: 3599.00,
      rating: 4.5,
      reviewsCount: 3,
      stock: 1,
      category: 'Otros',
    },
  ];

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

  private readonly cartService = inject(CartService);

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