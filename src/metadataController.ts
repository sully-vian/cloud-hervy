import { Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';

/**
 * Path to the metadata file
 */
export const metadataFilePath: string = join(__dirname, '..', 'metadata.json');

/**
 * Update the metadata file with the new file metadata
 * @param req Request object
 * @param res Response object
 * @returns An object containing the updated metadata
 */
export async function updateMetadata(req: Request, _res: Response): Promise<{ [key: string]: any }> {
    if (!req.file) {
        // should not happen
        console.error("No file uploaded");
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

    await fs.promises.writeFile(metadataFilePath, JSON.stringify(metadata, null, 2), "utf-8");

    return metadata;
}

/**
 * Get the metadata from the metadata file as an object
 * @returns An object containing the metadata
 */
export async function getMetadata(): Promise<{ [key: string]: any }> {
    const rawData: string = await fs.promises.readFile(metadataFilePath, "utf8");
    return JSON.parse(rawData);
}