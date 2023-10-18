from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.crud import sbrp_staff_profile_crud, sbrp_staff_skills_crud
from app.schemas import sbrp_schemas as schemas
from app.core.database import SessionLocal

router = APIRouter()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@router.get("/{id}", response_model=schemas.StaffProfileResponse)
def get_staff_profile_by_id(id: int, db: Session = Depends(get_db)):
    staff_profile = sbrp_staff_profile_crud.get_staff_profile_by_id(db=db, id=id)
    print(staff_profile)
    return staff_profile

@router.delete("/{staff_id}/skill/{skill_id}")
def delete_staff_skill(staff_id: int, skill_id: int, db: Session = Depends(get_db)):
    staff_skill = sbrp_staff_skills_crud.get_staff_skill_by_ids(db=db, staff_id=staff_id, skill_id=skill_id)
    if not staff_skill:
        raise HTTPException(status_code=404, detail="Staff skill not found")
    return sbrp_staff_skills_crud.delete_staff_skill(db=db, staff_skill=staff_skill)

