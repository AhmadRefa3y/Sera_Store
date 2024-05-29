import {
    AreaChart,
    BadgeDollarSign,
    FileUp,
    ShoppingBag,
    TrendingUp,
} from "lucide-react";
import React from "react";
import AddTypeDialog from "./add/AddTypeDialog";

const AdminHomePage = () => {
    return (
        <div className="flex gap-2 bg-blue-400 h-full p-2">
            <div className="basis-[60%] bg-green-600 w-full h-full grow flex">
                <div className="h-[140px] w-full flex gap-1 bg-red-500 p-2">
                    <div className="flex flex-col gap-4 grow font-bold bg-[#151616] text-muted px-3 text-lg  justify-center rounded-lg">
                        <div className="flex gap-2">
                            <AreaChart />
                            <span className="text-muted font-light">
                                Total Sales
                            </span>{" "}
                        </div>
                        <div className="flex gap-2 justify-between ">
                            <div>5646864.19 $</div>
                            <div>
                                <TrendingUp className="rotate-[270]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 grow font-bold bg-[#151616] text-muted px-3 text-lg  justify-center rounded-lg">
                        <div className="flex gap-2">
                            <BadgeDollarSign />
                            <span className="text-muted font-light">
                                {" "}
                                Total Revenue{" "}
                            </span>{" "}
                        </div>
                        <div className="flex gap-2 justify-between ">
                            <div>15732.19 $</div>

                            <div>
                                <TrendingUp className="rotate-[270]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 grow font-bold bg-[#151616] text-muted px-3 text-lg  justify-center rounded-lg">
                        <div className="flex gap-2">
                            <ShoppingBag />
                            <span className="text-muted font-light">
                                Total Orders
                            </span>{" "}
                        </div>
                        <div className="flex gap-2 justify-between ">
                            <div>150 K</div>
                            <div>
                                <TrendingUp className="rotate-[270]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-[40%] bg-yellow-300  w-full h-full grow"></div>
        </div>
    );
};

export default AdminHomePage;
