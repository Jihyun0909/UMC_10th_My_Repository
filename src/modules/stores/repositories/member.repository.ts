import { ResultSetHeader } from "mysql2";
import { pool } from "../../../db.config";

export const addMember = async (data: any) => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO member (region_id, name, gender, address, email, password, phone_number, status, point) 
     VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE', 0);`,
    [data.regionId, data.name, data.gender, data.address, data.email, data.password, data.phone_number]
  );
  return result.insertId;
};