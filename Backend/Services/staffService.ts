import db from "../../Database/database.js";
import type { StaffMember, StaffMemberCreateInput, StaffMemberUpdateInput } from "../Models/staff.js";

export class StaffService {
  getAll(): StaffMember[] {
    const staff = db
      .prepare("SELECT * FROM staff_members ORDER BY id")
      .all() as any[];

    return staff.map((s) => ({
      id: s.id,
      name: s.name,
      position: s.position,
      department: s.department,
      email: s.email,
      phone: s.phone,
      cellPhone: s.cell_phone || undefined,
      image: s.image || undefined,
      bio: s.bio || undefined,
    }));
  }

  getById(id: number): StaffMember | null {
    const staff = db
      .prepare("SELECT * FROM staff_members WHERE id = ?")
      .get(id) as any;

    if (!staff) {
      return null;
    }

    return {
      id: staff.id,
      name: staff.name,
      position: staff.position,
      department: staff.department,
      email: staff.email,
      phone: staff.phone,
      cellPhone: staff.cell_phone || undefined,
      image: staff.image || undefined,
      bio: staff.bio || undefined,
    };
  }

  create(data: StaffMemberCreateInput): StaffMember {
    const insert = db.prepare(`
      INSERT INTO staff_members (name, position, department, email, phone, cell_phone, image, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      data.name,
      data.position,
      data.department,
      data.email,
      data.phone,
      data.cellPhone || null,
      data.image || null,
      data.bio || null
    );

    return this.getById(result.lastInsertRowid as number)!;
  }

  update(id: number, data: StaffMemberUpdateInput): StaffMember | null {
    const existing = this.getById(id);
    if (!existing) {
      return null;
    }

    const update = db.prepare(`
      UPDATE staff_members 
      SET name = ?, position = ?, department = ?, email = ?, phone = ?, 
          cell_phone = ?, image = ?, bio = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      data.name ?? existing.name,
      data.position ?? existing.position,
      data.department ?? existing.department,
      data.email ?? existing.email,
      data.phone ?? existing.phone,
      data.cellPhone ?? existing.cellPhone ?? null,
      data.image ?? existing.image ?? null,
      data.bio ?? existing.bio ?? null,
      id
    );

    return this.getById(id);
  }

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM staff_members WHERE id = ?").run(id);
    return result.changes > 0;
  }
}

