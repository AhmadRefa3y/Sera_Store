"use client";

import SortableHeader from "@/components/SortColumn";
import { ColumnDef } from "@tanstack/react-table";

export type colorColumn = {
    id: string;
    name: string;
    value: string;
};
export const colorsColumns: ColumnDef<colorColumn>[] = [
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
        accessorKey: "value",
        header: ({ column }) => {
            return (
                <div>
                    <div className="flex px-2 items-center justify-center gap-1 select-none cursor-pointer  w-full">
                        <SortableHeader column={column} label="value" />
                    </div>
                </div>
            );
        },

        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    <div
                        style={{
                            backgroundColor: row.original.value,
                        }}
                        className="w-5 h-5 rounded-full"
                    />
                    <div className="ml-2 min-w-20">{row.original.value}</div>
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
