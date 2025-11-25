# Used Cardealership web

A modern, full-stack car dealership web application built with React, Express, TypeScript, and SQLite.

## Overview

AlexWeb is a comprehensive car dealership management system featuring vehicle listings, customer testimonials, staff directory, finance applications, and contact management. The application is built with a modern tech stack and follows best practices for maintainability and scalability.

## Project Structure

```
AlexWeb/
├── Backend/          # Express.js REST API server
├── Frontend/         # React + Vite frontend application
├── Database/         # SQLite database and seeding scripts
└── README.md         # This file
```

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **TypeScript 5.7.2** - Type safety
- **Better-SQLite3 12.4.6** - SQLite database driver
- **Zod 4.1.13** - Schema validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 6.0.5** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Lucide React** - Icon library

### Database
- **SQLite** - Lightweight database
- **Better-SQLite3** - High-performance SQLite driver

## Features

- 🚗 **Vehicle Listings** - Browse and search inventory with advanced filtering
- 📸 **Image Galleries** - Multiple images per vehicle
- ⭐ **Customer Testimonials** - Display customer reviews and ratings
- 👥 **Staff Directory** - Team member profiles and contact information
- 💰 **Finance Applications** - Online finance application submission
- 📧 **Contact Forms** - Customer inquiry management
- 🎨 **Modern UI** - Responsive design with dark/light theme support
- 🔍 **Search & Filter** - Advanced vehicle search capabilities
- 📱 **Mobile Responsive** - Optimized for all device sizes

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **SQLite3** (included with better-sqlite3)

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd AlexWeb
```

2. **Install Backend dependencies**:
```bash
cd Backend
npm install
```

3. **Install Frontend dependencies**:
```bash
cd ../Frontend
npm install
```

4. **Install Database dependencies**:
```bash
cd ../Database
npm install
```

### Environment Setup

#### Backend

Create a `.env` file in the `Backend/` directory:

```env
PORT=3001
NODE_ENV=development
```

#### Frontend

Create a `.env` file in the `Frontend/` directory (optional):

```env
VITE_API_URL=http://localhost:3001
```

### Database Initialization

The database is automatically initialized when the backend server starts. To seed the database with initial data:

```bash
cd Database
npm run seed
```

Or from the Backend directory:

```bash
cd Backend
npm run seed
```

## Running the Application

### Development Mode

1. **Start the Backend server** (in one terminal):
```bash
cd Backend
npm run dev
```

The backend will run on `http://localhost:3001`

2. **Start the Frontend development server** (in another terminal):
```bash
cd Frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### Production Build

1. **Build the Backend**:
```bash
cd Backend
npm run build
npm start
```

2. **Build the Frontend**:
```bash
cd Frontend
npm run build
```

The production build will be output to `Frontend/dist/`

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

## Frontend Routes

- `/` - Home page
- `/cars-for-sale` - Vehicle listings page
- `/inventory/:id` - Vehicle detail page
- `/about-us` - About us page
- `/testimonials` - Testimonials page
- `/staff` - Staff directory page
- `/contact-us` - Contact page
- `/finance` - Finance application page

## Database Schema

The application uses SQLite with the following main tables:

- `vehicles` - Vehicle inventory
- `vehicle_images` - Vehicle image galleries
- `testimonials` - Customer testimonials
- `staff_members` - Staff directory
- `popular_items` - Popular search filters
- `background_images` - Background image management
- `finance_applications` - Finance application submissions
- `contact_messages` - Contact form submissions

## Architecture

### Backend Architecture

The backend follows a layered architecture pattern:

1. **Routers** - Define API endpoints and HTTP methods
2. **Controllers** - Handle HTTP requests/responses and validation
3. **Services** - Contain business logic and database operations
4. **Models** - Define data structures and types
5. **Validators** - Validate request data using Zod schemas

### Frontend Architecture

The frontend uses a component-based architecture:

- **Pages** - Route-level components
- **Components** - Reusable UI components
- **Hooks** - Custom React hooks
- **Lib** - Utilities and API client
- **Types** - TypeScript type definitions

## Development

### Type Checking

**Backend**:
```bash
cd Backend
npm run type-check
```

**Frontend**:
```bash
cd Frontend
npm run check:unused
```

### Linting

**Frontend**:
```bash
cd Frontend
npm run lint
```

## Project Documentation

For more detailed documentation, see:

- [Backend README](./Backend/README.md) - Backend API documentation
- [Frontend README](./Frontend/README.md) - Frontend application documentation
- [Database README](./Database/README.md) - Database schema and seeding documentation

## Contributing

1. Create a feature branch from `master`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue in the repository.


