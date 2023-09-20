from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class RoleBase(BaseModel):
    # this is the base class for RoleCreate and RoleUpdate
    # EDIT THIS 
    id: int
    name: str
    description: str
    skills: list
    deadline: datetime
    created_date: datetime


class RoleCreate(RoleBase):
    # this is the class for creating a new role
    # ONLY EDIT IF YOUR CREATE HAS FANCY STUFF
    pass


class RoleUpdate(RoleBase):
    # in case you want to update only some fields
    # EDIT THIS SO IT HAS ALL THE FIELDS YOU WANT TO UPDATE
    user_id: Optional[int] = None
    post_id: Optional[int] = None


class RoleInDBBase(RoleBase):
    # this is the base class for RoleInDB and RoleUpdateInDB
    # SHOULD NOT NEED TO EDIT THIS
    reservation_id: Optional[
        int
    ] = None  # this is optional so we can let the DB auto-increment the id

    class Config:
        orm_mode = True


class Role(RoleInDBBase):
    # this is the class for returning a Role
    # SHOULD NOT NEED TO EDIT THIS
    reservation_id: int
