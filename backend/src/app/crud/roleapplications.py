from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload
from typing import List
from fastapi.encoders import jsonable_encoder
from ..core import models
from ..schemas import sbrp_schemas as schemas
from .sbrp_staff_profile_crud import get_staff_profile_by_id

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

def get_role_applications_by_role_listing_id(db: Session, id: int) -> List[models.RoleApplications]:
    role_applications = db.query(
        models.RoleListings
        ).options(
            joinedload(models.RoleListings.role_app_listing_source)
        ).filter(
            models.RoleListings.role_listing_id == id
        ).first()
    
    if role_applications:
        role_applications_dict = role_applications.__dict__
        role_applications_dict['role_applications'] = []
        applicants = role_applications_dict.pop('role_app_listing_source')
        for applicant in applicants:
            applicant_profile = get_staff_profile_by_id(db=db, id=applicant.staff_id)
            role_applications_dict['role_applications'].append(applicant_profile)

                
        del role_applications_dict['_sa_instance_state']
        return role_applications_dict
    
    return None


