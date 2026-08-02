import { Injectable } from '@angular/core';
import { Product } from '../../shared/interfaces/product';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly allProducts: Product[] = [
    {
      id: 'p1',
      slug: 'cooler-para-celular',
      name: 'Cooler para celular',
      image: '/images/products/culercel.avif',
      images: ['/images/products/culercel.avif', '/images/products/culercel2.avif'],
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
      images: ['/images/products/banderesis.avif', '/images/products/bandaresis2.avif'],
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
      images: ['/images/products/smartwa.avif', '/images/products/smartwa2.avif', '/images/products/smartwa3.avif'],
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
      images: ['/images/products/peine.avif', '/images/products/peine2.avif', '/images/products/peine3.avif'],
      price: 30.20,
      oldPrice: 35.00,
      rating: 4.6,
      reviewsCount: 58,
      isNew: true,
      stock: 20,
      category: 'Accesorios',
    },
    {
      id: 'p5',
      slug: 'lampara-de-luz-recargable',
      name: 'Lámpara de luz recargable',
      image: '/images/products/lampara.avif',
      images: ['/images/products/lampara.avif', '/images/products/lampara2.avif', '/images/products/lampara3.avif'],
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
      images: ['/images/products/cleaning.png', '/images/products/cleaning2.png', '/images/products/cleaning3.png'],
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
      images: ['/images/products/solidonetac512.avif', '/images/products/solidonetac5122.avif'],
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
      images: ['/images/products/multitester.avif', '/images/products/multitester2.avif'],
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
      images: ['/images/products/moto.avif', '/images/products/moto2.avif', '/images/products/moto-zongshen3.avif'],
      price: 3599.00,
      rating: 4.5,
      reviewsCount: 3,
      stock: 1,
      category: 'Otros',
    },
  ];

  readonly newProducts = this.allProducts.filter((p) => p.isNew);

  /** Slug de categoría → id de sección en el DOM */
  categorySlug(categoryName: string): string {
    return categoryName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  search(term: string): Product[] {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return this.allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }
}
