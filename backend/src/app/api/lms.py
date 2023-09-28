from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.crud import lms_crud as crud
from app.schemas import lms_schemas as schemas
from app.core.database import SessionLocal

router = APIRouter()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@router.post("/staff_details/", response_model=schemas.StaffDetailsResponse, status_code=201)
def create_staff_details(*, db: Session = Depends(get_db), payload: schemas.StaffDetailsRequest):
    role = crud.create_staff_details(db=db, payload=payload)
    print(role.__dict__)
    return role

@router.get("/staff_details/", response_model=List[schemas.StaffDetailsResponse])
def get_all_staff_details(db: Session = Depends(get_db)):
    return crud.get_all_staff_details(db=db)


# @router.put("/{id}/", response_model=schemas.StaffDetailsRequest)
# def update_role_by_id(
#     *, db: Session = Depends(get_db), id: int = Path(..., gt=0), payload: schemas.StaffDetailsRequest
# ):
#     role = crud.get_role_by_id(db_session=db, id=id)
#     if not role:
#         raise HTTPException(status_code=404, detail="Role not found")
#     role = crud.update_role_by_id(
#         db_session=db, role=role, name=payload.name, description=payload.description #TODO: Update 
#     )
#     return role


# @router.delete("/{id}/", response_model=schemas.StaffDetailsRequest)
# def delete_role_by_id(
#     *, db: Session = Depends(get_db), id: int = Path(..., gt=0),
# ):
#     role = crud.get_role_by_id(db_session=db, id=id)
#     if not role:
#         raise HTTPException(status_code=404, detail="Role not found")
#     role = crud.delete_role_by_id(db_session=db, id=id)
#     return role
