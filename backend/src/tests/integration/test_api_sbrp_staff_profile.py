import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ...app.core.database import Base
from ...app.main import app
from ...app.api.sbrp_staff_profile import get_db
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
    db = TestingSessionLocal()
    init_db(db)
    yield
    Base.metadata.drop_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_one_staff_skill(test_db):
    response = client.post(
        "/staff_profile/3/skill/1"
    )
    assert response.status_code == 201
    data = response.json()
    assert data["skill_id"] == 1
    assert data['staff_id'] == 3
    assert data['ss_status'] == 'unverified'

def test_create_many_staff_skill(test_db):
    staff_skill = [
        {"skill_id": 2, "staff_id": 3, "ss_status": "unverified"},
        {"skill_id": 1, "staff_id": 3, "ss_status": "unverified"},
        {"skill_id": 3, "staff_id": 2, "ss_status": "unverified"},
    ]

    for staff_skill in staff_skill:
        staff_id = staff_skill["staff_id"]
        skill_id = staff_skill["skill_id"]
        response = client.post(
            f"/staff_profile/{staff_id}/skill/{skill_id}"
        )
        assert response.status_code == 201
        data = response.json()
        for field in staff_skill:
            assert data[field] == staff_skill[field]

def test_create_staff_skill_nonexistent_staff(test_db):
    response = client.post(
        "/staff_profile/700/skill/1"
    )
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Staff not found"

def test_create_staff_skill_nonexistent_skill(test_db):
    response = client.post(
        "/staff_profile/1/skill/1600"
    )
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Skill not found"



