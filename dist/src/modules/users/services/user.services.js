import { addUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";
export const userSignUp = async (data) => {
    // 💡 [해결 핵심]: birth 문자열을 Prisma가 안전하게 씹어 삼킬 수 있는 Date 객체로 파싱합니다.
    const birthDate = data.birth ? new Date(data.birth) : null;
    // 레포지토리에 보낼 때 원래 data 스펙에 birth만 Date 객체로 덮어씌웁니다.
    const userId = await addUser({
        ...data,
        birth: birthDate
    });
    if (userId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }
    const categories = data.preferCategory || [];
    for (const categoryId of categories) {
        await setPreference(userId, categoryId);
    }
    const preferences = await getUserPreferencesByUserId(userId);
    return {
        userId,
        preferences: preferences.map((obj) => obj.foodCategory.name),
        email: data.email,
        name: data.name,
        preferCategory: categories
    };
};
//# sourceMappingURL=user.services.js.map