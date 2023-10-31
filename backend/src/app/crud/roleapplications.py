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
    test_payload = (payload.dict())
    print(test_payload)
    role_application = models.RoleApplications(**payload.dict())
    
    # check if this applicant has applied for the role listing previously
    previous_role_application = db.query(
        models.RoleApplications
    ).filter(models.RoleApplications.role_listing_id == role_application.role_listing_id, models.RoleApplications.staff_id == role_application.staff_id, models.RoleApplications.role_app_status == 'active').first()
    if previous_role_application:
        raise Exception("You have already applied for this role listing.")
    
    db.add(role_application)
    db.commit()
    db.refresh(role_application) 
    return role_application

def withdraw_role_application(db: Session, id: int) -> models.RoleApplications:
    role_application = db.query(
        models.RoleApplications
    ).filter(
        models.RoleApplications.role_app_id == id
    ).first()
    role_application.role_app_status = "inactive"
    db.commit()
    db.refresh(role_application)
    return role_application

def delete_role_application(db: Session, id: int) -> models.RoleApplications:
    role_application = db.query(
        models.RoleApplications
    ).filter(
        models.RoleApplications.role_app_id == id
    ).first()
    db.delete(role_application)
    db.commit()
    return role_application