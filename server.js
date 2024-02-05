"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestIp = __importStar(require("request-ip"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./app/db/connectDB");
const path_1 = __importDefault(require("path"));
const route404Hanlder_1 = require("./app/middlewares/route404Hanlder");
const expressErrorHandler_1 = require("./app/middlewares/expressErrorHandler");
const compression_1 = __importDefault(require("compression"));
const fs_1 = __importDefault(require("fs"));
const routes_1 = require("./app/routes");
const child_process_1 = require("child_process");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, connectDB_1.connectDb)();
app.use(express_1.default.json());
app.use(requestIp.mw());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "app/public")));
(0, routes_1.mountedRoutes)(app);
app.all("*", route404Hanlder_1.route404Hanlder);
app.use(expressErrorHandler_1.expressErrorHandler);
setInterval(() => {
    if (process.env.NODE_ENV?.startsWith("DEV"))
        return;
    try {
        const output = (0, child_process_1.execSync)("git pull", { encoding: "utf-8" });
        if (output.toLocaleLowerCase().includes("updating")) {
            console.log("updating");
            process.exit(1);
        }
        else if (output.toLocaleLowerCase().includes("already")) {
            console.log("up-to-date");
        }
        else {
            process.exit(1);
        }
    }
    catch (error) {
        const _erorr = error;
        console.log(_erorr.message);
    }
}, 10000 * 6 * 5);
fs_1.default.access("app/public/uploads", (err) => {
    if (err) {
        fs_1.default.mkdir("app/public/uploads", (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log("server Listen on port ", PORT);
});
process.on("unhandledRejection", (err) => {
    console.log(`\n -----------------------------------------
        \n => Unhandled Error: ${err}
        \n -----------------------------------------
        \n => Message: ${err.message}
        \n -----------------------------------------
        \n => Stack ${err.stack}
        \n -----------------------------------------`);
    server.close(() => {
        console.log("Server Shutdown...");
        process.exit(1);
    });
});
