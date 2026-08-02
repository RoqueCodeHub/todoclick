import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', {
      id: 'p1',
      slug: 'zapatillas-urban-runner',
      name: 'Zapatillas Urban Runner',
      image: 'https://picsum.photos/seed/store2026-p1/500/500',
      price: 189.9,
      oldPrice: 229.9,
      rating: 4.5,
      reviewsCount: 128,
      isNew: true,
      stock: 12,
      category: 'Calzado',
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
