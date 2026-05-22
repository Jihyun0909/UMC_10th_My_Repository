import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
export declare const prisma: PrismaClient<{
    adapter: PrismaMariaDb;
    log: ("info" | "query" | "warn" | "error")[];
}, "info" | "query" | "warn" | "error", import("./generated/prisma/runtime/client.js").DefaultArgs>;
//# sourceMappingURL=db.config.d.ts.map