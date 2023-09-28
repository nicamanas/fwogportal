from fastapi import FastAPI

from app.roles import ping, roles
from app.roles.models import Base
from app.db import engine, SessionLocal
from .set_up.db_prestart import init_db

Base.metadata.create_all(bind=engine)
db = SessionLocal()
init_db(db)
app = FastAPI()

app.include_router(ping.router)
app.include_router(roles.router, prefix="/roles", tags=["roles"])
