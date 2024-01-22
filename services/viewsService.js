"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installView = exports.adminView = exports.homeView = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fs_1 = __importDefault(require("fs"));
exports.homeView = (0, express_async_handler_1.default)((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    fs_1.default.readFile("public/index.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.send(err.message);
            return;
        }
        res.send(data);
    });
});
exports.adminView = (0, express_async_handler_1.default)((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    fs_1.default.readFile("public/admin/index.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.send(err.message);
            return;
        }
        res.send(data);
    });
});
exports.installView = (0, express_async_handler_1.default)((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    fs_1.default.readFile("../public/install/index.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.send(err.message);
            return;
        }
        res.send(data);
    });
});
