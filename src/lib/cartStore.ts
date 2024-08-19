/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the product type
export interface CartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number | 1;
    image: string;
    category: string;
    color: string;
}

// Define the state and actions
interface CartState {
    Items: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateItems: (items: CartProduct[]) => void;
}

// Create the cart store
const useCart = create<CartState>()(
    persist(
        (set) => ({
            Items: [],
            addToCart: (product) =>
                set((state) => ({
                    Items: [...state.Items, product],
                })),
            removeFromCart: (productId) =>
                set((state) => ({
                    Items: state.Items.filter(
                        (product) => product.id !== productId
                    ),
                })),
            clearCart: () => set({ Items: [] }),
            updateItems: (items: CartProduct[]) => set({ Items: items }),
        }),
        {
            name: "cart-storage",
            partialize: (state) => ({
                Items: state.Items,
            }),
        }
    )
);

export default useCart;
