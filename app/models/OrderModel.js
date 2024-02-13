"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    totalPrice: { type: Number },
    shippingPrice: { type: Number },
    fakeShippingPrice: { type: Number, required: true },
    clientLocation: { type: String },
    clientAddress: { type: String },
    clientPhoneNumber: { type: String, required: true },
    properties: String,
    clientName: { type: String },
    totalProductFees: { type: Number },
    shippingType: { type: String, enum: ["للمنزل", "للمكتب", "مجاني"], required: true },
    productFees: { type: Number },
    productShortName: { type: String, required: true },
    porductCategory: String,
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
    orderUID: { type: String, required: true },
    note: String,
    orderStatus: {
        type: String,
        enum: ['جديد', 'متروك', 'محاولة 1', 'محاولة 2', 'محاولة 3', 'مأكد', 'ملغي', 'قيد التوصيل', 'مستلم', 'مسترجع'],
        required: true,
    },
    expireAt: {
        type: Date,
        default: new Date(Date.now() + (3600 * 1000) * 720),
        index: { expireAfterSeconds: 2592000 }
    },
}, {
    timestamps: true,
});
orderSchema.pre(/^find/, function (next) {
    this.populate('productId', ['price', 'productShortName', 'imageCover']);
    next();
});
exports.Order = mongoose_1.default.model("Order", orderSchema);
