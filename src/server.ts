import express from "express";
import https from "https";
import fs from "fs";
import router from "./router";
import { getLocalIpAddress } from "./networkUtils";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(router);

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
};

const PORT = 3000;
const LOCAL_IP = getLocalIpAddress();

https.createServer(options, app).listen(PORT, LOCAL_IP, () => {
    console.log(`Server running at https://${LOCAL_IP}:${PORT}`);
});