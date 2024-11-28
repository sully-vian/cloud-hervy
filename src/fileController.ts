import { Request, Response } from "express";
import { join } from "path";
import { storageDir } from "./storage";
import { unlink } from "fs/promises";

/**
 * Download a file from the server (send download prompt to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function downloadFile(req: Request, res: Response): void {
    const fileName: string = req.params["fileName"];
    res.download(join(storageDir, fileName));
}

/**
 * Delete a file from the server
 * @param fileName Name of the file to delete
 */
export async function deleteFile(fileName: string): Promise<void> {
    const filePath: string = join(storageDir, fileName);
    await unlink(filePath);
}
