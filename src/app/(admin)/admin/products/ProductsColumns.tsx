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
    For: string;
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
                        <SortableHeader column={column} label="Product Name" />
                    </div>
                </div>
            );
        },
        minSize: 600,
        cell: ({ row }) => {
            return (
                <div>
                    <div className="flex gap-1 items-center justify-between px-2">
                        <div className="text-left">{row.original.name}</div>
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="w-[50px] h-[50px] overflow-hidden rounded-sm">
                                        <Image
                                            src={row.original.images[0]}
                                            alt={""}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="h-[400px] w-[400px] rounded-md overflow-hidden p-0 border-none">
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
                        <SortableHeader column={column} label="Price" />
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
        accessorKey: "For",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="for" />
                    </div>
                </div>
            );
        },

        cell: ({ row }) => {
            return row.original.For;
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="category" />
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
                        <SortableHeader column={column} label="color" />
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
                        <SortableHeader column={column} label="size" />
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
                        <SortableHeader column={column} label="Archived" />
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
                        <SortableHeader column={column} label="Featured" />
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
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="text-lg font-bold">
                            <Link
                                href={`/admin/products/${row.original.id}`}
                                className="w-full"
                            >
                                edit
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
