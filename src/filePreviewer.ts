import { Response } from "express";
import { getMetadata } from "./metadataController";
import { join } from "path";
import { storageDir } from "./storage";

const previewableMimeTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "text/plain",
    "text/markdown",
    "audio/mpeg"
];

export async function previewFile(res: Response, fileName: string): Promise<void> {
    const metadata = await getMetadata();
    const mimeType = metadata[fileName]["mimetype"];

    if (!previewableMimeTypes.includes(mimeType)) {
        res.status(400).send("File type not supported for preview");
        return;
    }

    res.setHeader("Content-Type", mimeType);
    res.sendFile(join(storageDir, fileName));

}