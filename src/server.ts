import express, { Request, RequestHandler } from "express";
import fs from "fs";
import path from "path";
import https from "https";
import { getLocalIpAddress } from "./networkUtils";
import { router } from "./router";
import { uploadsDir } from "./upload";
import { metadataFilePath } from "./metadataController";

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(router);

// create uploads directory and metadata file if they don't exist
fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(metadataFilePath)) {
    fs.writeFileSync(metadataFilePath, "{}", "utf-8");
}

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

const PORT = 6969;
const LOCAL_IP = getLocalIpAddress();

const server = https.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Server running at https://${LOCAL_IP}:${PORT}`);
});

