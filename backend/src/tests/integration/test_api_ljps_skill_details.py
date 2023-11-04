import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ...app.core.database import Base
from ...app.main import app
from ...app.api.ljps import get_db as ljps_get_db
from ...app.api.lms import get_db as lms_get_db
from ...app.setup.db_prestart import init_db

SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture()
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        init_db(db)
        yield db
    finally:
        db.close()

app.dependency_overrides[lms_get_db] = override_get_db
app.dependency_overrides[ljps_get_db] = override_get_db

client = TestClient(app)

# Test for role-skill match API
def test_get_skills_by_staff_id(test_db):
    # create a dummy stuff 
    new_staff = {"staff_id": 88888888,
                 "fname": "Emily",
                 "lname": "Tan",
                 "dept": "Test",
                 "email": "Test",
                 "phone": "Test",
                 "biz_address": "Test",
                 "sys_role": "staff"}
    staff_response = client.post("/lms/staff_details/",
                           json=new_staff)
    
    # create 2 dummy skills
    new_skill_1 = {"skill_id": 998,
                   "skill_name": "Skill 1",
                   "skill_status": "active"}
    new_skill_2 = {"skill_id": 999,
                     "skill_name": "Skill 2",
                     "skill_status": "active"}
    skill_response_1 = client.post("/ljps/skill_details/",
                                 json=new_skill_1)
    skill_response_2 = client.post("/ljps/skill_details/",
                                    json=new_skill_2)

    #Assign skills 1 and 2 to staff 88888888
    staff_skill_mapping_1 = {
        "staff_id": 88888888,
        "skill_id": 998,
        "ss_status": "active"}
    staff_skill_mapping_2 = {
        "staff_id": 88888888,
        "skill_id": 999,
        "ss_status": "active"}
    skill_map_response_1 = client.post("/ljps/staff_skills/",
                                 json=staff_skill_mapping_1)
    skill_map_response_2 = client.post("/ljps/staff_skills/",
                                    json=staff_skill_mapping_2)
    #Get skills by staff id
    response = client.get(f"/ljps/staff_skills/88888888")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["skill_name"] == "Skill 1"
    assert data[1]["skill_name"] == "Skill 2"

def test_get_skills_by_nonexistent_staff_id(test_db):
    response = client.get("/ljps/staff_skills/2002")
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Staff ID not found"


