"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categoriesSchema = new mongoose_1.default.Schema({
    name: String,
    iconUrl: String,
    id: { type: mongoose_1.default.Types.ObjectId, default: function () {
            return this._id;
        } },
}, { timestamps: true });
exports.Category = mongoose_1.default.model("Category", categoriesSchema);
