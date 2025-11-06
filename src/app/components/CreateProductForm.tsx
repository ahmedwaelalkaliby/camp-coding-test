"use client";
import { useState } from "react";
import { Product } from "@/redux/slices/getProductsSlice";

interface Props {
  onSave: (data: Product) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function CreateProductForm({ onSave, onCancel, loading }: Props) {
  const [formData, setFormData] = useState<Product>({
    product_name: "",
    product_description: "",
    number_of_pieces: 0,
    product_price: 0,
    price_after_discount: 0,
    discount: 0,
    product_name_en: "",
    product_description_en: "",
    product_hidden: "no",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["number_of_pieces", "product_price", "price_after_discount", "discount"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-md bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">Create New Product</h3>

      <input
        type="text"
        name="product_name"
        value={formData.product_name}
        onChange={handleChange}
        placeholder="Product Name (Arabic)"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="product_description"
        value={formData.product_description}
        onChange={handleChange}
        placeholder="Description (Arabic)"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="product_name_en"
        value={formData.product_name_en}
        onChange={handleChange}
        placeholder="Product Name (English)"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="product_description_en"
        value={formData.product_description_en}
        onChange={handleChange}
        placeholder="Description (English)"
        className="w-full border p-2 rounded"
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          name="number_of_pieces"
          value={formData.number_of_pieces}
          onChange={handleChange}
          placeholder="Number of pieces"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          name="product_price"
          value={formData.product_price}
          onChange={handleChange}
          placeholder="Product price"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          step="0.01"
          name="price_after_discount"
          value={formData.price_after_discount}
          onChange={handleChange}
          placeholder="Price after discount"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          step="0.1"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount %"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <select
        name="product_hidden"
        value={formData.product_hidden}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="yes">Hidden</option>
        <option value="no">Visible</option>
      </select>

      <div className="flex justify-end gap-2 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </form>
  );
}
