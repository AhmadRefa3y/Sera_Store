"use server";

import { ProductFormValues } from "@/app/(admin)/admin/products/[id]/ProductForm";
import DB from "@/lib/prismaDb";
import { revalidatePath } from "next/cache";

export const CreateProduct = async (data: ProductFormValues) => {
    try {
        const product = await DB.product.create({
            data: {
                name: data.name,
                price: data.price,
                categoryId: data.categoryId,
                colorId: data.colorId,
                sizeId: data.sizeId,
                isArchived: data.isArchived,
                isFeatured: data.isFeatured,
                images: {
                    create: data.images.map((image) => ({
                        url: image.url,
                    })),
                },
                SuitableFor: data.SuitableFor,
            },
        });
        revalidatePath("/", "layout");

        return {
            status: "ok",
            data: product,
        };
    } catch (error) {
        return {
            status: "error",
            error: error,
            message: "خطا في انشاء المنتج",
        };
    }
};

type UpdateProductFormValues = ProductFormValues & { id: string };
export const UpdateProduct = async (data: UpdateProductFormValues) => {
    try {
        await DB.product.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                price: data.price,
                categoryId: data.categoryId,
                colorId: data.colorId,
                sizeId: data.sizeId,
                isArchived: data.isArchived,
                isFeatured: data.isFeatured,
                images: {
                    deleteMany: {},
                },
                SuitableFor: data.SuitableFor,
            },
        });
        const product = await DB.product.update({
            where: {
                id: data.id,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...data.images.map(
                                (image: { url: string }) => image
                            ),
                        ],
                    },
                },
            },
        });
        revalidatePath("/", "layout");
        return {
            status: "ok",
            data: product,
        };
    } catch (error) {
        return {
            status: "error",
            error: error,
            message: "خطا في تعديل المنتج",
        };
    }
};
