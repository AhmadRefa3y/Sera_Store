"use server";
import DB from "@/lib/prismaDb";

export const GetProducts = async (Filters?: any) => {
    const nameFIlter = Filters?.sort;
    const priceFIlter = Filters?.priceRange;
    const sizeFilter = Filters?.size;

    const priceFIltersSpilted = priceFIlter?.split("-");
    try {
        const allProducts = await DB.product.findMany({
            include: {
                images: true,
                size: true,
                color: true,
                category: true,
                orderItems: true,
            },
        });
        const products = await DB.product.findMany({
            where: {
                category: Filters.categoryies.length
                    ? {
                          name: {
                              in: Filters?.categoryies,
                          },
                      }
                    : undefined,
                // price: priceFIlter
                //     ? {
                //           gte: priceFIltersSpilted[0],
                //           lte: priceFIltersSpilted[1],
                //       }
                //     : undefined,
                size: sizeFilter.length
                    ? {
                          value: {
                              in: sizeFilter.map((size: string) => size),
                          },
                      }
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

        return {
            FilterdProducts: products,
            allProducts: allProducts,
        };
    } catch (error) {
        console.log(error);
    }
};
