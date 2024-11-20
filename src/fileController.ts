import { Request, Response } from "express";
import { join } from "path";
import { uploads, uploadsDir } from "./upload";

/**
 * Download a file from the server (send download prompt to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function downloadFile(req: Request, res: Response): void {
    const fileName: string = req.params["fileName"];
    console.log(`Downloading ${fileName}...`);
    res.download(join(uploadsDir, fileName));
}

/**
 * Save the file uploaded by the client
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function saveFile(_req: Request, _res: Response): void {
    uploads.single("new file");
}