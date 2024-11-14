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
    res.render("home", { filesMetadata: metadata }, (err, html) => {
        if (err) {
            console.error("Error rendering home page", err);
            return res.status(500).send("Error rendering home page");
        }

        res.send(html);
    });
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
 * Handle the instructions to upload a file
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function uploadRoute(req: Request, res: Response): void {
    // save file
    saveFile(req, res);

    // update metadata
    const updatedMetadata: { [key: string]: string } = updateMetadata(req, res);

    // render file list preview with updated metadata
    res.render("_file-preview-list", { filesMetadata: updatedMetadata }, (err, html) => {
        if (err) {
            return res.status(500).send("Error rendering file list preview");
        }

        // send metadata & rendered html
        res.json({
            filesMetadata: updatedMetadata,
            html: html
        });
    });
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