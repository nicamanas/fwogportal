from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Dict, Union, List
from fastapi.encoders import jsonable_encoder
# from app.core import models
# from app.schemas import lms_schemas as schemas
from ..core import models
from ..schemas import lms_schemas as schemas

def get_all_staff_details(db: Session) -> List[models.StaffDetails]:
    return db.query(models.StaffDetails).all()

def create_staff_details(db: Session, payload: schemas.StaffDetailsRequest) -> models.StaffDetails:
    staff_details = models.StaffDetails(**payload.dict())
    db.add(staff_details)
    db.commit()
    db.refresh(staff_details)
    return staff_details