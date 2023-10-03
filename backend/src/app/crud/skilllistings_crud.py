from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List, Tuple
from fastapi.encoders import jsonable_encoder
from app.core import models
from app.schemas import sbrp_schemas as schemas


def get_all_skill_listings(db: Session) -> List[Tuple[models.SkillDetails]]:
    return db.query(
        models.SkillDetails
    ).all()
