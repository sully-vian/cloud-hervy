import { Router } from "express";
import fs from "fs";
import { join } from "path";
import { uploadFile } from "./fileController";
import { uploads, uploadsDir } from "./upload";

const router = Router();

router.get("/favicon.ico", (_req, res) => {
    res.sendFile(join(__dirname, "public", "logo.png"));
});

router.get("/", (_req, res) => {
    const uploadedFiles = fs.readdirSync(uploadsDir);
    res.render("home", { files: uploadedFiles });
});

router.post("/", uploads.single("new file"), uploadFile);

export default router;