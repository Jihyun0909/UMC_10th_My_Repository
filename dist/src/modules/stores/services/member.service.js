import bcrypt from "bcrypt";
import { addMember } from "../repositories/member.repository.js";
export const memberSignUp = async (data) => {
    // 1. 비밀번호 해싱 (Salt Round 10 사용)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    // 2. 평문 비번을 해시 비번으로 교체해서 DB에 저장
    const result = await addMember({
        ...data,
        password: hashedPassword
    });
    return result;
};
//# sourceMappingURL=member.service.js.map