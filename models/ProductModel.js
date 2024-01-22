"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsSchema = new mongoose_1.default.Schema({
    showProduct: { type: Boolean },
    name: { type: String },
    productShortName: { type: String },
    productFees: { type: Number },
    price: { type: Number },
    description: { type: String },
    freeShipping: { type: Boolean },
    singleShipping: { type: Boolean },
    singleShippingPrice: { type: Number },
    landingPage: { type: Boolean },
    landingPageColor: { type: Boolean },
    landingPageColorValue: { type: String },
    colors: {
        multiSelect: { type: Boolean },
        list: [
            {
                hex: { type: String },
                name: { type: String },
            },
        ],
    },
    imageCover: { type: String },
    images: [
        {
            imageUrl: { type: String },
        },
    ],
    category: { type: String },
    otherProperties: [
        {
            title: { type: String },
            multiSelect: { type: Boolean },
            properties: [
                {
                    name: { type: String },
                    hasIcon: { type: Boolean },
                    iconUrl: { type: String },
                },
            ],
        },
    ],
    rating: { type: Number },
    oldPrice: { type: Number },
    slug: { type: String, unique: true },
    offers: [
        {
            offerName: { type: String },
            quanitity: { type: Number },
            offerProductPrice: { type: Number },
            freeShipping: { type: Boolean },
            oldPrice: { type: Number },
            bestOffer: { type: Boolean },
            defaultSelect: { type: Boolean },
        },
    ],
    allowReviews: { type: Boolean },
    reviews: [
        {
            isMale: { type: Boolean },
            isFemale: { type: Boolean },
            allowRaterProfileImage: { type: Boolean },
            raterProfileImage: { type: String },
            raterName: { type: String },
            rating: { type: Number },
            review: { type: String },
            imageUrl: { type: String },
        },
    ],
    productDesc: { type: String },
    id: {
        type: mongoose_1.default.Types.ObjectId,
        default: function () {
            return this._id;
        },
    },
}, { timestamps: true });
exports.Product = mongoose_1.default.model("Product", productsSchema);
