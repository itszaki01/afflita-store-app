"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const fs_1 = __importDefault(require("fs"));
exports.uploadFile = (0, express_async_handler_1.default)((req, res) => {
    const _req = req;
    const filesBaseUrl = process.env.NEW_BASE_URL ? process.env.NEW_BASE_URL : process.env.ORIGINAL_BASE_URL;
    res.status(200).json({ status: "file successfuly uploaded", path: `${filesBaseUrl}/uploads/${_req.fileName}` });
});
exports.deleteFile = (0, express_async_handler_1.default)((req, res) => {
    fs_1.default.unlink(`app/public/uploads/${req.params.fileId}`, (err) => {
        if (err) {
            res.status(404).json({ message: err.message });
        }
        else {
            res.status(200).json({ message: "file removed" });
        }
    });
});
