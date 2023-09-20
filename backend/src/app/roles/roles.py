from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.roles import crud
from app.roles.models import RoleDB, RoleSchema
from app.db import SessionLocal


router = APIRouter()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@router.post("/", response_model=RoleDB, status_code=201)
def create_role(*, db: Session = Depends(get_db), payload: RoleSchema):
    role = crud.post(db_session=db, payload=payload)
    return role


@router.get("/{id}/", response_model=RoleDB)
def read_role(
    *, db: Session = Depends(get_db), id: int = Path(..., gt=0),
):
    role = crud.get(db_session=db, id=id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role


@router.get("/", response_model=List[RoleDB])
def read_all_roles(db: Session = Depends(get_db)):
    return crud.get_all(db_session=db)


@router.put("/{id}/", response_model=RoleDB)
def update_role(
    *, db: Session = Depends(get_db), id: int = Path(..., gt=0), payload: RoleSchema
):
    role = crud.get(db_session=db, id=id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    role = crud.put(
        db_session=db, role=role, name=payload.name, description=payload.description #TODO: Update 
    )
    return role


@router.delete("/{id}/", response_model=RoleDB)
def delete_role(
    *, db: Session = Depends(get_db), id: int = Path(..., gt=0),
):
    role = crud.get(db_session=db, id=id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    role = crud.delete(db_session=db, id=id)
    return role
