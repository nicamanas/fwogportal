from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload
from typing import Any, Dict, Union, List, Tuple
from fastapi.encoders import jsonable_encoder

from ..core import models
from ..schemas import sbrp_schemas as schemas

def get_staff_profile_by_id(db: Session, id: int):
    staff_profile = db.query(
        models.StaffDetails
        ).options(
            joinedload(models.StaffDetails.staff_skills_sbrp_staff)
        ).filter(
            models.StaffDetails.staff_id == id
        ).first()
    
    if staff_profile:
        staff_profile_dict = staff_profile.__dict__
        staff_profile_dict['skills'] = staff_profile_dict.pop('staff_skills_sbrp_staff')
        for skill in staff_profile_dict['skills']:
            if skill.skill_certificate != None:
                skill.has_cert = True
            else:
                skill.has_cert = False
        del staff_profile_dict['_sa_instance_state']
        return staff_profile_dict
    
    return None

def get_all_staff_profiles(db: Session):
    staff_profiles = db.query(
        models.StaffDetails
        ).options(
            joinedload(models.StaffDetails.staff_skills_sbrp_staff)
        ).all()
    
    staff_profiles_dicts = []
    for staff_profile in staff_profiles:
        staff_profile_dict = staff_profile.__dict__
        staff_profile_dict['skills'] = staff_profile_dict.pop('staff_skills_sbrp_staff')
        for skill in staff_profile_dict['skills']:
            if skill.skill_certificate != None:
                skill.has_cert = True
            else:
                skill.has_cert = False
        del staff_profile_dict['_sa_instance_state']
        staff_profiles_dicts.append(staff_profile_dict)
    
    return staff_profiles_dicts
        
    
