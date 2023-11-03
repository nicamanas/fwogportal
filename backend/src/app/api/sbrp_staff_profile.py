from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ..crud import sbrp_staff_profile_crud, sbrp_staff_skills_crud, sbrp_skill_details_crud
from ..schemas import sbrp_schemas as schemas, ljps_schemas as ljps_schemas
from ..core.database import SessionLocal

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

@router.post("/{staff_id}/skill/{skill_id}", status_code=201, response_model=schemas.SBRPStaffSkillsResponse)
def add_staff_skill(staff_id: int, skill_id: int, db: Session = Depends(get_db), cert: UploadFile = None):
    staff = sbrp_staff_profile_crud.get_staff_profile_by_id(db=db, id=staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    skill = sbrp_skill_details_crud.get_skill_details_by_id(db=db, id=skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    if cert:
        contents = cert.file.read()
    else:
        contents = None
    in_staff_skill = schemas.SBRPStaffSkillsRequest(staff_id=staff_id, skill_id=skill_id, ss_status="unverified", skill_certificate=contents)
    staff_skill = sbrp_staff_skills_crud.create_staff_skills(db=db, payload=in_staff_skill)
    if staff_skill.skill_certificate:
        staff_skill.has_cert = True
    else:
        staff_skill.has_cert = False

    return staff_skill

@router.put("/{staff_id}/skill/{skill_id}/status/{status}", response_model=schemas.SBRPStaffSkillsResponse)
def update_staff_skill(staff_id: int, skill_id: int, status: str, db: Session = Depends(get_db), cert: UploadFile = None):
    staff = sbrp_staff_profile_crud.get_staff_profile_by_id(db=db, id=staff_id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    skill = sbrp_skill_details_crud.get_skill_details_by_id(db=db, id=skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    staff_skill = sbrp_staff_skills_crud.get_staff_skill_by_ids(db=db, staff_id=staff_id, skill_id=skill_id)
    if not staff_skill:
        raise HTTPException(status_code=404, detail="Staff skill not found")
    if cert:
        contents = cert.file.read()
    else:
        contents = None
    in_staff_skill = schemas.SBRPStaffSkillsRequest(staff_id=staff_id, skill_id=skill_id, ss_status=status, skill_certificate=contents)
    staff_skill = sbrp_staff_skills_crud.update_staff_skills(db=db, payload=in_staff_skill, staff_skill=staff_skill)
    return staff_skill



@router.get("/{staff_id}/cert/{skill_id}", status_code=200)
def get_certificate_by_staff_and_skill_id(staff_id: int, skill_id: int, db: Session = Depends(get_db)):
    staff_skill = sbrp_staff_skills_crud.get_staff_skill_by_ids(db=db, staff_id=staff_id, skill_id=skill_id)
    if not staff_skill:
        raise HTTPException(status_code=404, detail="Staff skill not found")
    if not staff_skill.skill_certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return Response(content=staff_skill.skill_certificate, media_type="application/pdf", headers={"Content-Disposition": "attachment;filename=cert.pdf", "Content-Type": "application/pdf"})





