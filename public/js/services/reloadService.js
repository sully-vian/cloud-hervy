import { updateFromResponse } from "../utils.js";

export async function handleReload() {
    const res = await fetch("/reload", {
        method: "GET"
    });
    if (!res.ok) {
        throw new Error("Failed to reload files");
    }
    updateFromResponse(res);
}