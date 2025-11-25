export type PriceCategory = 'Esencial' | 'Premium' | 'VIP Pro';
export type KitType = 'Kits Empresariales' | 'Anchetas' | 'Promocionales';
export type Experience = 'Navidad y fin de año' | 'Agradecimiento y Lealtad' | 'Promoción de Tú Logo / Marca' | 'Bienvenida / Onboarding';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string; // e.g., 'Promocional', 'Snacks', 'Oficina', 'Gourmet', 'Cuidado Personal', 'Hobbies', 'Tecnología'
  priceCategory: PriceCategory;
  kitType: KitType;
  experience: Experience;
}

export interface QuoteItem extends Product {
  quantity: number;
  wantsAdvisory: boolean;
}