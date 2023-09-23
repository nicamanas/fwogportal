from pydantic import BaseModel, Field
from sqlalchemy import Column, Integer, String, DateTime, PickleType
from sqlalchemy.sql import func
from sqlalchemy.dialects.mysql import JSON
from typing import List
from datetime import datetime

from app.db import Base


# SQLAlchemy Model

class Role(Base):

    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    description = Column(String(500))
    skills = Column(JSON)
    deadline = Column(DateTime)
    created_date = Column(DateTime, default=func.now(), nullable=False)
    

    def __init__(self, name, description, skills, deadline):
        self.name = name 
        self.description = description
        self.skills = skills
        self.deadline = deadline


# Pydantic Model

class RoleSchema(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    description: str = Field(..., min_length=3, max_length=500)
    skills: List[str]
    deadline: datetime

class RoleDB(RoleSchema):
    id: int
    created_date: datetime

    class Config:
        orm_mode = True