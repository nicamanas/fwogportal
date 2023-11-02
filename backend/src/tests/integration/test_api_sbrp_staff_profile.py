import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import os

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

SAMPLE_CERT_FILEPATH = os.path.join(
        os.path.dirname(os.path.dirname(__file__)), "public", "sample_cert.pdf")

# Create
def test_create_one_staff_skill_no_cert(test_db):
    response = client.post(
        "/staff_profile/3/skill/1",
    )
    assert response.status_code == 201
    data = response.json()
    assert data["skill_id"] == 1
    assert data['staff_id'] == 3
    assert data['ss_status'] == 'unverified'
    assert data['has_cert'] == False

def test_create_many_staff_skill_no_cert(test_db):
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
            assert data['has_cert'] == False

def test_create_one_staff_skill_with_cert(test_db):
    with open(SAMPLE_CERT_FILEPATH, "rb") as file:
        files = {"cert": (os.path.basename(SAMPLE_CERT_FILEPATH), file.read(), "application/pdf")}
    response = client.post(
        "/staff_profile/3/skill/1",
        files=files
    )
    assert response.status_code == 201
    data = response.json()
    assert data["skill_id"] == 1
    assert data['staff_id'] == 3
    assert data['ss_status'] == 'unverified'
    assert data['has_cert'] == True

def test_create_many_staff_skill_with_cert(test_db):
    staff_skill = [
        {"skill_id": 2, "staff_id": 3, "ss_status": "unverified"},
        {"skill_id": 1, "staff_id": 3, "ss_status": "unverified"},
        {"skill_id": 3, "staff_id": 2, "ss_status": "unverified"},
    ]
    with open(SAMPLE_CERT_FILEPATH, "rb") as file:
        files = {"cert": (os.path.basename(SAMPLE_CERT_FILEPATH), file.read(), "application/pdf")}

    for staff_skill in staff_skill:
        staff_id = staff_skill["staff_id"]
        skill_id = staff_skill["skill_id"]
        response = client.post(
            f"/staff_profile/{staff_id}/skill/{skill_id}",
            files=files
        )
        assert response.status_code == 201
        data = response.json()
        for field in staff_skill:
            assert data[field] == staff_skill[field]
            assert data['has_cert'] == True

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

# Update
def test_update_staff_skill_status(test_db):
    statuses = ["unverified", "active", "in-progress"]
    for status in statuses:
        response = client.put(
            f"/staff_profile/1/skill/1/status/{status}",
        )
        assert response.status_code == 200
        data = response.json()
        assert data["skill_id"] == 1
        assert data['staff_id'] == 1
        assert data['ss_status'] == status
        assert data['has_cert'] == False    


def test_update_many_staff_skill_no_cert(test_db):
    staff_skill = [
        {"skill_id": 1, "staff_id": 1, "ss_status": "active"},
        {"skill_id": 1, "staff_id": 2, "ss_status": "in-progress"},
        {"skill_id": 3, "staff_id": 3, "ss_status": "unverified"},
    ]

    for staff_skill in staff_skill:
        staff_id = staff_skill["staff_id"]
        skill_id = staff_skill["skill_id"]
        ss_status = staff_skill["ss_status"]
        response = client.put(
            f"/staff_profile/{staff_id}/skill/{skill_id}/status/{ss_status}"
        )
        assert response.status_code == 200
        data = response.json()
        for field in staff_skill:
            assert data[field] == staff_skill[field]
            assert data['has_cert'] == False

def test_update_one_staff_skill_with_cert(test_db):
    with open(SAMPLE_CERT_FILEPATH, "rb") as file:
        files = {"cert": (os.path.basename(SAMPLE_CERT_FILEPATH), file.read(), "application/pdf")}
    response = client.put(
        "/staff_profile/1/skill/1/status/unverified",
        files=files
    )
    assert response.status_code == 200
    data = response.json()
    assert data["skill_id"] == 1
    assert data['staff_id'] == 1
    assert data['ss_status'] == 'unverified'
    assert data['has_cert'] == True

def test_update_many_staff_skill_with_cert(test_db):
    staff_skill = [
        {"skill_id": 1, "staff_id": 1, "ss_status": "active"},
        {"skill_id": 1, "staff_id": 2, "ss_status": "in-progress"},
        {"skill_id": 3, "staff_id": 3, "ss_status": "unverified"},
    ]
    with open(SAMPLE_CERT_FILEPATH, "rb") as file:
        files = {"cert": (os.path.basename(SAMPLE_CERT_FILEPATH), file.read(), "application/pdf")}

    for staff_skill in staff_skill:
        staff_id = staff_skill["staff_id"]
        skill_id = staff_skill["skill_id"]
        ss_status = staff_skill["ss_status"]
        response = client.put(
            f"/staff_profile/{staff_id}/skill/{skill_id}/status/{ss_status}",
            files=files
        )
        assert response.status_code == 200
        data = response.json()
        for field in staff_skill:
            assert data[field] == staff_skill[field]
        assert data['has_cert'] == True

def test_update_staff_skill_nonexistent_staff(test_db):
    response = client.put(
        "/staff_profile/700/skill/1/status/active"
    )
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Staff not found"

def test_update_staff_skill_nonexistent_skill(test_db):
    response = client.put(
        "/staff_profile/1/skill/1600/status/active"
    )
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Skill not found"







