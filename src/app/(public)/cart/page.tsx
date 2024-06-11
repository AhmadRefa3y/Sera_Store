"use client";
import { CreateCheckoutSession } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import useCart from "@/lib/cartStore";
import { formatter } from "@/lib/utils";
import { CircleSlashedIcon, Delete } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartPage = () => {
    const cart = useCart();

    const updateItemQuantity = (productId: string, quantity: number) => {
        const items = cart.Items;
        const index = items.findIndex((item) => item.id === productId);
        if (index !== -1) {
            items[index].quantity = quantity;
            cart.updateItems(items);
        }
    };
    let ItemsTotal = 0;

    cart.Items.forEach((item) => {
        ItemsTotal += item.price * (item.quantity || 1);
    });

    return (
        <div className="flex flex-col gap-2 max-w-screen-xl mx-auto w-full min-h-full ">
            <div className="flex gap-4">
                <div className="text-2xl">shopping cart</div>
                {cart.Items.length > 0 && (
                    <button onClick={() => cart.clearCart()}>
                        <CircleSlashedIcon className="h-6 w-6 text-blue-700 hover:text-red-600" />
                    </button>
                )}
            </div>
            <div className="flex flex-1 gap-16">
                <div className=" flex-1 max-h-full flex flex-col gap-3">
                    {cart.Items.map((item) => (
                        <div className="flex gap-4 p-4">
                            <div>
                                <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                                    <Image
                                        fill
                                        src={item.image}
                                        alt=""
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={false} // {false} | {true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl ">{item.name}</div>
                                <div>
                                    <div>
                                        {item.color} | {item.category}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-24">Price</div>
                                    <div>{formatter.format(item.price)}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-24">quantity</div>

                                    <input
                                        type="number"
                                        min={1}
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateItemQuantity(
                                                item.id,
                                                e.target.valueAsNumber
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex">
                                    <div className="w-24">Total Price</div>
                                    <div>
                                        {formatter.format(
                                            item.price * (item.quantity || 1)
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => cart.removeFromCart(item.id)}
                                className="rounded-full p-2 shadow-md  w-8 h-8  hover:shadow-lg duration-300 hover:text-red-500 text-black flex items-center justify-center ml-auto border border-stone-300"
                            >
                                <span className="text-base">X</span>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4 w-[350px]">
                    <div className="pb-6 border-b">Order summary</div>
                    <div className="flex  justify-between">
                        <div>Order Total</div>
                        <div>{formatter.format(ItemsTotal)}</div>
                    </div>
                    <Button
                        onClick={() =>
                            CreateCheckoutSession({ products: cart.Items })
                        }
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
