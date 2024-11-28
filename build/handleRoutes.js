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
exports.mainRoute = mainRoute;
exports.reloadRoute = reloadRoute;
exports.uploadRoute = uploadRoute;
exports.downloadRoute = downloadRoute;
exports.deleteRoute = deleteRoute;
exports.previewRoute = previewRoute;
const fileController_1 = require("./fileController");
const metadataController_1 = require("./metadataController");
const utils_1 = require("./utils");
const filePreviewer_1 = require("./filePreviewer");
/**
 * Handle the main route
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function mainRoute(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get metadata
        const metadata = yield (0, metadataController_1.getMetadata)();
        // render home page with metadata
        try {
            res.render("home", {
                filesMetadata: {},
                loading: true
            });
        }
        catch (error) {
            console.error("Error rendering home page:", error);
            res.status(500).send("Internal Server Error");
        }
    });
}
/**
 * Send new metadata and HTML preview list
 * @param _req Request object (not used)
 * @param res Response object
 */
function reloadRoute(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get metadata
        const metadata = yield (0, metadataController_1.getMetadata)();
        (0, utils_1.renderAndSendPreviewList)(res, metadata);
    });
}
/**
 * Handle the instructions to upload a file (except the file saving, that's in the middleware).
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function uploadRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file) {
            // should not happen
            console.error("No file uploaded");
            return;
        }
        const updatedMetadata = yield (0, metadataController_1.addAndGetMetadata)(req.file, req.body["file desc"]);
        (0, utils_1.renderAndSendPreviewList)(res, updatedMetadata);
    });
}
/**
 * Handle the instructions to download a file
 * @param req Request object
 * @param res Response object
 */
function downloadRoute(req, res) {
    (0, fileController_1.downloadFile)(req, res);
}
/**
 * Handle the instructions to delete a file
 * @param req Request object
 * @param res Response object
 */
function deleteRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, fileController_1.deleteFile)(req.params["fileName"]);
        const updatedMetadata = yield (0, metadataController_1.removeAndGetMetadata)(req.params["fileName"]);
        (0, utils_1.renderAndSendPreviewList)(res, updatedMetadata);
    });
}
function previewRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, filePreviewer_1.previewFile)(res, req.params["fileName"]);
    });
}
