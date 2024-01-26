"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storePagesRouter = void 0;
const express_1 = __importDefault(require("express"));
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const storePagesService_1 = require("../services/storePagesService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route('/').get(storePagesService_1.getAllStorePages).post(expressCheckAccess_1.expressCheckAccess, authService_1.auth, storePagesService_1.createStorePage);
router.route('/:storePageId').get(storePagesService_1.getOneStorePage).patch(expressCheckAccess_1.expressCheckAccess, authService_1.auth, storePagesService_1.updateStorePage).delete(authService_1.auth, storePagesService_1.removeStorePage);
exports.storePagesRouter = router;
