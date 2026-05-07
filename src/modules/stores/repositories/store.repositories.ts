import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateStoreRequestDto } from "../dtos/store.dtos.js";

// 1. 지역 존재 여부 확인
export const checkRegionExists = async (regionId: number): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT EXISTS (SELECT 1 FROM region WHERE id = ?) as isExist;`,
    [regionId]
  );
  return rows[0]?.isExist === 1;
};

// 2. 가게 추가 (ERD 기준: region_id, category_id 포함)
export const addStore = async (regionId: number, data: CreateStoreRequestDto): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO store (region_id, category_id, name, address) VALUES (?, ?, ?, ?);`,
    [regionId, data.categoryId, data.name, data.address]
  );
  return result.insertId;
};