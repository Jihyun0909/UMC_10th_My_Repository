import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateReviewRequestDto } from "../dtos/review.dto.js";

// 1. 가게 존재 여부 확인
export const checkStoreExists = async (storeId: number): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT EXISTS (SELECT 1 FROM store WHERE id = ?) as isExist;`,
    [storeId]
  );
  return rows[0]?.isExist === 1;
};

// 2. 리뷰 추가 (ERD 기준: member_id, store_id 포함)
export const addReview = async (storeId: number, data: CreateReviewRequestDto): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO review (member_id, store_id, score, content) VALUES (?, ?, ?, ?);`,
    [data.memberId, storeId, data.score, data.content]
  );
  return result.insertId;
};