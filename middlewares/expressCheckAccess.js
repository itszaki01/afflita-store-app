"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressCheckAccess = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("../utils/apiError");
const axios_1 = __importDefault(require("axios"));
exports.expressCheckAccess = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers["afflita_access_token"];
    if (!token) {
        return next(new apiError_1.ApiError("رمز الإشتراك غير موجود", 401));
    }
    const isValidMongoId = RegExp(/^[a-f\d]{24}$/i).test(token);
    if (!isValidMongoId) {
        return next(new apiError_1.ApiError("رمز الإشتراك غير صحيح", 400));
    }
    try {
        const access = await axios_1.default.get(`https://apiv1.afflitaservices.xyz/subScreptions/${token}`);
        if (access.data.data.hostName != req.get("host")) {
            return next(new apiError_1.ApiError("ليس لديك الصلاحيات لإستعمال السكربت", 401));
        }
    }
    catch (error) {
        const _error1 = error;
        try {
            const access = await axios_1.default.get(`https://apiv2.afflitaservices.xyz/subScreptions/${token}`);
            if (access.data.data.hostName != req.get("host")) {
                return next(new apiError_1.ApiError("ليس لديك الصلاحيات لإستعمال السكربت", 401));
            }
            return next();
        }
        catch (error) {
            const _error2 = error;
            return next(new apiError_1.ApiError(`Api1Error:${_error1.message} && Api2Error: ${_error2.message}`, 505));
        }
    }
    next();
});
