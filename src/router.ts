import { Router } from "express";
import fs from "fs";
import { join } from "path";
import { uploadFile, metadataFile } from "./fileController";
import { uploads, uploadsDir } from "./upload";

const router = Router();

router.get("/favicon.ico", (_req, res) => {
    res.sendFile(join(__dirname, "public", "logo.png"));
});

router.get("/", (_req, res) => {
    const rawData = fs.readFileSync(metadataFile, "utf8");
    const metadata = JSON.parse(rawData);
    res.render("home", { files: metadata });
});

router.post("/", uploads.single("new file"), uploadFile);

export default router;