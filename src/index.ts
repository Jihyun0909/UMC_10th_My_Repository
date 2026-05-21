import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleAddStore } from "./modules/stores/controllers/store.controller.js";
import { handleAddReview } from "./modules/stores/controllers/review.controller.js";
import { handleAddMission } from "./modules/stores/controllers/mission.controller.js";
import { handleChallengeMission } from "./modules/stores/controllers/mission.controller.js";
import { memberSignUpController } from "./modules/stores/controllers/member.controller.js";
import { handleListStoreReviews } from "./modules/stores/controllers/store.controller.js";
// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용                 
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 3. 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});
<<<<<<< HEAD
=======
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
>>>>>>> feature/chapter-06

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/regions/:regionId/stores", handleAddStore);
app.post("/api/v1/stores/:storeId/reviews", handleAddReview);
app.post("/api/v1/stores/:storeId/missions", handleAddMission);
app.post("/api/v1/missions/:missionId/challenges", handleChallengeMission);
app.post("/api/v1/members/signup", memberSignUpController);

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});