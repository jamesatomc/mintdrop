import { NETWORK } from "../config/constants";

// Blockchain explorer link
const ExplorerBase = "https://explorer.sui.io";

// link to transaction
export function TransacitonLink(digest: string, module: string) {
    return `${ExplorerBase}/txblock/${digest}?module=${module}&network=${NETWORK}`
}

// link to object
export function ObjectLink(objectId: string) {
    return `${ExplorerBase}/object/${objectId}?network=${NETWORK}`;
}

// link to package
export function PackageLink(packageId: string) {
    return `${ExplorerBase}/object/${packageId}?network=${NETWORK}`;
}
