"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const router_1 = __importDefault(require("./router"));
const networkUtils_1 = require("./networkUtils");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(router_1.default);
const options = {
    key: fs_1.default.readFileSync("server.key"),
    cert: fs_1.default.readFileSync("server.cert")
};
const PORT = 3000;
const LOCAL_IP = (0, networkUtils_1.getLocalIpAddress)();
https_1.default.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    console.log(`Server running at https://${LOCAL_IP}:${PORT}`);
});
