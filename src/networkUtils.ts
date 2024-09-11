import { networkInterfaces } from "os";

/**
 * Get the local IP address of the machine, if it exists, otherwise return
 * "localhost"
 *
 * @returns the local IP address of the machine
 */
export function getLocalIpAddress(): string {
    const ifaces = networkInterfaces();
    for (const name of Object.keys(ifaces)) {
        if (ifaces[name]) {
            for (const iface of ifaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    return "localhost";
}