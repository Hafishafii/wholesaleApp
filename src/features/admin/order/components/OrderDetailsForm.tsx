import type { OrderDetails } from "../types";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

type Props = {
  order: OrderDetails;
};

const OrderDetailsForm = ({ order }: Props) => {
  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto bg-white rounded-lg shadow text-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>

      {/* Customer Info */}
      <div>
        <h2 className="font-semibold">Customer Info</h2>
        <Input value={order.customerName} disabled />
        <Input value={order.email} disabled />
        <Input value={order.phone} disabled />
      </div>

      {/* Product Type */}
      <div>
        <h2 className="font-semibold">Product Type</h2>
        <div className="flex gap-3 mt-2">
          {["Sarees", "Kurtas", "Others"].map((type) => {
            const isSelected = order.productType === type;
            return (
              <label
                key={type}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="productType"
                  checked={isSelected}
                  disabled
                  className="hidden"
                />
                {type}
              </label>
            );
          })}
        </div>
      </div>

      {/* Customization */}
      <div>
        <h2 className="font-semibold">Customization Options</h2>
        <Input value={order.customization?.fabric || ""} disabled />
        <div className="mt-2">
          <h3 className="font-medium">Color Preferences</h3>
          <div className="flex items-center gap-4 mt-1">
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: order.customization?.color || "#ccc" }}
            />
            {order.customization?.colorReferenceImg && (
              <img
                src={order.customization.colorReferenceImg}
                alt="Color reference"
                className="w-16 h-16 object-cover rounded border"
              />
            )}
          </div>
        </div>
      </div>

      {/* Pattern Style */}
      <div>
        <h2 className="font-semibold">Style / Pattern Preferences</h2>
        <Input value={order.patternStyle} disabled />
        {order.sampleImage && (
          <img
            src={order.sampleImage}
            alt="Sample"
            className="w-24 h-24 object-cover mt-2 rounded border"
          />
        )}
      </div>

      {/* Branding */}
      <div>
        <h2 className="font-semibold">Branding / Labeling</h2>
        <label className="flex items-center gap-2 mt-1">
          <input type="checkbox" checked={order.branding} disabled />
          Add your brand label?
        </label>
      </div>

      {/* Quantity */}
      <div>
        <h2 className="font-semibold">Quantity & Order Details</h2>
        <div className="flex gap-4 mt-1">
          <Input
            type="number"
            value={order.quantity}
            disabled
            className="w-24"
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={order.bulkOrder} disabled />
            Bulk Order?
          </label>
        </div>
      </div>

      {/* Notes */}
      <div>
        <h2 className="font-semibold">Additional Instructions</h2>
        <textarea
          value={order.notes || ""}
          disabled
          className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-sm h-24"
        />
      </div>

      {/* Status */}
      <div>
        <h2 className="font-semibold">Status</h2>
        <select
          value={order.status}
          disabled
          className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accept</option>
          <option value="Rejected">Reject</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="w-1/2 mr-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Accept
        </button>
        <button
          className="w-1/2 ml-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
