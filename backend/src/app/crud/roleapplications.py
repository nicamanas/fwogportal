from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import List
from fastapi.encoders import jsonable_encoder
from app.core import models
from app.schemas import sbrp_schemas as schemas

def get_all_role_applications(db: Session) -> List[models.RoleApplications]:
    return db.query(
        models.RoleApplications
    ).all()
    
def get_role_application_by_id(db: Session, id: int) -> models.RoleApplications:
    return db.query(
        models.RoleApplications
    ).filter(
        models.RoleApplications.role_application_id == id
    ).first()
    
def create_role_application(db: Session, payload: schemas.RoleApplicationRequest) -> models.RoleApplications:
    role_application = models.RoleApplications(**payload.dict())
    db.add(role_application)
    db.commit()
    db.refresh(role_application) 
    return role_application