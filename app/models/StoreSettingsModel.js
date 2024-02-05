"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSettings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storeSettingsSchema = new mongoose_1.default.Schema({
    themeColor: String,
    navTitle: String,
    headerTitle: String,
    storeTitle: String,
    sotreDescription: String,
    infinitCarouselLoop: Boolean,
    itemsInPage: Number,
    favicon: String,
    showSuggestdProducts: Boolean,
    allowLocations: Boolean,
    themeColorOriginal: String,
    currency: String,
    locationPrefix: String,
    unCompleteOrderSttngs: Number,
    googleSheetApi: String,
    shippingPrefix: String,
    allowFacebookPixel: Boolean,
    facebookPixelIds: [{ pixelId: String }],
    thankYouPageBody: String,
    currencyCode: String,
    allowTiktokPixel: Boolean,
    tikTokPixelIds: [{ pixelId: String }],
    countryPhoneCode: String,
    country: String,
    ordersLimitPerHour: Number,
    googleTagManagerId: String,
    allowGoogleTagManager: Boolean,
    allowGoogleAnalytics: Boolean,
    googleAnalyticsId: String,
    addressPlaceHolder: String,
    policyText: String,
    allowWhatsapp: Boolean,
    whatsappNumber: String,
    allowInstagram: Boolean,
    instagramLink: String,
    allowFacebook: Boolean,
    facebookLink: String,
    allowPhoneNumber: Boolean,
    phoneNumber: String,
    storeRights: String,
    allowFacebookConvApi: Boolean,
    facebookConvApi: { pixelId: String, access_token: String, allowTestMode: Boolean, testCode: String },
    allowTikTokConvApi: Boolean,
    tikTokConvApi: { pixelId: String, access_token: String, allowTestMode: Boolean, testCode: String },
    hostname: String,
    id: {
        type: mongoose_1.default.Types.ObjectId,
        default: function () {
            return this._id;
        },
    },
    headCode: String,
    secondryLogo: {
        square: Boolean,
        logoLink: String,
    },
    isAgency: Boolean,
    agnecyInfo: {
        agencyName: {
            type: String,
        },
        agencySlug: {
            type: String,
        },
        agencyLogo: {
            type: String,
        },
        agencyTextColor: {
            type: String,
        },
        agencyBgColor: {
            type: String,
        },
        agencyContactFb: {
            type: String,
        },
        agencyContactWs: {
            type: String,
        },
        agencyContactInsta: {
            type: String,
        },
    },
    allowCities: Boolean,
}, { timestamps: true });
exports.StoreSettings = mongoose_1.default.model("StoreSettings", storeSettingsSchema);
