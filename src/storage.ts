import { Request } from "express";
import multer from "multer";
import { join } from "path";

export const storageDir: string = join(__dirname, "..", "storage");

export const storage: multer.Multer = multer({
    storage: multer.diskStorage({
        destination: function (_req: Request, _file: Express.Multer.File, cb: (error: null, destination: string) => void) {
            cb(null, storageDir)
        },
        filename: function (_req: Request, file: Express.Multer.File, cb) {
            cb(null, file.originalname)
        }
    })
});
