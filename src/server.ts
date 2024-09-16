import express from "express";
import fs from "fs";
import https from "https";
import { metadataFile } from "./fileController";
import { getLocalIpAddress } from "./networkUtils";
import { router } from "./router";
import { uploadsDir } from "./upload";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(router);

// create uploads directory and metadata file if they don't exist
fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(metadataFile)) {
    fs.writeFileSync(metadataFile, "{}", "utf-8");
}

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

const PORT = 3000;
const LOCAL_IP = getLocalIpAddress();

https.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    // time is the currennt time hh:mm:ss
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Server running at https://${LOCAL_IP}:${PORT}`);
});