import { Body, Controller, Post, Route, Tags } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.services.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Post("signup")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest
  ): Promise<ApiResponse<UserSignUpResponse>> { // 👈 응답 스펙 준수
    console.log("회원가입 요청 인입:", body);
    const user = await userSignUp(body);
    return success(user); // 👈 수정된 success Wrapper 호출
  }
}