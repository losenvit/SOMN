from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional, List


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Competition Schemas
class CompetitionBase(BaseModel):
    name: str
    description: Optional[str] = None
    sport_type: str
    start_date: datetime
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    status: str = "upcoming"


class CompetitionCreate(CompetitionBase):
    pass


class CompetitionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    sport_type: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    status: Optional[str] = None


class Competition(CompetitionBase):
    id: int
    creator_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)


# Participant Schemas
class ParticipantBase(BaseModel):
    name: str
    team: Optional[str] = None
    email: Optional[EmailStr] = None


class ParticipantCreate(ParticipantBase):
    competition_id: int


class Participant(ParticipantBase):
    id: int
    competition_id: int
    registration_date: datetime
    
    model_config = ConfigDict(from_attributes=True)


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# Login Schema
class UserLogin(BaseModel):
    username: str
    password: str
