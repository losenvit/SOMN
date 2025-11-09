from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Competition, User
from app.schemas.schemas import Competition as CompetitionSchema, CompetitionCreate, CompetitionUpdate
from app.routes.dependencies import get_current_user

router = APIRouter()


@router.get("/", response_model=List[CompetitionSchema])
def get_competitions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all competitions"""
    competitions = db.query(Competition).offset(skip).limit(limit).all()
    return competitions


@router.get("/{competition_id}", response_model=CompetitionSchema)
def get_competition(competition_id: int, db: Session = Depends(get_db)):
    """Get a specific competition by ID"""
    competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if not competition:
        raise HTTPException(status_code=404, detail="Competition not found")
    return competition


@router.post("/", response_model=CompetitionSchema)
def create_competition(
    competition: CompetitionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new competition"""
    db_competition = Competition(**competition.model_dump(), creator_id=current_user.id)
    db.add(db_competition)
    db.commit()
    db.refresh(db_competition)
    return db_competition


@router.put("/{competition_id}", response_model=CompetitionSchema)
def update_competition(
    competition_id: int,
    competition_update: CompetitionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a competition"""
    db_competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if not db_competition:
        raise HTTPException(status_code=404, detail="Competition not found")
    
    if db_competition.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this competition")
    
    update_data = competition_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_competition, field, value)
    
    db.commit()
    db.refresh(db_competition)
    return db_competition


@router.delete("/{competition_id}")
def delete_competition(
    competition_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a competition"""
    db_competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if not db_competition:
        raise HTTPException(status_code=404, detail="Competition not found")
    
    if db_competition.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this competition")
    
    db.delete(db_competition)
    db.commit()
    return {"message": "Competition deleted successfully"}
