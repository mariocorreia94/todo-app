# Todo App - Fullstack Boilerplate

A modern fullstack todo application built with React, Vite, Tailwind CSS, Node.js, Express, and Prisma.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Prisma** - Modern database ORM
- **TypeScript** - Type-safe JavaScript

### Database
- **SQLite** - Development database (local file)
- **PostgreSQL** - Production database (configurable)

## 📁 Project Structure

```
todo-app/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── types/         # TypeScript type definitions
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # App entry point
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── tsconfig.json      # TypeScript configuration
├── server/                 # Backend Node.js app
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   └── index.ts       # Server entry point
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   ├── package.json       # Backend dependencies
│   └── tsconfig.json      # TypeScript configuration
├── package.json            # Root package.json with scripts
└── README.md              # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Install Dependencies
```bash
# Install all dependencies (root, client, and server)
npm run install:all
```

### 2. Environment Setup
```bash
# Copy environment example file
cd server
cp env.example .env

# Edit .env file with your database configuration
# For development (SQLite):
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development

# For production (PostgreSQL):
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"
PORT=5000
NODE_ENV=production
```

### 3. Database Setup
```bash
# Generate Prisma client
cd server
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 4. Start Development Servers
```bash
# Start both frontend and backend in development mode
npm run dev

# Or start them separately:
npm run dev:client    # Frontend on http://localhost:3000
npm run dev:server    # Backend on http://localhost:5000
```

## 📱 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server
- `npm run install:all` - Install dependencies for all packages

### Client
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🌐 API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion
- `DELETE /api/todos/:id` - Delete a todo

### Health Check
- `GET /health` - Server health status

## 🗄️ Database Schema

```prisma
model Todo {
  id        Int      @id @default(autoincrement())
  text      String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("todos")
}
```

## 🔧 Configuration

### Frontend Proxy
The frontend is configured to proxy API requests to the backend during development:
- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- API requests from frontend are automatically proxied to backend

### Database Configuration
- **Development**: Uses SQLite with local file `dev.db`
- **Production**: Uses PostgreSQL (configure via `DATABASE_URL` environment variable)

## 🚀 Deployment

### Frontend
```bash
cd client
npm run build
# Deploy the `dist` folder to your hosting service
```

### Backend
```bash
cd server
npm run build
npm start
# Or use PM2, Docker, etc.
```

### Database
- **Development**: SQLite file is included in the project
- **Production**: Set up PostgreSQL database and update `DATABASE_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
