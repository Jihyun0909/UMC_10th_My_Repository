import { prisma } from "../../../db.config.js";

// User 데이터 삽입
export const addUser = async (data: any) => {
  // 1. 이미 존재하는 이메일인지 확인
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  
  if (user) {
    return null;
  }

  // 2. 새로운 유저 생성
  const created = await prisma.user.create({ 
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      // 💡 [해결 핵심]: prisma 스키마 규칙(Null 거부)에 맞춰 Date 객체만 안전하게 전달합니다.
      birth: data.birth ? new Date(data.birth) : new Date(), 
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    } 
  });

  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId: number) => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true,
    },
    orderBy: { foodCategoryId: "asc" },
  });
};

// 유저 고유 ID를 기반으로 성별, 생일, 주소, 전화번호를 찾아 갱신합니다.
export const updateUserInfo = async (userId: number, updateData: any) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      gender: updateData.gender,
      birth: updateData.birth ? new Date(updateData.birth) : undefined,
      address: updateData.address,
      detailAddress: updateData.detailAddress,
      phoneNumber: updateData.phoneNumber,
    },
  });
};