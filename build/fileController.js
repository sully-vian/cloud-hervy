"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataFile = void 0;
exports.handleFileUpload = handleFileUpload;
exports.sendHTMLPreview = sendHTMLPreview;
exports.downloadFile = downloadFile;
exports.saveFile = saveFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const upload_1 = require("./upload");
/**
 * @deprecated
 */
exports.metadataFile = (0, path_1.join)(__dirname, "..", "metadata.json");
/**
 * Save the metadata of the uploaded file to the metadata file
 * @param file Uploaded file
 * @param fileDesc Description of the file
 * @returns void
 * @deprecated
 */
function saveMetadata(file, fileDesc) {
    console.log("Saving metadata...");
    const rawData = fs_1.default.readFileSync(exports.metadataFile, "utf8"); // read metadata file
    const metadata = JSON.parse(rawData); // parse metadata file
    // add new file metadata
    metadata[file.originalname] = {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        description: fileDesc
    };
    fs_1.default.writeFileSync(exports.metadataFile, JSON.stringify(metadata, null, 2), "utf-8"); // write metadata to file
}
/**
 * Upload to the server the file with field name "new file" and save its metadata
 * @param req Request object
 * @param res Response object
 * @returns void
 * @deprecated
 */
function handleFileUpload(req, res) {
    upload_1.uploads.single("new file")(req, res, (err) => {
        if (err) {
            return res.status(400).send("Error uploading file");
        }
        if (!req.file) {
            // should not happen
            return res.status(400).send("No file selected !");
        }
        const file = req.file;
        console.log(`Uploading ${file.originalname}...`);
        saveMetadata(file, req.body["file desc"]);
        res.json({ success: true, message: "File uploaded successfully !" });
    });
}
/**
 * Send an HTML preview of the uploaded file to the client
 * @param req Request object
 * @param res Response object
 * @returns void
 * @deprecated
 */
function sendHTMLPreview(req, res) {
    res.render("_file-preview", { file: req.file }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error rendering home page");
            return;
        }
        console.log("Sending HTML preview...");
        res.send(html);
    });
}
/**
 * Download a file from the server (send download prompt to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function downloadFile(req, res) {
    const fileName = req.params["fileName"];
    console.log(`Downloading ${fileName}...`);
    res.download((0, path_1.join)(upload_1.uploadsDir, fileName));
}
/**
 * Save the file uploaded by the client
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function saveFile(req, res) {
    upload_1.uploads.single("new file")(req, res, (err) => {
        if (err) {
            res.status(400).send("Error uploading file");
            return;
        }
        else if (!req.file) {
            res.status(400).send("No file selected !");
            return;
        }
    });
}
