from sqlalchemy.orm import Session
from app.roles.models import Role
from app.roles.schemas import RoleRequest
from datetime import datetime
# create CRUD operations for all entities here

def create_role(db_session: Session, payload: RoleRequest) -> Role:
    role = Role(
        name=payload.name,
        description=payload.description,
        skills=payload.skills,
        deadline=payload.deadline
    )
    db_session.add(role)
    db_session.commit()
    db_session.refresh(role)
    return role


def get_role_by_id(db_session: Session, id: int) -> Role:
    return db_session.query(Role).filter(Role.id == id).first()


def get_all_roles(db_session: Session):
    return db_session.query(Role).all()


def update_role_by_id(db_session: Session, role: Role, name: str, description: str, skills: list, deadline: datetime):
    role.name = name
    role.description = description
    role.skills = skills
    role.deadline = deadline
    db_session.commit()
    return role


def delete_role_by_id(db_session: Session, id: int):
    role = db_session.query(Role).filter(Role.id == id).first()
    db_session.delete(role)
    db_session.commit()
    return role
