import db from "../../Database/database.js";
import type { Testimonial, TestimonialCreateInput, TestimonialUpdateInput } from "../Models/testimonial.js";

export class TestimonialService {
  getAll(): Testimonial[] {
    const testimonials = db
      .prepare("SELECT * FROM testimonials ORDER BY sort_order ASC")
      .all() as any[];

    return testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      location: t.location,
      rating: t.rating,
      text: t.text,
      vehicle: t.vehicle || undefined,
      date: t.date,
      sortOrder: t.sort_order,
    }));
  }

  getById(id: number): Testimonial | null {
    const testimonial = db
      .prepare("SELECT * FROM testimonials WHERE id = ?")
      .get(id) as any;

    if (!testimonial) {
      return null;
    }

    return {
      id: testimonial.id,
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      text: testimonial.text,
      vehicle: testimonial.vehicle || undefined,
      date: testimonial.date,
      sortOrder: testimonial.sort_order,
    };
  }

  create(data: TestimonialCreateInput): Testimonial {
    const insert = db.prepare(`
      INSERT INTO testimonials (name, location, rating, text, vehicle, date, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      data.name,
      data.location,
      data.rating,
      data.text,
      data.vehicle || null,
      data.date,
      data.sortOrder
    );

    return this.getById(result.lastInsertRowid as number)!;
  }

  update(id: number, data: TestimonialUpdateInput): Testimonial | null {
    const existing = this.getById(id);
    if (!existing) {
      return null;
    }

    const update = db.prepare(`
      UPDATE testimonials 
      SET name = ?, location = ?, rating = ?, text = ?, vehicle = ?, date = ?, sort_order = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      data.name ?? existing.name,
      data.location ?? existing.location,
      data.rating ?? existing.rating,
      data.text ?? existing.text,
      data.vehicle ?? existing.vehicle ?? null,
      data.date ?? existing.date,
      data.sortOrder ?? existing.sortOrder,
      id
    );

    return this.getById(id);
  }

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
    return result.changes > 0;
  }
}

