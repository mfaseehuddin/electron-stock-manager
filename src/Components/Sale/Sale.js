import React from "react";
import { loadData, saveData } from "../DataManager/DataManager";

export default function Sale() {
    let data = loadData();
    let sale = {
        SaleID: "",
        ProductID: "",
        Sale_Quantity: 0,
        Sale_Price: 0,
        Sale_Unit_Price: 0,
        Sale_Profit: 0,
        newClient: false,
        clientID: "",
        clientName: "",
        contactName: "",
        contactNumber: "",
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
            document.getElementById("salePrice").value === "" ||
            document.getElementById("saleUnitPrice").value === "" ||
            document.getElementById("saleQuantity").value === "" ||
            document.getElementById("saleQuantity").value <= 0 ||
            document.getElementById("clientID").value === "" ||
            document.getElementById("clientName").value === "" ||
            document.getElementById("contactName").value === "" ||
            document.getElementById("contactNumber").value === ""
        ) {
            window.alert("Form Incomplete or Incorrect...");
        } else {
            sale.SaleID = crypto.randomUUID();
            if (document.getElementById("clientID").value === "New") {
                sale.clientID = crypto.randomUUID();
                sale.newClient = true;
            } else {
                sale.clientID = document.getElementById("clientID").value;
            }
            sale.Sale_Profit = Number(
                document.getElementById("saleBalance").value
            );
            sale.clientName = document.getElementById("clientName").value;
            sale.contactName = document.getElementById("contactName").value;
            sale.contactNumber = document.getElementById("contactNumber").value;
            console.log(JSON.stringify(sale, null, 2));
            if (sale.newClient) {
                data.clients.push({
                    ClientID: sale.ClientID,
                    Name: sale.clientName,
                    Contact_Name: sale.contactName,
                    Contact_Number: sale.contactNumber,
                });
            }

            if (
                sale.Sale_Quantity >
                data.stock.filter((item) => item.StockID === sale.ProductID)[0]
                    .Quantity
            ) {
                window.alert("Sale Quantity Exceeds Stock Quantity");
            } else {
                data.sales.push({
                    SaleID: sale.SaleID,
                    StockID: sale.ProductID,
                    ClientID: sale.clientID,
                    Date: new Date().toLocaleDateString(),
                    Quantity: sale.Sale_Quantity,
                    Sale_Price: sale.Sale_Price,
                    Sale_Balance: sale.Sale_Profit,
                });
                let indexStock = data.stock
                    .map((item) => item.StockID)
                    .indexOf(sale.ProductID);

                data.stock[indexStock].Quantity -= sale.Sale_Quantity;
                data.stock[indexStock].Stock_Value -=
                    sale.Sale_Quantity * data.stock[indexStock].Unit_Price;

                saveData(data);
                loadData();
                let inputs = document
                    .getElementById("saleForm")
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
            }
        }
    }

    return (
        <div>
            <form
                id="saleForm"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
                onChange={(e) => {
                    document.getElementById("saleUnitBalance").value =
                        sale.Sale_Unit_Price -
                        data.stock.filter(
                            (item) => item.StockID === sale.ProductID
                        )[0].Unit_Price;

                    document.getElementById("saleBalance").value =
                        sale.Sale_Quantity *
                        document.getElementById("saleUnitBalance").value;

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
                    <input disabled id="productID" />
                </label>
                <br />
                <label>
                    Product Name:
                    <select
                        id="productName"
                        onChange={(e) => {
                            sale.ProductID =
                                e.target.options[
                                    e.target.selectedIndex
                                ].dataset.value;
                            document.getElementById("productID").value =
                                sale.ProductID;
                        }}
                    >
                        {data.stock.map((item) => (
                            <option
                                key={item.StockID}
                                data-value={item.StockID}
                            >
                                {item.Name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Sale Quantity:
                    <input
                        id="saleQuantity"
                        onChange={(e) => {
                            document.getElementById("salePrice").value =
                                e.target.value *
                                document.getElementById("saleUnitPrice").value;
                            sale.Sale_Quantity = Number(e.target.value);
                        }}
                        type="number"
                    />
                </label>
                <br />
                <label>
                    Sale Price:
                    <input
                        id="salePrice"
                        onChange={(e) => {
                            document.getElementById("saleUnitPrice").value =
                                e.target.value /
                                document.getElementById("saleQuantity").value;
                            // sale.Sale_Price = e.target.value;
                            sale.Sale_Unit_Price = Number(
                                e.target.value /
                                    document.getElementById("saleQuantity")
                                        .value
                            );
                            sale.Sale_Price = Number(e.target.value);
                        }}
                        type="number"
                    />
                </label>
                <br />
                <label>
                    Sale Unit Price:
                    <input
                        id="saleUnitPrice"
                        onChange={(e) => {
                            document.getElementById("salePrice").value =
                                e.target.value *
                                document.getElementById("saleQuantity").value;
                            sale.Sale_Unit_Price = Number(e.target.value);
                        }}
                        type="number"
                    />
                </label>
                <br />
                <label>
                    Sale Balance:
                    <input disabled id="saleBalance" />
                </label>
                <br />
                <label>
                    Sale Unit Balance:
                    <input disabled id="saleUnitBalance" />
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
