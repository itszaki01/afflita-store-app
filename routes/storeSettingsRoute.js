"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSettingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const storeSettingsService_1 = require("../services/storeSettingsService");
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route("/").get(storeSettingsService_1.getStoreSettings).post(expressCheckAccess_1.expressCheckAccess, storeSettingsService_1.createStoreSettings).patch(expressCheckAccess_1.expressCheckAccess, authService_1.auth, storeSettingsService_1.updateStoreSettings);
exports.storeSettingsRouter = router;
