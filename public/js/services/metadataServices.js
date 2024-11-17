/**
 * Fetch files metadata from server (call once page is loaded)
 * @returns {Promise} - files metadata
 */
export async function getFilesMetadata() {
    // fetch files metadata
    const res = await fetch("/metadata");
    if (!res.ok) {
        throw new Error("failed to load files metadata");
    }

    const filesMetadata = await res.json();
    return filesMetadata;
}