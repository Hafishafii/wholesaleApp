// src/features/admin/order/types.ts

export type OrderStatus =
  | "Pending"
  | "In Review"
  | "Approved"
  | "Rejected"
  | "In production"
  | "Shipped"
  | "Delivered";

export interface OrderRequest {
  id: string;
  date: string;
  customerName: string;
  contact: string;
  product: string;
  fabric: string;
  color: string;
  quantity: number;
  status: OrderStatus;
}
