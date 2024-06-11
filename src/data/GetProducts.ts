"use server";
import DB from "@/lib/prismaDb";

export const GetProducts = async (Filters?: any) => {
    const nameFIlter = Filters?.sort;
    const priceFIlter = Filters?.priceRange;
    const priceFIltersSpilted = priceFIlter?.split("--");
    const categories = Filters.categories?.split("--");
    const sizes = Filters?.size?.split("--");
    const colors = Filters?.color?.split("--");
    const suitableFor = Filters?.suitableFor?.split("--");
    console.log(Filters);

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
                // price: priceFIlter
                //     ? {
                //           gte: priceFIltersSpilted[0],
                //           lte: priceFIltersSpilted[1],
                //       }
                //     : undefined,
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

        return products;
    } catch (error) {
        console.log(error);
    }
};
