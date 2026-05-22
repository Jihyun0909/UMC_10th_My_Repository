import { Controller } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { ApiResponse } from "../../../common/responses/response.js";
export declare class UserController extends Controller {
    handleUserSignUp(body: UserSignUpRequest): Promise<ApiResponse<UserSignUpResponse>>;
}
//# sourceMappingURL=user.controller.d.ts.map