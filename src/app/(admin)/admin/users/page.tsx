import { TableUi } from "@/components/ui/MainTable";
import Heading from "@/components/ui/heading";
import DB from "@/lib/prismaDb";
import React from "react";
import { UserColumn, UsersColumns } from "./usersCoulmn";

const page = async () => {
    const users = await DB.user.findMany({
        include: {
            orders: true,
        },
    });

    const formmatedUsers: UserColumn[] = users.map((user) => {
        return {
            id: user.id,
            name: user.name as string,
            email: user.email,
            orders: user.orders.length,
        };
    });
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-b-stone-300">
                <Heading description="Show all Users" title="Users" />
            </div>
            <TableUi
                columns={UsersColumns}
                data={formmatedUsers}
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
