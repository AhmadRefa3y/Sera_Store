"use server";
import DB from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { promise } from "zod";

interface props {
    products: {
        id: string;
        quantity: number;
    }[];
}

export async function CreateCheckoutSession({ products }: props) {
    const Getproducts = await Promise.all(
        products.map(async (product) => {
            const productData = await DB.product.findUnique({
                where: {
                    id: product.id,
                },
            });

            if (!productData) {
                throw new Error("Product not found");
            }
            return {
                id: productData.id,
                name: productData.name,
                price: productData.price.toNumber(),
                quantity: product.quantity,
            };
        })
    );

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    Getproducts.forEach((product) => {
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        });
    });

    const order = await DB.order.create({
        data: {
            totalAmount: Getproducts.reduce(
                (acc, product) => acc + product.price * product.quantity,
            )
            orderItems: {
                create: Getproducts.map((product) => ({
                    product: {
                        connect: {
                            id: product.id,
                        },
                    },
                    quantity: product.quantity,
                    totalPrice: product.price * product.quantity,
                    productId: product.id,
                })),
            },
        },
    });
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/cart",
        cancel_url: "http://localhost:3000/cart",
    });
}
