import db from "../../Database/database.js";
import type {
  ContactMessage,
  ContactMessageCreateInput,
  ContactMessageResponse,
} from "../Models/contact.js";

export class ContactService {
  async create(
    data: ContactMessageCreateInput["data"]
  ): Promise<ContactMessageResponse> {
    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.name,
      data.email,
      data.phone || null,
      data.subject,
      data.message
    );
    const insertedId = result.lastInsertRowid as number;

    // Fetch the created record
    const getStmt = db.prepare(`
      SELECT * FROM contact_messages WHERE id = ?
    `);
    const row = getStmt.get(insertedId) as any;

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || undefined,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getAll(): Promise<ContactMessageResponse[]> {
    const stmt = db.prepare(`
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
    `);

    const rows = stmt.all() as any[];
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || undefined,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async getById(id: number): Promise<ContactMessageResponse | null> {
    const stmt = db.prepare(`
      SELECT * FROM contact_messages
      WHERE id = ?
    `);

    const row = stmt.get(id) as any;
    if (!row) {
      return null;
    }

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || undefined,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

