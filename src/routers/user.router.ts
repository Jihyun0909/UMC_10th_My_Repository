import express, { Request, Response, NextFunction } from "express";
import { isLogin } from "../auth.config.js"; 
import { updateMyProfile } from "../modules/users/services/user.services.js"; 

const userRouter = express.Router();

/**
 *소셜 로그인 유저 정보 갱신(수정) API
 * JWT 토큰 인증을 거쳐 유저 본인의 프로필 필드 데이터를 업데이트합니다.
 */
userRouter.patch("/me", isLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 토큰 해독 결과 매핑된 사용자의 고유 식별자(ID)를 획득합니다.
    const loginUserId = (req.user as any).id;
    
    // 비즈니스 서비스 레이어로 회원 고유 식별자 및 수정 타겟 데이터를 이관합니다.
    const result = await updateMyProfile(loginUserId, req.body);

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
        message: "회원 정보가 성공적으로 갱신되었습니다.",
        user: {
          id: result.id,
          email: result.email,
          name: result.name,
          gender: result.gender,
          birth: result.birth,
          address: result.address,
          detailAddress: result.detailAddress,
          phoneNumber: result.phoneNumber
        }
      }
    });
  } catch (error) {
    next(error); // 예외 발생 시 인프라 레이어의 전역 오류 핸들러로 이관합니다.
  }
});

export { userRouter };