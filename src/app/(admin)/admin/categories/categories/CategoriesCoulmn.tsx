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

export type categoryColumn = {
    id: string;
    name: string;
};
export const categoriesColumns: ColumnDef<categoryColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="Name" />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "for",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="for" />
                    </div>
                </div>
            );
        },
    },

    // {
    //     accessorKey: "actions",
    //     header: ({ column }) => {
    //         return (
    //             <div>
    //                 <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
    //                     <MoreHorizontal />
    //                 </div>
    //             </div>
    //         );
    //     },
    //     minSize: 150,
    //     cell: ({ row }) => {
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger>
    //                     <MoreHorizontal />
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent>
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>
    //                         <Link href={`/admin/products/${row.original.id}`}>
    //                             edit
    //                         </Link>
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];
