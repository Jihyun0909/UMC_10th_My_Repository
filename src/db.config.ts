import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mysql from "mysql2/promise"; // 👈 다시 이거 하나만 쓰면 돼!
import dotenv from "dotenv";

dotenv.config();

// 1. 실제 DB 접속 정보 (여기에 지현이 진짜 비번 적기!)
const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "test1234", // 🚨 데이터그립 들어갈 때 쓰는 진짜 비번!
  database: "umc_prisma",
  port: 3306,
};

// 2. Prisma용 마리아DB 어댑터 생성 (설정 객체를 바로 넣어주기!)
const adapter = new PrismaMariaDb(dbConfig); // 👈 pool 객체 대신 dbConfig를 바로 쏙!

// 3. PrismaClient에 어댑터 주입
export const prisma = new PrismaClient({
  adapter, 
  log: ["query", "info", "warn", "error"],
});

// 4. 기존 Express 앱에서 쓰던 Promise용 pool
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});