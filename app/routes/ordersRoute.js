"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = __importDefault(require("express"));
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const ordersService_1 = require("../services/ordersService");
const authService_1 = require("../services/authService");
const checkDemo_1 = require("../middlewares/checkDemo");
const router = express_1.default.Router();
router.route('/').get(authService_1.auth, ordersService_1.getAllOrders).post(ordersService_1.createOrder);
router.route('/status').get(authService_1.auth, ordersService_1.getAllOrdersStatus);
router.route('/:orderUID').get(ordersService_1.getOneOrder).patch(expressCheckAccess_1.expressCheckAccess, authService_1.auth, checkDemo_1.checkDemo, ordersService_1.updateOrder).delete(authService_1.auth, checkDemo_1.checkDemo, ordersService_1.removeOrder);
exports.ordersRouter = router;
