from typing import Any, Union, Optional, List
import json
from datetime import datetime
from pydantic import BaseModel
from enum import Enum

# Enums
class SkillStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"

class RoleStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"

class StaffSkillsStatusEnum(str, Enum):
    active = "active" 
    unverified = "unverified"
    in_progress = "in-progress"

class RoleTypeEnum(str, Enum):
    primary = "primary"
    secondary = "secondary"

class StaffRoleStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"

# Skill details
class SkillDetailsRequest(BaseModel):
    skill_id: int
    skill_name: str
    skill_status: SkillStatusEnum

class SkillDetailsResponse(SkillDetailsRequest):
    class Config:
        orm_mode = True

# Role details
class RoleDetailsRequest(BaseModel):
    role_id: int
    role_name: str
    role_description: str
    role_status: RoleStatusEnum

class RoleDetailsResponse(RoleDetailsRequest):
    class Config:
        orm_mode = True

# Role skills
class RoleSkillsRequest(BaseModel):
    role_id: int
    skill_id: int

class RoleSkillsResponse(RoleSkillsRequest):
    class Config:
        orm_mode = True

# Staff skills
class StaffSkillsRequest(BaseModel):
    staff_id: int
    skill_id: int
    ss_status: StaffSkillsStatusEnum

class StaffSkillsResponse(StaffSkillsRequest):
    class Config:
        orm_mode = True

# Staff roles
class StaffRolesRequest(BaseModel):
    staff_id: int
    staff_role: int
    role_type: RoleTypeEnum
    sr_status: StaffRoleStatusEnum

class StaffRolesResponse(StaffRolesRequest):
    class Config:
        orm_mode = True