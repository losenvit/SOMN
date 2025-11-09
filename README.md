# Sports Competition Tracker

A full-stack web application for managing sports competitions, built with React + TypeScript + Vite + Shadcn UI on the frontend and FastAPI + SQLAlchemy + PostgreSQL on the backend.

## 🏗️ Project Structure

```
SOMN/
├── frontend/           # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   └── ui/        # Shadcn UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── lib/           # Utility functions
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── backend/            # FastAPI backend
│   ├── app/
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routes/        # API endpoints
│   │   ├── schemas/       # Pydantic schemas
│   │   └── core/          # Configuration & utilities
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
└── docker-compose.yml  # Docker orchestration
```

## ✨ Features

- **Authentication**: JWT-based user registration and login
- **Competition Management**: Full CRUD operations for sports competitions
- **Participant Tracking**: Add and manage participants for each competition
- **Responsive UI**: Clean, modern interface built with Tailwind CSS and Shadcn UI
- **RESTful API**: Well-structured FastAPI backend with automatic documentation

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** (recommended)
- **OR** manually:
  - Node.js 18+ and npm
  - Python 3.11+
  - PostgreSQL 15+

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/losenvit/SOMN.git
   cd SOMN
   ```

2. **Create environment files**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start all services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**
   - Create a PostgreSQL database named `sports_db`
   - Create a user `sports_user` with password `sports_password`
   - Or update the connection string in `.env`

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secret key
   ```

6. **Run the backend server**
   ```bash
   uvicorn app.main:app --reload
   ```

   Backend will be available at http://localhost:8000

#### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Update VITE_API_BASE_URL if needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at http://localhost:5173

## 📖 API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation (Swagger UI).

### Key Endpoints

- **Authentication**
  - `POST /api/v1/auth/register` - Register a new user
  - `POST /api/v1/auth/login` - Login and get JWT token

- **Competitions**
  - `GET /api/v1/competitions/` - List all competitions
  - `POST /api/v1/competitions/` - Create a new competition (requires auth)
  - `GET /api/v1/competitions/{id}` - Get competition details
  - `PUT /api/v1/competitions/{id}` - Update a competition (requires auth)
  - `DELETE /api/v1/competitions/{id}` - Delete a competition (requires auth)

- **Participants**
  - `GET /api/v1/participants/competition/{id}` - Get participants for a competition
  - `POST /api/v1/participants/` - Add a participant
  - `DELETE /api/v1/participants/{id}` - Remove a participant

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Reusable component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL ORM
- **PostgreSQL** - Database
- **Pydantic** - Data validation
- **Python-JOSE** - JWT token handling
- **Passlib** - Password hashing
- **Uvicorn** - ASGI server

## 🧪 Development

### Backend Development

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
The backend runs in production mode with Uvicorn. Update the Dockerfile to remove the `--reload` flag for production deployments.

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://sports_user:sports_password@localhost:5432/sports_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
API_V1_PREFIX=/api/v1
DEBUG=True
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 🔒 Security Notes

- Change the `SECRET_KEY` in production
- Use strong passwords for database users
- Enable HTTPS in production
- Update CORS settings for production domains
- Keep dependencies up to date

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue on GitHub.
