from typing import Any, Union
import json
from datetime import datetime
from typing import Optional, List, Union

from pydantic import BaseModel, validator

class SkillDetailsRequest(BaseModel):
    skill_id: int
    skill_name: str
    skill_status: str

    
