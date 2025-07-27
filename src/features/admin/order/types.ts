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



export type OrderDetails = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  productType: string;
  customization: {
    color: string;
    colorReferenceImg?: string;
    fabric?: string;
  };
  patternStyle: string;
  sampleImage?: string;
  branding: boolean;
  quantity: number;
  bulkOrder: boolean;
  notes?: string;
  status: "Pending" | "Accepted" | "Rejected";
};
