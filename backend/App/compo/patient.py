from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from App.database import get_db
from App import models, BaseModels

router = APIRouter()

@router.get("/all", response_model=List[BaseModels.PatientBase])
async def get_all_patients(db: Session = Depends(get_db)):
    patients = (
        db.query(models.Patient)
        .order_by(desc(models.Patient.id))
        .limit(15)
        .all()
    )
    return patients

@router.post("/add", response_model=BaseModels.PatientModel)
async def create_new_patient(patientForm: BaseModels.PatientBase, db: Session = Depends(get_db)):
    try:
        patient = models.Patient(**patientForm.dict())
        db.add(patient)
        db.commit()
        db.refresh(patient)
        return patient
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating new patient: {str(e)}")

@router.get("/{firstname_patient}/{lastname_patient}", response_model=BaseModels.PatientModel)
async def get_patient(firstname_patient: str, lastname_patient: str, db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(
        models.Patient.firstname == firstname_patient,
        models.Patient.lastname == lastname_patient
    ).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
