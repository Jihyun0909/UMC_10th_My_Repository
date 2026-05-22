var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { userSignUp } from "../services/user.services.js";
import { success } from "../../../common/responses/response.js";
let UserController = class UserController extends Controller {
    async handleUserSignUp(body) {
        console.log("회원가입 요청 인입:", body);
        const user = await userSignUp(body);
        return success(user); // 👈 수정된 success Wrapper 호출
    }
};
__decorate([
    Post("signup"),
    __param(0, Body())
], UserController.prototype, "handleUserSignUp", null);
UserController = __decorate([
    Route("users"),
    Tags("Users")
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map