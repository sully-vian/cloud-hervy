import { Request, Response } from "express";
import fs from "fs";
import { join } from "path";
import { uploads, uploadsDir } from "./upload";

/**
 * @deprecated
 */
export const metadataFile = join(__dirname, "..", "metadata.json");

/**
 * Save the metadata of the uploaded file to the metadata file
 * @param file Uploaded file
 * @param fileDesc Description of the file
 * @returns void
 * @deprecated
 */
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
}

/**
 * Upload to the server the file with field name "new file" and save its metadata
 * @param req Request object
 * @param res Response object
 * @returns void
 * @deprecated
 */
export function handleFileUpload(req: Request, res: Response): void {
    uploads.single("new file")(req, res, (err) => {
        if (err) {
            return res.status(400).send("Error uploading file");
        }
        if (!req.file) {
            // should not happen
            return res.status(400).send("No file selected !");
        }

        const file: Express.Multer.File = req.file;
        console.log(`Uploading ${file.originalname}...`)
        saveMetadata(file, req.body["file desc"]);

        res.json({ success: true, message: "File uploaded successfully !" });
    });
}

/**
 * Send an HTML preview of the uploaded file to the client
 * @param req Request object
 * @param res Response object
 * @returns void
 * @deprecated
 */
export function sendHTMLPreview(req: Request, res: Response): void {
    res.render("_file-preview", { file: req.file }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error rendering home page");
            return;
        }
        console.log("Sending HTML preview...");
        res.send(html);
    });
}

/**
 * Download a file from the server (send download prompt to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function downloadFile(req: Request, res: Response): void {
    const fileName: string = req.params["fileName"];
    console.log(`Downloading ${fileName}...`);
    res.download(join(uploadsDir, fileName));
}

/**
 * Save the file uploaded by the client
 * @param req Request object
 * @param res Response object
 * @returns void
 */
export function saveFile(req: Request, res: Response): void {
    uploads.single("new file")(req, res, (err) => {
        if (err) {
            res.status(400).send("Error uploading file");
            return;
        } else if (!req.file) {
            res.status(400).send("No file selected !");
            return;
        }
    });
}