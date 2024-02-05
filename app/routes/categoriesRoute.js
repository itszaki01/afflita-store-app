"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const categoriesService_1 = require("../services/categoriesService");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route('/').get(categoriesService_1.getAllCategories).post(expressCheckAccess_1.expressCheckAccess, authService_1.auth, categoriesService_1.createCategory);
router.route('/:categoryId').get(categoriesService_1.getOneCategory).patch(expressCheckAccess_1.expressCheckAccess, authService_1.auth, categoriesService_1.updateCategory).delete(expressCheckAccess_1.expressCheckAccess, authService_1.auth, categoriesService_1.removeCategory);
exports.categoriesRouter = router;
