from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app import crud
from app.roles.schemas import RoleRequest, RoleResponse
from app.db import SessionLocal


router = APIRouter()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@router.post("/", response_model=RoleResponse, status_code=201)
def create_role(*, db: Session = Depends(get_db), payload: RoleRequest):
    role = crud.create_role(db_session=db, payload=payload)
    print(role.__dict__)
    return role


@router.get("/{id}/", response_model=RoleResponse)
def get_role_by_id(
    *, db: Session = Depends(get_db), id: int = Path(..., gt=0),
):
    role = crud.get_role_by_id(db_session=db, id=id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role


@router.get("/", response_model=List[RoleResponse])
def get_all_roles(db: Session = Depends(get_db)):
    return crud.get_all_roles(db_session=db)


@router.put("/{id}/", response_model=RoleResponse)
def update_role_by_id(
    *, db: Session = Depends(get_db), id: int = Path(..., gt=0), payload: RoleRequest
):
    role = crud.get_role_by_id(db_session=db, id=id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    role = crud.update_role_by_id(
        db_session=db, role=role, name=payload.name, description=payload.description #TODO: Update 
    )
    return role


@router.delete("/{id}/", response_model=RoleRequest)
def delete_role_by_id(
    *, db: Session = Depends(get_db), id: int = Path(..., gt=0),
):
    role = crud.get_role_by_id(db_session=db, id=id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    role = crud.delete_role_by_id(db_session=db, id=id)
    return role
