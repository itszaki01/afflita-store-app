"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSettings = exports.createStoreSettings = exports.getStoreSettings = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const StoreSettingsModel_1 = require("../models/StoreSettingsModel");
const apiError_1 = require("../utils/apiError");
const StorePageModel_1 = require("../models/StorePageModel");
const DefualtStorePages_1 = require("../constants/DefualtStorePages");
const axios_1 = __importDefault(require("axios"));
exports.getStoreSettings = (0, express_async_handler_1.default)(async (req, res, next) => {
    const storeSettings = await StoreSettingsModel_1.StoreSettings.find({});
    if (storeSettings.length === 0) {
        return next(new apiError_1.ApiError("الرجاء تثبيت القالب", 404));
    }
    const regex = /"(\w+:\/\/)[^\/]+(\/uploads\/image-[^\s"]+)"/g;
    const jsonString = JSON.stringify(storeSettings);
    const replacedJsonString = jsonString.replace(regex, `"${process.env.ORIGINAL_BASE_URL}$2"`);
    const replacedJson = JSON.parse(replacedJsonString);
    res.json({
        data: replacedJson[0],
    });
});
exports.createStoreSettings = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers["afflita_access_token"];
    const storeSettings = await StoreSettingsModel_1.StoreSettings.find({});
    if (storeSettings.length > 0) {
        return next(new apiError_1.ApiError("القالب مثبت بالفعل", 403));
    }
    await StorePageModel_1.StorePage.create(DefualtStorePages_1.defualtStorePages);
    let subScreptionData;
    try {
        subScreptionData = await axios_1.default.get(`https://demo.afflita.com/subScreptions/${token}`);
    }
    catch (error) {
        const _error1 = error;
        try {
            subScreptionData = await axios_1.default.get(`https://apiv2.afflitaservices.xyz/subScreptions/${token}`);
            return next();
        }
        catch (error) {
            const _error2 = error;
            return next(new apiError_1.ApiError(`Api1Error:${_error1.message} && Api2Error: ${_error2.message}`, 505));
        }
    }
    if (subScreptionData.data.data.isAgency) {
        await StoreSettingsModel_1.StoreSettings.create({ ...req.body, isAgency: subScreptionData.data.data.isAgency, agnecyInfo: subScreptionData.data.data.agency });
    }
    else {
        await StoreSettingsModel_1.StoreSettings.create(req.body);
    }
    res.json({ status: "success" });
});
exports.updateStoreSettings = (0, express_async_handler_1.default)(async (req, res, next) => {
    const storeSettings = await StoreSettingsModel_1.StoreSettings.find({});
    if (!storeSettings) {
        return next(new apiError_1.ApiError("يرجى تثبيت القالب", 403));
    }
    const storeSettingsRef = storeSettings[0]._id;
    const newStoreSettings = await StoreSettingsModel_1.StoreSettings.findByIdAndUpdate(storeSettingsRef, req.body, { new: true });
    res.json({
        data: newStoreSettings,
    });
});
