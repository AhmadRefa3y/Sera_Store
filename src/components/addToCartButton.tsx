"use client";
import useCart, { CartProduct } from "@/lib/cartStore";
import React from "react";
import toast from "react-hot-toast";

interface props {
    product: CartProduct;
}
const AddToCartButton = ({ product }: props) => {
    const cart = useCart();

    const addToCartFunction = (product: CartProduct) => {
        const IsItemAllreadyCart = cart.Items.find(
            (item) => item.id === product.id
        );

        if (IsItemAllreadyCart) {
            toast.error("Item allready in cart");
            return;
        }
        cart.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            category: product.category,
            color: product.color,
        });
        toast.success("product added to cart");
    };
    return (
        <button
            className="p-2 bg-white rounded-full flex items-center justify-center hover:bg-slate-600 hover:text-white hover:scale-125 duration-300"
            onClick={() => {
                addToCartFunction(product);
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
            </svg>
        </button>
    );
};

export default AddToCartButton;
