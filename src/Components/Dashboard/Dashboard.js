import React from "react";
import { loadData } from "../DataManager/DataManager";

export default function Dashboard() {
    let data = loadData();
    let initialValue = 0;
    let totalProfit = data.sales.reduce(
        (acc, sale) => acc + sale.Sale_Balance,
        initialValue
    );

    return (
        <div>
            <div>
                <h3>Total Profit: Rs{Math.round(totalProfit)}</h3>
            </div>
        </div>
    );
}
