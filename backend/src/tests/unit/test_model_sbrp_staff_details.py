from ...app.core.models import StaffDetails
import pytest
import os

def test_correct_staff_details_model():
    staff_details = [
        {
            "staff_id": 1,
            "fname": "Ah Gao",
            "lname": "Tan",
            "dept": "Finance",
            "email": "tan_ah_gao@all-in-one.com.sg",
            "phone": "65-1234-5678",
            "biz_address": "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051",
            "sys_role": "staff"
        },
        {
            "staff_id": 2,
            "fname": "Vincent Rex",
            "lname": "Collins",
            "dept": "Human Resource and Admin",
            "email": "colins_vincent_rex@all-in-one.com.sg",
            "phone": "65-1234-5679",
            "biz_address": "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051",
            "sys_role": "hr"
        }
    ]
    for staff_detail in staff_details:
        new_staff_detail = StaffDetails(
            staff_detail["staff_id"],
            staff_detail["fname"],
            staff_detail["lname"],
            staff_detail["dept"],
            staff_detail["email"],
            staff_detail["phone"],
            staff_detail["biz_address"],
            staff_detail["sys_role"],
        )
        for field in staff_detail:
            assert getattr(new_staff_detail, field) == staff_detail[field]

def test_invalid_staff_id():
    with pytest.raises(TypeError):
        StaffDetails("invalid_id", "Ah Gao", "Tan", "Finance", "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "staff")
        
def test_invalid_fname():
    with pytest.raises(TypeError):
        StaffDetails(1, 10, "Tan", "Finance", "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "staff")
        
def test_invalid_lname():
    with pytest.raises(TypeError):
        StaffDetails(1, "Ah Gao", 10, "Finance", "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "staff")
        
def test_invalid_dept():
    with pytest.raises(TypeError):
        StaffDetails(1, "Ah Gao", "Tan", 10, "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "staff")
        
def test_invalid_email():
    with pytest.raises(TypeError):
        StaffDetails(1, "Ah Gao", "Tan", "Finance", 10, "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "staff")
        
def test_invalid_phone():
    with pytest.raises(TypeError):
        StaffDetails(1, "Ah Gao", "Tan", "Finance", "tan_ah_gao@all-in-one.com.sg", 10, "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "staff")
        
def test_invalid_biz_address():
    with pytest.raises(TypeError):
        StaffDetails(1, "Ah Gao", "Tan", "Finance", "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", 10, "staff")
        
def test_invalid_sys_role():
    with pytest.raises(ValueError):
        StaffDetails(1, "Ah Gao", "Tan", "Finance", "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", "invalid_sys_role")
    with pytest.raises(TypeError):
        StaffDetails(1, "Ah Gao", "Tan", "Finance", "tan_ah_gao@all-in-one.com.sg", "65-1234-5678", "60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051", 10)
        