from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List, Tuple
from fastapi.encoders import jsonable_encoder

from ..core import models
from ..schemas import ljps_schemas as schemas

def get_all_skill_details(db: Session) -> List[models.SkillDetailsSBRP]:
    return db.query(
        models.SkillDetailsSBRP
    ).all()

def get_skill_details_by_id(db: Session, id: int) -> models.SkillDetailsSBRP:
    return db.query(
        models.SkillDetailsSBRP
    ).filter(
        models.SkillDetailsSBRP.skill_id == id
    ).first()

def create_skill_details(db: Session, payload: schemas.SkillDetailsRequest) -> models.SkillDetailsSBRP:
    skill_details = models.SkillDetailsSBRP(**payload.dict())
    db.add(skill_details)
    db.commit()
    db.refresh(skill_details) 
    return skill_details

def update_skill_details(db: Session, payload: schemas.SkillDetailsRequest, skill_details: models.SkillDetailsSBRP) -> List[models.SkillDetailsSBRP]:
    skill_details.skill_name = payload.skill_name
    skill_details.skill_status = payload.skill_status
    db.commit()
    db.refresh(skill_details)
    return skill_details