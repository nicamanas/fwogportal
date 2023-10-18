from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List, Tuple
from fastapi.encoders import jsonable_encoder
from app.core import models
from app.schemas import ljps_schemas as schemas

def get_all_staff_skills(db: Session) -> List[models.StaffSkillsSBRP]:
    return db.query(models.StaffSkillsSBRP).all()

def create_staff_skills(db: Session, payload: schemas.StaffSkillsRequest, ) -> models.StaffSkillsSBRP:
    staff_skills = models.StaffSkillsSBRP(**payload.dict())
    db.add(staff_skills)
    db.commit()
    db.refresh(staff_skills)
    return staff_skills

def get_staff_skill_by_ids(db: Session, staff_id: int, skill_id: int):
    return db.query(models.StaffSkillsSBRP).filter(
        models.StaffSkillsSBRP.staff_id == staff_id,
        models.StaffSkillsSBRP.skill_id == skill_id
    ).first()

def delete_staff_skill(db: Session, staff_skill: models.StaffSkillsSBRP):
    db.delete(staff_skill)
    db.commit()
    return True
    
