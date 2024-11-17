"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = mainRoute;
exports.metadataRoute = metadataRoute;
exports.uploadRoute = uploadRoute;
exports.downloadRoute = downloadRoute;
const fileController_1 = require("./fileController");
const metadataController_1 = require("./metadataController");
/**
 * Handle the main route
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function mainRoute(_req, res) {
    // get metadata
    const metadata = (0, metadataController_1.getMetadata)();
    // render home page with metadata
    res.render("home", { filesMetadata: metadata }, (err, html) => {
        if (err) {
            console.error("Error rendering home page", err);
            return res.status(500).send("Error rendering home page");
        }
        res.send(html);
    });
}
/**
 * Handle the metadata route (send metadata to the client)
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function metadataRoute(_req, res) {
    // get metadata
    const metadata = (0, metadataController_1.getMetadata)();
    // send metadata
    res.json({ metadata: metadata });
}
/**
 * Handle the instructions to upload a file
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function uploadRoute(req, res) {
    // save file
    (0, fileController_1.saveFile)(req, res);
    // update metadata
    const updatedMetadata = (0, metadataController_1.updateMetadata)(req, res);
    // render file list preview with updated metadata
    res.render("_file-preview-list", { filesMetadata: updatedMetadata }, (err, html) => {
        if (err) {
            return res.status(500).send("Error rendering file list preview");
        }
        // send metadata & rendered html
        res.json({
            filesMetadata: updatedMetadata,
            html: html
        });
    });
}
/**
 * Handle the instructions to download a file
 * @param req Request object
 * @param res Response object
 * @returns void
 */
function downloadRoute(req, res) {
    (0, fileController_1.downloadFile)(req, res);
}
