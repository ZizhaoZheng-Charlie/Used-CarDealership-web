# AlexWeb Database

SQLite database setup and seeding scripts for the AlexWeb car dealership application.

## Overview

This directory contains the database initialization and seeding logic for the AlexWeb application. The database uses SQLite with better-sqlite3 for high performance and reliability.

## Tech Stack

- **Better-SQLite3 12.4.6** - SQLite database driver
- **TypeScript 5.7.2** - Type safety
- **tsx** - TypeScript execution

## Project Structure

```
Database/
├── database.ts          # Database connection and schema initialization
├── seed.ts             # Database seeding script
├── alexweb.db          # SQLite database file (generated)
└── package.json        # Dependencies and scripts
```

## Database Schema

### Tables

#### vehicles
Stores vehicle inventory information.

- `id` - Primary key
- `name` - Vehicle name/model
- `price` - Vehicle price
- `image` - Primary image URL
- `mileage` - Vehicle mileage
- `transmission` - Transmission type
- `fuel` - Fuel type
- `year` - Model year
- `badge` - Special badge (e.g., "Certified")
- `condition` - Vehicle condition
- `location` - Vehicle location
- `store` - Store name
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### vehicle_images
Stores additional vehicle images.

- `id` - Primary key
- `vehicle_id` - Foreign key to vehicles
- `image_url` - Image URL
- `sort_order` - Display order

#### testimonials
Stores customer testimonials.

- `id` - Primary key
- `name` - Customer name
- `location` - Customer location
- `rating` - Rating (1-5)
- `text` - Testimonial text
- `vehicle` - Vehicle name (optional)
- `date` - Testimonial date
- `sort_order` - Display order
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### staff_members
Stores staff member information.

- `id` - Primary key
- `name` - Staff member name
- `position` - Job position
- `department` - Department
- `email` - Email address
- `phone` - Phone number
- `cell_phone` - Cell phone (optional)
- `image` - Profile image URL (optional)
- `bio` - Biography (optional)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### popular_items
Stores popular search filters (body styles, makes, models).

- `id` - Primary key
- `category` - Category type (body_style, make, model)
- `name` - Item name
- `count` - Usage count
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- Unique constraint on (category, name)

#### background_images
Stores background images for the website.

- `id` - Primary key
- `image_url` - Image URL (unique)
- `sort_order` - Display order
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### finance_applications
Stores finance application submissions.

- `id` - Primary key
- `data` - JSON string of application data
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### contact_messages
Stores contact form submissions.

- `id` - Primary key
- `name` - Contact name
- `email` - Email address
- `phone` - Phone number (optional)
- `subject` - Message subject
- `message` - Message content
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- SQLite3 (included with better-sqlite3)

### Installation

1. Navigate to the Database directory:
```bash
cd Database
```

2. Install dependencies:
```bash
npm install
```

### Database Initialization

The database is automatically initialized when the backend server starts. The `initializeDatabase()` function in `database.ts` creates all tables if they don't exist.

### Seeding the Database

To populate the database with initial data:

```bash
npm run seed
```

Or run the seed script directly:
```bash
tsx seed.ts
```

You can also run the seed script from the Backend directory:
```bash
cd ../Backend
npm run seed
```

## Database File Location

The SQLite database file (`alexweb.db`) is created in the `Database/` directory. The file path is resolved relative to the `database.ts` file location.

## Database Features

### Foreign Keys

Foreign key constraints are enabled:
```sql
PRAGMA foreign_keys = ON;
```

This ensures referential integrity between related tables (e.g., `vehicle_images` and `vehicles`).

### Automatic Timestamps

All tables with `created_at` and `updated_at` columns automatically set:
- `created_at` - Current timestamp on insert
- `updated_at` - Current timestamp on insert/update

## Seeding Data

The `seed.ts` file contains sample data for:

- Vehicles with multiple images
- Customer testimonials
- Staff members
- Popular items (body styles, makes, models)
- Background images

### Customizing Seed Data

Edit `seed.ts` to modify the seed data. The script:
1. Initializes the database schema
2. Clears existing data (optional)
3. Inserts seed data
4. Logs progress and results

## Database Access

The database connection is exported from `database.ts` and can be imported in other parts of the application:

```typescript
import db from "../Database/database.js";

// Example query
const vehicles = db.prepare("SELECT * FROM vehicles").all();
```

## Backup and Restore

### Backup

To backup the database, simply copy the `alexweb.db` file:

```bash
cp alexweb.db alexweb.db.backup
```

### Restore

To restore from a backup:

```bash
cp alexweb.db.backup alexweb.db
```

## Maintenance

### Vacuum

To optimize the database and reclaim space:

```typescript
db.exec("VACUUM");
```

### Analyze

To update query optimizer statistics:

```typescript
db.exec("ANALYZE");
```

## Troubleshooting

### Database Locked

If you encounter "database is locked" errors:
- Ensure only one process is accessing the database at a time
- Close any database connections before running migrations or seeds
- Check for long-running transactions

### File Permissions

Ensure the database file and directory have proper read/write permissions:
```bash
chmod 644 alexweb.db
chmod 755 Database/
```

### Database Not Found

If the database file doesn't exist, it will be created automatically when `initializeDatabase()` is called.

### Migration Issues

If you need to modify the schema:
1. Create a migration script
2. Backup the database first
3. Run the migration
4. Test thoroughly

## Best Practices

1. **Always backup before major changes** - Copy the database file before running migrations or seeds
2. **Use transactions** - Wrap multiple related operations in transactions for data integrity
3. **Parameterized queries** - Always use prepared statements to prevent SQL injection
4. **Index optimization** - Add indexes for frequently queried columns
5. **Regular backups** - Schedule regular database backups in production

## Production Considerations

For production environments:

- Consider using a more robust database (PostgreSQL, MySQL) for better scalability
- Implement database connection pooling
- Set up automated backups
- Monitor database size and performance
- Use read replicas for heavy read workloads
- Implement proper database migrations system



