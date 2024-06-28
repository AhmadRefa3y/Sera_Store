"use server";
import { ProductType } from "@/app/(public)/shop/Products";
import DB from "@/lib/prismaDb";

export const GetProducts = async (Filters: {
    types: any;
    categories: string | null;
    sizes: string | null;
    colors: string | null;
    priceRange: string | null;
    sort: string | null;
}) => {
    const nameFIlter = Filters?.sort;
    const priceFIlter = Filters?.priceRange;
    const priceFIltersSpilted = priceFIlter?.split("--");
    const categories = Filters.categories?.split("--");
    const sizes = Filters?.sizes?.split("--");
    const colors = Filters?.colors?.split("--");
    const suitableFor = Filters?.types?.split("--");

    try {
        const products = await DB.product.findMany({
            where: {
                category: Filters.categories
                    ? {
                          name: {
                              in: categories,
                          },
                      }
                    : undefined,

                size: sizes?.length
                    ? {
                          value: {
                              in: sizes,
                          },
                      }
                    : undefined,
                color: colors?.length
                    ? {
                          name: {
                              in: colors,
                          },
                      }
                    : undefined,
                isArchived: false,
                SuitableFor: suitableFor?.length
                    ? { in: suitableFor }
                    : undefined,
            },
            include: {
                images: true,
                size: true,
                color: true,
                category: true,
                orderItems: true,
            },
            orderBy: {
                name:
                    nameFIlter === "name-desc"
                        ? "desc"
                        : nameFIlter === "name-asc"
                        ? "asc"
                        : undefined,
                price:
                    nameFIlter === "price-desc"
                        ? "asc"
                        : nameFIlter === "price-desc"
                        ? "desc"
                        : undefined,
                createdAt: nameFIlter === "new" ? "desc" : undefined,
            },
        });
        const formattedProducts: ProductType[] = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                category: product.category.name,
                image: product.images[0].url,
                color: product.color.name,
                price: Number(product.price),
                size: product.size.value,
                SuitableFor: product.SuitableFor,
            };
        });
        return formattedProducts;
    } catch (error) {
        console.log(error);
    }
};
