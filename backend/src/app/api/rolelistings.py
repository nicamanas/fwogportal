from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from ..crud import rolelistings_crud as crud
from ..schemas import sbrp_schemas as schemas
from ..core.database import SessionLocal

from collections import defaultdict

router = APIRouter()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def transform_and_aggregate_rolelistings(results):
    role_grouped = defaultdict(list)

    for result in results:
        role_listing, dept, role_name, role_description, skill_name = result
        key = (role_listing, dept, role_name, role_description)
        role_grouped[key].append(skill_name)

    def transform_grouped_result(key, skills):
        role_listing, dept, role_name, role_description = key
        return {
            "role_listing_id": role_listing.role_listing_id,
            "role_id": role_listing.role_id,
            "role_listing_desc": role_listing.role_listing_desc,
            "role_listing_source": role_listing.role_listing_source,
            "role_listing_open": role_listing.role_listing_open,
            "role_listing_close": role_listing.role_listing_close,
            "role_listing_creator": role_listing.role_listing_creator,
            "role_listing_ts_create": role_listing.role_listing_ts_create,
            "role_listing_ts_update": role_listing.role_listing_ts_update,
            "dept": dept,
            "role_name": role_name,
            "role_description": role_description,
            "skills": skills  # This is a list
        }

    return [transform_grouped_result(key, skills) for key, skills in role_grouped.items()]


@router.post("/", response_model=schemas.RoleListingsResponse, status_code=201)
def create_role_listing(*, db: Session = Depends(get_db), payload: schemas.RoleListingsRequest):
    role = crud.create_role_listing(db=db, payload=payload)
    print("Test==============================================")
    print(role)
    return transform_and_aggregate_rolelistings(role)[0]

@router.get("/", response_model=List[schemas.RoleListingsResponse])
def get_all_role_listings(db: Session = Depends(get_db)):
    raw_results = crud.get_all_role_listings(db=db)
    print("Test==============================================")
    print(raw_results)
    return transform_and_aggregate_rolelistings(raw_results)

@router.get("/open", response_model=List[schemas.RoleListingsResponse])
def get_open_role_listings(db: Session = Depends(get_db)):
    raw_results = crud.get_open_role_listings(db=db)
    print("Test==============================================")
    print(raw_results)
    return transform_and_aggregate_rolelistings(raw_results)

@router.get("/{id}", response_model=schemas.RoleListingsResponse)
def get_role_listing_by_id(db: Session = Depends(get_db), id: int = Path(..., gt=0)):
    role = crud.get_role_listing_by_id(db=db, id=id)
    print("Test==============================================")
    print(role)
    return transform_and_aggregate_rolelistings(role)[0]

@router.put("/{id}", response_model=schemas.RoleListingsResponse)
def update_role_listing_by_id(payload: schemas.RoleListingsRequest, db: Session = Depends(get_db), id: int = Path(..., gt=0),):
    print("Payload")
    print(payload)
    role_listing = crud.get_role_listing_table_by_id(db=db, id=id)
    if not role_listing:
        raise HTTPException(status_code=404, detail="Role Listing not found")
    role_listing = crud.update_role_listing(db=db, payload=payload, role_listing=role_listing)
    print("Test==============================================")
    print(role_listing)
    return transform_and_aggregate_rolelistings(role_listing)[0]
