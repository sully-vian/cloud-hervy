import { Request } from "express";
import multer from "multer";
import { join } from "path";

const uploadsDir = join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
    destination: function (_req: Request, _file: Express.Multer.File, cb: (error: null, destination: string) => void) {
        cb(null, uploadsDir)
    },
    filename: function (_req: Request, file: Express.Multer.File, cb) {
        cb(null, file.originalname)
    }
});

const uploads: multer.Multer = multer({ storage: storage });

export { uploads, uploadsDir };
