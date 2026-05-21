import { prisma } from "../../../db.config.js";

/**
 * 신규 유저 정보를 데이터베이스에 등록합니다.
 */
export const addUser = async (data: {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
}): Promise<number | null> => {
  // 이메일 중복 체크
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) return null;

  // 신규 유저 생성 (address 필수 모드 대응을 위해 빈 문자열 방어막 구축)
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address || "",
      detailAddress: data.detailAddress || "",
      phoneNumber: data.phoneNumber,
    },
  });

  return newUser.id;
};

/**
 * 특정 유저를 식별자로 단건 조회합니다.
 */
export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

/**
 * 유저의 선호 음식 카테고리를 추가합니다.
 */
export const setPreference = async (userId: number, foodCategoryId: number): Promise<void> => {
  await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

/**
 * 유저 ID로 선호 카테고리 리스트를 조회합니다.
 */
export const getUserPreferencesByUserId = async (userId: number) => {
  const preferences = await prisma.userFavorCategory.findMany({
    where: { userId },
    include: { foodCategory: true },
  });
  
  // 💡 strict 모드 우회를 위해 pref: any 및 완벽한 매핑 함수 구문 적용
  return preferences.map((pref: any) => ({
    foodType: {
      name: pref.foodCategory.name,
    },
  }));
};