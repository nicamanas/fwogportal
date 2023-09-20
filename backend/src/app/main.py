from fastapi import FastAPI

from app.roles import ping, roles
from app.roles.models import Base
from app.db import engine


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(ping.router)
app.include_router(roles.router, prefix="/roles", tags=["roles"])
