"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAndSendPreviewList = renderAndSendPreviewList;
/**
 * Render and send the preview list of files with metadata
 * @param res Response object
 * @param metadata Metadata of the files
 */
function renderAndSendPreviewList(res, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("_file-previews-list", { filesMetadata: metadata }, (err, html) => {
            if (err) {
                res.status(500).send("Error rendering updated preview list");
                return;
            }
            res.json({
                html: html,
                metadata: metadata
            });
        });
    });
}
;
