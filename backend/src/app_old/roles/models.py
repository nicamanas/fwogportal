
from sqlalchemy import Column, Integer, String, DateTime, PickleType
from sqlalchemy.sql import func
from sqlalchemy.dialects.mysql import JSON
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
