import { Request, Response, Router, NextFunction } from "express";
import { downloadRoute, mainRoute, metadataRoute, uploadRoute } from "./handleRoutes";

export const router = Router();

// logging middleware
function logRoute(req: Request, _res: Response, next: NextFunction) {
    console.log("Route called: " + req.originalUrl);
    next();
}

router.use(logRoute);

// main route
router.get("/", (req: Request, res: Response) => {
    mainRoute(req, res);
});

// metadata route
router.get("/metadata", (req: Request, res: Response) => {
    metadataRoute(req, res);
});

// upload route
router.post("/upload", (req: Request, res: Response) => {
    uploadRoute(req, res);
});

// download route (the def of the route sets that "fileName" is a parameter)
router.get("/download/:fileName", (req: Request, res: Response) => {
    downloadRoute(req, res);
});

