from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import ping, rolelistings, lms, ljps
from app.core.models import Base
from app.core.database import engine, SessionLocal
# from .set_up.db_prestart import init_db
#TODO: Edit presetup 

Base.metadata.create_all(bind=engine)
db = SessionLocal()
# init_db(db)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(ping.router)
app.include_router(rolelistings.router, prefix="/rolelistings", tags=["rolelistings"])
app.include_router(lms.router, prefix="/lms", tags=["lms"])
app.include_router(ljps.router, prefix="/ljps", tags=["ljps"])
