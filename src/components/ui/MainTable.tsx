"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    ColumnResizeDirection,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterEnabled?: boolean;
    filterlabel?: string;
    filterAccessorKey?: string;
    filterplaceholder?: string;
    notfound: string;
    visabilty?: boolean;
    reversedNavButton?: boolean;
}

export function TableUi<TData, TValue>({
    columns,
    data,
    filterAccessorKey,
    filterplaceholder,
    filterEnabled = true,
    notfound,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [sorting, setSorting] = useState<SortingState>([]);

    const [columnResizeDirection, setColumnResizeDirection] =
        useState<ColumnResizeDirection>("ltr");

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            columnVisibility,
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 14,
            },
        },
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: "onChange",
        columnResizeDirection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="  mx-auto w-full flex-1 flex flex-col">
            <div className="flex gap-2 items-center justify-normal  mt-1 ">
                {filterEnabled && (
                    <div className="flex items-center w-full sm:w-[250px]  relative">
                        <Input
                            className="flex-1 bg-[#fafafa]  text-black
                            duration-300   placeholder:text-black/70"
                            placeholder={filterplaceholder}
                            value={
                                (table
                                    .getColumn(filterAccessorKey!)
                                    ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn(filterAccessorKey!)
                                    ?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                )}
            </div>
            <div
                className={`max-w-full relative  p-2 sm:px-0 h-full flex flex-col flex-1`}
            >
                <div className="overflow-x-auto   border border-stone-200 rounded-md">
                    <Table className={`bg-[#fafafa]  overflow-hidden   `}>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={` p-0 hover:bg-slate-400  group  border-l first:border-l-0  text-muted-foreground  relative   text-center mx-auto  h-fit `}
                                                colSpan={header.colSpan}
                                                style={{
                                                    width: `${header.getSize()}px`,
                                                }}
                                            >
                                                <span
                                                    className={`absolute top-0 right-0 w-[5px] z-50  h-full bg-sky-500 group-hover:opacity-100 cursor-col-resize select-none touch-none opacity-0 hover:opacity-100  ${
                                                        header.column.getIsResizing()
                                                            ? "opacity-100"
                                                            : null
                                                    }`}
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    onDoubleClick={() =>
                                                        header.column.resetSize()
                                                    }
                                                />
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="bg-white">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        className=" p-0  hover:bg-sky-400  "
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="p-0 py-2 font-medium text-center border-l first:border-l-0 w-fit"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className={`sm:h-24 text-center w-full font-bold text-xl `}
                                    >
                                        {notfound}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex gap-2 mt-auto py-2 justify-end">
                    <Button
                        variant={"ghost"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 mt-0 border border-stone-300 font-light"
                    >
                        Pervious
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 mt-0 border border-stone-300 font-light"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
