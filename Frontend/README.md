# AlexWeb Frontend

A modern, responsive React application built with Vite, TypeScript, and Tailwind CSS for a car dealership website.

## Tech Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 6.0.5** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

## Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (shadcn/ui style)
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx      # Site footer
│   │   ├── SearchBar.tsx   # Vehicle search functionality
│   │   └── ...
│   ├── pages/              # Route pages
│   │   ├── Home.tsx
│   │   ├── CarsForSale.tsx
│   │   ├── CarDetail.tsx
│   │   ├── AboutUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Staff.tsx
│   │   ├── ContactUs.tsx
│   │   └── Finance.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and API client
│   │   ├── api.ts          # API service functions
│   │   ├── constants.ts    # App constants
│   │   └── utils.ts        # Helper functions
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

The dev server is configured to proxy API requests to `http://localhost:3001` (backend server).

### Building for Production

1. Type check the code:
```bash
npm run check:unused
```

2. Build the production bundle:
```bash
npm run build
```

The production build will be output to the `dist/` directory.

3. Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Theme** - Theme switching with next-themes
- **Vehicle Listings** - Browse and search inventory
- **Vehicle Details** - Detailed view with image galleries
- **Testimonials** - Customer reviews carousel
- **Staff Directory** - Team member profiles
- **Contact Forms** - Contact and finance application forms
- **Accessible Components** - Built with Radix UI primitives

## API Integration

The frontend communicates with the backend API through the `lib/api.ts` service layer. All API calls are proxied through Vite's dev server to `http://localhost:3001/api`.

### Available Endpoints

- `/api/vehicles` - Vehicle listings and details
- `/api/testimonials` - Customer testimonials
- `/api/staff` - Staff member information
- `/api/popular-items` - Popular search filters
- `/api/background-images` - Background image management
- `/api/finance` - Finance application submissions
- `/api/contact` - Contact form submissions

## Environment Variables

Create a `.env` file in the Frontend directory if needed:

```env
VITE_API_URL=http://localhost:3001
```

## Path Aliases

The project uses path aliases for cleaner imports:

- `@/` - Maps to `src/` directory

Example:
```typescript
import { Header } from "@/components/Header";
import { api } from "@/lib/api";
```

## Component Library

The project uses a custom component library built on Radix UI primitives, styled with Tailwind CSS. Components are located in `src/components/ui/` and follow the shadcn/ui pattern.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### API Connection Issues

Ensure the backend server is running on port 3001. Check the `vite.config.ts` proxy configuration if using a different backend port.

### Build Errors

Run type checking before building:
```bash
npm run check:unused
```

Fix any TypeScript errors before attempting to build.



