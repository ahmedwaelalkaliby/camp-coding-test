"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts, Product } from "@/redux/slices/getProductsSlice";
import { deleteProduct, resetDeleteState } from "@/redux/slices/deleteProductSlice";
import { toast } from "sonner";
import DeleteButton from "../components/deleteButton";
import Image from "next/image";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.getProducts);
  const deleteState = useSelector((state: RootState) => state.deleteProduct);

  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null); // Track product being deleted

  // Fetch products initially
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync local state with Redux products
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // Handle delete success/error
  useEffect(() => {
    if (deleteState.success) {
      toast.success("Product deleted successfully!");
      setLocalProducts(prev => prev.filter(p => p.product_id !== deleteState.deletedProductId));
      setDeletingId(null);
      dispatch(resetDeleteState());
    }
    if (deleteState.error) {
      toast.error(deleteState.error);
      setDeletingId(null);
      dispatch(resetDeleteState());
    }
  }, [deleteState.success, deleteState.error, deleteState.deletedProductId, dispatch]);

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(productId); // Disable only this button
      await dispatch(deleteProduct(productId)).unwrap();
    } catch (error: string | unknown) {
      toast.error("Failed to delete product: " + (error instanceof Error ? error.message : ""));
      setDeletingId(null);
    }
  };

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localProducts.map((product: Product) => (
          <div
            key={product.product_id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-2">{product.product_name}</h2>
            <p className="text-gray-600 mb-2">{product.product_description}</p>
            <p className="text-gray-800 font-medium mb-2">
              Price: {product.price_after_discount} USD
            </p>
            <p className="text-gray-500 mb-2">Available: {product.number_of_pieces}</p>

            {product.product_image?.length ? (
              <Image
                src={product.product_image[0].image_url}
                alt={product.product_name}
                width={400}
                height={160}
                className="w-full h-40 object-cover rounded mb-2"
              />
            ) : null}

          <DeleteButton handleDelete={handleDelete} deletingId={deletingId} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
