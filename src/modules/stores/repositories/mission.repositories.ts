import { pool } from "../../../db.config.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateMissionRequestDto } from "../dtos/mission.dtos.js";

// 1. 이미 'CHALLENGING' 상태인 미션이 있는지 확인
export const isMissionAlreadyChallenging = async (missionId: number, memberId: number): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT EXISTS (SELECT 1 FROM member_mission WHERE mission_id = ? AND member_id = ? AND status = 'CHALLENGING') as isExist;`,
    [missionId, memberId]
  );
  return rows[0]?.isExist === 1;
};

// 2. 미션 도전하기 추가 (status는 기본값이 CHALLENGING이라 생략 가능)
export const addMemberMission = async (missionId: number, memberId: number): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO member_mission (mission_id, member_id, status) VALUES (?, ?, 'CHALLENGING');`,
    [missionId, memberId]
  );
  return result.insertId;
};

// 가게에 미션 추가
export const addMission = async (storeId: number, data: CreateMissionRequestDto): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO mission (store_id, reward, deadline, content) VALUES (?, ?, ?, ?);`,
    [storeId, data.reward, data.deadline, data.content]
  );
  return result.insertId;
};