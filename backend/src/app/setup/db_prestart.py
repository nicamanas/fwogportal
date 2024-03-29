import logging
from sqlalchemy.orm import Session

from ..setup.preloaded_data import skill_details, role_details, role_skills, staff_details, role_listings, staff_skills, role_applications
from ..crud import ljps_crud, lms_crud, rolelistings_crud, sbrp_skill_details_crud, sbrp_staff_skills_crud, roleapplications
from ..schemas import ljps_schemas, lms_schemas, sbrp_schemas

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    
    all_skill_details = ljps_crud.get_all_skill_details(db=db)
    if not all_skill_details:
        logger.info("Creating default skill details")
        for skill_detail in skill_details.DEFAULT_SKILL_DETAILS:
            in_skill_details = ljps_schemas.SkillDetailsRequest(**skill_detail)
            ljps_crud.create_skill_details(payload=in_skill_details, db=db)
    
    all_sbrp_skill_details = sbrp_skill_details_crud.get_all_skill_details(db=db)
    if not all_sbrp_skill_details:
        logger.info("Creating default sbrp skill details")
        for skill_detail in skill_details.DEFAULT_SKILL_DETAILS:
            in_skill_details = ljps_schemas.SkillDetailsRequest(**skill_detail)
            sbrp_skill_details_crud.create_skill_details(payload=in_skill_details, db=db)
    
    all_role_details = ljps_crud.get_all_role_details(db=db)
    if not all_role_details:
        logger.info("Creating default role details")
        for role_detail in role_details.DEFAULT_ROLE_DETAILS:
            in_role_details = ljps_schemas.RoleDetailsRequest(**role_detail)
            ljps_crud.create_role_details(payload=in_role_details, db=db)

    all_role_skills = ljps_crud.get_all_role_skills(db=db)
    if not all_role_skills:
        logger.info("Creating default role skills")
        for role_skill in role_skills.DEFAULT_ROLE_SKILLS:
            in_role_skills = ljps_schemas.RoleSkillsRequest(**role_skill)
            ljps_crud.create_role_skills(payload=in_role_skills, db=db)

    all_staff_details = lms_crud.get_all_staff_details(db=db)
    if not all_staff_details:
        logger.info("Creating default staff details")
        for staff_detail in staff_details.DEFAULT_STAFF_DETAILS:
            in_staff_details = lms_schemas.StaffDetailsRequest(**staff_detail)
            lms_crud.create_staff_details(payload=in_staff_details, db=db)
    
    all_staff_skills = ljps_crud.get_all_staff_skills(db=db)
    if not all_staff_skills:
        logger.info("Creating default staff skills")
        for staff_skill in staff_skills.DEFAULT_STAFF_SKILLS:
            in_staff_skills = ljps_schemas.StaffSkillsRequest(**staff_skill)
            ljps_crud.create_staff_skills(payload=in_staff_skills, db=db)
    
    sbrp_staff_skills = sbrp_staff_skills_crud.get_all_staff_skills(db=db)
    if not sbrp_staff_skills:
        logger.info("Creating default sbrp staff skills")
        for staff_skill in staff_skills.DEFAULT_STAFF_SKILLS:
            in_staff_skills = ljps_schemas.StaffSkillsRequest(**staff_skill)
            sbrp_staff_skills_crud.create_staff_skills(payload=in_staff_skills, db=db)

    all_role_listings = rolelistings_crud.get_all_role_listings(db=db)
    if not all_role_listings:
        logger.info("Creating default role_listings")
        for role_listing in role_listings.DEFAULT_ROLE_LISTINGS:
            in_role_listing = sbrp_schemas.RoleListingsRequest(**role_listing)
            rolelistings_crud.create_role_listing(payload=in_role_listing, db=db)
    
    all_role_applications = roleapplications.get_all_role_applications(db=db)
    if not all_role_applications:
        logger.info("Creating default role_applications")
        for role_application in role_applications.DEFAULT_ROLE_APPLICATIONS:
            in_role_application = sbrp_schemas.RoleApplicationRequest(**role_application)
            roleapplications.create_role_application(payload=in_role_application, db=db)

    
    

    

