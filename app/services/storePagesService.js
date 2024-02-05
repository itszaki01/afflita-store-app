"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStorePage = exports.updateStorePage = exports.createStorePage = exports.getOneStorePage = exports.getAllStorePages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlersFactory_1 = require("../utils/handlersFactory");
const StorePageModel_1 = require("../models/StorePageModel");
const apiError_1 = require("../utils/apiError");
exports.getAllStorePages = (0, express_async_handler_1.default)(async (req, res) => {
    const storePages = await (0, handlersFactory_1.findAll)(StorePageModel_1.StorePage);
    res.json({
        data: storePages
    });
});
exports.getOneStorePage = (0, express_async_handler_1.default)(async (req, res) => {
    const storePage = await (0, handlersFactory_1.findOne)(StorePageModel_1.StorePage, req.params.storePageId);
    res.json({
        data: storePage
    });
});
exports.createStorePage = (0, express_async_handler_1.default)(async (req, res, next) => {
    const storePageToCheck = await StorePageModel_1.StorePage.findOne({ slug: req.body.slug });
    if (storePageToCheck) {
        return next(new apiError_1.ApiError('رابط الصفحة محجوز', 400));
    }
    const storePage = await (0, handlersFactory_1.createOne)(StorePageModel_1.StorePage, req.body);
    res.json({
        data: storePage
    });
});
exports.updateStorePage = (0, express_async_handler_1.default)(async (req, res, next) => {
    const storePageToCheck = await StorePageModel_1.StorePage.findOne({ slug: req.body.slug });
    if (storePageToCheck && req.params.storePageId !== storePageToCheck._id.toString()) {
        return next(new apiError_1.ApiError('رابط الصفحة محجوز', 400));
    }
    const storePage = await (0, handlersFactory_1.updateOne)(StorePageModel_1.StorePage, req.params.storePageId, req.body);
    res.json({
        data: storePage
    });
});
exports.removeStorePage = (0, express_async_handler_1.default)(async (req, res) => {
    const storePage = await (0, handlersFactory_1.removeOne)(StorePageModel_1.StorePage, req.params.storePageId);
    res.json({
        data: storePage
    });
});
