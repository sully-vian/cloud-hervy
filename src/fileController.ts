import { Request, Response } from "express";
import fs from "fs";
import { join, relative } from "path";
import { uploadsDir } from "./upload";

export const metadataFile = join(__dirname, "..", "metadata.json");

function saveMetadata(file: Express.Multer.File, fileDesc: string): void {
    const rawData = fs.readFileSync(metadataFile, "utf8"); // read metadata file
    const metadata: { [key: string]: any } = JSON.parse(rawData); // parse metadata file

    const relativePath = relative(uploadsDir, file.path); // get relative path of file

    // add new file metadata
    metadata[relativePath] = {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        path: relativePath, // useless until the uploadsDir is organised in multiple directories
        description: fileDesc
    };

    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2), "utf-8"); // write metadata to file
}

export function uploadFile(req: Request, res: Response) {
    if (!req.file) {
        // should not happen
        return res.send("no file selected !");
    }

    const file: Express.Multer.File = req.file;
    saveMetadata(file, req.body["file desc"]);

    res.redirect("/");
    // res.send("file uploaded successfully !");
}