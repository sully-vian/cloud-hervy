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
exports.downloadFile = downloadFile;
exports.deleteFile = deleteFile;
const path_1 = require("path");
const storage_1 = require("./storage");
const promises_1 = require("fs/promises");
/**
 * Download a file from the server (send download prompt to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function downloadFile(req, res) {
    const fileName = req.params["fileName"];
    res.download((0, path_1.join)(storage_1.storageDir, fileName));
}
/**
 * Delete a file from the server
 * @param fileName Name of the file to delete
 */
function deleteFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = (0, path_1.join)(storage_1.storageDir, fileName);
        yield (0, promises_1.unlink)(filePath);
    });
}
