import pymysql
import pytest
from sqlalchemy.exc import IntegrityError, ArgumentError, StatementError
from sqlalchemy.orm.exc import FlushError
from app.core.models import RoleListings, RoleApplications, StaffDetails

def test_create_role_listing(db_session):
    new_role_listing = RoleListings(
        role_listing_id=1,
        role_id=1,
        role_listing_desc="Test Role Listing",
        role_listing_source=1,
        role_listing_creator=1,
        role_listing_updater=1
    )
    db_session.add(new_role_listing)
    db_session.commit()

    retrieved_listing = db_session.query(RoleListings).first()
    
    assert retrieved_listing.role_listing_id == 1
    assert retrieved_listing.role_id == 1
    assert retrieved_listing.role_listing_desc == "Test Role Listing"
    assert retrieved_listing.role_listing_source == 1
    assert retrieved_listing.role_listing_creator == 1
    assert retrieved_listing.role_listing_updater == 1

def test_missing_role_listing_id(db_session):
    with pytest.raises(FlushError) as e_info:
        invalid_role_listing = RoleListings(
            role_id=1,
            role_listing_desc="Test Role Listing",
            role_listing_source=1,
            role_listing_creator=1,
            role_listing_updater=1
        )
        db_session.add(invalid_role_listing)
        db_session.commit()
    # Cleanup so the error doesn't persist in transaction, for next test cases
    db_session.rollback()

def test_create_role_application(db_session):
    staff = StaffDetails(
        staff_id=1,
        fname="John",
        lname="Doe",
        dept="IT",
        email="john.doe@example.com",
        phone="1234567890",
        biz_address="123 Test St.",
        sys_role="staff"
    )
    db_session.add(staff)
    
    role_application = RoleApplications(
        role_listing_id=1,
        staff_id=1,
    )
    db_session.add(role_application)
    db_session.commit()
    
    retrieved_application = db_session.query(RoleApplications).first()
    
    assert retrieved_application.role_listing_id == 1
    assert retrieved_application.staff_id == 1

def test_invalid_role_app_status(db_session):
    from sqlalchemy import Enum
    enum_type = RoleApplications.__table__.columns["role_app_status"].type
    assert isinstance(enum_type, Enum)
    assert "pending" not in enum_type.enums