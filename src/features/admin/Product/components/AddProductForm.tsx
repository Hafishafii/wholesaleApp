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
  else if (form.code.length > 30) newErrors.code = "Product code must be under 30 characters.";

  if (!form.sku.trim()) newErrors.sku = "SKU is required.";
  else if (form.sku.length > 30) newErrors.sku = "SKU must be under 30 characters.";

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
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-4xl mx-auto mt-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <div className="flex gap-4">
          {productTypes.map((type) => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="radio"
                name="productType"
                checked={form.type === type}
                onChange={() => setForm({ ...form, type })}
              />
              {type}
            </label>
          ))}
        </div>

        <select
          value={form.fabric}
          onChange={(e) => setForm({ ...form, fabric: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-lg"
        >
          <option value="">Fabric Type</option>
          {fabricOptions.map((fab) => (
            <option key={fab}>{fab}</option>
          ))}
        </select>
        {errors.fabric && <p className="text-red-500 text-sm">{errors.fabric}</p>}

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

        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.sizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              {size}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            className="border border-gray-300 p-3 rounded-lg"
          />
        </div>
        {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
        {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Cost Price"
            value={form.costPrice}
            onChange={(e) => setForm({ ...form, costPrice: Number(e.target.value) })}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="Wholesale Price"
            value={form.wholesalePrice}
            onChange={(e) => setForm({ ...form, wholesalePrice: Number(e.target.value) })}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="Min Order Quantity"
            value={form.minOrderQuantity}
            onChange={(e) => setForm({ ...form, minOrderQuantity: Number(e.target.value) })}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.allowCustomization}
              onChange={(e) => setForm({ ...form, allowCustomization: e.target.checked })}
            />
            Allow Customization?
          </label>
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-lg min-h-[100px]"
        />

        {/* Upload with prettier boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...form.images, ""].slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden bg-gray-50"
            >
              {img ? (
                <img src={img} alt={`Product ${i}`} className="w-full h-full object-cover" />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
          ))}
        </div>
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </div>
  );
};
