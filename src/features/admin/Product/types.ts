// src/features/admin/Product/types.ts

export type ProductType = "Sarees" | "Shirts" | "Dhotis";
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Color = string;

export interface ProductFormData {
  name: string;
  type: ProductType;
  fabric: string;
  colors: Color[];
  sizes: Size[];
  code: string;
  sku: string;
  costPrice: number;
  wholesalePrice: number;
  minOrderQuantity: number;
  allowCustomization: boolean;
  description: string;
  images: string[];
}
