import React, { useState } from "react";
import { loadData, saveData } from "../DataManager/DataManager";
const crypto = window.require("crypto");

export default function Purchase() {
    let data = loadData();
    const [purchase, setPurchase] = useState({
        stock: {
            StockID: "",
            Name: "",
            Type: "",
            Quantity: 0,
            Unit_Price: 0,
            newProduct: false,
        },
        client: {
            ClientID: "",
            Name: "",
            Contact_Name: "",
            Contact_Number: "",
            newClient: false,
        },
        Purchase_Quantity: 0,
        Purchase_Price: 0,
    });
    const [newProduct, setNewProduct] = useState(false);
    const [newClient, setNewClient] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (purchase.stock.newProduct) {
            const tempPurchase = purchase;
            tempPurchase.stock.StockID = crypto.randomUUID();
            tempPurchase.stock.Quantity = tempPurchase.Purchase_Quantity;
            tempPurchase.stock.Unit_Price =
                tempPurchase.Purchase_Price / tempPurchase.Purchase_Quantity;
            setPurchase(tempPurchase);
            data.stock.push({
                StockID: purchase.stock.StockID,
                Name: purchase.stock.Name,
                Type: purchase.stock.Type,
                Quantity: purchase.stock.Quantity,
                Unit_Price: purchase.stock.Unit_Price,
            });
        } else {
            let indexStock = data.stock
                .map((item) => item.StockID)
                .indexOf(purchase.stock.StockID);
            let prevQuantity = data.stock[indexStock].Quantity;
            let prevUnitPrice = data.stock[indexStock].Unit_Price;
            data.stock[indexStock].Quantity += purchase.stock.Quantity;
            data.stock[indexStock].Unit_Price =
                (prevQuantity / data.stock[indexStock].Quantity) *
                    prevUnitPrice +
                (purchase.stock.Quantity / data.stock[indexStock].Quantity) *
                    purchase.stock.Unit_Price;
        }
        if (purchase.client.newClient) {
            const tempPurchase = purchase;
            tempPurchase.client.ClientID = crypto.randomUUID();
            setPurchase(tempPurchase);
            data.clients.push({
                ClientID: purchase.client.ClientID,
                Name: purchase.client.Name,
                Contact_Name: purchase.client.Contact_Name,
                Contact_Number: purchase.client.Contact_Number,
            });
        }
        data.purchase.push({
            PurchaseID: crypto.randomUUID(),
            StockID: purchase.stock.StockID,
            ClientID: purchase.client.ClientID,
            Date: Date.now(),
            Quantity: purchase.Purchase_Quantity,
            Purchase_Price: purchase.Purchase_Price,
        });
        saveData(data);
        loadData();
        // console.log(purchase);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="singlePurchase">
                <div className="productDetials">
                    {!newProduct && (
                        <div className="stockProduct">
                            <label>
                                Product:
                                <select
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        //setting stockID
                                        tempPurchase.stock.StockID =
                                            e.target[
                                                e.target.selectedIndex
                                            ].getAttribute("data-value");
                                        //setting stock name
                                        tempPurchase.stock.Name =
                                            data.stock.filter((item) => {
                                                return (
                                                    item.StockID ===
                                                    tempPurchase.stock.StockID
                                                );
                                            })[0].Name;
                                        //setting stock type
                                        tempPurchase.stock.Type =
                                            data.stock.filter((item) => {
                                                return (
                                                    item.StockID ===
                                                    tempPurchase.stock.StockID
                                                );
                                            })[0].Type;
                                        tempPurchase.stock.newProduct = false;
                                        setPurchase(tempPurchase);
                                        // console.log(purchase);
                                    }}
                                >
                                    <option>select product</option>
                                    {data.stock.map((item) => (
                                        <option
                                            key={item.StockID}
                                            data-value={item.StockID}
                                        >
                                            {item.Name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => {
                                        setNewProduct(!newProduct);
                                    }}
                                >
                                    New Product
                                </button>
                            </label>
                        </div>
                    )}
                    {newProduct && (
                        <div className="newProduct">
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        tempPurchase.stock.Name =
                                            e.target.value;
                                        tempPurchase.stock.newProduct = true;
                                        setPurchase(tempPurchase);
                                    }}
                                />
                            </label>
                            <button
                                onClick={() => {
                                    setNewProduct(!newProduct);
                                }}
                            >
                                Existing Product
                            </button>
                            <br />
                            <label>
                                Type:
                                <input
                                    type="text"
                                    list="types"
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        tempPurchase.stock.Type =
                                            e.target.value;
                                        setPurchase(tempPurchase);
                                    }}
                                />
                                <datalist id="types">
                                    {[
                                        ...new Set(
                                            data.stock.map((item) => item.Type)
                                        ),
                                    ].map((item) => (
                                        <option key={item} value={item} />
                                    ))}
                                </datalist>
                            </label>
                            <br />
                        </div>
                    )}
                </div>
                <br />
                <div className="purchaseDetials">
                    <label>
                        Quantity:
                        <input
                            type="number"
                            min="1"
                            onChange={(e) => {
                                const tempPurchase = purchase;
                                tempPurchase.Purchase_Quantity = e.target.value;
                                setPurchase(tempPurchase);
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        Purchase Price:
                        <input
                            type="number"
                            min="1"
                            onChange={(e) => {
                                const tempPurchase = purchase;
                                tempPurchase.Purchase_Price = e.target.value;
                                setPurchase(tempPurchase);
                            }}
                        />
                    </label>
                </div>
                <br />
                <div className="clientDetials">
                    {!newClient && (
                        <div className="existingClient">
                            <label>
                                Client:
                                <select
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        //setting clientID
                                        tempPurchase.client.ClientID =
                                            e.target[
                                                e.target.selectedIndex
                                            ].getAttribute("data-value");
                                        //setting client name
                                        tempPurchase.client.Name =
                                            data.clients.filter((item) => {
                                                return (
                                                    item.ClientID ===
                                                    tempPurchase.client.ClientID
                                                );
                                            })[0].Name;
                                        tempPurchase.client.Contact_Name =
                                            data.clients.filter((item) => {
                                                return (
                                                    item.ClientID ===
                                                    tempPurchase.client.ClientID
                                                );
                                            })[0].Contact_Name;
                                        tempPurchase.client.Contact_Number =
                                            data.clients.filter((item) => {
                                                return (
                                                    item.ClientID ===
                                                    tempPurchase.client.ClientID
                                                );
                                            })[0].Contact_Number;
                                        tempPurchase.client.newClient = false;
                                        setPurchase(tempPurchase);
                                    }}
                                >
                                    <option>select client</option>
                                    {data.clients.map((item) => (
                                        <option
                                            key={item.ClientID}
                                            data-value={item.ClientID}
                                        >
                                            {item.Name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button
                                onClick={() => {
                                    setNewClient(!newClient);
                                }}
                            >
                                New Client
                            </button>
                        </div>
                    )}
                    {newClient && (
                        <div className="newClient">
                            <label>
                                Client Name:
                                <input
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        //setting clientID
                                        tempPurchase.client.Name =
                                            e.target.value;
                                        tempPurchase.client.newClient = true;
                                        setPurchase(tempPurchase);
                                    }}
                                />
                            </label>
                            <button
                                onClick={() => {
                                    setNewClient(!newClient);
                                }}
                            >
                                Existing Client
                            </button>
                            <br />
                            <label>
                                Contact Name:
                                <input
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        //setting clientID
                                        tempPurchase.client.Contact_Name =
                                            e.target.value;

                                        setPurchase(tempPurchase);
                                    }}
                                />
                            </label>
                            <br />
                            <label>
                                Contact Number:
                                <input
                                    onChange={(e) => {
                                        const tempPurchase = purchase;
                                        //setting clientID
                                        tempPurchase.client.Contact_Number =
                                            e.target.value;

                                        setPurchase(tempPurchase);
                                    }}
                                />
                            </label>
                        </div>
                    )}
                </div>
                <input type="submit" value="Purchase" />
            </div>
        </form>
    );
}
