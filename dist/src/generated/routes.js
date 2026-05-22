import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../modules/users/controllers/user.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreController } from './../modules/stores/controllers/store.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreReviewController } from './../modules/stores/controllers/store.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReviewController } from './../modules/stores/controllers/review.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionController } from './../modules/stores/controllers/mission.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserSignUpResponse": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "preferCategory": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserSignUpResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": { "dataType": "enum", "enums": ["SUCCESS"], "required": true },
            "error": { "dataType": "enum", "enums": [null], "required": true },
            "data": { "ref": "UserSignUpResponse", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "gender": { "dataType": "string", "required": true },
            "birth": { "dataType": "string", "required": true },
            "address": { "dataType": "string" },
            "detailAddress": { "dataType": "string" },
            "phoneNumber": { "dataType": "string", "required": true },
            "preferences": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_any_": {
        "dataType": "refObject",
        "properties": {
            "resultType": { "dataType": "enum", "enums": ["SUCCESS"], "required": true },
            "error": { "dataType": "enum", "enums": [null], "required": true },
            "data": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateStoreRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "categoryId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewItem": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "body": { "dataType": "string", "required": true },
            "score": { "dataType": "double", "required": true },
            "user": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ReviewItem" }, "required": true },
            "pagination": { "dataType": "nestedObjectLiteral", "nestedProperties": { "cursor": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": { "dataType": "enum", "enums": ["SUCCESS"], "required": true },
            "error": { "dataType": "enum", "enums": [null], "required": true },
            "data": { "ref": "ReviewListResponse", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateReviewRequestDto": {
        "dataType": "refObject",
        "properties": {
            "memberId": { "dataType": "double", "required": true },
            "score": { "dataType": "double", "required": true },
            "content": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMissionRequestDto": {
        "dataType": "refObject",
        "properties": {
            "reward": { "dataType": "double", "required": true },
            "deadline": { "dataType": "string", "required": true },
            "content": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ChallengeMissionRequestDto": {
        "dataType": "refObject",
        "properties": {
            "memberId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
export function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUserController_handleUserSignUp = {
        body: { "in": "body", "name": "body", "required": true, "ref": "UserSignUpRequest" },
    };
    app.post('/users/signup', ...(fetchMiddlewares(UserController)), ...(fetchMiddlewares(UserController.prototype.handleUserSignUp)), async function UserController_handleUserSignUp(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleUserSignUp, request, response });
            const controller = new UserController();
            await templateService.apiHandler({
                methodName: 'handleUserSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsStoreController_handleAddStore = {
        regionId: { "in": "path", "name": "regionId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateStoreRequestDto" },
    };
    app.post('/regions/:regionId/stores', ...(fetchMiddlewares(StoreController)), ...(fetchMiddlewares(StoreController.prototype.handleAddStore)), async function StoreController_handleAddStore(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_handleAddStore, request, response });
            const controller = new StoreController();
            await templateService.apiHandler({
                methodName: 'handleAddStore',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsStoreReviewController_handleListStoreReviews = {
        storeId: { "in": "path", "name": "storeId", "required": true, "dataType": "double" },
        cursor: { "default": 0, "in": "query", "name": "cursor", "dataType": "double" },
    };
    app.get('/stores/:storeId/reviews', ...(fetchMiddlewares(StoreReviewController)), ...(fetchMiddlewares(StoreReviewController.prototype.handleListStoreReviews)), async function StoreReviewController_handleListStoreReviews(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsStoreReviewController_handleListStoreReviews, request, response });
            const controller = new StoreReviewController();
            await templateService.apiHandler({
                methodName: 'handleListStoreReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReviewController_handleAddReview = {
        storeId: { "in": "path", "name": "storeId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateReviewRequestDto" },
    };
    app.post('/stores/:storeId/reviews', ...(fetchMiddlewares(ReviewController)), ...(fetchMiddlewares(ReviewController.prototype.handleAddReview)), async function ReviewController_handleAddReview(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_handleAddReview, request, response });
            const controller = new ReviewController();
            await templateService.apiHandler({
                methodName: 'handleAddReview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMissionController_handleAddMission = {
        storeId: { "in": "path", "name": "storeId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateMissionRequestDto" },
    };
    app.post('/stores/:storeId/missions', ...(fetchMiddlewares(MissionController)), ...(fetchMiddlewares(MissionController.prototype.handleAddMission)), async function MissionController_handleAddMission(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleAddMission, request, response });
            const controller = new MissionController();
            await templateService.apiHandler({
                methodName: 'handleAddMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMissionController_handleChallengeMission = {
        missionId: { "in": "path", "name": "missionId", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "ChallengeMissionRequestDto" },
    };
    app.post('/missions/:missionId/challenges', ...(fetchMiddlewares(MissionController)), ...(fetchMiddlewares(MissionController.prototype.handleChallengeMission)), async function MissionController_handleChallengeMission(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleChallengeMission, request, response });
            const controller = new MissionController();
            await templateService.apiHandler({
                methodName: 'handleChallengeMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map