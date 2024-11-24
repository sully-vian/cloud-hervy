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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataFilePath = void 0;
exports.addAndGetMetadata = addAndGetMetadata;
exports.getMetadata = getMetadata;
exports.removeAndGetMetadata = removeAndGetMetadata;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
/**
 * Path to the metadata file
 */
exports.metadataFilePath = (0, path_1.join)(__dirname, '..', 'metadata.json');
/**
 * Update the metadata file with the new file metadata
 * @param file File to add metadata for
 * @param fileDesc Description of the file
 */
function addAndGetMetadata(file, fileDesc) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = fs_1.default.readFileSync(exports.metadataFilePath, "utf8"); // read metadata file
        const metadata = JSON.parse(rawData); // parse metadata file
        metadata[file.originalname] = {
            name: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            uploadDate: new Date().toISOString().split("T")[0],
            description: fileDesc
        };
        yield fs_1.default.promises.writeFile(exports.metadataFilePath, JSON.stringify(metadata, null, 2), "utf-8");
        return metadata;
    });
}
/**
 * Get the metadata from the metadata file as an object
 * @returns An object containing the metadata
 */
function getMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield fs_1.default.promises.readFile(exports.metadataFilePath, "utf8");
        return yield JSON.parse(rawData);
    });
}
/**
 * Delete the metadata of a file
 * @param fileName Name of the file to delete
 * @returns The updated metadata
 */
function removeAndGetMetadata(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = fs_1.default.readFileSync(exports.metadataFilePath, "utf8");
        const metadata = JSON.parse(rawData);
        delete metadata[fileName];
        yield fs_1.default.promises.writeFile(exports.metadataFilePath, JSON.stringify(metadata, null, 2), "utf-8");
        return metadata;
    });
}
