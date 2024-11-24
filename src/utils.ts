import { Response } from 'express';

/**
 * Render and send the preview list of files with metadata
 * @param res Response object
 * @param metadata Metadata of the files
 */
export async function renderAndSendPreviewList(res: Response, metadata: { [key: string]: string }) {
    console.log("Rendering and sending HTML & metadata...");
    res.render("_file-preview-list", { filesMetadata: metadata }, (err: Error, html: string) => {
        if (err) {
            res.status(500).send("Error rendering updated preview list");
            return;
        }
        res.json({
            html: html,
            metadata: metadata
        });
    });
    console.log("HTML & metadata sent")
};