import { Request, Response } from 'express';
import { downloadFile, saveFile } from './fileController';
import { getMetadata, updateMetadata } from './metadataController';

/**
 * Handle the main route
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function mainRoute(_req: Request, res: Response): void {
    // get metadata
    const metadata = getMetadata();

    // render home page with metadata
    try {
        res.render("home", { filesMetadata: metadata });
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.status(500).send("Internal Server Error");
    }
}

/**
 * Handle the metadata route (send metadata to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function metadataRoute(_req: Request, res: Response): void {
    // get metadata
    const metadata = getMetadata();

    // send metadata
    res.json({ metadata: metadata });
}

/**
 * Handle the instructions to upload a file (except the file saving, that's in the middleware).
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export async function uploadRoute(req: Request, res: Response): Promise<void> {

    // update metadata
    const updatedMetadata: { [key: string]: string } = await updateMetadata(req, res);

    // render file list preview with updated metadata
    console.log("Rendering and sending HTML...");
    res.render("_file-preview-list", { filesMetadata: updatedMetadata }, (err: Error, html: string) => {
        if (err) {
            res.status(500).send("Error rendering updated preview list");
            return;
        }
        res.json({
            html: html,
            metadata: updatedMetadata
        });
    });
    console.log("HTML sent !");
}

/**
 * Handle the instructions to download a file
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function downloadRoute(req: Request, res: Response): void {
    downloadFile(req, res);
}