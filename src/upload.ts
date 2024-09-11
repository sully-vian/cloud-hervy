import { Request } from "express";
import fs from "fs";
import multer from "multer";
import { join } from "path";

const uploadsDir = join(__dirname, "uploads");

fs.mkdirSync(uploadsDir, { recursive: true }); // create "uploads/" if it doesn't exist

const storage = multer.diskStorage({
    destination: function (_req: Request, _file: Express.Multer.File, cb: (error: null, destination: string) => void) {
        cb(null, uploadsDir)
    },
    filename: function (_req: Request, file: Express.Multer.File, cb) {
        cb(null, file.originalname)
    }
});

const uploads = multer({ storage: storage });

export { uploads, uploadsDir };
