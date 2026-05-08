import { Request, Response, NextFunction } from "express";
import { memberSignUp } from "../services/member.service.js";
import { SignUpRequestDto } from "../dtos/member.dto.js";

export const memberSignUpController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. 요청 바디를 DTO 타입으로 받기
    const signUpData: SignUpRequestDto = req.body;

    // 2. 서비스 호출 
    const result = await memberSignUp(signUpData);

    // 3. 성공 응답
    res.status(201).json({
      success: true,
      code: "M201",
      message: "회원가입이 완료되었습니다.",
      data: { memberId: result },
    });
  } catch (error: any) {
    // 4. 에러 응답 (중복 이메일 등)
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};