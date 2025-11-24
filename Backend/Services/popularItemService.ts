import db from "../../Database/database.js";
import type { PopularItem, PopularItemCategory } from "../Models/popularItem.js";

export class PopularItemService {
  getByCategory(category: PopularItemCategory): PopularItem[] {
    const items = db
      .prepare(
        "SELECT name, count FROM popular_items WHERE category = ? ORDER BY count DESC"
      )
      .all(category) as any[];

    return items.map((item) => ({
      name: item.name,
      count: item.count,
    }));
  }

  getAll(): Record<PopularItemCategory, PopularItem[]> {
    return {
      body_style: this.getByCategory("body_style"),
      make: this.getByCategory("make"),
      model: this.getByCategory("model"),
    };
  }

  create(
    category: PopularItemCategory,
    data: PopularItem
  ): PopularItem {
    const insert = db.prepare(`
      INSERT OR REPLACE INTO popular_items (category, name, count)
      VALUES (?, ?, ?)
    `);

    insert.run(category, data.name, data.count);

    return data;
  }

  update(
    category: PopularItemCategory,
    name: string,
    count: number
  ): PopularItem | null {
    const update = db.prepare(`
      UPDATE popular_items 
      SET count = ?, updated_at = CURRENT_TIMESTAMP
      WHERE category = ? AND name = ?
    `);

    const result = update.run(count, category, name);

    if (result.changes === 0) {
      return null;
    }

    return { name, count };
  }

  delete(category: PopularItemCategory, name: string): boolean {
    const result = db
      .prepare("DELETE FROM popular_items WHERE category = ? AND name = ?")
      .run(category, name);
    return result.changes > 0;
  }
}

