import express, { Request, RequestHandler } from "express";
import fs from "fs";
import { IncomingMessage } from "http";
import https from "https";
import { Socket } from "net";
import { WebSocketServer } from "ws";
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

const server = https.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Server running at https://${LOCAL_IP}:${PORT}`);
});

export const wss = new WebSocketServer({ noServer: true });

// WebSocket server listening for new connections
wss.on("connection", () => {
    console.log("Client connected");
});

wss.on("close", () => {
    console.log("Client disconnected");
});

// WebSocket server listening for upgrade requests
server.on("upgrade", (req: IncomingMessage, socket: Socket, head: Buffer) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
    });
});
