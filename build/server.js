"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const fileController_1 = require("./fileController");
const networkUtils_1 = require("./networkUtils");
const router_1 = require("./router");
const upload_1 = require("./upload");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(router_1.router);
// create uploads directory and metadata file if they don't exist
fs_1.default.mkdirSync(upload_1.uploadsDir, { recursive: true });
if (!fs_1.default.existsSync(fileController_1.metadataFile)) {
    fs_1.default.writeFileSync(fileController_1.metadataFile, "{}", "utf-8");
}
const options = {
    key: fs_1.default.readFileSync("server.key"),
    cert: fs_1.default.readFileSync("server.cert")
};
const PORT = 3000;
const LOCAL_IP = (0, networkUtils_1.getLocalIpAddress)();
const server = https_1.default.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Server running at https://${LOCAL_IP}:${PORT}`);
});
