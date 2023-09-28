from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List, Tuple
from fastapi.encoders import jsonable_encoder
from app.core import models
from app.schemas import sbrp_schemas as schemas

def get_role_listing_by_id(db: Session, id: int) -> List[Tuple[models.RoleListings, str, str, str, str]]:
    return db.query(
        models.RoleListings,
        models.StaffDetails.dept,
        models.RoleDetails.role_name,
        models.RoleDetails.role_description,
        models.SkillDetails.skill_name
        ).filter(
        models.RoleListings.role_listing_id == id
        ).join(
            models.StaffDetails, models.RoleListings.role_listing_creator == models.StaffDetails.staff_id
        ).join(
            models.RoleDetails, models.RoleListings.role_id == models.RoleDetails.role_id
        ).join(
            models.RoleSkills, models.RoleDetails.role_id == models.RoleSkills.role_id
        ).join(
            models.SkillDetails, models.RoleSkills.skill_id == models.SkillDetails.skill_id
        ).all()

def get_all_role_listings(db: Session) -> List[Tuple[models.RoleListings, str, str, str, str]]:
    return db.query(
        models.RoleListings,
        models.StaffDetails.dept,
        models.RoleDetails.role_name,
        models.RoleDetails.role_description,
        models.SkillDetails.skill_name,
        ).join(
            models.StaffDetails, models.RoleListings.role_listing_creator == models.StaffDetails.staff_id
        ).join(
            models.RoleDetails, models.RoleListings.role_id == models.RoleDetails.role_id
        ).join(
            models.RoleSkills, models.RoleDetails.role_id == models.RoleSkills.role_id
        ).join(
            models.SkillDetails, models.RoleSkills.skill_id == models.SkillDetails.skill_id
        ).all()

def create_role_listing(db: Session, payload: schemas.RoleListingsRequest) -> models.RoleListings:
    role_listing = models.RoleListings(**payload.dict())
    db.add(role_listing)
    db.commit()
    db.refresh(role_listing)
    return get_role_listing_by_id(db, role_listing.role_listing_id)