# AlexWeb Backend

RESTful API server built with Express, TypeScript, and SQLite for the AlexWeb car dealership application.

## Tech Stack

- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **TypeScript 5.7.2** - Type safety
- **Better-SQLite3 12.4.6** - SQLite database driver
- **Zod 4.1.13** - Schema validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
Backend/
├── Controllers/            # Request handlers
│   ├── vehicleController.ts
│   ├── testimonialController.ts
│   ├── staffController.ts
│   ├── popularItemController.ts
│   ├── backgroundImageController.ts
│   ├── financeController.ts
│   └── contactController.ts
├── Services/              # Business logic layer
│   ├── vehicleService.ts
│   ├── testimonialService.ts
│   ├── staffService.ts
│   ├── popularItemService.ts
│   ├── backgroundImageService.ts
│   ├── financeService.ts
│   └── contactService.ts
├── Models/                # Data models
│   ├── vehicle.ts
│   ├── testimonial.ts
│   ├── staff.ts
│   ├── popularItem.ts
│   ├── backgroundImage.ts
│   ├── finance.ts
│   └── contact.ts
├── Routers/               # Route definitions
│   ├── vehicleRouter.ts
│   ├── testimonialRouter.ts
│   ├── staffRouter.ts
│   ├── popularItemRouter.ts
│   ├── backgroundImageRouter.ts
│   ├── financeRouter.ts
│   ├── contactRouter.ts
│   └── index.ts
├── Validators/            # Request validation schemas
│   ├── contactValidator.ts
│   └── financeValidator.ts
├── index.ts               # Application entry point
└── tsconfig.json          # TypeScript configuration
```

## Architecture

The backend follows a layered architecture pattern:

1. **Routers** - Define API endpoints and HTTP methods
2. **Controllers** - Handle HTTP requests/responses and validation
3. **Services** - Contain business logic and database operations
4. **Models** - Define data structures and types
5. **Validators** - Validate request data using Zod schemas

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- SQLite3 (included with better-sqlite3)

### Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

### Environment Setup

Create a `.env` file in the Backend directory:

```env
PORT=3001
NODE_ENV=development
```

### Database Initialization

The database is automatically initialized when the server starts. The database file is located at `../Database/alexweb.db`.

To seed the database with initial data:
```bash
npm run seed
```

Or run the seed script directly:
```bash
npm run seed
# This runs: tsx ../Database/seed.ts
```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

### Building for Production

1. Compile TypeScript to JavaScript:
```bash
npm run build
```

The compiled JavaScript will be output to the `dist/` directory.

2. Start the production server:
```bash
npm start
```

### Type Checking

Run TypeScript type checking without emitting files:
```bash
npm run type-check
```

## API Endpoints

### Health Check

- `GET /health` - Server health status
- `GET /api/health` - API health status

### Vehicles

- `GET /api/vehicles` - Get all vehicles (with optional query parameters)
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create a new vehicle
- `PUT /api/vehicles/:id` - Update a vehicle
- `DELETE /api/vehicles/:id` - Delete a vehicle

### Testimonials

- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get testimonial by ID
- `POST /api/testimonials` - Create a new testimonial
- `PUT /api/testimonials/:id` - Update a testimonial
- `DELETE /api/testimonials/:id` - Delete a testimonial

### Staff

- `GET /api/staff` - Get all staff members
- `GET /api/staff/:id` - Get staff member by ID
- `POST /api/staff` - Create a new staff member
- `PUT /api/staff/:id` - Update a staff member
- `DELETE /api/staff/:id` - Delete a staff member

### Popular Items

- `GET /api/popular-items` - Get popular items (body styles, makes, models)
- `GET /api/popular-items/:category` - Get popular items by category

### Background Images

- `GET /api/background-images` - Get all background images
- `POST /api/background-images` - Create a new background image
- `PUT /api/background-images/:id` - Update a background image
- `DELETE /api/background-images/:id` - Delete a background image

### Finance

- `POST /api/finance` - Submit a finance application

### Contact

- `POST /api/contact` - Submit a contact form message

## Request/Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

## Database

The backend uses SQLite via better-sqlite3. The database file is located at `../Database/alexweb.db` and is automatically initialized on server startup.

### Database Tables

- `vehicles` - Vehicle inventory
- `vehicle_images` - Vehicle image galleries
- `testimonials` - Customer testimonials
- `staff_members` - Staff directory
- `popular_items` - Popular search filters
- `background_images` - Background image management
- `finance_applications` - Finance application submissions
- `contact_messages` - Contact form submissions

## CORS Configuration

CORS is enabled for all origins. In production, configure CORS to allow only specific origins:

```typescript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
```

## Error Handling

The application includes:

- Global error handler middleware
- 404 handler for undefined routes
- Validation error handling via Zod
- Database error handling

## Security Considerations

- Input validation using Zod schemas
- SQL injection protection via parameterized queries (better-sqlite3)
- CORS configuration
- Environment variable management

## Troubleshooting

### Port Already in Use

Change the `PORT` in your `.env` file or kill the process using the port.

### Database Connection Issues

Ensure the database file exists and has proper permissions. The database is automatically created on first run.

### TypeScript Errors

Run type checking:
```bash
npm run type-check
```

Fix any type errors before running the server.

### Module Resolution Issues

Ensure you're using ES modules (`"type": "module"` in package.json). Import paths should include `.js` extensions even when importing TypeScript files.



