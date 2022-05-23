import React from "react";
// import { Formik, Form, Field } from "formik";
import { loadData, saveData } from "../DataManager/DataManager";
const crypto = window.require("crypto");

export default function PurchaseNew() {
    let data = loadData();
    let purchase = {
        StockID: "",
        Name: "",
        Type: "",
        Quantity: "",
        PurchasePrice: "",
        ClientID: "",
        ClientName: "",
        ContactName: "",
        ContactNumber: "",
        newProduct: false,
        newClient: false,
    };
    function getDatalistID(txt_input, data_list_options) {
        var shownVal = document.getElementById(txt_input).value;
        try {
            var value2send = document.querySelector(
                "#" + data_list_options + " option[value='" + shownVal + "']"
            ).dataset.value;
            return value2send;
        } catch (error) {
            return "New";
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            document.getElementById("productName").value === "" ||
            document.getElementById("productType").value === "" ||
            document.getElementById("quantity").value === "" ||
            Number(document.getElementById("quantity").value) <= 0 ||
            document.getElementById("purchasePrice").value === "" ||
            Number(document.getElementById("purchasePrice").value) <= 0 ||
            document.getElementById("clientName").value === "" ||
            document.getElementById("contactName").value === "" ||
            document.getElementById("contactNumber").value === ""
        ) {
            alert("Form Input Incomplete or Incorrect...");
        } else {
            purchase.Name = document.getElementById("productName").value;
            purchase.Type = document.getElementById("productType").value;
            purchase.Quantity = Number(
                document.getElementById("quantity").value
            );
            purchase.PurchasePrice = Number(
                document.getElementById("purchasePrice").value
            );
            purchase.ClientName = document.getElementById("clientName").value;
            purchase.ContactName = document.getElementById("contactName").value;
            purchase.ContactNumber =
                document.getElementById("contactNumber").value;
            if (document.getElementById("productID").value === "New") {
                purchase.newProduct = true;
                purchase.StockID = crypto.randomUUID();
                data.stock.push({
                    StockID: purchase.StockID,
                    Name: purchase.Name,
                    Type: purchase.Type,
                    Quantity: Number(purchase.Quantity),
                    Stock_Value: Number(purchase.PurchasePrice),
                    Unit_Price: purchase.PurchasePrice / purchase.Quantity,
                });
            } else {
                purchase.newProduct = false;
                purchase.StockID = document.getElementById("productID").value;
                let indexStock = data.stock
                    .map((item) => item.StockID)
                    .indexOf(purchase.StockID);
                data.stock[indexStock].Quantity += Number(purchase.Quantity);
                data.stock[indexStock].Stock_Value += Number(
                    purchase.PurchasePrice
                );
                data.stock[indexStock].Unit_Price =
                    data.stock[indexStock].Stock_Value /
                    data.stock[indexStock].Quantity;
            }
            if (document.getElementById("clientID").value === "New") {
                purchase.newClient = true;
                purchase.ClientID = crypto.randomUUID();
                data.clients.push({
                    ClientID: purchase.ClientID,
                    Name: purchase.ClientName,
                    Contact_Name: purchase.ContactName,
                    Contact_Number: purchase.ContactNumber,
                });
            } else {
                purchase.newClient = false;
                purchase.ClientID = document.getElementById("clientID").value;
            }

            data.purchase.push({
                PurchaseID: crypto.randomUUID(),
                StockID: purchase.StockID,
                ClientID: purchase.ClientID,
                Date: new Date().toLocaleDateString(),
                Quantity: Number(purchase.Quantity),
                PurchasePrice: Number(purchase.PurchasePrice),
            });

            saveData(data);
            loadData();
            let inputs = document
                .getElementById("purchaseForm")
                .getElementsByTagName("input");
            for (var i = 0; i < inputs.length; i++) {
                switch (inputs[i].type) {
                    // case 'hidden':
                    case "text":
                        inputs[i].value = "";
                        break;
                    default:
                        break;
                }
            }
            console.log(JSON.stringify(purchase, null, 2));
        }
    }

    return (
        <div>
            <form
                id="purchaseForm"
                onSubmit={(e) => handleSubmit(e)}
                onChange={(e) => {
                    let StockID = getDatalistID(
                        "productName",
                        "existingProducts"
                    );
                    document.getElementById("productID").value = StockID;
                    try {
                        document.getElementById("productType").value =
                            data.stock.filter(
                                (item) => item.StockID === StockID
                            )[0].Type;
                        document.getElementById("productType").disabled = true;
                    } catch (error) {
                        document.getElementById("productType").disabled = false;
                    }

                    let ClientID = getDatalistID(
                        "clientName",
                        "existingClients"
                    );
                    document.getElementById("clientID").value = ClientID;
                    try {
                        let Client = data.clients.filter(
                            (item) => item.ClientID === ClientID
                        )[0];
                        document.getElementById("contactName").value =
                            Client.Contact_Name;
                        document.getElementById("contactName").disabled = true;
                        document.getElementById("contactNumber").value =
                            Client.Contact_Number;
                        document.getElementById("contactName").disabled = true;
                        document.getElementById(
                            "contactNumber"
                        ).disabled = true;
                    } catch (error) {
                        document.getElementById("contactName").disabled = false;
                        document.getElementById(
                            "contactNumber"
                        ).disabled = false;
                    }
                }}
            >
                <label>
                    Product ID:
                    <input id="productID" disabled />
                </label>
                <br />
                <label>
                    Product Name:
                    <input id="productName" list="existingProducts" />
                    <datalist id="existingProducts">
                        {data.stock.map((item) => (
                            <option
                                key={item.StockID}
                                data-value={item.StockID}
                                value={item.Name}
                            >
                                {item.StockID}
                            </option>
                        ))}
                    </datalist>
                </label>
                <br />
                <label>
                    Type:
                    <input id="productType" list="existingTypes" />
                    <datalist id="existingTypes">
                        {[...new Set(data.stock.map((item) => item.Type))].map(
                            (item) => (
                                <option key={item} value={item} />
                            )
                        )}
                    </datalist>
                </label>
                <br />
                <label>
                    Quantity:
                    <input id="quantity" type="number" />
                </label>
                <br />
                <label>
                    Purchase Price:
                    <input id="purchasePrice" type="number" />
                </label>
                <br />
                <label>
                    Client ID:
                    <input id="clientID" disabled />
                </label>
                <br />
                <label>
                    Client Name:
                    <input id="clientName" list="existingClients" />
                    <datalist id="existingClients">
                        {data.clients.map((item) => (
                            <option
                                key={item.ClientID}
                                data-value={item.ClientID}
                                value={item.Name}
                            >
                                {item.ClientID}
                            </option>
                        ))}
                    </datalist>
                </label>
                <br />
                <label>
                    Contact Name:
                    <input id="contactName" />
                </label>
                <br />
                <label>
                    Contact Number:
                    <input id="contactNumber" />
                </label>
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}
