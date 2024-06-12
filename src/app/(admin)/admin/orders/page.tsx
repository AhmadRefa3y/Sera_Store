import { TableUi } from "@/components/ui/MainTable";
import Heading from "@/components/ui/heading";
import DB from "@/lib/prismaDb";
import React from "react";
import { OrderColumn, OrdersColumns } from "./OrdersColumns";

const page = async () => {
    const orders = await DB.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const formattedOrders: OrderColumn[] = orders.map((order) => {
        return {
            id: order.id,
            date: order.createdAt,
            customerName: order.customerName as string,
            products: order.orderItems
                .map((item) => item.product.name)
                .join(", "),
            phone: order.phone,
            address: order.address,
            totalAmount: order.totalAmount,
            isPaid: order.isPaid,
        };
    });
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-b-stone-300">
                <Heading description="Show all Users" title="Users" />
            </div>
            <TableUi
                columns={OrdersColumns}
                data={formattedOrders}
                notfound="No Uers found"
                filterAccessorKey="name"
                filterEnabled={true}
                filterlabel="search by name"
                filterplaceholder="Name"
                visabilty={true}
            />
        </div>
    );
};

export default page;
