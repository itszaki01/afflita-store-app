"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDemo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const StoreSettingsModel_1 = require("../models/StoreSettingsModel");
const apiError_1 = require("../utils/apiError");
exports.checkDemo = (0, express_async_handler_1.default)(async (req, res, next) => {
    const storeSettings = await StoreSettingsModel_1.StoreSettings.find({});
    if (!storeSettings) {
        return next(new apiError_1.ApiError("يرجى تثبيت القالب", 403));
    }
    if (storeSettings[0].isDemo) {
        res.json({ message: "success" });
        return;
    }
    next();
});
