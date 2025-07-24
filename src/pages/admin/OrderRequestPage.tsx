// src/pages/admin/OrderRequestPage.tsx

import React from "react";
import { OrderRequestTable } from "../../features/admin/order/components/OrderRequestTable";

const OrderRequestPage = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
        Order Requests
      </h1>

      <div className="overflow-x-auto">
        <OrderRequestTable />
      </div>

      <div className="text-center mt-6">
        <button className="text-sm sm:text-base text-blue-600 hover:underline font-semibold">
          See More
        </button>
      </div>
    </div>
  );
};

export default OrderRequestPage;
