"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = require("https");
const multer_1 = __importDefault(require("multer"));
const os_1 = require("os");
const path_1 = require("path");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const uploadsDir = "uploads/";
fs_1.default.mkdirSync(uploadsDir, { recursive: true }); // create "uploads/" if it doesn't exist
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploads = (0, multer_1.default)({ storage: storage });
const metadataFile = "metadata.json";
app.get("/favicon.ico", (_req, res) => {
    res.sendFile((0, path_1.join)(__dirname, "public", "logo.png"));
});
app.get("/", (_req, res) => {
    const uploadedFiles = fs_1.default.readdirSync(uploadsDir);
    res.render("home", { files: uploadedFiles });
});
app.post("/", uploads.single("new file"), (req, res) => {
    if (!req.file) {
        return res.send("no file selected !");
    }
    const file = req.file;
    console.log(file);
    saveMetadata(file);
    res.send("file uploaded successfully !");
});
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
// get the local IP address
function getLocalIpAddress() {
    const ifaces = (0, os_1.networkInterfaces)();
    for (const name of Object.keys(ifaces)) {
        if (ifaces[name]) {
            for (const iface of ifaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return "localhost";
}
const options = {
    key: fs_1.default.readFileSync("server.key"),
    cert: fs_1.default.readFileSync("server.cert")
};
const PORT = 3000;
const LOCAL_IP = getLocalIpAddress();
(0, https_1.createServer)(options, app).listen(PORT, LOCAL_IP, () => {
    console.log(`Server running at https://${LOCAL_IP}:${PORT}/`);
});
