import logging
from sqlalchemy.orm import Session
from app.set_up.preloaded_data import skill_details
from app.set_up import crud, schemas

logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    logger.info("Creating default skill details")
    for skill_detail in skill_details.DEFAULT_SKILL_DETAILS:
        in_skill_details = schemas.SkillDetailsRequest(**skill_detail)
        crud.crud_role_details.create_skill_details(skill_details=in_skill_details, db=db)
    

