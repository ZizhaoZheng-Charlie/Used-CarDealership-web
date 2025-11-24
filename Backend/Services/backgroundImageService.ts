import db from "../../Database/database.js";
import type { BackgroundImage, BackgroundImageUpdateInput } from "../Models/backgroundImage.js";

export class BackgroundImageService {
  getAll(): string[] {
    const images = db
      .prepare("SELECT image_url FROM background_images ORDER BY sort_order ASC")
      .all() as any[];

    return images.map((img) => img.image_url);
  }

  getAllWithDetails(): BackgroundImage[] {
    const images = db
      .prepare("SELECT * FROM background_images ORDER BY sort_order ASC")
      .all() as any[];

    return images.map((img) => ({
      id: img.id,
      imageUrl: img.image_url,
      sortOrder: img.sort_order,
    }));
  }

  getById(id: number): BackgroundImage | null {
    const image = db
      .prepare("SELECT * FROM background_images WHERE id = ?")
      .get(id) as any;

    if (!image) {
      return null;
    }

    return {
      id: image.id,
      imageUrl: image.image_url,
      sortOrder: image.sort_order,
    };
  }

  create(imageUrl: string, sortOrder?: number): BackgroundImage {
    const maxOrder = db
      .prepare("SELECT MAX(sort_order) as max_order FROM background_images")
      .get() as any;
    const nextOrder = sortOrder ?? (maxOrder?.max_order ?? -1) + 1;

    const insert = db.prepare(`
      INSERT INTO background_images (image_url, sort_order)
      VALUES (?, ?)
    `);

    const result = insert.run(imageUrl, nextOrder);

    return this.getById(result.lastInsertRowid as number)!;
  }

  update(id: number, data: BackgroundImageUpdateInput): BackgroundImage | null {
    const existing = this.getById(id);
    if (!existing) {
      return null;
    }

    const update = db.prepare(`
      UPDATE background_images 
      SET image_url = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      data.imageUrl ?? existing.imageUrl,
      data.sortOrder ?? existing.sortOrder,
      id
    );

    return this.getById(id);
  }

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM background_images WHERE id = ?").run(id);
    return result.changes > 0;
  }
}

