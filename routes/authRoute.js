"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const expressCheckAccess_1 = require("../middlewares/expressCheckAccess");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
router.route('/signup').post(expressCheckAccess_1.expressCheckAccess, authService_1.signUp);
router.route('/signin').post(expressCheckAccess_1.expressCheckAccess, authService_1.signIn);
exports.authRouter = router;
