import { Request, Response, NextFunction } from "express";
import { createMission, challengeMission } from "../services/mission.services";
import { CreateMissionRequestDto } from "../dtos/mission.dtos";

export const handleAddMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { storeId } = req.params;

    if (!storeId || typeof storeId !== "string") {
      res.status(400).json({ success: false, message: "유효한 가게 ID가 필요합니다." });
      return;
    }

    const result = await createMission(parseInt(storeId), req.body as CreateMissionRequestDto);

    res.status(200).json({
      success: true,
      code: "S200",
      message: "가게 미션이 성공적으로 등록되었습니다!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { missionId } = req.params;
    const { memberId } = req.body;

    if (!missionId || typeof missionId !== "string") {
      res.status(400).json({ success: false, message: "유효한 미션 ID가 필요합니다." });
      return;
    }

    const result = await challengeMission(parseInt(missionId), memberId);

    res.status(200).json({
      success: true,
      code: "S200",
      message: "미션 도전 시작!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message // "이미 도전 중인 미션입니다." 메시지가 여기로 전달돼!
    });
  }
};