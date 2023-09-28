from typing import Any, Union
import json
from datetime import datetime
from typing import Optional, List, Union

from pydantic import BaseModel, validator

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
    sys_role: SysRoleEnum = SysRoleEnum.staff

    