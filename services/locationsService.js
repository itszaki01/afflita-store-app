"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllLocations = exports.removeLocation = exports.updateLocation = exports.createBulkLocations = exports.createLocation = exports.getOneLocation = exports.getAllLocations = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlersFactory_1 = require("../utils/handlersFactory");
const LocationModel_1 = require("../models/LocationModel");
exports.getAllLocations = (0, express_async_handler_1.default)(async (req, res) => {
    const locations = await (0, handlersFactory_1.findAll)(LocationModel_1.Location);
    res.json({
        data: locations,
    });
});
exports.getOneLocation = (0, express_async_handler_1.default)(async (req, res) => {
    const location = await (0, handlersFactory_1.findOne)(LocationModel_1.Location, req.params.locationId);
    res.json({
        data: location,
    });
});
exports.createLocation = (0, express_async_handler_1.default)(async (req, res) => {
    const location = await (0, handlersFactory_1.createOne)(LocationModel_1.Location, req.body);
    res.json({
        data: location,
    });
});
exports.createBulkLocations = (0, express_async_handler_1.default)(async (req, res) => {
    const locations = req.body.locations;
    const promise = new Promise((resolve, reject) => {
        let index = 0;
        setInterval(async () => {
            if (index < locations.length) {
                await LocationModel_1.Location.create(locations[index]);
                index += 1;
            }
            else {
                resolve();
            }
        }, 400);
    });
    await promise;
    res.json({
        data: "ok",
    });
});
exports.updateLocation = (0, express_async_handler_1.default)(async (req, res) => {
    const location = await (0, handlersFactory_1.updateOne)(LocationModel_1.Location, req.params.locationId, req.body);
    res.json({
        data: location,
    });
});
exports.removeLocation = (0, express_async_handler_1.default)(async (req, res) => {
    const location = await (0, handlersFactory_1.removeOne)(LocationModel_1.Location, req.params.locationId);
    res.json({
        data: location,
    });
});
exports.removeAllLocations = (0, express_async_handler_1.default)(async (req, res) => {
    const locations = await (0, handlersFactory_1.findAll)(LocationModel_1.Location);
    const locationPromise = locations.map(async (location) => {
        await (0, handlersFactory_1.removeOne)(LocationModel_1.Location, location.id);
    });
    await Promise.all(locationPromise);
    res.json({
        status: "success",
        message: "تم حذف الكل",
    });
});
