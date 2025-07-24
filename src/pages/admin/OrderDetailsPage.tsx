// src/pages/admin/OrderDetailsPage.tsx

import { useParams } from "react-router-dom";
import { useOrderDetails } from "../../features/admin/order/hooks/useOrderDetails";
import OrderDetailsForm from "../../features/admin/order/components/OrderDetailsForm";
import { Skeleton } from "../../components/ui/skeleton";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, loading } = useOrderDetails(orderId || "");

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded-lg bg-white shadow">
      {/* <h1 className="text-2xl font-bold mb-6">Order Details</h1> */}

      {loading && <Skeleton className="w-full h-[500px]" />}
      {!loading && data && <OrderDetailsForm order={data} />}
    </div>
  );
};

export default OrderDetailsPage;
