import enum
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import JSON
from sqlalchemy.sql import func
from datetime import datetime, timedelta

# from app.core.database import Base
from ..core.database import Base

# Enums and Constants


class Status(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class SkillStatus(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class StaffSysRole(enum.Enum):
    STAFF = "staff"
    HR = "hr"
    MANAGER = "manager"
    INACTIVE = "inactive"


class RoleStatus(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class StaffSkillsStatus(enum.Enum):
    ACTIVE = "active"
    UNVERIFIED = "unverified"
    IN_PROGRESS = "in-progress"


class RoleType(enum.Enum):
    PRIMARY = "primary"
    SECONDARY = "secondary"


class StaffRoleStatus(enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

# SQLAlchemy Models

# LMS Models


class StaffDetails(Base):
    __tablename__ = "staff_details"

    staff_id = Column(Integer, primary_key=True)
    fname = Column(String(50))
    lname = Column(String(50))
    dept = Column(String(50))
    email = Column(String(50))
    phone = Column(String(20))
    biz_address = Column(String(255))
    sys_role = Column(Enum(*[e.value for e in StaffSysRole]),
                      default=StaffSysRole.STAFF.value)

    staff_reporting_officer_staff = relationship(
        "StaffReportingOfficer", back_populates="staff", primaryjoin='and_(StaffDetails.staff_id == StaffReportingOfficer.staff_id)')
    staff_reporting_officer_officer = relationship(
        "StaffReportingOfficer", back_populates="reporting_officer", primaryjoin='and_(StaffDetails.staff_id == StaffReportingOfficer.RO_id)')

    staff_skills_staff = relationship("StaffSkills", back_populates="staff", primaryjoin='and_(StaffDetails.staff_id == StaffSkills.staff_id)')

    staff_skills_sbrp_staff = relationship("StaffSkillsSBRP", back_populates="staff", primaryjoin='and_(StaffDetails.staff_id == StaffSkillsSBRP.staff_id)')

    staff_roles_staff = relationship("StaffRoles", back_populates="staff")

    role_listings_source = relationship("RoleListings", back_populates="staff_details_source",
                                        primaryjoin='and_(StaffDetails.staff_id == RoleListings.role_listing_source)')
    role_listings_creator = relationship("RoleListings", back_populates="staff_details_creator",
                                         primaryjoin='and_(StaffDetails.staff_id == RoleListings.role_listing_creator)')
    role_listings_updater = relationship("RoleListings", back_populates="staff_details_updater",
                                         primaryjoin='and_(StaffDetails.staff_id == RoleListings.role_listing_updater)')
    
    staff_details_source = relationship("RoleApplications", back_populates="staff_details_source",
                                        primaryjoin='and_(RoleApplications.staff_id == StaffDetails.staff_id)')

    def __init__(self, staff_id, fname, lname, dept, email, phone, biz_address, sys_role):
        self.staff_id = staff_id
        self.fname = fname
        self.lname = lname
        self.dept = dept
        self.email = email
        self.phone = phone
        self.biz_address = biz_address
        self.sys_role = sys_role


class StaffReportingOfficer(Base):
    __tablename__ = "staff_reporting_officer"

    staff_id = Column(Integer, ForeignKey(
        'staff_details.staff_id'), primary_key=True)
    RO_id = Column(Integer, ForeignKey(
        'staff_details.staff_id'), primary_key=True)

    staff = relationship(
        "StaffDetails", back_populates="staff_reporting_officer_staff", foreign_keys=[staff_id])
    reporting_officer = relationship(
        "StaffDetails", back_populates="staff_reporting_officer_officer", foreign_keys=[RO_id])

    def __init__(self, staff_id, reporting_officer_id):
        self.staff_id = staff_id
        self.RO_id = reporting_officer_id

# LJPS Models


class SkillDetails(Base):
    __tablename__ = "skill_details"

    skill_id = Column(Integer, primary_key=True)
    skill_name = Column(String(50))
    skill_status = Column(
        Enum(*[e.value for e in SkillStatus]), default=SkillStatus.ACTIVE.value)

    staff_skills_skill = relationship("StaffSkills", back_populates="skill")
    role_skills_skill = relationship("RoleSkills", back_populates="skill")

    staff_skills_sbrp_skill = relationship("StaffSkillsSBRP", back_populates="skill")

    def __init__(self, skill_id, skill_name, skill_status):
        self.skill_id = skill_id
        self.skill_name = skill_name
        self.skill_status = skill_status


class RoleDetails(Base):
    __tablename__ = "role_details"

    role_id = Column(Integer, primary_key=True)
    role_name = Column(String(50))
    role_description = Column(String(5000))
    role_status = Column(
        Enum(*[e.value for e in RoleStatus]), default=RoleStatus.ACTIVE.value)

    role_skills_role = relationship("RoleSkills", back_populates="role")

    staff_roles_role = relationship("StaffRoles", back_populates="role")

    role_listings_role_id = relationship(
        "RoleListings", back_populates="role_role_id", primaryjoin='and_(RoleDetails.role_id == RoleListings.role_id)')

    def __init__(self, role_id, role_name, role_description, role_status):
        self.role_id = role_id
        self.role_name = role_name
        self.role_description = role_description
        self.role_status = role_status


class StaffSkills(Base):
    __tablename__ = "staff_skills"

    staff_id = Column(Integer, ForeignKey(
        'staff_details.staff_id'), primary_key=True)
    skill_id = Column(Integer, ForeignKey(
        'skill_details.skill_id'), primary_key=True)
    ss_status = Column(Enum(
        *[e.value for e in StaffSkillsStatus]), default=StaffSkillsStatus.ACTIVE.value)

    staff = relationship("StaffDetails", back_populates="staff_skills_staff", primaryjoin='and_(StaffSkills.staff_id == StaffDetails.staff_id)')
    skill = relationship("SkillDetails", back_populates="staff_skills_skill")

    def __init__(self, staff_id, skill_id, ss_status):
        self.staff_id = staff_id
        self.skill_id = skill_id
        self.ss_status = ss_status


class RoleSkills(Base):
    __tablename__ = "role_skills"

    role_id = Column(Integer, ForeignKey(
        'role_details.role_id'), primary_key=True)
    skill_id = Column(Integer, ForeignKey(
        'skill_details.skill_id'), primary_key=True)

    role = relationship("RoleDetails", back_populates="role_skills_role")
    skill = relationship("SkillDetails", back_populates="role_skills_skill")

    def __init__(self, role_id, skill_id):
        self.role_id = role_id
        self.skill_id = skill_id


class StaffRoles(Base):
    __tablename__ = "staff_roles"

    staff_id = Column(Integer, ForeignKey(
        'staff_details.staff_id'), primary_key=True)
    staff_role = Column(Integer, ForeignKey(
        'role_details.role_id'), primary_key=True)
    role_type = Column(Enum(*[e.value for e in RoleType]),
                       default=RoleType.PRIMARY.value)
    sr_status = Column(
        Enum(*[e.value for e in StaffRoleStatus]), default=StaffRoleStatus.ACTIVE.value)

    staff = relationship("StaffDetails", back_populates="staff_roles_staff")
    role = relationship("RoleDetails", back_populates="staff_roles_role")

    def __init__(self, staff_id, staff_role, role_type, sr_status):
        self.staff_id = staff_id
        self.staff_role = staff_role
        self.role_type = role_type
        self.sr_status = sr_status

# SBRP Models


class RoleListings(Base):
    __tablename__ = "role_listings"

    role_listing_id = Column(Integer, primary_key=True, autoincrement=False)
    role_id = Column(Integer, ForeignKey('role_details.role_id'))
    role_listing_desc = Column(String(5000))
    role_listing_source = Column(Integer, ForeignKey('staff_details.staff_id'))
    role_listing_open = Column(DateTime, default=func.now())
    role_listing_close = Column(
        DateTime, default=datetime.utcnow() + timedelta(weeks=2))
    # system generated fields
    role_listing_creator = Column(
        Integer, ForeignKey('staff_details.staff_id'))
    role_listing_ts_create = Column(
        DateTime(timezone=True), default=func.now())
    role_listing_updater = Column(
        Integer, ForeignKey('staff_details.staff_id'))
    # update time automatically
    role_listing_ts_update = Column(
        DateTime(timezone=True), onupdate=func.now())

    role_role_id = relationship(
        "RoleDetails", back_populates="role_listings_role_id")
    staff_details_source = relationship("StaffDetails", back_populates="role_listings_source",
                                        primaryjoin='and_(RoleListings.role_listing_source == StaffDetails.staff_id)')
    staff_details_creator = relationship("StaffDetails", back_populates="role_listings_creator",
                                         primaryjoin='and_(RoleListings.role_listing_creator == StaffDetails.staff_id)')
    staff_details_updater = relationship("StaffDetails", back_populates="role_listings_updater",
                                         primaryjoin='and_(RoleListings.role_listing_updater == StaffDetails.staff_id)')
    
    role_app_listing_source = relationship("RoleApplications", back_populates="role_app_listing_source",
                                       primaryjoin='and_(RoleListings.role_listing_id == RoleApplications.role_listing_id)')


class SkillDetailsSBRP(Base):
    __tablename__ = "skill_details_sbrp"

    skill_id = Column(Integer, primary_key=True)
    skill_name = Column(String(50))
    skill_status = Column(
        Enum(*[e.value for e in SkillStatus]), default=SkillStatus.ACTIVE.value)

    def __init__(self, skill_id, skill_name, skill_status):
        if not isinstance(skill_id, int):
            raise TypeError("skill_id must be an integer")
        if not isinstance(skill_name, str):
            raise TypeError("skill_name must be a string")
        if not isinstance(skill_status, str):
            raise TypeError("skill_status must a string")
        if skill_status not in [e.value for e in SkillStatus]:
            raise ValueError("skill_status must be one of 'active' or 'inactive'")
        
        self.skill_id = skill_id
        self.skill_name = skill_name
        self.skill_status = skill_status


class RoleApplications(Base):
    __tablename__ = "role_applications"

    role_app_id = Column(Integer, primary_key=True, autoincrement=True)
    role_listing_id = Column(Integer, ForeignKey(
        'role_listings.role_listing_id'))
    staff_id = Column(Integer, ForeignKey('staff_details.staff_id'))
    role_app_status = Column(
        Enum(*[e.value for e in Status]), default=Status.ACTIVE.value)
    role_app_ts_create = Column(DateTime(timezone=True), default=func.now())

    role_app_listing_source = relationship("RoleListings", back_populates="role_app_listing_source",
                                       primaryjoin='and_(RoleApplications.role_listing_id == RoleListings.role_listing_id)')
    staff_details_source = relationship("StaffDetails", back_populates="staff_details_source",
                                        primaryjoin='and_(RoleApplications.staff_id == StaffDetails.staff_id)')
    
class StaffSkillsSBRP(Base):
    __tablename__ = "staff_skills_sbrp"

    staff_id = Column(Integer, ForeignKey(
        'staff_details.staff_id'), primary_key=True)
    skill_id = Column(Integer, ForeignKey(
        'skill_details.skill_id'), primary_key=True)
    ss_status = Column(Enum(
        *[e.value for e in StaffSkillsStatus]), default=StaffSkillsStatus.ACTIVE.value)
    skill_certificate = Column(LargeBinary(length=2**32-1), nullable=True)

    staff = relationship("StaffDetails", back_populates="staff_skills_sbrp_staff", primaryjoin='and_(StaffSkillsSBRP.staff_id == StaffDetails.staff_id)')
    skill = relationship("SkillDetails", back_populates="staff_skills_sbrp_skill")

    def __init__(self, staff_id, skill_id, ss_status, skill_certificate=None):
        if not isinstance(staff_id, int):
            raise TypeError("staff_id must be an integer")
        if not isinstance(skill_id, int):
            raise TypeError("skill_id must be an integer")
        if not isinstance(ss_status, str):
            raise TypeError("ss_status must a string")
        if ss_status not in [e.value for e in StaffSkillsStatus]:
            raise ValueError("ss_status must be one of 'active', 'unverified' or 'in-progress'")
            
        self.staff_id = staff_id
        self.skill_id = skill_id
        self.ss_status = ss_status
        self.skill_certificate = skill_certificate