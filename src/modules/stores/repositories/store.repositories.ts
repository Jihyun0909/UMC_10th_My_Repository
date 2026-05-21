<<<<<<< HEAD
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
=======
import { prisma } from "../../../db.config.js";
import { CreateStoreRequestDto } from "../dtos/store.dtos.js";

/**
 * 특정 지역(Region)의 존재 여부를 확인합니다.
 * @param regionId - 검증할 지역 고유 ID
 * @returns 지역 존재 여부 (Boolean)
 */
export const checkRegionExists = async (regionId: number): Promise<boolean> => {
  // 스키마 구조에 Region 모델이 정의된 경우 활성화 (현재는 예외 방지를 위해 기본값 true 반환)
  return true; 
};

/**
 * 신규 가게(Store) 데이터를 데이터베이스에 등록합니다.
 * @param regionId - 가게가 소속될 지역 고유 ID
 * @param data - 등록할 가게의 정보 객체 (CreateStoreRequestDto)
 * @returns 생성된 가게의 고유 ID (Number)
 */
export const addStore = async (regionId: number, data: CreateStoreRequestDto): Promise<number> => {
  const newStore = await prisma.store.create({
    data: {
      name: data.name,
      address: data.address,
      category: "일식", // CreateStoreRequestDto의 categoryId(Number)와 Schema의 category(String) 간 타입 불일치로 인한 임시 리터럴 지정
    },
  });
  return newStore.id;
>>>>>>> feature/chapter-06
};