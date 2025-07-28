import { useState } from "react";
import type { ProductFormData, Size, Color, ProductType } from "../types";
import { Button } from "../../../../components/ui/button";

const productTypes: ProductType[] = ["Sarees", "Shirts", "Dhotis"];
const sizes: Size[] = ["S", "M", "L", "XL", "XXL", "XXXL"];
const fabricOptions = ["Cotton", "Silk", "Linen"];
const colorPalette: Color[] = ["#000", "#f00", "#0f0", "#00f", "#ff0", "#f0f"];

export const AddProductForm = () => {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    type: "Sarees",
    fabric: "",
    colors: [],
    sizes: [],
    code: "",
    sku: "",
    costPrice: 0,
    wholesalePrice: 0,
    minOrderQuantity: 0,
    currentStock: 0,
    allowCustomization: false,
    description: "",
    images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Product name is required.";
    else if (form.name.length > 100) newErrors.name = "Product name must be under 100 characters.";

    if (!form.fabric.trim()) newErrors.fabric = "Fabric type is required.";
    if (!form.code.trim()) newErrors.code = "Product code is required.";
    if (!form.sku.trim()) newErrors.sku = "SKU is required.";
    if (form.description.length > 1000) newErrors.description = "Description must be under 1000 characters.";
    if (form.costPrice <= 0) newErrors.costPrice = "Cost price must be greater than 0.";
    if (form.wholesalePrice <= 0) newErrors.wholesalePrice = "Wholesale price must be greater than 0.";
    if (form.minOrderQuantity <= 0) newErrors.minOrderQuantity = "Min order quantity must be greater than 0.";
    if (form.images.length === 0) newErrors.images = "At least one image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitizeInput = (text: string) =>
    text.replace(/<script.*?>.*?<\/script>/gi, "").trim();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidImage = file.type.startsWith("image/");
    const maxSize = 1024 * 1024 * 2;

    if (!isValidImage) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      alert("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const safeData = {
      ...form,
      description: sanitizeInput(form.description),
    };

    console.log("Submit", safeData);
  };

  const toggleColor = (color: Color) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const toggleSize = (size: Size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Info Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Product Info</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Product Type</label>
              <div className="flex gap-4">
                {productTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="productType"
                      checked={form.type === type}
                      onChange={() => setForm({ ...form, type })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Fabric</label>
              <select
                value={form.fabric}
                onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="">Select Fabric Type</option>
                {fabricOptions.map((fab) => (
                  <option key={fab}>{fab}</option>
                ))}
              </select>
              {errors.fabric && <p className="text-red-500 text-sm mt-1">{errors.fabric}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Color</label>
              <div className="flex gap-2">
                {colorPalette.map((color) => (
                  <div
                    key={color}
                    className={`w-7 h-7 rounded-full cursor-pointer border border-gray-400 ${
                      form.colors.includes(color) ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => toggleColor(color)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Size</label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <label key={size} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.sizes.includes(size)}
                      onChange={() => toggleSize(size)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Product Code</label>
                <input
                  type="text"
                  placeholder="SA925"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Stock Keeping Unit</label>
                <input
                  type="text"
                  placeholder="SKU-BB-SS-A6"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Stock Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Pricing & Stock</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Cost Price</label>
              <input
                type="number"
                placeholder="0"
                value={form.costPrice}
                onChange={(e) => setForm({ ...form, costPrice: Number(e.target.value) })}
                className="w-full border border-gray-300 p-2.5 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              {errors.costPrice && <p className="text-red-500 text-sm mt-1">{errors.costPrice}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Wholesale Price</label>
              <input
                type="number"
                placeholder="0"
                value={form.wholesalePrice}
                onChange={(e) => setForm({ ...form, wholesalePrice: Number(e.target.value) })}
                className="w-full border border-gray-300 p-2.5 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              {errors.wholesalePrice && <p className="text-red-500 text-sm mt-1">{errors.wholesalePrice}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Min. Order Quantity</label>
              <input
                type="number"
                placeholder="0"
                value={form.minOrderQuantity}
                onChange={(e) => setForm({ ...form, minOrderQuantity: Number(e.target.value) })}
                className="w-full border border-gray-300 p-2.5 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
              {errors.minOrderQuantity && <p className="text-red-500 text-sm mt-1">{errors.minOrderQuantity}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Current Stock</label>
              <input
                type="number"
                placeholder="0"
                value={form.currentStock}
                onChange={(e) => setForm({ ...form, currentStock: Number(e.target.value) })}
                className="w-full border border-gray-300 p-2.5 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.allowCustomization}
                onChange={(e) => setForm({ ...form, allowCustomization: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              Allow Customization*
            </label>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Description</h2>
          <textarea
            placeholder="Write a short description about the product"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 p-2.5 rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Upload Images Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Upload Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative border rounded-lg overflow-hidden aspect-square bg-gray-100">
                <img src={img} alt={`Product ${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}

            {form.images.length < 20 && (
              <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center aspect-square bg-gray-50 hover:bg-gray-100 transition">
                <div className="text-center p-4">
                  <span className="text-3xl text-gray-400">+</span>
                  <p className="text-xs text-gray-500 mt-1">Upload Image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" className="px-6 py-2.5">Save as Draft</Button>
          <Button type="submit" className="px-6 py-2.5">Add Product</Button>
        </div>
      </form>
    </div>
  );
};