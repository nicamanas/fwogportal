from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

class RoleRequest(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    description: str = Field(..., min_length=3, max_length=500)
    skills: List[str]
    deadline: datetime

class RoleResponse(RoleRequest):
    id: int
    created_date: datetime
    class Config:
        orm_mode = True


# class RoleUpdate(RoleBase):
#     # in case you want to update only some fields
#     # EDIT THIS SO IT HAS ALL THE FIELDS YOU WANT TO UPDATE
#     user_id: Optional[int] = None
#     role_id: Optional[int] = None


# class RoleInDBBase(RoleBase):
#     # this is the base class for RoleInDB and RoleUpdateInDB
#     # SHOULD NOT NEED TO EDIT THIS
#     role_id: Optional[
#         int
#     ] = None  # this is optional so we can let the DB auto-increment the id

#     class Config:
#         orm_mode = True


# class Role(RoleInDBBase):
#     # this is the class for returning a Role
#     # SHOULD NOT NEED TO EDIT THIS
#     role_id: int
