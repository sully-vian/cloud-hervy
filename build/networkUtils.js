"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIpAddress = getLocalIpAddress;
const os_1 = require("os");
/**
 * Get the local IP address of the machine, if it exists, otherwise return
 * "localhost"
 *
 * @returns the local IP address of the machine
 */
function getLocalIpAddress() {
    const ifaces = (0, os_1.networkInterfaces)();
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
