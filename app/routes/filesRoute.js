"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = __importDefault(require("express"));
const filesService_1 = require("../services/filesService");
const multer_1 = __importDefault(require("multer"));
const apiError_1 = require("../utils/apiError");
const authService_1 = require("../services/authService");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "app/public/uploads");
    },
    filename: function (req, file, cb) {
        if (file.mimetype.split("/")[0] !== "image") {
            cb(new apiError_1.ApiError('يجب أن يكون الملف عبارة عن صورة', 400), '');
        }
        else {
            const _req = req;
            const fileExtension = file.originalname.split('.').pop();
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const fileName = file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
            _req.fileName = fileName;
            cb(null, fileName);
        }
    },
});
const upload = (0, multer_1.default)({ storage, dest: "app/public/uploads" });
router.route("/").post(authService_1.auth, upload.single("image"), filesService_1.uploadFile);
router.route("/:fileId").delete(authService_1.auth, filesService_1.deleteFile);
exports.filesRouter = router;
