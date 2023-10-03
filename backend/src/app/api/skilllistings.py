from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.crud import skilllistings_crud as crud
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
def get_all_skills(db: Session = Depends(get_db)):
    raw_results = crud.get_all_skill_listings(db=db)
    print("Test==============================================")
    print(raw_results)
    return raw_results
