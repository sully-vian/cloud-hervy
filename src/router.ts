import { Request, Response, Router } from "express";
import fs from "fs";
import { join } from "path";
import { uploadFile, sendHTMLPreview, downloadFile, metadataFile } from "./fileController";
import { uploads } from "./upload";

export const router = Router();

// favicon route
router.get("/favicon.ico", (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, "..", "public", "logo.png"));
});

// main route
router.get("/", (_req: Request, res: Response) => {
    const rawData = fs.readFileSync(metadataFile, "utf8");
    const metadata = JSON.parse(rawData);
    res.render("home", { filesMetadata: metadata });
});

// obtain metadata route (used for pages updates without refreshing)
router.get("/metadata", (_req: Request, res: Response) => {
    const rawData = fs.readFileSync(metadataFile, "utf8");
    const metadata = JSON.parse(rawData);
    res.json(metadata);
});

// upload route
router.post("/upload", uploads.single("new file"), (req: Request, res: Response) => {
    uploadFile(req, res);
    sendHTMLPreview(req, res);
});

// download route (the def of the route sets that "fileName" is a parameter)
router.get("/download/:fileName", downloadFile);


