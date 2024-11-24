"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const handleRoutes_1 = require("./handleRoutes");
const storage_1 = require("./storage");
exports.router = (0, express_1.Router)();
// logging middleware
function logRoute(req, _res, next) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Route called: ${req.originalUrl}`);
    next();
}
exports.router.use(logRoute);
// main route
exports.router.get("/", (req, res) => {
    (0, handleRoutes_1.mainRoute)(req, res);
});
// reaload route
exports.router.get("/reload", (req, res) => {
    (0, handleRoutes_1.reloadRoute)(req, res);
});
// upload route is a bit different because some of its logic (file saving) is in the middleware
exports.router.post("/upload", storage_1.storage.single("new file"), (req, res) => {
    // "new file" is name of input tag
    (0, handleRoutes_1.uploadRoute)(req, res);
});
// download route (the def of the route sets that "fileName" is a parameter)
exports.router.get("/download/:fileName", (req, res) => {
    (0, handleRoutes_1.downloadRoute)(req, res);
});
exports.router.delete("/delete/:fileName", (req, res) => {
    (0, handleRoutes_1.deleteRoute)(req, res);
});
