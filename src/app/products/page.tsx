"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts, Product } from "@/redux/slices/getProductsSlice";
import { deleteProduct, resetDeleteState } from "@/redux/slices/deleteProductSlice";
import { updateProduct, resetUpdateState } from "@/redux/slices/updateProductSlice";
import { toast } from "sonner";
import DeleteButton from "../components/deleteButton";
import UpdateProductForm from "../components/UpdateProductForm";
import Image from "next/image";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.getProducts);
  const deleteState = useSelector((state: RootState) => state.deleteProduct);
  const updateState = useSelector((state: RootState) => state.updateProduct);

  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync local products
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // Handle delete feedback
  useEffect(() => {
    if (deleteState.success && deleteState.deletedProductId) {
      toast.success("Product deleted successfully!");
      setLocalProducts((prev) => prev.filter(p => p.product_id !== deleteState.deletedProductId));
      setDeletingId(null);
      dispatch(resetDeleteState());
    } else if (deleteState.error) {
      toast.error(deleteState.error);
      setDeletingId(null);
      dispatch(resetDeleteState());
    }
  }, [deleteState, dispatch]);

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(productId);
      await dispatch(deleteProduct(productId)).unwrap();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete product");
      setDeletingId(null);
    }
  };

  // Handle update
  const handleUpdate = async (data: Product) => {
    try {
      await dispatch(updateProduct(data)).unwrap();
      toast.success("Product updated successfully!");
      setLocalProducts((prev) =>
        prev.map((p) => (p.product_id === data.product_id ? { ...data } : p))
      );
      setEditingProduct(null);
      dispatch(resetUpdateState());
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update product");
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localProducts.map((product) => (
          <div key={product.product_id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            {product.product_image?.[0] && (
              <Image
                src={product.product_image[0].image_url}
                alt={product.product_name}
                width={400}
                height={160}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{product.product_name}</h2>
            <p className="text-gray-600 mb-2">{product.product_description}</p>
            <p className="text-gray-800 font-medium mb-2">
              Price: {product.price_after_discount} USD
            </p>
            <p className="text-gray-500 mb-2">Available: {product.number_of_pieces}</p>

            <div className="flex gap-2 mt-2 items-center justify-center">
              <DeleteButton handleDelete={handleDelete} deletingId={deletingId} product={product} />
              <button
                onClick={() => setEditingProduct(product)}
                className="bg-yellow-500 text-white  w-[100px] h-[60px] mt-4 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="mt-6">
          <UpdateProductForm
            product={editingProduct}
            loading={updateState.loading}
            onSave={handleUpdate}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}
    </div>
  );
}
