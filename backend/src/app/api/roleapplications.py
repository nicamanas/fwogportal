from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.crud import roleapplications as crud
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

@router.get("/", response_model=List[schemas.RoleApplicationResponse])
def get_all_role_applications(db: Session = Depends(get_db)):
    raw_results = crud.get_all_role_applications(db=db)
    print(raw_results)
    return raw_results

@router.get("/{id}", response_model=schemas.RoleApplicationResponse)
def get_role_application_by_id(id: int, db: Session = Depends(get_db)):
    raw_results = crud.get_role_application_by_id(db=db, id=id)
    print(raw_results)
    return raw_results

@router.post("/", response_model=schemas.RoleApplicationResponse)
def create_role_application(*, db: Session = Depends(get_db), payload: schemas.RoleApplicationRequest):
    try:
        role_application = crud.create_role_application(db=db, payload=payload)
        print(role_application)
        return role_application
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{id}", response_model=schemas.RoleApplicationResponse)
def withdraw_role_application(id: int, db: Session = Depends(get_db)):
    role_application = crud.withdraw_role_application(db=db, id=id)
    print(role_application)
    return role_application