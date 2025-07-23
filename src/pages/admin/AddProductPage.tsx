// src/pages/admin/AddProductPage.tsx

import React from "react";
import { AddProductForm } from "../../features/admin/Product/components/AddProductForm";


const AddProductPage = () => {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Add New Product</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
