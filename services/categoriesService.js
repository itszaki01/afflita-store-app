"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.updateCategory = exports.createCategory = exports.getOneCategory = exports.getAllCategories = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlersFactory_1 = require("../utils/handlersFactory");
const CategoryModel_1 = require("../models/CategoryModel");
exports.getAllCategories = (0, express_async_handler_1.default)(async (req, res) => {
    const categories = await (0, handlersFactory_1.findAll)(CategoryModel_1.Category);
    let data;
    if (process.env.NEW_BASE_URL) {
        const oldBaseUrlRegex = new RegExp(process.env.ORIGINAL_BASE_URL, 'g');
        data = JSON.stringify(categories).replace(oldBaseUrlRegex, process.env.NEW_BASE_URL);
        data = JSON.parse(data);
    }
    else {
        data = categories;
    }
    res.json({
        data
    });
});
exports.getOneCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, handlersFactory_1.findOne)(CategoryModel_1.Category, req.params.categoryId);
    let data;
    if (process.env.NEW_BASE_URL) {
        const oldBaseUrlRegex = new RegExp(process.env.ORIGINAL_BASE_URL, 'g');
        data = JSON.stringify(category).replace(oldBaseUrlRegex, process.env.NEW_BASE_URL);
        data = JSON.parse(data);
    }
    else {
        data = category;
    }
    res.json({
        data
    });
});
exports.createCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, handlersFactory_1.createOne)(CategoryModel_1.Category, req.body);
    res.json({
        data: category
    });
});
exports.updateCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, handlersFactory_1.updateOne)(CategoryModel_1.Category, req.params.categoryId, req.body);
    res.json({
        data: category
    });
});
exports.removeCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const category = await (0, handlersFactory_1.removeOne)(CategoryModel_1.Category, req.params.categoryId);
    res.json({
        data: category
    });
});
