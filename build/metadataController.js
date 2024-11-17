"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataFilePath = void 0;
exports.updateMetadata = updateMetadata;
exports.getMetadata = getMetadata;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
/**
 * Path to the metadata file
 */
exports.metadataFilePath = (0, path_1.join)(__dirname, '..', 'metadata.json');
/**
 * Update the metadata file with the new file metadata
 * @param req Request object
 * @param res Response object
 * @returns An object containing the updated metadata
 */
function updateMetadata(req, res) {
    if (!req.file) {
        // should not happen
        res.status(400).send("No file selected !");
        return {};
    }
    console.log("Updating metadata...");
    const rawData = fs_1.default.readFileSync(exports.metadataFilePath, "utf8"); // read metadata file
    const metadata = JSON.parse(rawData); // parse metadata file
    const file = req.file;
    metadata[file.originalname] = {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        description: req.body["file desc"]
    };
    fs_1.default.writeFileSync(exports.metadataFilePath, JSON.stringify(metadata, null, 2), "utf-8");
    return metadata;
}
/**
 * Get the metadata from the metadata file as an object
 * @returns An object containing the metadata
 */
function getMetadata() {
    const rawData = fs_1.default.readFileSync(exports.metadataFilePath, "utf8");
    return JSON.parse(rawData);
}
