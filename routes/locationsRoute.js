"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationsRouter = void 0;
const express_1 = __importDefault(require("express"));
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const locationsService_1 = require("../services/locationsService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route('/').get(locationsService_1.getAllLocations).post(expressCheckAccess_1.expressCheckAccess, authService_1.auth, locationsService_1.createLocation);
router.route('/removeAll').delete(expressCheckAccess_1.expressCheckAccess, authService_1.auth, locationsService_1.removeAllLocations);
router.route('/:locationId').get(locationsService_1.getOneLocation).patch(expressCheckAccess_1.expressCheckAccess, authService_1.auth, locationsService_1.updateLocation).delete(expressCheckAccess_1.expressCheckAccess, authService_1.auth, locationsService_1.removeLocation);
exports.locationsRouter = router;
