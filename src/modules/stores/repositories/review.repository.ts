<<<<<<< HEAD
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
=======
import { prisma } from "../../../db.config.js";
import { CreateReviewRequestDto } from "../dtos/review.dto.js";

/**
 * 대상 가게(Store)의 존재 여부를 확인합니다.
 * @param storeId - 확인할 가게 고유 ID
 * @returns 가게 존재 여부 (Boolean)
 */
export const checkStoreExists = async (storeId: number): Promise<boolean> => {
  const count = await prisma.store.count({
    where: { id: storeId },
  });
  return count > 0;
};

/**
 * 특정 가게에 대한 사용자의 리뷰를 추가합니다.
 * @param storeId - 리뷰를 등록할 가게 고유 ID
 * @param data - 리뷰 본문 및 평점 정보 객체 (CreateReviewRequestDto)
 * @returns 생성된 리뷰의 고유 ID (Number)
 */
export const addReview = async (storeId: number, data: CreateReviewRequestDto): Promise<number> => {
  const newReview = await prisma.review.create({
    data: {
      body: data.content,     // DTO의 content 필드를 스키마의 body 컬럼에 매핑
      score: Number(data.score),
      userId: data.memberId,  // DTO의 memberId 필드를 스키마의 userId 외래키에 매핑
      storeId: storeId,
    },
  });
  return newReview.id;
};

/**
 * 특정 사용자가 작성한 리뷰 목록을 커서 기반 페이지네이션으로 조회합니다.
 * @param userId - 조회할 사용자 고유 ID
 * @param cursor - 페이지네이션 기준 리뷰 ID (Optional)
 * @param limit - 한 페이지에 노출할 데이터 개수 (기본값 5)
 * @returns 리뷰 목록 및 상점 정보 배열
 */
export const getUserReviews = async (userId: number, cursor?: number, limit: number = 5) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId: userId,
    },
    ...(cursor ? {
      skip: 1,
      cursor: { id: cursor },
    } : {}),
    take: limit,
    orderBy: {
      id: "desc", // 최신순 정렬
    },
    include: {
      store: true, // 리뷰 대상 상점 정보 Join
    },
  });

  return reviews;
>>>>>>> feature/chapter-06
};