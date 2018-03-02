'use strict'
let api = "http://localhost:8080";
let themeUrl = (url) => api + url;
let fuelType;

let fuels = {
    ALL: -1,
    ELECTRICITY: 1,
    GAS: 2,
    WATER: 3,
    ELECGAS: 4
};

let fuelsNames = ["electricity", "gas", "water", "elecgas"];

let getFuelByName = (name) => {
    switch (name.toLowerCase()) {
        case "electricity":
            return fuels.ELECTRICITY;
        case "gas":
            return fuels.GAS;
        case "water":
            return fuels.WATER;
        case "elecgas":
            return fuels.ELECGAS;
        default:
            return fuels.ALL;
    }
};

let setCurrentFuelType = () => {
    let fuelName;

    do {
        fuelName = fuelsNames[Math.random() * 10];
    } while (fuelName);

    return getFuelByName(fuelName);
};

const FUEL_TYPE = setCurrentFuelType();
