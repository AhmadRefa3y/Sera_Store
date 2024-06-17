"use server";
import DB from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";

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

    let ItemsTotal = 0;

    Getproducts.forEach((item) => {
        ItemsTotal += item.price * (item.quantity || 1);
    });
    const order = await DB.order.create({
        data: {
            totalAmount: ItemsTotal,
            orderItems: {
                create: Getproducts.map((product) => ({
                    product: {
                        connect: {
                            id: product.id,
                        },
                    },
                    quantity: product.quantity,
                    totalPrice: product.price * product.quantity,
                })),
            },
        },
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
            orderId: order.id,
        },
        phone_number_collection: {
            enabled: true,
        },
        mode: "payment",
        success_url: "http://localhost:3000/cart",
        cancel_url: "http://localhost:3000/cart",
    });
    redirect(session.url as string);
}
