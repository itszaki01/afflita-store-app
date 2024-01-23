"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = __importDefault(require("express"));
const viewsService_1 = require("../services/viewsService");
const router = express_1.default.Router();
router.route("/").get(viewsService_1.homeView);
router.route("/:productId").get(viewsService_1.homeView);
router.route("/p/*").get(viewsService_1.homeView);
router.route("/admin").get(viewsService_1.adminView);
router.route("/admin/*").get(viewsService_1.adminView);
router.route("/install").get(viewsService_1.installView);
exports.viewsRouter = router;
