const fs = window.require("fs");
const path = window.require("path");
const { app } = window.require("@electron/remote");

let data = {
    data: null,
};

export default function DataManager() {
    console.log("data manager initialisation");

    let directoryPath = path.join(app.getPath("documents"), "stock-manager");
    if (!fs.existsSync(directoryPath)) {
        console.log("creating directory");
        fs.mkdirSync(directoryPath);
    }

    let dataPath = path.join(directoryPath, "data.json");
    data = {
        dashboard: {},
        stock: [],
        purchase: [],
        sales: [],
        clients: [],
    };
    if (!fs.existsSync(dataPath)) {
        console.log("creating file");
        fs.writeFileSync(dataPath, JSON.stringify(data));
    } else {
        data = JSON.parse(fs.readFileSync(dataPath));
    }
}

export function loadData() {
    let dataPath = path.join(
        app.getPath("documents"),
        "stock-manager/data.json"
    );
    return JSON.parse(fs.readFileSync(dataPath));
}

export function saveData(JSONData) {
    let dataPath = path.join(
        app.getPath("documents"),
        "stock-manager/data.json"
    );

    fs.writeFileSync(dataPath, JSON.stringify(JSONData, null, 2));
}
