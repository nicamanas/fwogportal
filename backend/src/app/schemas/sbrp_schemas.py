from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

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
