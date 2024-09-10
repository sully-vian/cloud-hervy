import { Request, Response } from "express";
import fs from "fs";
import { join } from "path";

const metadataFile = join(__dirname, "metadata.json");

function saveMetadata(file: Express.Multer.File): void {
    let metadata: { [key: string]: any } = [];
    if (fs.existsSync(metadataFile)) { // if metadata file exists
        const rawData = fs.readFileSync(metadataFile, "utf8"); // read metadata file
        metadata = JSON.parse(rawData); // parse metadata file
    }

    // add new file metadata
    metadata[file.originalname] = {
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString(),
        path: file.path // useless until the uploadsDir is oragnised in multiple directories
    };

    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2)); // write metadata to file
}

export function uploadFile(req: Request, res: Response) {
    if (!req.file) {
        return res.send("no file selected !");
    }

    const file: Express.Multer.File = req.file;
    saveMetadata(file);

    res.send("file uploaded successfully !");
}