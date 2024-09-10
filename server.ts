import { Request, Response } from "express";
import fs from "fs";
import { createServer } from "https";
import { networkInterfaces } from "os";
import { join } from "path";
import multer from "multer"

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const uploadsDir = "uploads/"
fs.mkdirSync(uploadsDir, { recursive: true }); // create "uploads/" if it doesn't exist

const storage = multer.diskStorage({
    destination: function (_: Request, __: Express.Multer.File, cb: (error: null, destination: string) => void) {
        cb(null, uploadsDir)
    },
    filename: function (_: Request, file: Express.Multer.File, cb) {
        cb(null, file.originalname)
    }
});
const uploads = multer({ storage: storage });

app.get("/favicon.ico", (_: Request, res: Response) => {
    res.sendFile(join(__dirname, "public", "logo.png"));
});

app.get("/", (_: Request, res: Response) => {
    const uploadedFiles = fs.readdirSync(uploadsDir);
    res.render("home", { files: uploadedFiles });
});

app.post("/", uploads.single("new file"), (_: Request, res: Response) => {
    res.send("file uploaded successfully !");
});

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