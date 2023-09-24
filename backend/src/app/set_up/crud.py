from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List
from fastapi.encoders import jsonable_encoder
from app.set_up import models, schemas

class CRUDSkillDetails:
    def __init__(self, model):
        self.model = model
    
    def create_skill_details(self, skill_details: schemas.SkillDetailsRequest, db: Session) -> models.SkillDetails:
        skill_details = models.SkillDetails(**skill_details.dict())
        db.add(skill_details)
        db.commit()
        db.refresh(skill_details)
        return skill_details

crud_role_details = CRUDSkillDetails(models.SkillDetails)
