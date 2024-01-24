"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.updateProduct = exports.createProduct = exports.getOneProduct = exports.getAllProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlersFactory_1 = require("../utils/handlersFactory");
const ProductModel_1 = require("../models/ProductModel");
const apiError_1 = require("../utils/apiError");
exports.getAllProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const products = await ProductModel_1.Product.find({}).sort("-createdAt");
    const regex = /"(\w+:\/\/)[^\/]+(\/uploads\/image-[^\s"]+)"/g;
    const jsonString = JSON.stringify(products);
    const replacedJsonString = jsonString.replace(regex, `"${process.env.ORIGINAL_BASE_URL}$2"`);
    const replacedJson = JSON.parse(replacedJsonString);
    res.json({
        data: replacedJson,
    });
});
exports.getOneProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await (0, handlersFactory_1.findOne)(ProductModel_1.Product, req.params.productId);
    const regex = /"(\w+:\/\/)[^\/]+(\/uploads\/image-[^\s"]+)"/g;
    const jsonString = JSON.stringify(product);
    const replacedJsonString = jsonString.replace(regex, `"${process.env.ORIGINAL_BASE_URL}$2"`);
    const replacedJson = JSON.parse(replacedJsonString);
    res.json({
        data: replacedJson,
    });
});
exports.createProduct = (0, express_async_handler_1.default)(async (req, res, next) => {
    const productToCheck = await ProductModel_1.Product.findOne({ slug: req.body.slug });
    if (productToCheck) {
        return next(new apiError_1.ApiError("رابط المنتج محجوز", 400));
    }
    const product = await (0, handlersFactory_1.createOne)(ProductModel_1.Product, req.body);
    res.json({
        data: product,
    });
});
exports.updateProduct = (0, express_async_handler_1.default)(async (req, res, next) => {
    const productToCheck = await ProductModel_1.Product.findOne({ slug: req.body.slug });
    if (productToCheck && req.params.productId !== productToCheck._id.toString()) {
        return next(new apiError_1.ApiError("رابط المنتج محجوز", 400));
    }
    const product = await (0, handlersFactory_1.updateOne)(ProductModel_1.Product, req.params.productId, req.body);
    res.json({
        data: product,
    });
});
exports.removeProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await (0, handlersFactory_1.removeOne)(ProductModel_1.Product, req.params.productId);
    res.json({
        data: product,
    });
});
