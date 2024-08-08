from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from App.compo import patient, medical_visit, examination
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
