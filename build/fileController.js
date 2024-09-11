"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const metadataFile = (0, path_1.join)(__dirname, "..", "metadata.json");
function saveMetadata(file) {
    let metadata = [];
    if (fs_1.default.existsSync(metadataFile)) { // if metadata file exists
        const rawData = fs_1.default.readFileSync(metadataFile, "utf8"); // read metadata file
        metadata = JSON.parse(rawData); // parse metadata file
    }
    // add new file metadata
    metadata[file.originalname] = {
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString(),
        path: file.path // useless until the uploadsDir is oragnised in multiple directories
    };
    fs_1.default.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2)); // write metadata to file
}
function uploadFile(req, res) {
    if (!req.file) {
        return res.send("no file selected !");
    }
    const file = req.file;
    saveMetadata(file);
    res.send("file uploaded successfully !");
}
