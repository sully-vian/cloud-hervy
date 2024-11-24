import { Response } from 'express';

/**
 * Render and send the preview list of files with metadata
 * @param res Response object
 * @param metadata Metadata of the files
 */
export async function renderAndSendPreviewList(res: Response, metadata: { [key: string]: string }) {
    res.render("_file-previews-list", { filesMetadata: metadata }, (err: Error, html: string) => {
        if (err) {
            res.status(500).send("Error rendering updated preview list");
            return;
        }
        res.json({
            html: html,
            metadata: metadata
        });
    });
};