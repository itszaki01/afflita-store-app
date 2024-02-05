"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorePage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storePagesSchema = new mongoose_1.default.Schema({
    title: { type: String },
    showPage: { type: Boolean },
    slug: { type: String },
    body: { type: String },
    id: {
        type: mongoose_1.default.Types.ObjectId,
        default: function () {
            return this._id;
        },
    },
}, { timestamps: true });
exports.StorePage = mongoose_1.default.model("StorePage", storePagesSchema);
