from sqlalchemy.orm import Session
from typing import List, Tuple

from ..core import models
from ..schemas import sbrp_schemas as schemas
from datetime import datetime

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

def get_role_listing_table_by_id(db: Session, id: int) -> models.RoleListings:
    return db.query(
        models.RoleListings
        ).filter(
        models.RoleListings.role_listing_id == id
        ).first()

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

def get_open_role_listings(db: Session) -> List[Tuple[models.RoleListings, str, str, str, str]]:
    today = datetime.utcnow()
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
        ).filter(
            models.RoleListings.role_listing_open <= today,
            models.RoleListings.role_listing_close >= today
        ).all()

def create_role_listing(db: Session, payload: schemas.RoleListingsRequest) -> List[Tuple[models.RoleListings, str, str, str, str]]:
    role_listing = models.RoleListings(**payload.dict())
    db.add(role_listing)
    db.commit()
    db.refresh(role_listing)
    return get_role_listing_by_id(db, role_listing.role_listing_id)

def update_role_listing(db: Session, payload: schemas.RoleListingsRequest, role_listing: models.RoleListings) -> List[Tuple[models.RoleListings, str, str, str, str]]:
    role_listing.role_id = payload.role_id
    role_listing.role_listing_desc = payload.role_listing_desc
    role_listing.role_listing_source = payload.role_listing_source
    role_listing.role_listing_open = payload.role_listing_open
    role_listing.role_listing_close = payload.role_listing_close
    role_listing.role_listing_creator = payload.role_listing_creator
    role_listing.role_listing_ts_update = datetime.utcnow()
    db.commit()
    db.refresh(role_listing)
    return get_role_listing_by_id(db, role_listing.role_listing_id)
    