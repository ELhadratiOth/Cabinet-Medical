from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from App.compo import patient, medical_visit, examination, vaccin, allergie, radiology, piechart, testsang, autres, charges
from . import models
from .database import engine, get_db
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    db: Session = next(get_db())
    try:
        # Check if a patient with id=-1 already exists
        existing_patient = db.query(models.Patient).filter(models.Patient.id == -1).first()
        if not existing_patient:
            new_patient = models.Patient(
                id=-1,
                firstname="defaultt",
                lastname="defaultt",
                cin="defaultt",
                age="defaultt",
                birthday="defaultt",
                gender="defaultt",
                phonenumber="defaultt",
                disease="defaultt",
                description="defaultt",
                first_visit="defaultt"
            )
            db.add(new_patient)
            db.commit()
            print("Added new patient with id=-1")
        else:
            print("Patient with id=0 already exists")
    except Exception as e:
        db.rollback()  
        print(f"Error adding patient: {e}")
    finally:
        db.close()

    print("Server Start")
    yield
    print("Server Shut Down")


app = FastAPI(
    lifespan=lifespan
)

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient.router, prefix="/patients", tags=["Patients"])
app.include_router(medical_visit.router, prefix="/medical_visits", tags=["Medical Visits"])
app.include_router(examination.router, prefix="/examinations", tags=["Examinations"])
app.include_router(vaccin.router, prefix="/vaccins", tags=["Vaccins"])
app.include_router(allergie.router, prefix="/allergies", tags=["Allergies"])
app.include_router(radiology.router, prefix="/radiologies", tags=["Radiologies"])
app.include_router(testsang.router, prefix="/testsang", tags=["Tests Sang"])
app.include_router(autres.router, prefix="/autres", tags=["Autres"])
app.include_router(charges.router, prefix="/charges", tags=["Charges"])

# DashBord
app.include_router(piechart.router, prefix="/piechart", tags=["PieChart"])
