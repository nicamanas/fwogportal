from ...app.core.models import RoleListings
import pytest
from datetime import datetime

def test_correct_role_listings_model():
    role_listings =[
        {"role_listing_id": 1, "role_id": 1, "role_listing_desc": "test", "role_listing_source": 1, "role_listing_open": "2100-01-01", "role_listing_close": "2100-05-01", "role_listing_creator": 1, "role_listing_updater": 1},
        {"role_listing_id": 2, "role_id": 2, "role_listing_desc": "test", "role_listing_source": 2, "role_listing_open": "2100-01-01", "role_listing_close": "2100-05-01", "role_listing_creator": 2, "role_listing_updater": 2},
        {"role_listing_id": 3, "role_id": 3, "role_listing_desc": "test", "role_listing_source": 3, "role_listing_open": "2100-01-01", "role_listing_close": "2100-05-01", "role_listing_creator": 3, "role_listing_updater": 3},
    ]
    for role_listing in role_listings:
        role_listing["role_listing_open"] = datetime.strptime(role_listing["role_listing_open"], "%Y-%m-%d")
        role_listing["role_listing_close"] = datetime.strptime(role_listing["role_listing_close"], "%Y-%m-%d")
        new_role_listing = RoleListings(role_listing["role_listing_id"], role_listing["role_id"], role_listing["role_listing_desc"], role_listing["role_listing_source"], role_listing["role_listing_open"], role_listing["role_listing_close"], role_listing["role_listing_creator"], role_listing["role_listing_updater"])
        for field in role_listing:
            assert getattr(new_role_listing, field) == role_listing[field]

def test_invalid_role_listing_id():
    with pytest.raises(TypeError):
        RoleListings("invalid_id", 1, "test", 1, "2100-01-01", "2100-05-01", 1, 1)

def test_invalid_role_id():
    with pytest.raises(TypeError):
        RoleListings(1, "invalid_id", "test", 1, "2100-01-01", "2100-05-01", 1, 1)

def test_invalid_role_listing_desc():
    with pytest.raises(TypeError):
        RoleListings(1, 1, 12345, 1, "2100-01-01", "2100-05-01", 1, 1)

def test_invalid_role_listing_source():
    with pytest.raises(TypeError):
        RoleListings(1, 1, "test", "invalid_id", "2100-01-01", "2100-05-01", 1, 1)

def test_invalid_role_listing_open():
    with pytest.raises(TypeError):
        RoleListings(1, 1, "test", 1, 12345, "2100-05-01", 1, 1)

def test_invalid_role_listing_close():
    with pytest.raises(TypeError):
        RoleListings(1, 1, "test", 1, "2100-01-01", 12345, 1, 1)

def test_invalid_role_listing_creator():
    with pytest.raises(TypeError):
        RoleListings(1, 1, "test", 1, "2100-01-01", "2100-05-01", "invalid_id", 1)

def test_invalid_role_listing_updater():
    with pytest.raises(TypeError):
        RoleListings(1, 1, "test", 1, "2100-01-01", "2100-05-01", 1, "invalid_id")

