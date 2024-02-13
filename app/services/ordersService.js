"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrder = exports.updateOrder = exports.createOrder = exports.getOneOrder = exports.getAllOrdersStatus = exports.getAllOrders = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlersFactory_1 = require("../utils/handlersFactory");
const OrderModel_1 = require("../models/OrderModel");
const StoreSettingsModel_1 = require("../models/StoreSettingsModel");
const googleSheetsPost_1 = require("../utils/googleSheetsPost");
const ProductModel_1 = require("../models/ProductModel");
const apiFeatures_1 = require("../utils/apiFeatures");
exports.getAllOrders = (0, express_async_handler_1.default)(async (req, res) => {
    const apiFeatures = new apiFeatures_1.ApiFeatures(OrderModel_1.Order, OrderModel_1.Order, req.query);
    (await (await apiFeatures.filter()).search(req.query.searchMethod)).sort().fieldsLimit().pagination();
    if (req.query.orderStatus) {
        if (req.query.orderStatus == "لم يتم الرد") {
            const documents = await apiFeatures.mongooseQuery.where("orderStatus").regex(/^محاولة/);
            res.json({
                results: documents.length,
                ...apiFeatures.paginateResults,
                data: documents,
            });
        }
        else {
            const documents = await apiFeatures.mongooseQuery.where("orderStatus").eq(req.query.orderStatus);
            const regex = /"(\w+:\/\/)[^\/]+(\/uploads\/image-[^\s"]+)"/g;
            const jsonString = JSON.stringify(documents);
            const replacedJsonString = jsonString.replace(regex, `"${process.env.ORIGINAL_BASE_URL}$2"`);
            const replacedJson = JSON.parse(replacedJsonString);
            res.json({
                results: documents.length,
                ...apiFeatures.paginateResults,
                data: replacedJson,
            });
        }
    }
    else {
        const documents = await apiFeatures.mongooseQuery.where("orderStatus").ne("متروك");
        const regex = /"(\w+:\/\/)[^\/]+(\/uploads\/image-[^\s"]+)"/g;
        const jsonString = JSON.stringify(documents);
        const replacedJsonString = jsonString.replace(regex, `"${process.env.ORIGINAL_BASE_URL}$2"`);
        const replacedJson = JSON.parse(replacedJsonString);
        res.json({
            results: documents.length,
            ...apiFeatures.paginateResults,
            data: replacedJson,
        });
    }
});
exports.getAllOrdersStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const newOrders = await OrderModel_1.Order.find({ orderStatus: "جديد" });
    const callingsProcess = await OrderModel_1.Order.find({ orderStatus: /^محاولة/ });
    const cancledOrders = await OrderModel_1.Order.find({ orderStatus: "ملغي" });
    const inDelivery = await OrderModel_1.Order.find({ orderStatus: "قيد التوصيل" });
    const unCompleted = await OrderModel_1.Order.find({ orderStatus: "متروك" });
    const completed = await OrderModel_1.Order.find({ orderStatus: "مستلم" });
    const confirmed = await OrderModel_1.Order.find({ orderStatus: "مأكد" });
    const retour = await OrderModel_1.Order.find({ orderStatus: "مسترجع" });
    res.json({
        data: {
            newOrders: newOrders.length,
            callingsProcess: callingsProcess.length,
            cancledOrders: cancledOrders.length,
            inDelivery: inDelivery.length,
            unCompleted: unCompleted.length,
            completed: completed.length,
            confirmed: confirmed.length,
            retour: retour.length,
        },
    });
});
exports.getOneOrder = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await OrderModel_1.Order.findOne({ orderUID: req.params.orderUID });
    res.json({
        data: order,
    });
});
exports.createOrder = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await (0, handlersFactory_1.findOne)(ProductModel_1.Product, req.body.productId);
    const storeSettings = await StoreSettingsModel_1.StoreSettings.find({});
    const order = await OrderModel_1.Order.findOne({ orderUID: req.body.orderUID });
    if (order) {
        const order = await OrderModel_1.Order.findOneAndUpdate({ orderUID: req.body.orderUID }, {
            ...req.body,
            properties: JSON.stringify(req.body.properties).replace(/","/g, "] / [").replace(/\["/g, "[").replace(/"\]/g, "]"),
        }, { new: true });
        if (storeSettings[0].googleSheetApi && order) {
            await (0, googleSheetsPost_1.googleSheetsPost)(storeSettings[0].googleSheetApi, order, req.body.properties);
        }
        res.json({
            data: order,
        });
    }
    else {
        const order = await (0, handlersFactory_1.createOne)(OrderModel_1.Order, {
            ...req.body,
            properties: JSON.stringify(req.body.properties).replace(/","/g, "] / [").replace(/\["/g, "[").replace(/"\]/g, "]"),
            productPrice: product.price,
            totalPrice: product.price * req.body.quantity + req.body.fakeShippingPrice || 0,
        });
        if (storeSettings[0].googleSheetApi && order && order.orderStatus != "متروك") {
            await (0, googleSheetsPost_1.googleSheetsPost)(storeSettings[0].googleSheetApi, order, req.body.properties);
        }
        res.json({
            data: order,
        });
    }
});
exports.updateOrder = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await OrderModel_1.Order.findOneAndUpdate({ orderUID: req.params.orderUID }, req.body, { new: true });
    const storeSettings = await StoreSettingsModel_1.StoreSettings.find({});
    if (storeSettings[0].googleSheetApi && order && order.orderStatus != "متروك") {
        await (0, googleSheetsPost_1.googleSheetsPost)(storeSettings[0].googleSheetApi, order, req.body.properties);
    }
    res.json({
        data: order,
    });
});
exports.removeOrder = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await OrderModel_1.Order.findOneAndRemove({ orderUID: req.params.orderUID });
    res.json({
        data: order,
    });
});
