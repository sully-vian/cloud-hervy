import { Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';

/**
 * Path to the metadata file
 */
export const metadataFilePath: string = join(__dirname, '..', 'metadata.json');

/**
 * Update the metadata file with the new file metadata
 * @param file File to add metadata for
 * @param fileDesc Description of the file
 */
export async function addAndGetMetadata(file: Express.Multer.File, fileDesc: string): Promise<{ [key: string]: any }> {

    console.log("Updating metadata...");
    const rawData: string = fs.readFileSync(metadataFilePath, "utf8"); // read metadata file
    const metadata: { [key: string]: any } = JSON.parse(rawData); // parse metadata file

    metadata[file.originalname] = {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        description: fileDesc
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

/**
 * Delete the metadata of a file
 * @param fileName Name of the file to delete
 * @returns The updated metadata
 */
export async function removeAndGetMetadata(fileName: string): Promise<{ [key: string]: any }> {
    const rawData: string = fs.readFileSync(metadataFilePath, "utf8");
    const metadata: { [key: string]: any } = JSON.parse(rawData);
    delete metadata[fileName];
    await fs.promises.writeFile(metadataFilePath, JSON.stringify(metadata, null, 2), "utf-8");

    return metadata;
}