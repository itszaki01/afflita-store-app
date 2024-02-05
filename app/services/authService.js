"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = exports.auth = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = require("../models/UserModel");
const apiError_1 = require("../utils/apiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const js_sha256_1 = require("js-sha256");
exports.auth = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.headers["jwt_access_token"];
    if (!token) {
        return next(new apiError_1.ApiError("يرجى تسجيل الدخول", 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, req.hostname);
    const user = await UserModel_1.User.findById(decoded.userId);
    if (!user) {
        return next(new apiError_1.ApiError("الرجاء تسجيل الدخول من جديد", 400));
    }
    next();
});
exports.signIn = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await UserModel_1.User.findOne({ email: req.body.email });
    if (!user) {
        return next(new apiError_1.ApiError("كلمة السر أو البريد الإلكتروني غير صحيح", 400));
    }
    const isMatch = (0, js_sha256_1.sha256)(req.body.password) === user.password;
    if (!isMatch) {
        return next(new apiError_1.ApiError("كلمة السر أو البريد الإلكتروني غير صحيح", 400));
    }
    const payload = {
        userId: user._id,
    };
    const token = jsonwebtoken_1.default.sign(payload, req.hostname, { expiresIn: "30d" });
    res.json({
        email: user.email,
        token,
    });
});
exports.signUp = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await UserModel_1.User.find({});
    if (user.length > 0) {
        return next(new apiError_1.ApiError("السكربت مثبت بالفعل", 403));
    }
    const hasedPassword = (0, js_sha256_1.sha256)(req.body.password);
    const newUser = await UserModel_1.User.create({ email: req.body.email, password: hasedPassword, role: 'admin' });
    const payload = {
        userId: newUser._id,
    };
    const token = jsonwebtoken_1.default.sign(payload, req.hostname, { expiresIn: "30d" });
    res.json({
        email: newUser.email,
        token,
    });
});
