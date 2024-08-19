"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Category,
    Color,
    Image,
    Product,
    Size,
    SuitableFor,
} from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ImageUpload";
import AlertModal from "@/components/Modals/AlertModal";
import { CreateProduct, UpdateProduct } from "@/actions/products";
import Heading from "@/components/ui/heading";

interface ProductFormProps {
    initialData:
        | (Product & {
              images: Image[];
          })
        | null;
    categories: Category[];
    sizes: Size[];
    colors: Color[];
}

const SuitableForDD = Object.keys(SuitableFor) as unknown as readonly [
    SuitableFor,
    ...SuitableFor[]
];

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    SuitableFor: z.enum(SuitableForDD),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});
export type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    sizes,
    colors,
}) => {
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Product" : "add Product";
    const description = initialData
        ? "edit product details"
        : "add new product";
    const toastMessage = initialData
        ? "product updated successfully"
        : "product created successfully";
    const action = initialData ? "save changes" : "create";
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
                  price: parseFloat(String(initialData?.price)),
              }
            : {
                  name: "",
                  images: [],
                  price: 0,
                  categoryId: "",
                  colorId: "",
                  sizeId: "",
                  SuitableFor: "all",
                  isArchived: false,
                  isFeatured: false,
              },
    });

    /// Add Or Update Prodcut
    const OnSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await UpdateProduct({ ...data, id: initialData.id });
                router.push(`/admin/products`);
            } else {
                await CreateProduct(data);
                router.push(`/admin/products`);
            }
            toast.success(toastMessage);
            router.refresh();
        } catch (error: any) {
            toast.error("error occured");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);

            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Prodcut Has Been Deleted Sucessfully");
        } catch (error) {
            toast.error(
                "Make sure you removed all categroies using this Prodcut"
            );
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isopen={open}
                loading={loading}
                onClose={() => setOpen(false)}
                OnConfirm={onDelete}
            />
            <div className="flex items-center justify-between my-5 ">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(OnSubmit)}
                    className="space-y-8 w-full flex gap-3 "
                >
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem className="min-w-[350px] flex items-center flex-col">
                                <FormLabel className="text-lg mx-auto text-center w-full py-2">
                                    product images
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map(
                                            (image) => image.url
                                        )}
                                        disabled={loading}
                                        onChange={(url) =>
                                            field.onChange([
                                                ...field.value,
                                                { url },
                                            ])
                                        }
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter(
                                                    (current) =>
                                                        current.url !== url
                                                ),
                                            ])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="md:grid md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>product name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product name"
                                            {...field}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product name"
                                            {...field}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="SuitableFor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>for</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="capitalize">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="choose type"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(SuitableFor).map(
                                                (type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full ">
                                            {categories.map((Category) => (
                                                <SelectItem
                                                    key={Category.id}
                                                    value={Category.id}
                                                >
                                                    {Category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>size</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Size"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizes.map((size) => (
                                                <SelectItem
                                                    key={size.id}
                                                    value={size.id}
                                                >
                                                    {size.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>color</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Color"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors.map((Color) => (
                                                <SelectItem
                                                    key={Color.id}
                                                    value={Color.id}
                                                >
                                                    <div className="flex items-center">
                                                        <div
                                                            className="h-6 w-6 rounded-full border"
                                                            style={{
                                                                backgroundColor:
                                                                    Color.value,
                                                            }}
                                                        />
                                                        <span className="ml-2">
                                                            {Color.name}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 gap-2 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>active</FormLabel>
                                        <FormDescription>
                                            this product will be featured in the
                                            home page{" "}
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 gap-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>archived</FormLabel>
                                        <FormDescription>
                                            this product will be archived
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={loading}
                            type="submit"
                            className="col-span-2 capitalize ml-auto"
                        >
                            {action}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
export default ProductForm;
