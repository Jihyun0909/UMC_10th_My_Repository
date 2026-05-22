import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan"; // 공통 미션: 로그 출력 미들웨어
import cookieParser from "cookie-parser"; // 공통 미션: 쿠키 파싱 미들웨어
import swaggerUi from "swagger-ui-express"; // Swagger UI 미들웨어
import path from "path";
import fs from "fs";
import { RegisterRoutes } from "./generated/routes.js";
// 1. 환경 변수 설정
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// 2. TSOA가 생성한 swagger.json 읽어오기 (ESM 환경 동기식 로드)
const swaggerFile = JSON.parse(fs.readFileSync(path.resolve("dist/swagger.json"), "utf8"));
// [해결 핵심]: res 객체를 임시로 any로 변환하여 에러 확장 방식 우회
app.use((req, res, next) => {
    res.error = function ({ errorCode = null, message = null, data = null }) {
        return this.json({
            resultType: "FAIL",
            error: { errorCode, message, data },
            success: null,
        });
    };
    next();
});
// 3. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // JSON 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 본문 파싱
// 공통 미션 필수 탑재 미들웨어
app.use(morgan("dev"));
app.use(cookieParser());
// Swagger UI 라우터 연결 (http://localhost:3000/docs)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// 4. TSOA 라우터 연결 (5, 6, 7주차 API를 컴파일러가 자동 인식해서 한 몸으로 묶어줍니다!)
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);
// 기본 웰컴 루트
app.get("/", (req, res) => {
    res.send("Hello World! This is TypeScript TSOA Server!");
});
/**
 * 전역 오류 처리 미들웨어
 */
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    // res.status() 뒤에 (res as any) 처리를 하여 error 메서드를 안전하게 호출
    return res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        message: err.message || null,
        data: err.data || null,
    });
});
// 5. 서버 시작
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map