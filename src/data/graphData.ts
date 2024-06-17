interface GraphData {
    name: string;
    total: number;
}
const getGraphData = (PaidOrders: any[]) => {
    const MonthlyRevenue: { [key: number]: number } = {};

    PaidOrders.forEach((order) => {
        const month = order.createdAt.getMonth();
        if (MonthlyRevenue[month]) {
            MonthlyRevenue[month] += order.totalAmount;
        } else {
            MonthlyRevenue[month] = order.totalAmount;
        }
    });
    const graphData: GraphData[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ];

    for (const month in MonthlyRevenue) {
        graphData[parseInt(month)].total = MonthlyRevenue[parseInt(month)];
    }

    return graphData;
};

export default getGraphData;
