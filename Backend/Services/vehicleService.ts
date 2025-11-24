import db from "../../Database/database.js";
import type { Vehicle, VehicleCreateInput, VehicleUpdateInput } from "../Models/vehicle.js";

export class VehicleService {
  getAll(): Vehicle[] {
    const vehicles = db
      .prepare("SELECT * FROM vehicles ORDER BY id")
      .all() as any[];

    return vehicles.map((vehicle) => {
      const images = db
        .prepare(
          "SELECT image_url FROM vehicle_images WHERE vehicle_id = ? ORDER BY sort_order"
        )
        .all(vehicle.id)
        .map((row: any) => row.image_url);

      return {
        ...vehicle,
        images: images.length > 0 ? images : undefined,
      };
    });
  }

  getById(id: number): Vehicle | null {
    const vehicle = db
      .prepare("SELECT * FROM vehicles WHERE id = ?")
      .get(id) as any;

    if (!vehicle) {
      return null;
    }

    const images = db
      .prepare(
        "SELECT image_url FROM vehicle_images WHERE vehicle_id = ? ORDER BY sort_order"
      )
      .all(id)
      .map((row: any) => row.image_url);

    return {
      ...vehicle,
      images: images.length > 0 ? images : undefined,
    };
  }

  create(data: VehicleCreateInput): Vehicle {
    const insert = db.prepare(`
      INSERT INTO vehicles (name, price, image, mileage, transmission, fuel, year, badge, condition, location, store)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      data.name,
      data.price,
      data.image,
      data.mileage,
      data.transmission,
      data.fuel,
      data.year,
      data.badge,
      data.condition,
      data.location || null,
      data.store || null
    );

    const vehicleId = result.lastInsertRowid as number;

    if (data.images && data.images.length > 0) {
      const insertImage = db.prepare(`
        INSERT INTO vehicle_images (vehicle_id, image_url, sort_order)
        VALUES (?, ?, ?)
      `);

      data.images.forEach((img, index) => {
        insertImage.run(vehicleId, img, index);
      });
    }

    return this.getById(vehicleId)!;
  }

  update(id: number, data: VehicleUpdateInput): Vehicle | null {
    const existing = this.getById(id);
    if (!existing) {
      return null;
    }

    const update = db.prepare(`
      UPDATE vehicles 
      SET name = ?, price = ?, image = ?, mileage = ?, transmission = ?, 
          fuel = ?, year = ?, badge = ?, condition = ?, location = ?, store = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      data.name ?? existing.name,
      data.price ?? existing.price,
      data.image ?? existing.image,
      data.mileage ?? existing.mileage,
      data.transmission ?? existing.transmission,
      data.fuel ?? existing.fuel,
      data.year ?? existing.year,
      data.badge ?? existing.badge,
      data.condition ?? existing.condition,
      data.location ?? existing.location,
      data.store ?? existing.store,
      id
    );

    // Update images if provided
    if (data.images !== undefined) {
      db.prepare("DELETE FROM vehicle_images WHERE vehicle_id = ?").run(id);
      if (data.images.length > 0) {
        const insertImage = db.prepare(`
          INSERT INTO vehicle_images (vehicle_id, image_url, sort_order)
          VALUES (?, ?, ?)
        `);
        data.images.forEach((img, index) => {
          insertImage.run(id, img, index);
        });
      }
    }

    return this.getById(id);
  }

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM vehicles WHERE id = ?").run(id);
    return result.changes > 0;
  }
}

