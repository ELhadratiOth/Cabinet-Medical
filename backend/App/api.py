from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from App.compo import patient, medical_visit, examination , vaccin , allergie , radiology , piechart , testsang , autres , charges
from . import models 
from .database import engine

app = FastAPI()

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


#DashBord
app.include_router(piechart.router, prefix="/piechart", tags=["PieChart"])


