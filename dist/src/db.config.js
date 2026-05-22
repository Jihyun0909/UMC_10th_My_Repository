import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";
dotenv.config();
// 1. 실제 DB 접속 정보 (환경 변수를 사용하거나, 직접 적어둔 진짜 비번 적용)
const dbConfig = {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "test1234", // 🚨 데이터그립 들어갈 때 쓰는 진짜 비번!
    database: process.env.DB_NAME || "umc_prisma",
    port: parseInt(process.env.DB_PORT || "3306"),
};
// 2. Prisma용 마리아DB 어댑터 생성
const adapter = new PrismaMariaDb(dbConfig);
// 3. 전체 프로젝트에서 공통으로 사용할 청정 PrismaClient 객체 내보내기 (Export)
export const prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});
//# sourceMappingURL=db.config.js.map