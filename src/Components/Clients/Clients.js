import React from "react";
import { loadData } from "../DataManager/DataManager";

export default function Clients() {
    let data = loadData();
    return (
        <div>
            <div className="stockItems">
                {data.clients.map((item) => {
                    return (
                        <div key={item.ClientID} className="item">
                            <div>
                                <strong>{item.Name} </strong>
                                <br />
                                <small style={{ fontSize: "8px" }}>
                                    {item.ClientID}
                                </small>
                            </div>
                            <div className="leftItem">
                                <strong>{item.Contact_Name}</strong>
                                <br />
                                <small>{item.Contact_Number}</small>
                                <br />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
