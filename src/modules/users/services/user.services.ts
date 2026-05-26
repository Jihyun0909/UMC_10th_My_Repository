import { addUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";
import { UserSignUpResponse } from "../dtos/user.dto.js";
// 🚨 [피드백 반영]: 7주차 에러 정의 파일에서 커스텀 에러 클래스를 가져옵니다.
import { DuplicateUserEmailError } from "../../../common/errors/error.js"; 
import { updateUserInfo } from "../repositories/user.repository.js";


export const userSignUp = async (data: any): Promise<UserSignUpResponse> => {
  // birth 문자열을 Prisma 형식에 맞추어 Date 객체로 변환합니다.
  const birthDate = data.birth ? new Date(data.birth) : null;

  // 변환된 날짜 객체를 포함하여 유저 추가 프로세스를 진행합니다.
  const userId = await addUser({
    ...data,
    birth: birthDate
  });

  // 레포지토리에서 중복 이메일로 인해 null이 반환된 경우, 정의된 커스텀 에러를 발생시킵니다.
  if (userId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.");
  }

  const categories = data.preferCategory || [];
  for (const categoryId of categories) {
    await setPreference(userId, categoryId);
  }

  const preferences = await getUserPreferencesByUserId(userId);

  return {
    userId,
    preferences: preferences.map((obj: any) => obj.foodCategory.name),
    email: data.email,
    name: data.name,
    preferCategory: categories
  } as any;
};

export const updateMyProfile = async (userId: number, profileData: any) => {
  // 비즈니스 로직에 맞춰 레포지토리 함수를 호출하고 결과를 반환합니다.
  const updatedUser = await updateUserInfo(userId, profileData);
  return updatedUser;
};