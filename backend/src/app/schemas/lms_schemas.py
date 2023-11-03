from pydantic import BaseModel

from enum import Enum

class SysRoleEnum(str, Enum):
    staff = "staff"
    hr = "hr" 
    manager = "manager"
    inactive = "inactive"

class StaffDetailsRequest(BaseModel):
    staff_id: int
    fname: str 
    lname: str
    dept: str
    email: str
    phone: str
    biz_address: str
    sys_role: SysRoleEnum

class StaffDetailsResponse(StaffDetailsRequest):
    class Config: 
        orm_mode = True

    