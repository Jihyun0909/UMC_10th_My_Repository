import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";

dotenv.config();

// 1. 로컬 DB 계정 정보 설정
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "test1234", // 👈 데이터그립 들어갈 때 쓰는 비밀번호!
  database: process.env.DB_NAME || "umc_prisma",
  port: Number(process.env.DB_PORT) || 3306,
};

// 2. 프리즈마 전용 마리아DB 어댑터 객체 생성
const adapter = new PrismaMariaDb(dbConfig);

/**
 * 7주차 TSOA 및 전역 에러 핸들링 연동을 위한 어댑터 주입형 Prisma 인스턴스
 * (Prisma Client 생성자 검증 에러를 완벽하게 해소합니다)
 */
export const prisma = new PrismaClient({
  adapter: adapter, // 👈 생성자 에러 원인이었던 adapter를 명시적으로 전달!
  log: ["query", "info", "warn", "error"],
});