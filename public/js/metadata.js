/**
 * Fetch all files metadata from server and updates filesMetadata variable
 * @returns {*} - metadata
 */
export async function getFilesMetadata() {
    try {
        const response = await fetch("/metadata")
        if (!response.ok) {
            throw new Error("Failed to fetch metadata");
        }
        const metadata = await response.json();
        return metadata;
    } catch (error) {
        console.error("Error", error);
    }
}