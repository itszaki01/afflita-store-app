"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSheetsPost = void 0;
const axios_1 = __importDefault(require("axios"));
const apiError_1 = require("./apiError");
const form_data_1 = __importDefault(require("form-data"));
const googleSheetsPost = async (googleSheetKey, _data, properties) => {
    const data = JSON.parse(JSON.stringify(_data));
    const date = new Date();
    const timeZone = "Africa/Algiers";
    const options = { timeZone: timeZone };
    const formattedDateTime = date.toLocaleString("en-US", options);
    const orderData = {
        ...data,
        properties: JSON.stringify(properties).replace(/","/g, "] / [").replace(/\["/g, "[").replace(/"\]/g, "]"),
        orderDate: `${formattedDateTime.replace(",", " -")}`
    };
    const formData = new form_data_1.default();
    for (const key in orderData) {
        formData.append(key, String(orderData[key]));
    }
    try {
        await axios_1.default.post(`https://script.google.com/macros/s/${googleSheetKey}/exec`, formData);
    }
    catch (error) {
        const _error = error;
        throw new apiError_1.ApiError(_error.message, 400);
    }
};
exports.googleSheetsPost = googleSheetsPost;
