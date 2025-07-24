// src/features/admin/order/hooks/useOrderDetails.ts

import { useEffect, useState } from "react";
import type { OrderDetails } from "../types";

export const useOrderDetails = (orderId: string) => {
  const [data, setData] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // ✅ MOCK data since API doesn't exist
        const mockData: OrderDetails = {
          _id: orderId,
          customerName: "Smitha Ram",
          email: "smitha@example.com",
          phone: "+91 9876543210",
          productType: "Saree",
          customization: {
            color: "#FF0000",
            colorReferenceImg: "https://via.placeholder.com/60",
          },
          patternStyle: "Floral",
          sampleImage: "https://via.placeholder.com/80",
          branding: true,
          quantity: 50,
          bulkOrder: true,
          notes: "Please deliver by next week.",
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
