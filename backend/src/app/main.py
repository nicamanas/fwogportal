from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import ping, rolelistings, lms, ljps, sbrp_skill_details, sbrp_staff_profile, roleapplications
from .core.models import Base
from .core.database import engine, SessionLocal
from .setup.db_prestart import init_db
# TODO: Edit presetup

Base.metadata.create_all(bind=engine)
db = SessionLocal()
init_db(db)
app = FastAPI()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(ping.router)
app.include_router(rolelistings.router,
                   prefix="/rolelistings", tags=["rolelistings"])
app.include_router(sbrp_skill_details.router,
                   prefix="/skill_details", tags=["sbrp_skill_details"])
app.include_router(sbrp_staff_profile.router,
                   prefix="/staff_profile", tags=["sbrp_staff_profile"])
app.include_router(lms.router, prefix="/lms", tags=["lms"])
app.include_router(ljps.router, prefix="/ljps", tags=["ljps"])
app.include_router(roleapplications.router, prefix="/roleapplications", tags=["roleapplications"])

