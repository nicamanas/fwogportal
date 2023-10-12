from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.crud import sbrp_skill_details_crud as crud
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

@router.get("/", response_model=List[schemas.SkillDetails])
def get_all_skill_details(db: Session = Depends(get_db)):
    raw_results = crud.get_all_skill_details(db=db)
    print(raw_results)
    return raw_results

@router.get("/{id}", response_model=schemas.SkillDetails)
def get_skill_details_by_id(id: int, db: Session = Depends(get_db)):
    raw_results = crud.get_skill_details_by_id(db=db, id=id)
    print(raw_results)
    return raw_results

@router.post("/", response_model=schemas.SkillDetails)
def create_skill_details(*, db: Session = Depends(get_db), payload: schemas.SkillDetails):
    skill = crud.create_skill_details(db=db, payload=payload)
    print(skill)
    return skill

@router.put("/{id}", response_model=schemas.SkillDetails)
def update_skill_details(id: int, payload: schemas.SkillDetails, db: Session = Depends(get_db)):
    skill = get_skill_details_by_id(id=id, db=db)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    skill = crud.update_skill_details(
        db=db, skill_details=skill, payload=payload
    )
    print(skill)
    return skill
