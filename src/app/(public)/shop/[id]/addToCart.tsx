"use client";
import useCart, { CartProduct } from "@/lib/cartStore";
import { ArrowBigRight, Heart, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddToCart = (product: CartProduct) => {
    const [quntity, setQuntity] = useState(1);
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
            quantity: quntity,
            category: product.category,
            color: product.color,
        });
        toast.success("product added to cart");
    };

    return (
        <div className="flex sm:gap-2 gap-1 md:flex-col sm:flex-row ">
            <div className="flex justify-evenly border border-stone-300   sm:mx-0 px-1 sm:text-lg p-1">
                <button onClick={() => setQuntity((pre) => pre + 1)}>
                    <Plus />
                </button>
                <span className="sm:mx-4 mx-1">{quntity}</span>
                <button
                    onClick={() => setQuntity((pre) => (pre > 1 ? pre - 1 : 1))}
                >
                    <Minus />
                </button>
            </div>
            <button
                className="flex items-center justify-center flex-1 min-w-fit border border-cyan-950 p-1 hover:bg-cyan-950 hover:text-white duration-300 capitalize"
                onClick={() => addToCartFunction(product)}
            >
                add to cart <ArrowBigRight />
            </button>
            <div className="flex items-center justify-center  border border-cyan-950 p-1 hover:bg-cyan-950 hover:text-white duration-300 relative">
                <Heart />
                <div className="absolute  hidden">add to favourites </div>
            </div>
        </div>
    );
};

export default AddToCart;
