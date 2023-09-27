from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List
from fastapi.encoders import jsonable_encoder
from app.set_up import models, schemas

class CRUDSkillDetails:
    def __init__(self, model):
        self.model = model
    
    def get_all_skill_details(self, db: Session) -> List[models.SkillDetails]:
        return db.query(models.SkillDetails).all()
    
    def create_skill_details(self, skill_details: schemas.SkillDetailsRequest, db: Session) -> models.SkillDetails:
        skill_details = models.SkillDetails(**skill_details.dict())
        db.add(skill_details)
        db.commit()
        db.refresh(skill_details)
        return skill_details
    
    def get_all_role_details(self, db: Session) -> List[models.RoleDetails]:
        return db.query(models.RoleDetails).all()
    
    def create_role_details(self, role_details: schemas.RoleDetailsRequest, db: Session) -> models.RoleDetails:
        role_details = models.RoleDetails(**role_details.dict())
        db.add(role_details)
        db.commit()
        db.refresh(role_details)
        return role_details
    
    def get_all_role_skills(self, db: Session) -> List[models.RoleSkills]:
        return db.query(models.RoleSkills).all()
    
    def create_role_skills(self, role_skills: schemas.RoleSkillsRequest, db: Session) -> models.RoleSkills:
        role_skills = models.RoleSkills(**role_skills.dict())
        db.add(role_skills)
        db.commit()
        db.refresh(role_skills)
        return role_skills

    def get_all_staff_details(self, db: Session) -> List[models.StaffDetails]:
        return db.query(models.StaffDetails).all()
    
    def create_staff_details(self, staff_details: schemas.StaffDetailsRequest, db: Session) -> models.StaffDetails:
        staff_details = models.StaffDetails(**staff_details.dict())
        db.add(staff_details)
        db.commit()
        db.refresh(staff_details)
        return staff_details

skill_details = CRUDSkillDetails(models.SkillDetails)
role_details = CRUDSkillDetails(models.RoleDetails)
role_skills = CRUDSkillDetails(models.RoleSkills)
staff_details = CRUDSkillDetails(models.StaffDetails)

