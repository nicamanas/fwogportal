from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# from app.crud import ljps_crud as crud
# from app.schemas import ljps_schemas as schemas
# from app.core.database import SessionLocal
from ..crud import ljps_crud as crud
from ..schemas import ljps_schemas as schemas
from ..core.database import SessionLocal
from .. import main

router = APIRouter()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

# Skill details

@router.post("/skill_details/", response_model=schemas.SkillDetailsResponse, status_code=201)
def create_skill_details(*, db: Session = Depends(get_db), payload: schemas.SkillDetailsRequest):
    skill_details = crud.create_skill_details(db=db, payload=payload)
    print(skill_details.__dict__)
    return skill_details

@router.get("/skill_details/", response_model=List[schemas.SkillDetailsResponse])
def get_all_skill_details(db: Session = Depends(get_db)):
    return crud.get_all_skill_details(db=db)

# Role details

@router.post("/role_details/", response_model=schemas.RoleDetailsResponse, status_code=201)
def create_role_details(*, db: Session = Depends(get_db), payload: schemas.RoleDetailsRequest):
    role_details = crud.create_role_details(db=db, payload=payload)
    print(role_details.__dict__)
    return role_details

@router.get("/role_details/", response_model=List[schemas.RoleDetailsResponse])
def get_all_role_details(db: Session = Depends(get_db)):
    return crud.get_all_role_details(db=db)

# Role skills

@router.post("/role_skills/", response_model=schemas.RoleSkillsResponse, status_code=201)
def create_role_skills(*, db: Session = Depends(get_db), payload: schemas.RoleSkillsRequest):
    role_skills = crud.create_role_skills(db=db, payload=payload)
    print(role_skills.__dict__)
    return role_skills

@router.get("/role_skills/", response_model=List[schemas.RoleSkillsResponse])
def get_all_role_skills(db: Session = Depends(get_db)):
    return crud.get_all_role_skills(db=db)

# Staff skills

@router.post("/staff_skills/", response_model=schemas.StaffSkillsResponse, status_code=201)
def create_staff_skills(*, db: Session = Depends(get_db), payload: schemas.StaffSkillsRequest):
    staff_skills = crud.create_staff_skills(db=db, payload=payload)
    print(staff_skills.__dict__)
    return staff_skills

@router.get("/staff_skills/", response_model=List[schemas.StaffSkillsResponse])
def get_all_staff_skills(db: Session = Depends(get_db)):
    return crud.get_all_staff_skills(db=db) 

@router.get("/staff_skills/{staff_id}", response_model=List[schemas.SkillDetailsResponse])
def get_staff_skills_by_staff_id(staff_id: int, db: Session = Depends(get_db)):
    staff_skills_objs = crud.get_staff_skills_by_staff_id(db=db, staff_id=staff_id)
    if not staff_skills_objs:
        raise HTTPException(status_code=404, detail="Staff ID not found")
    staff_skill_ids = [obj.skill_id for obj in staff_skills_objs]
    all_skills = crud.get_all_skill_details(db=db)  
    staff_skills = [skill for skill in all_skills if skill.skill_id in staff_skill_ids]
    return staff_skills

# Staff roles
@router.post("/staff_roles/", response_model=schemas.StaffRolesResponse, status_code=201)
def create_staff_roles(*, db: Session = Depends(get_db), payload: schemas.StaffRolesRequest):
    staff_roles = crud.create_staff_roles(db=db, payload=payload)
    print(staff_roles.__dict__)
    return staff_roles

@router.get("/staff_roles/", response_model=List[schemas.StaffRolesResponse])
def get_all_staff_roles(db: Session = Depends(get_db)):
    return crud.get_all_staff_roles(db=db)

