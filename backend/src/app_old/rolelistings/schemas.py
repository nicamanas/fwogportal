from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

class RoleRequest(BaseModel):
    role_listing_id: int
    role_id: int 
    role_listing_desc: str = Field(..., min_length=3, max_length=5000)
    role_listing_source: int
    role_listing_open: datetime
    role_listing_close: datetime
    role_listing_creator: int
    role_listing_updater: Optional[int] = None 

class RoleResponse(RoleRequest):
    role_listing_ts_create: datetime
    role_listing_ts_update: Optional[datetime] = None
    class Config:
        orm_mode = True