"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewFile = previewFile;
const metadataController_1 = require("./metadataController");
const path_1 = require("path");
const storage_1 = require("./storage");
const previewableMimeTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "text/plain",
    "audio/mpeg"
];
function previewFile(res, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = yield (0, metadataController_1.getMetadata)();
        const mimeType = metadata[fileName]["mimetype"];
        if (!previewableMimeTypes.includes(mimeType)) {
            res.status(400).send("File type not supported for preview");
            return;
        }
        res.setHeader("Content-Type", mimeType);
        res.sendFile((0, path_1.join)(storage_1.storageDir, fileName));
    });
}
