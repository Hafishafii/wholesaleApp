// src/features/admin/order/components/OrderRequestTable.tsx

import React, { useState, useEffect } from "react";
import type { OrderRequest } from "../types";
import { StatusBadge } from "./StatusBadge";
import { Skeleton } from "../../../../components/ui/skeleton";

const mockData: OrderRequest[] = [
  {
    id: "#REQO24",
    date: "18/07/2025",
    customerName: "Smitha Ram",
    contact: "+91 9876543210",
    product: "Saree",
    fabric: "Silk",
    color: "Red",
    quantity: 50,
    status: "Pending",
  },
  {
    id: "#REQO03",
    date: "17/07/2025",
    customerName: "Arjun Mohan",
    contact: "+91 8976543210",
    product: "Shirt",
    fabric: "Cotton",
    color: "Orange",
    quantity: 25,
    status: "In Review",
  },
  {
    id: "#REQE3",
    date: "16/07/2025",
    customerName: "Sangeeta R",
    contact: "+91 9076543210",
    product: "Dhothi",
    fabric: "Linen",
    color: "Beige",
    quantity: 25,
    status: "Approved",
  },
  {
    id: "#REQ64",
    date: "15/07/2025",
    customerName: "Ravi M",
    contact: "+91 9976543210",
    product: "Dhothi",
    fabric: "Cotton",
    color: "Gray",
    quantity: 30,
    status: "Rejected",
  },
  {
    id: "#REQRD",
    date: "14/07/2025",
    customerName: "Pooja Ravi",
    contact: "+91 9576543210",
    product: "Saree",
    fabric: "Cotton",
    color: "Green",
    quantity: 75,
    status: "In production",
  },
  {
    id: "#REQR2D",
    date: "13/07/2025",
    customerName: "Mohan R",
    contact: "+91 9776543210",
    product: "Saree",
    fabric: "Cotton",
    color: "Black",
    quantity: 35,
    status: "Shipped",
  },
  {
    id: "#REQK45",
    date: "12/07/2025",
    customerName: "Nisha K",
    contact: "+91 9756543210",
    product: "Shirt",
    fabric: "Cotton",
    color: "Blue",
    quantity: 45,
    status: "Delivered",
  },
];

export const OrderRequestTable = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderRequest[]>([]);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockData);
      setLoading(false);
    }, 1500); // Simulated 1.5s loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-[800px] w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-700">
            <th className="p-3">Request ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Customer Name</th>
            <th className="p-3">Contact Info</th>
            <th className="p-3">Product & Fabric</th>
            <th className="p-3">Color & Quantity</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b">
                  {Array.from({ length: 8 }).map((__, colIdx) => (
                    <td className="p-3" key={colIdx}>
                      <Skeleton className="h-4 w-full rounded" />
                    </td>
                  ))}
                </tr>
              ))
            : orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.contact}</td>
                  <td className="p-3">{`${order.product}, ${order.fabric}`}</td>
                  <td className="p-3">{`${order.color}, ${order.quantity}`}</td>
                  <td className="p-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-3 text-right text-blue-600 font-medium cursor-pointer">View</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
