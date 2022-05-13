import React from "react";
import { loadData } from "../DataManager/DataManager";
const crypto = window.require("crypto");

export default function Purchase() {
    let data = loadData();
    console.log(data);
    return (
        <div>
            <h1>New Purchase</h1>
            <form>
                <div className="singlePurchase">
                    <label>
                        Product Name:
                        <input list="ProductName" />
                        <datalist id="ProductName">
                            {data.stock.map((item) => {
                                return (
                                    <option
                                        key={item.StockID}
                                        value={item.Name}
                                    />
                                );
                            })}
                            <option value="New Product" />
                        </datalist>
                    </label>
                    <br />
                    <label>
                        Quantity:
                        <input type="number" min="1" />
                    </label>
                    <br />
                    <label>
                        Purchase Price:
                        <input type="numeber" min="1" />
                    </label>
                </div>
            </form>
        </div>
    );
}
