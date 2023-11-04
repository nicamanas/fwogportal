from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Any

from pydantic import BaseModel
from enum import Enum

class StaffSkillsStatusEnum(str, Enum):
    active = "active" 
    unverified = "unverified"
    in_progress = "in-progress"


class RoleListingsRequest(BaseModel):
    role_listing_id: int
    role_id: int
    role_listing_desc: str
    role_listing_source: int
    role_listing_open: datetime
    role_listing_close: datetime
    role_listing_creator: int
    role_listing_updater: Optional[int] = None


class RoleListingsResponse(RoleListingsRequest):
    role_listing_ts_create: datetime
    role_listing_ts_update: Optional[datetime] = None

    dept: str
    role_name: str
    role_description: str
    skills: List[str]

    class Config:
        orm_mode = True


class SkillDetails(BaseModel):
    skill_id: int
    skill_name: str
    skill_status: str

    class Config:
        orm_mode = True

class RoleApplicationRequest(BaseModel):
    role_listing_id: int
    staff_id: int
    role_app_status: str

class RoleApplicationResponse(RoleApplicationRequest):
    role_app_id: int
    role_app_ts_create: datetime
    
    class Config:
        orm_mode = True
class SysRoleEnum(str, Enum):
    staff = "staff"
    hr = "hr" 
    manager = "manager"
    inactive = "inactive"

class SBRPStaffSkillsRequest(BaseModel):
    staff_id: int
    skill_id: int
    ss_status: StaffSkillsStatusEnum
    skill_certificate: Optional[Any] = None

class SBRPStaffSkillsResponse(BaseModel):
    staff_id: int
    skill_id: int
    ss_status: StaffSkillsStatusEnum
    has_cert: bool
    class Config:
        orm_mode = True

class StaffProfileResponse(BaseModel):
    staff_id: int
    fname: str
    lname: str
    dept: str
    email: str
    phone: str
    biz_address: str
    sys_role: SysRoleEnum
    skills: List[SBRPStaffSkillsResponse]
    class Config:
        orm_mode = True

class StaffProfileRequest(StaffProfileResponse):
    pass

class RoleListingRoleApplications(BaseModel):
    role_listing_id: int
    role_id: int
    role_listing_desc: str
    role_listing_source: int
    role_listing_open: datetime
    role_listing_close: datetime
    role_listing_creator: int
    role_listing_ts_create: datetime
    role_listing_updater: Optional[int] = None
    role_listing_ts_update: Optional[datetime] = None
    role_applications: List[StaffProfileResponse]
    class Config:
        orm_mode = True

