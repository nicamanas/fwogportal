from sqlalchemy.orm import Session
from app.api.models import Role, RoleSchema
from datetime import datetime


def post(db_session: Session, payload: RoleSchema):
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


def get(db_session: Session, id: int):
    return db_session.query(Role).filter(Role.id == id).first()


def get_all(db_session: Session):
    return db_session.query(Role).all()


def put(db_session: Session, role: Role, name: str, description: str, skills: list, deadline: datetime):
    role.name = name
    role.description = description
    role.skills = skills
    role.deadline = deadline
    db_session.commit()
    return role


def delete(db_session: Session, id: int):
    role = db_session.query(Role).filter(Role.id == id).first()
    db_session.delete(role)
    db_session.commit()
    return role
