"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsSchema = new mongoose_1.default.Schema({
    locationName: String,
    isActive: Boolean,
    ToHome: Boolean,
    shippingToHomePrice: Number,
    shippingToHomeFakePrice: Number,
    ToStopDesk: Boolean,
    shippingToStopDeskPrice: Number,
    shippingToStopDeskFakePrice: Number,
    StopDeskAddress: String,
    id: { type: mongoose_1.default.Types.ObjectId, default: function () {
            return this._id;
        } },
}, { timestamps: true });
exports.Location = mongoose_1.default.model("Location", productsSchema);
