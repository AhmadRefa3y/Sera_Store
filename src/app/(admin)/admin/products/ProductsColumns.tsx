"use client";

import SortableHeader from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck, BadgeX, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import Image from "next/image";

export type ProductsColumn = {
    id: string;
    name: string;
    price: number;
    category: string;
    size: string;
    color: string;
    type: string;
    images: string[];
    isFeatured: boolean;
    isArchived: boolean;
};
export const ProductsColumns: ColumnDef<ProductsColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="اسم الصنف" />
                    </div>
                </div>
            );
        },
        minSize: 600,
        cell: ({ row }) => {
            return (
                <div>
                    <div className="flex gap-1 items-center justify-between px-2">
                        <div>{row.original.name}</div>
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="w-[50px] h-[50px] overflow-hidden">
                                        <Image
                                            src={row.original.images[0]}
                                            alt={""}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="h-[400px] w-[400px] rounded-lg overflow-hidden p-0">
                                    <Image
                                        src={row.original.images[0]}
                                        alt={""}
                                        width={400}
                                        height={400}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="السعر" />
                    </div>
                </div>
            );
        },
        size: 100,
        cell: ({ row }) => {
            return row.original.price;
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="الفئة" />
                    </div>
                </div>
            );
        },

        cell: ({ row }) => {
            return row.original.type;
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="النوع" />
                    </div>
                </div>
            );
        },

        cell: ({ row }) => {
            return row.original.category;
        },
    },
    {
        accessorKey: "color",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="اللون" />
                    </div>
                </div>
            );
        },

        cell: ({ row }) => {
            return row.original.color;
        },
    },
    {
        accessorKey: "size",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="الحجم" />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return row.original.size;
        },
    },
    {
        accessorKey: "isArchived",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="مخفي" />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return row.original.isArchived ? (
                <span className="w-full h-full flex items-center justify-center text-green-500">
                    <BadgeCheck size={24} />
                </span>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-red-500">
                    <BadgeX size={24} />
                </div>
            );
        },
    },
    {
        accessorKey: "isFeatured",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="مميز" />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return row.original.isFeatured ? (
                <span className="w-full h-full flex items-center justify-center text-green-500">
                    <BadgeCheck size={24} />
                </span>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-red-500">
                    <BadgeX size={24} />
                </div>
            );
        },
    },
    // {
    //     accessorKey: "images",
    //     header: ({ column }) => {
    //         return (
    //             <div>
    //                 <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
    //                     <SortableHeader column={column} label="مميز" />
    //                 </div>
    //             </div>
    //         );
    //     },
    //     cell: ({ row }) => {
    //         return (
    //             <div>
    //                 <Image
    //                     src={row.original.images[0]}
    //                     width={100}
    //                     height={100}
    //                     alt=""
    //                 />
    //             </div>
    //         );
    //     },
    // },
    {
        accessorKey: "actions",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <MoreHorizontal />
                    </div>
                </div>
            );
        },
        minSize: 150,
        cell: ({ row }) => {
            return (
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger>
                        <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>تعديل</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/admin/products/${row.original.id}`}>
                                تعديل
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
