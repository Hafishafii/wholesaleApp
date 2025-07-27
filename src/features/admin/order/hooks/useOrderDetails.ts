// src/features/admin/order/hooks/useOrderDetails.ts
import { useEffect, useState } from "react";
import type { OrderDetails } from "../types";

export const useOrderDetails = (orderId: string) => {
  const [data, setData] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // ✅ MOCK data with working Unsplash image links
        const mockData: OrderDetails = {
          _id: orderId,
          customerName: "Smitha Ram",
          email: "smitha@example.com",
          phone: "+91 9876543210",
          productType: "Sarees",
          customization: {
            color: "#FF69B4",
            colorReferenceImg:
              "https://images.unsplash.com/photo-1606813902915-6618b04c8c3e?auto=format&fit=crop&w=60&h=60",
          },
          patternStyle: "Floral, Hand-embroidered",
          sampleImage:
            "https://images.unsplash.com/photo-1609250292128-1f8a7b6d56e5?auto=format&fit=crop&w=100&h=100",
          branding: true,
          quantity: 50,
          bulkOrder: true,
          notes: "Please deliver by next week. Prefer soft fabric.",
          status: "Pending",
        };

        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Failed to load order:", err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { data, loading };
};
