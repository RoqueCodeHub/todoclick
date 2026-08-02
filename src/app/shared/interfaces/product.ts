export interface Product {
    id: string;
    slug: string;
    name: string;
    image: string;
    images?: string[];
    price: number;
    oldPrice?: number;
    rating: number;
    reviewsCount: number;
    isNew?: boolean;
    stock: number;
    category: string;
}
