from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.crud import sbrp_staff_profile_crud as crud
from app.schemas import sbrp_schemas as schemas
from app.core.database import SessionLocal

from collections import defaultdict

router = APIRouter()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@router.get("/{id}", response_model=schemas.StaffProfileResponse)
def get_staff_profile_by_id(id: int, db: Session = Depends(get_db)):
    staff_profile = crud.get_staff_profile_by_id(db=db, id=id)
    print(staff_profile)
    return staff_profile

