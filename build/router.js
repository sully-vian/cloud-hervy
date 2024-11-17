"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const handleRoutes_1 = require("./handleRoutes");
exports.router = (0, express_1.Router)();
// logging middleware
function logRoute(req, _res, next) {
    console.log("Route called: " + req.originalUrl);
    next();
}
exports.router.use(logRoute);
// main route
exports.router.get("/", (req, res) => {
    (0, handleRoutes_1.mainRoute)(req, res);
});
// metadata route
exports.router.get("/metadata", (req, res) => {
    (0, handleRoutes_1.metadataRoute)(req, res);
});
// upload route
exports.router.post("/upload", (req, res) => {
    (0, handleRoutes_1.uploadRoute)(req, res);
});
// download route (the def of the route sets that "fileName" is a parameter)
exports.router.get("/download/:fileName", (req, res) => {
    (0, handleRoutes_1.downloadRoute)(req, res);
});
