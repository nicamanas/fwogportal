from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List, Tuple
from fastapi.encoders import jsonable_encoder
from ..core import models
from ..schemas import sbrp_schemas as schemas

def get_all_staff_skills(db: Session) -> List[models.StaffSkillsSBRP]:
    return db.query(models.StaffSkillsSBRP).all()

def create_staff_skills(db: Session, payload: schemas.SBRPStaffSkillsRequest) -> models.StaffSkillsSBRP:
    try:
        staff_skills = models.StaffSkillsSBRP(**payload.dict())
    except Exception as e:
        print(e)
    db.add(staff_skills)
    db.commit()
    db.refresh(staff_skills)
    if staff_skills.skill_certificate != None:
        staff_skills.has_cert = True
    return staff_skills

def update_staff_skills(db: Session, payload: schemas.SBRPStaffSkillsRequest, staff_skill: models.StaffSkillsSBRP) -> models.StaffSkillsSBRP:
    staff_skill.staff_id = payload.staff_id
    staff_skill.skill_id = payload.skill_id
    staff_skill.ss_status = payload.ss_status
    staff_skill.skill_certificate = payload.skill_certificate
    db.commit()
    db.refresh(staff_skill)
    if staff_skill.skill_certificate != None:
        staff_skill.has_cert = True
    return staff_skill

def get_staff_skill_by_ids(db: Session, staff_id: int, skill_id: int):
    return db.query(models.StaffSkillsSBRP).filter(
        models.StaffSkillsSBRP.staff_id == staff_id,
        models.StaffSkillsSBRP.skill_id == skill_id
    ).first()

def delete_staff_skill(db: Session, staff_skill: models.StaffSkillsSBRP):
    db.delete(staff_skill)
    db.commit()
    return True
    
