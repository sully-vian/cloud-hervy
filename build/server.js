"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const networkUtils_1 = require("./networkUtils");
const router_1 = require("./router");
const storage_1 = require("./storage");
const metadataController_1 = require("./metadataController");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(router_1.router);
// create storage directory and metadata file if they don't exist
fs_1.default.mkdirSync(storage_1.storageDir, { recursive: true });
if (!fs_1.default.existsSync(metadataController_1.metadataFilePath)) {
    fs_1.default.writeFileSync(metadataController_1.metadataFilePath, "{}", "utf-8");
}
const options = {
    key: fs_1.default.readFileSync("server.key"),
    cert: fs_1.default.readFileSync("server.cert")
};
const PORT = 6969;
const LOCAL_IP = (0, networkUtils_1.getLocalIpAddress)();
const server = https_1.default.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Server running at https://${LOCAL_IP}:${PORT}`);
});
