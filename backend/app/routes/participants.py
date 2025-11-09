from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Participant, Competition
from app.schemas.schemas import Participant as ParticipantSchema, ParticipantCreate
from app.routes.dependencies import get_current_user

router = APIRouter()


@router.get("/competition/{competition_id}", response_model=List[ParticipantSchema])
def get_participants(competition_id: int, db: Session = Depends(get_db)):
    """Get all participants for a competition"""
    competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if not competition:
        raise HTTPException(status_code=404, detail="Competition not found")
    
    participants = db.query(Participant).filter(Participant.competition_id == competition_id).all()
    return participants


@router.post("/", response_model=ParticipantSchema)
def create_participant(participant: ParticipantCreate, db: Session = Depends(get_db)):
    """Add a participant to a competition"""
    competition = db.query(Competition).filter(Competition.id == participant.competition_id).first()
    if not competition:
        raise HTTPException(status_code=404, detail="Competition not found")
    
    db_participant = Participant(**participant.model_dump())
    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant


@router.delete("/{participant_id}")
def delete_participant(participant_id: int, db: Session = Depends(get_db)):
    """Remove a participant from a competition"""
    db_participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not db_participant:
        raise HTTPException(status_code=404, detail="Participant not found")
    
    db.delete(db_participant)
    db.commit()
    return {"message": "Participant removed successfully"}
