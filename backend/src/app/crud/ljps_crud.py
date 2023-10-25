from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List, Optional
from fastapi.encoders import jsonable_encoder
from app.core import models
from app.schemas import ljps_schemas as schemas

# Skill details

def get_all_skill_details(db: Session) -> List[models.SkillDetails]:
    return db.query(models.SkillDetails).all()

def create_skill_details(db: Session, payload: schemas.SkillDetailsRequest, ) -> models.SkillDetails:
    skill_details = models.SkillDetails(**payload.dict())
    db.add(skill_details)
    db.commit()
    db.refresh(skill_details) 
    return skill_details

# Role details

def get_all_role_details(db: Session) -> List[models.RoleDetails]:
    return db.query(models.RoleDetails).all()

def create_role_details(db: Session, payload: schemas.RoleDetailsRequest,) -> models.RoleDetails:
    role_details = models.RoleDetails(**payload.dict())
    db.add(role_details)
    db.commit()
    db.refresh(role_details)
    return role_details

# Role skills

def get_all_role_skills(db: Session) -> List[models.RoleSkills]:
    return db.query(models.RoleSkills).all()

def create_role_skills(db: Session, payload: schemas.RoleSkillsRequest) -> models.RoleSkills:
    role_skills = models.RoleSkills(**payload.dict())
    db.add(role_skills)
    db.commit()
    db.refresh(role_skills) 
    return role_skills

# Staff skills

def get_all_staff_skills(db: Session) -> List[models.StaffSkills]:
    return db.query(models.StaffSkills).all()

def create_staff_skills(db: Session, payload: schemas.StaffSkillsRequest, ) -> models.StaffSkills:
    staff_skills = models.StaffSkills(**payload.dict())
    db.add(staff_skills)
    db.commit()
    db.refresh(staff_skills)
    return staff_skills

def get_staff_skills_by_staff_id(db: Session, staff_id: int) -> Optional[models.StaffSkills]:
    return db.query(models.StaffSkills).filter(models.StaffSkills.staff_id == staff_id).all()

# Staff roles 

def get_all_staff_roles(db: Session) -> List[models.StaffRoles]:
    return db.query(models.StaffRoles).all()

def create_staff_roles(db: Session, payload: schemas.StaffRolesRequest) -> models.StaffRoles:
    staff_roles = models.StaffRoles(**payload.dict())
    db.add(staff_roles)
    db.commit()
    db.refresh(staff_roles)
    return staff_roles