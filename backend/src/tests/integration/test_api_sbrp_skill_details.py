import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ...app.core.database import Base
from ...app.main import app
from ...app.api.sbrp_skill_details import get_db

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
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_one_skill_detail(test_db):
    skill_detail = {"skill_id": 999, "skill_name": "Java Programming", "skill_status": "active"}
    response = client.post(
        "/skill_details",
        json=skill_detail
    )
    assert response.status_code == 201, response.text
    data = response.json()
    assert data["skill_name"] == "Java Programming"
    assert "skill_id" in data
    skill_id = data["skill_id"]

    response = client.get(f"/skill_details/{skill_id}")
    data = response.json()
    for field in skill_detail:
        assert data[field] == skill_detail[field]

def test_create_many_skill_details(test_db):
    skill_details = [
        {"skill_id": 1, "skill_name": "Standup Comedy", "skill_status": "active"},
        {"skill_id": 69, "skill_name": "Python Programming", "skill_status": "inactive"},
        {"skill_id": 999, "skill_name": "Java Programming", "skill_status": "active"}
    ]

    for skill_detail in skill_details:
        response = client.post(
            "/skill_details",
            json=skill_detail,
        )
        assert response.status_code == 201, response.text
        data = response.json()
        for field in skill_detail:
            assert data[field] == skill_detail[field]

    response = client.get("/skill_details")
    assert response.status_code == 200
    data = response.json()
    assert data == skill_details

def test_create_skill_detail_missing_fields(test_db):
    skill_details = [
        {"skill_name": "Standup Comedy", "skill_status": "active"},
        {"skill_id": 69,  "skill_status": "inactive"},
        {"skill_id": 999, "skill_name": "Java Programming"}
    ]
    missing_fields = ["skill_id", "skill_name", "skill_status"]

    for i in range(len(skill_details)):
        response = client.post(
            "/skill_details",
            json=skill_details[i],
        )
        assert response.status_code == 422
        data = response.json()
        assert data["detail"][0]["loc"][1] == missing_fields[i]

def test_get_nonexistent_skill(test_db):
    response = client.get("/skill_details/100")
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Skill not found"

