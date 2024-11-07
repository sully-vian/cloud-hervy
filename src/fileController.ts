import { Request, Response } from "express";
import fs from "fs";
import { join } from "path";
import WebSocket from "ws";
import { wss } from "./server";
import { uploadsDir } from "./upload";

export const metadataFile = join(__dirname, "..", "metadata.json");

function saveMetadata(file: Express.Multer.File, fileDesc: string): void {
    console.log("Saving metadata...")
    const rawData = fs.readFileSync(metadataFile, "utf8"); // read metadata file
    const metadata: { [key: string]: any } = JSON.parse(rawData); // parse metadata file


    // add new file metadata
    metadata[file.originalname] = {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        description: fileDesc
    };

    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2), "utf-8"); // write metadata to file

    // Notify all connected clients about the new file
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const fileMetadata = JSON.stringify({ type: "newFile", file: metadata[file.originalname] });
            client.send(fileMetadata);
        }
    });
}

export function uploadFile(req: Request, res: Response) {
    if (!req.file) {
        // should not happen
        return res.send("no file selected !");
    }

    const file: Express.Multer.File = req.file;

    console.log(`Uploading ${file.originalname}...`)
    saveMetadata(file, req.body["file desc"]);

    res.json({ success: true, message: "file uploaded successfully !" });
}

export function sendHTMLPreview(req: Request, res: Response) {
    res.render("_file-preview", { file: req.file }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error rendering home page");
            return;
        }
        res.send(html);
    });
}

export function downloadFile(req: Request, res: Response) {
    const fileName: string = req.params["fileName"];
    console.log(`Downloading ${fileName}...`);
    res.download(join(uploadsDir, fileName));
}
