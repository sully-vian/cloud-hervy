import { Request, Response, Router, NextFunction } from "express";
import { downloadRoute, mainRoute, reloadRoute, uploadRoute, deleteRoute, previewRoute } from "./handleRoutes";
import { storage } from "./storage";

export const router: Router = Router();

// logging middleware
function logRoute(req: Request, _res: Response, next: NextFunction) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] Route called: ${req.originalUrl}`);
    next();
}

router.use(logRoute);

// main route
router.get("/", (req: Request, res: Response) => {
    mainRoute(req, res);
});

// reaload route
router.get("/reload", (req: Request, res: Response) => {
    reloadRoute(req, res);
});

// upload route is a bit different because some of its logic (file saving) is in the middleware
router.post("/upload", storage.single("new file"), (req: Request, res: Response) => {
    // "new file" is name of input tag
    uploadRoute(req, res);
});

// download route (the def of the route sets that "fileName" is a parameter)
router.get("/download/:fileName", (req: Request, res: Response) => {
    downloadRoute(req, res);
});

router.delete("/delete/:fileName", (req: Request, res: Response) => {
    deleteRoute(req, res);
});

router.get("/preview/:fileName", (req: Request, res: Response) => {
    previewRoute(req, res);
});