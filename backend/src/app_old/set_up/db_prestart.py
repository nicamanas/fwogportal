import logging
from sqlalchemy.orm import Session
from app.set_up.preloaded_data import skill_details, role_details, role_skills, staff_details
from app.set_up import crud, schemas

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    
    all_skill_details = crud.skill_details.get_all_skill_details(db=db)
    if not all_skill_details:
        logger.info("Creating default skill details")
        for skill_detail in skill_details.DEFAULT_SKILL_DETAILS:
            in_skill_details = schemas.SkillDetailsRequest(**skill_detail)
            crud.skill_details.create_skill_details(skill_details=in_skill_details, db=db)
    
    all_role_details = crud.role_details.get_all_role_details(db=db)
    if not all_role_details:
        logger.info("Creating default role details")
        for role_detail in role_details.DEFAULT_ROLE_DETAILS:
            in_role_details = schemas.RoleDetailsRequest(**role_detail)
            crud.role_details.create_role_details(role_details=in_role_details, db=db)

    all_role_skills = crud.role_skills.get_all_role_skills(db=db)
    if not all_role_skills:
        logger.info("Creating default role skills")
        for role_skill in role_skills.DEFAULT_ROLE_SKILLS:
            in_role_skills = schemas.RoleSkillsRequest(**role_skill)
            crud.role_skills.create_role_skills(role_skills=in_role_skills, db=db)

    all_staff_details = crud.staff_details.get_all_staff_details(db=db)
    if not all_staff_details:
        logger.info("Creating default staff details")
        for staff_detail in staff_details.DEFAULT_STAFF_DETAILS:
            in_staff_details = schemas.StaffDetailsRequest(**staff_detail)
            crud.staff_details.create_staff_details(staff_details=in_staff_details, db=db)
    
    

    

