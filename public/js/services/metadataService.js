export let filesMetadata = {};

/**
 * Update the files metadata (fetch if not provided)
 * @param {Object} newFilesMetadata - The new files metadata
 * @returns {void}
 */
export async function updateFilesMetadata(newFilesMetadata) {
    if (newFilesMetadata) {
        filesMetadata = newFilesMetadata;
        return;
    }

    // fetch files metadata
    console.log("fetching /metadata");
    const res = await fetch("/metadata");
    if (!res.ok) {
        throw new Error("failed to load files metadata");
    }
    filesMetadata = await res.json();
}