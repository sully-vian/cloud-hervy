import { Request, Response, Router } from "express";
import fs from "fs";
import { join } from "path";
import { uploadFile, metadataFile } from "./fileController";
import { uploads, uploadsDir } from "./upload";

export const router = Router();

router.get("/favicon.ico", (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, "..", "public", "logo.png"));
});

router.get("/", (_req: Request, res: Response) => {
    const rawData = fs.readFileSync(metadataFile, "utf8");
    const metadata = JSON.parse(rawData);
    res.render("home", { files: metadata });
});

router.post("/upload", uploads.single("new file"), uploadFile);

router.get("/download/:filePath", (req: Request, res: Response) => {
    const rawData: string = fs.readFileSync(metadataFile, "utf8");
    const metadata: { [key: string]: any } = JSON.parse(rawData);
    const filePath: string = req.params["filePath"];

    res.download(join(uploadsDir, filePath));
});