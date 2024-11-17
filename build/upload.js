"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsDir = exports.uploads = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const uploadsDir = (0, path_1.join)(__dirname, "..", "uploads");
exports.uploadsDir = uploadsDir;
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploads = (0, multer_1.default)({ storage: storage });
exports.uploads = uploads;
