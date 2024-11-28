import { Request, Response } from 'express';
import { deleteFile, downloadFile } from './fileController';
import { getMetadata, addAndGetMetadata, removeAndGetMetadata } from './metadataController';
import { renderAndSendPreviewList } from './utils';
import { devNull } from 'os';
import { previewFile } from './filePreviewer';

/**
 * Handle the main route
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export async function mainRoute(_req: Request, res: Response): Promise<void> {
    // get metadata
    const metadata = await getMetadata();

    // render home page with metadata
    try {
        res.render("home", {
            filesMetadata: {},
            loading: true
        });
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.status(500).send("Internal Server Error");
    }
}

/**
 * Send new metadata and HTML preview list
 * @param _req Request object (not used)
 * @param res Response object
 */
export async function reloadRoute(_req: Request, res: Response): Promise<void> {
    // get metadata
    const metadata = await getMetadata();
    renderAndSendPreviewList(res, metadata);
}

/**
 * Handle the instructions to upload a file (except the file saving, that's in the middleware).
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export async function uploadRoute(req: Request, res: Response): Promise<void> {
    if (!req.file) {
        // should not happen
        console.error("No file uploaded");
        return;
    }
    const updatedMetadata: { [key: string]: string } = await addAndGetMetadata(req.file, req.body["file desc"]);
    renderAndSendPreviewList(res, updatedMetadata);
}

/**
 * Handle the instructions to download a file
 * @param req Request object
 * @param res Response object
 */
export function downloadRoute(req: Request, res: Response): void {
    downloadFile(req, res);
}

/**
 * Handle the instructions to delete a file
 * @param req Request object
 * @param res Response object
 */
export async function deleteRoute(req: Request, res: Response): Promise<void> {
    deleteFile(req.params["fileName"]);
    const updatedMetadata = await removeAndGetMetadata(req.params["fileName"]);
    renderAndSendPreviewList(res, updatedMetadata);
}

export async function previewRoute(req: Request, res: Response): Promise<void> {
    previewFile(res, req.params["fileName"]);
}