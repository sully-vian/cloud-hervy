"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const fileController_1 = require("./fileController");
const upload_1 = require("./upload");
const router = (0, express_1.Router)();
router.get("/favicon.ico", (_req, res) => {
    res.sendFile((0, path_1.join)(__dirname, "public", "logo.png"));
});
router.get("/", (_req, res) => {
    const uploadedFiles = fs_1.default.readdirSync(upload_1.uploadsDir);
    res.render("home", { files: uploadedFiles });
});
router.post("/", upload_1.uploads.single("new file"), fileController_1.uploadFile);
exports.default = router;
