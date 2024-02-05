"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const productsService_1 = require("../services/productsService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route('/').get(productsService_1.getAllProducts).post(expressCheckAccess_1.expressCheckAccess, authService_1.auth, productsService_1.createProduct);
router.route('/:productId').get(productsService_1.getOneProduct).patch(expressCheckAccess_1.expressCheckAccess, authService_1.auth, productsService_1.updateProduct).delete(authService_1.auth, productsService_1.removeProduct);
exports.productsRouter = router;
