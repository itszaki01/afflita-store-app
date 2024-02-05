"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationsRouter = void 0;
const express_1 = __importDefault(require("express"));
const locationsService_1 = require("../services/locationsService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route('/createBulk').post(authService_1.auth, locationsService_1.createBulkLocations);
router.route('/removeAll').delete(authService_1.auth, locationsService_1.removeAllLocations);
router.route('/').get(locationsService_1.getAllLocations).post(authService_1.auth, locationsService_1.createLocation);
router.route('/:locationId').get(locationsService_1.getOneLocation).patch(authService_1.auth, locationsService_1.updateLocation).delete(authService_1.auth, locationsService_1.removeLocation);
exports.locationsRouter = router;
