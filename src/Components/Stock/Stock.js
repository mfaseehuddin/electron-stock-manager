import React from "react";
import DataManager, { loadData } from "../DataManager/DataManager";
import "./Stock.css";

export default function Stock() {
    DataManager();
    let data = loadData();
    return (
        <div>
            <div className="stockItems">
                {data.stock.map((item) => {
                    return (
                        <div key={item.StockID} className="item">
                            <div>
                                <strong>{item.Name} </strong>
                                <br />
                                <small>{item.Type}</small>
                                <br />
                                <small style={{ fontSize: "8px" }}>
                                    {item.StockID}
                                </small>
                            </div>
                            <div className="leftItem">
                                <strong>Qty: {item.Quantity}</strong>
                                <br />
                                <small>
                                    Stock Value: {Math.round(item.Stock_Value)}
                                </small>
                                <br />
                                <small>
                                    Unit Price: {Math.round(item.Unit_Price)}
                                </small>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
