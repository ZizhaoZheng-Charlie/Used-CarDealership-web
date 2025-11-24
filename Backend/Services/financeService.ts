import db from "../../Database/database.js";
import type {
  FinanceApplication,
  FinanceApplicationCreateInput,
  FinanceApplicationResponse,
} from "../Models/finance.js";

export class FinanceService {
  async create(
    data: FinanceApplicationCreateInput["data"]
  ): Promise<FinanceApplicationResponse> {
    const stmt = db.prepare(`
      INSERT INTO finance_applications (data)
      VALUES (?)
    `);

    const result = stmt.run(JSON.stringify(data));
    const insertedId = result.lastInsertRowid as number;
    const now = new Date().toISOString();

    return {
      id: insertedId,
      data,
      createdAt: now,
      updatedAt: now,
    };
  }

  async getAll(): Promise<FinanceApplicationResponse[]> {
    const stmt = db.prepare(`
      SELECT * FROM finance_applications
      ORDER BY created_at DESC
    `);

    const rows = stmt.all() as any[];
    return rows.map((row) => ({
      id: row.id,
      data: JSON.parse(row.data),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async getById(id: number): Promise<FinanceApplicationResponse | null> {
    const stmt = db.prepare(`
      SELECT * FROM finance_applications
      WHERE id = ?
    `);

    const row = stmt.get(id) as any;
    if (!row) {
      return null;
    }

    return {
      id: row.id,
      data: JSON.parse(row.data),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
