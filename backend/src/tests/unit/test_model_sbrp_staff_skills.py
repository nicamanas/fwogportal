from ...app.core.models import StaffSkillsSBRP
import pytest


def test_correct_staff_skills_model():
    staff_skills = [
        {"staff_id": 1, "skill_id": 3, "ss_status": "active"},
        {"staff_id": 2, "skill_id": 1, "ss_status": "unverified"},
        {"staff_id": 2, "skill_id": 2, "ss_status": "in-progress"},
    ]
    for staff_skill in staff_skills:
        new_staff_skill = StaffSkillsSBRP(
            staff_skill["staff_id"],
            staff_skill["skill_id"],
            staff_skill["ss_status"],
        )
        for field in staff_skill:
            assert getattr(new_staff_skill, field) == staff_skill[field]


def test_invalid_staff_id():
    with pytest.raises(TypeError):
        StaffSkillsSBRP("invalid_id", 2, "active")


def test_invalid_skill_id():
    with pytest.raises(TypeError):
        StaffSkillsSBRP(1, "skill_id", "active")


def test_invalid_skill_status():
    with pytest.raises(ValueError):
        StaffSkillsSBRP(1, 7, "invalid_status")
    with pytest.raises(TypeError):
        StaffSkillsSBRP(1, 7, 2)
