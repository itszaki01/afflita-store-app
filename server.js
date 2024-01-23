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
const express_useragent_1 = __importDefault(require("express-useragent"));
const requestIp = __importStar(require("request-ip"));
const cors_1 = __importDefault(require("cors"));
const conversioinApiRoutes_1 = require("./routes/conversioinApiRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./db/connectDB");
const path_1 = __importDefault(require("path"));
const storeSettingsRoute_1 = require("./routes/storeSettingsRoute");
const route404Hanlder_1 = require("./middlewares/route404Hanlder");
const expressErrorHandler_1 = require("./middlewares/expressErrorHandler");
const categoriesRoute_1 = require("./routes/categoriesRoute");
const locationsRoute_1 = require("./routes/locationsRoute");
const productsRoute_1 = require("./routes/productsRoute");
const filesRoute_1 = require("./routes/filesRoute");
const authRoute_1 = require("./routes/authRoute");
const viewsRoute_1 = require("./routes/viewsRoute");
const storePagesRoute_1 = require("./routes/storePagesRoute");
const express_rate_limit_1 = require("express-rate-limit");
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, connectDB_1.connectDb)();
app.use(express_1.default.json());
app.use(express_useragent_1.default.express());
app.use(requestIp.mw());
app.use((0, compression_1.default)());
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 60 * 1000,
    limit: 600,
    message: "limited requests",
});
app.use(limiter);
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/storeSettings", storeSettingsRoute_1.storeSettingsRouter);
app.use("/storePages", storePagesRoute_1.storePagesRouter);
app.use("/categories", categoriesRoute_1.categoriesRouter);
app.use("/file", filesRoute_1.filesRouter);
app.use("/products", productsRoute_1.productsRouter);
app.use("/auth", authRoute_1.authRouter);
app.use("/locations", locationsRoute_1.locationsRouter);
app.use("/conv-api", conversioinApiRoutes_1.conversionApiRoutes);
app.use("/", viewsRoute_1.viewsRouter);
app.all("*", route404Hanlder_1.route404Hanlder);
app.use(expressErrorHandler_1.expressErrorHandler);
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
