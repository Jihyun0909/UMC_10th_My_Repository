import { prisma } from "../../../db.config.js";

/**
 * 신규 회원(User/Member) 데이터를 데이터베이스에 등록합니다.
 * @param data - 등록할 회원의 입력 정보 객체
 * @returns 생성된 회원의 고유 ID (Number)
 */
export const addMember = async (data: any): Promise<number> => {
  const newMember = await prisma.user.create({
    data: {
      name: data.name,
      gender: data.gender,
      birth: new Date(data.birth || "2000-01-01"), // 스키마의 DateTime 타입 만족을 위한 파싱 처리
      address: data.address,
      detailAddress: data.detailAddress || null,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone_number, // DTO의 스네이크 케이스를 스키마의 카멜 케이스 필드명에 매핑
    },
  });
  return newMember.id; // Prisma에서 자동 생성된 고유 레코드 ID 반환
};

/**
 * 사용자(User/Member) 존재 여부를 식별자로 검증합니다.
 * @param memberId - 검증할 사용자 고유 ID
 * @returns 사용자 존재 여부 (Boolean)
 */
export const checkMemberExists = async (memberId: number): Promise<boolean> => {
  const count = await prisma.user.count({
    where: { id: memberId },
  });
  return count > 0;
};