"use client";

import SortableHeader from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";

export type UserColumn = {
    id: string;
    name: string;
    email: string;
    orders: number;
};
export const UsersColumns: ColumnDef<UserColumn>[] = [
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
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="Email" />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return row.original.email;
        },
    },
    {
        accessorKey: "orders",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="Orders" />
                    </div>
                </div>
            );
        },
        cell: ({ row }) => {
            return row.original.orders;
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
