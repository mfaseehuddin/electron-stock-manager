import "./App.sass";
import Menubar from "./Components/Menubar/Menubar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Stock from "./Components/Stock/Stock";
import Purchase from "./Components/Purchase/Purchase";
import Sale from "./Components/Sale/Sale";
import DataManager from "./Components/DataManager/DataManager";
import Clients from "./Components/Clients/Clients";
import PurchaseNew from "./Components/Purchase/PurchaseNew";

function App() {
    console.log("App Started");
    DataManager();

    return (
        <div className="App">
            <Menubar>
                <Dashboard className="Dashboard" />
                <Stock className="Stock" />
                <PurchaseNew className="Puchase" />
                <Sale className="Sale" />
                <Clients className="Clients" />
            </Menubar>
        </div>
    );
}

export default App;
