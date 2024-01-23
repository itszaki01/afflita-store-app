"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const onServerStart_1 = require("./onServerStart");
dotenv_1.default.config();
(0, onServerStart_1.onServerStart)();
