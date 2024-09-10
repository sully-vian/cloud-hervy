import { Request, Response } from "express";
import fs from "fs";
import { createServer } from "https";
import multer from "multer";
import { networkInterfaces } from "os";
import path, { join } from "path";

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const uploadsDir = "uploads/"
fs.mkdirSync(uploadsDir, { recursive: true }); // create "uploads/" if it doesn't exist

const storage = multer.diskStorage({
    destination: function (_req: Request, _file: Express.Multer.File, cb: (error: null, destination: string) => void) {
        cb(null, uploadsDir)
    },
    filename: function (_req: Request, file: Express.Multer.File, cb) {
        cb(null, file.originalname)
    }
});
const uploads = multer({ storage: storage });

const metadataFile = "metadata.json";

app.get("/favicon.ico", (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, "public", "logo.png"));
});

app.get("/", (_req: Request, res: Response) => {
    const uploadedFiles = fs.readdirSync(uploadsDir);
    res.render("home", { files: uploadedFiles });
});

app.post("/", uploads.single("new file"), (req: Request, res: Response) => {
    if (!req.file) {
        return res.send("no file selected !");
    }

    const file: Express.Multer.File = req.file;
    console.log(file);

    saveMetadata(file);

    res.send("file uploaded successfully !");
});

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

// get the local IP address
function getLocalIpAddress(): string {
    const ifaces = networkInterfaces();
    for (const name of Object.keys(ifaces)) {
        if (ifaces[name]) {
            for (const iface of ifaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return "localhost";
}

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

const PORT: number = 3000;
const LOCAL_IP: string = getLocalIpAddress();
createServer(options, app).listen(PORT, LOCAL_IP, () => {
    console.log(`Server running at https://${LOCAL_IP}:${PORT}/`);
});