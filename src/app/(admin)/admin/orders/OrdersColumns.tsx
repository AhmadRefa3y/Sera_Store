"use client";

import SortableHeader from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type OrderColumn = {
    id: string;
    date: Date;
    customerName: string;
    products: string;
    phone: string;
    address: string;
    totalAmount: number;
    isPaid: boolean;
};
export const OrdersColumns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "customerName",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="customer Name" />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="date" />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div>{format(row.original.date, "dd/MM/yyyy")}</div>;
        },
    },

    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="phone" />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="address" />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="total Amount" />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "isPaid",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="Paid" />
                    </div>
                </div>
            );
        },
        size: 100,
    },
    {
        accessorKey: "isDelivered",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="Delivered" />
                    </div>
                </div>
            );
        },
        size: 100,
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
