import { useState } from "react";
import type { OrderDetails } from "../types";
import { Input } from "../../../../components/ui/input";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type Props = {
  order: OrderDetails;
};

const OrderDetailsForm = ({ order }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const navigate = useNavigate();

  const isStatusFinal = order.status === "Accepted" || order.status === "Rejected";

  const handleUpdateStatus = () => {
    if (isStatusFinal) return;

    Swal.fire({
      title: "Updating...",
      text: `Setting status to "${selectedStatus}"`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate API call delay
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Order marked as "${selectedStatus}"`,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin/order-requests");
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Details</h1>

      {/* Customer Info */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input value={order.customerName} disabled className="w-full text-sm p-3" />
          <Input value={order.email} disabled className="w-full text-sm p-3" />
          <Input value={order.phone} disabled className="w-full text-sm p-3" />
        </div>
      </div>

      {/* Product Type */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Product Type</h2>
        <div className="flex gap-4">
          {["Sarees", "Kurtas", "Others"].map((type) => {
            const isSelected = order.productType === type;
            return (
              <label
                key={type}
                className={`flex items-center gap-3 px-5 py-2 rounded-full border text-sm cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                <input type="radio" checked={isSelected} disabled className="hidden" />
                {type}
              </label>
            );
          })}
        </div>
      </div>

      {/* Customization */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Customization Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Fabric Material</label>
            <Input value={order.customization?.fabric || "Standard Cotton"} disabled className="w-full text-sm p-3" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Color Preferences</label>
            <div className="flex items-center gap-5 mt-2">
              <div
                className="w-10 h-10 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: order.customization?.color || "#ccc" }}
              />
              <img
                src=
                // {
                  // order.customization?.colorReferenceImg ||
                  "https://i.pravatar.cc/150?img=10"
                // }
                alt="Color ref"
                className="w-20 h-20 object-cover rounded border"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Style */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Style & Pattern</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input value={order.patternStyle || "Floral Pattern"} disabled className="w-full text-sm p-3" />
          <img
            src=
            // {
              // order.sampleImage ||
              "https://i.pravatar.cc/150?img=10"
            // }
            alt="Sample pattern"
            className="w-28 h-28 object-cover rounded border mt-2"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Branding */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Branding</h2>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={order.branding} disabled className="h-4 w-4 rounded" />
          <span className="text-sm">Custom branding included</span>
        </label>
      </div>

      {/* Quantity */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Quantity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input type="number" value={order.quantity} disabled className="w-full text-sm p-3" />
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={order.bulkOrder} disabled className="h-4 w-4 rounded" />
            <span className="text-sm">Bulk Order (50+)</span>
          </label>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Additional Notes</h2>
        <textarea
          value={order.notes || "No additional instructions"}
          disabled
          className="w-full border border-gray-300 p-4 rounded bg-gray-50 text-sm h-40"
        />
      </div>

      {/* Status Update */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-200">Order Status</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as OrderDetails["status"])}
          className="w-full border border-gray-300 p-3 rounded bg-white text-sm"
          disabled={isStatusFinal}
        >
          <option value="Pending">Pending Review</option>
          <option value="Accepted">Order Accepted</option>
          <option value="Rejected">Order Rejected</option>
        </select>
        <button
          onClick={handleUpdateStatus}
          disabled={isStatusFinal}
          className={`mt-4 py-2 px-4 rounded transition ${
            isStatusFinal
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isStatusFinal ? "Status Finalized" : "Update Status"}
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
