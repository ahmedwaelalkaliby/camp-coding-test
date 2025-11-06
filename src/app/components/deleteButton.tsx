"use client";
import { Product } from '@/redux/slices/getProductsSlice'
import React from 'react'

export default function DeleteButton({handleDelete, deletingId, product}:{handleDelete: (id: number) => void, deletingId: number | null, product: Product}) {

  return (
     <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(product.product_id || 0)}
                className="bg-red-500 text-white w-[100px] h-[60px] rounded hover:bg-red-600 transition"
                disabled={deletingId === product.product_id || false}
              >
                {deletingId === product.product_id ? "Deleting..." : "Delete"}
              </button>
            </div>
  )
}
