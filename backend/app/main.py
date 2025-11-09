from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.routes import auth, competitions, participants

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sports Competition Tracker API",
    description="API for managing sports competitions and participants",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_PREFIX}/auth", tags=["auth"])
app.include_router(competitions.router, prefix=f"{settings.API_V1_PREFIX}/competitions", tags=["competitions"])
app.include_router(participants.router, prefix=f"{settings.API_V1_PREFIX}/participants", tags=["participants"])


@app.get("/")
def root():
    return {"message": "Sports Competition Tracker API", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
