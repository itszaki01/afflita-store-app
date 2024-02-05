"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountedRoutes = void 0;
const authRoute_1 = require("./authRoute");
const categoriesRoute_1 = require("./categoriesRoute");
const conversioinApiRoutes_1 = require("./conversioinApiRoutes");
const filesRoute_1 = require("./filesRoute");
const locationsRoute_1 = require("./locationsRoute");
const productsRoute_1 = require("./productsRoute");
const storePagesRoute_1 = require("./storePagesRoute");
const storeSettingsRoute_1 = require("./storeSettingsRoute");
const viewsRoute_1 = require("./viewsRoute");
const mountedRoutes = (app) => {
    app.use("/storeSettings", storeSettingsRoute_1.storeSettingsRouter);
    app.use("/storePages", storePagesRoute_1.storePagesRouter);
    app.use("/categories", categoriesRoute_1.categoriesRouter);
    app.use("/file", filesRoute_1.filesRouter);
    app.use("/products", productsRoute_1.productsRouter);
    app.use("/auth", authRoute_1.authRouter);
    app.use("/locations", locationsRoute_1.locationsRouter);
    app.use("/conv-api", conversioinApiRoutes_1.conversionApiRoutes);
    app.use("/", viewsRoute_1.viewsRouter);
};
exports.mountedRoutes = mountedRoutes;