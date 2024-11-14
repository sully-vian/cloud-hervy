import { Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';

/**
 * Path to the metadata file
 */
export const metadataFilePath = join(__dirname, '..', 'metadata.json');

/**
 * Update the metadata file with the new file metadata
 * @param req Request object
 * @param res Response object
 * @returns An object containing the updated metadata
 */
export function updateMetadata(req: Request, res: Response): { [key: string]: any } {
    if (!req.file) {
        // should not happen
        res.status(400).send("No file selected !");
        return {};
    }

    console.log("Updating metadata...");
    const rawData: string = fs.readFileSync(metadataFilePath, "utf8"); // read metadata file
    const metadata: { [key: string]: any } = JSON.parse(rawData); // parse metadata file

    const file: Express.Multer.File = req.file;
    metadata[file.originalname] = {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        description: req.body["file desc"]
    }

    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), "utf-8");

    return metadata;
}

/**
 * Get the metadata from the metadata file as an object
 * @returns An object containing the metadata
 */
export function getMetadata(): { [key: string]: any } {
    const rawData: string = fs.readFileSync(metadataFilePath, "utf8");
    return JSON.parse(rawData);
}