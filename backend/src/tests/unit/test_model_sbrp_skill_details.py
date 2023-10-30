from ...app.core.models import SkillDetailsSBRP
import pytest

def test_correct_skill_details_model():
    skill_details = [
        {"skill_id": 1, "skill_name": "Standup Comedy", "skill_status": "active"},
        {"skill_id": 69, "skill_name": "Python Programming", "skill_status": "inactive"},
        {"skill_id": 999, "skill_name": "Java Programming", "skill_status": "active"}
    ]
    for skill_detail in skill_details:
        new_skill_details = SkillDetailsSBRP(skill_detail["skill_id"], skill_detail['skill_name'], skill_detail['skill_status'])
        for field in skill_detail:
            assert getattr(new_skill_details, field) == skill_detail[field]

def test_invalid_skill_id():
    with pytest.raises(TypeError):
        SkillDetailsSBRP("invalid_id", "Test Skill", "active")

def test_invalid_skill_name():
    with pytest.raises(TypeError):
        SkillDetailsSBRP(1, 12345, "active")

def test_invalid_skill_status():
    with pytest.raises(ValueError):
        SkillDetailsSBRP(1, "Test Skill", "invalid_status")
    with pytest.raises(TypeError):
        SkillDetailsSBRP(1, "Test Skill", 2)