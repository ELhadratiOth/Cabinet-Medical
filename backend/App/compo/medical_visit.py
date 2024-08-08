from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App.database import get_db
from typing import List
from App import models, BaseModels
from datetime import datetime


router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.MedicalVisitModel])
async def get_patient_medical_visit(
    firstname_patient: str,
    lastname_patient: str,
    db: Session = Depends(get_db)
):
    patient = db.query(models.Patient).filter(
        models.Patient.firstname == firstname_patient,
        models.Patient.lastname == lastname_patient
    ).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    visits = db.query(models.MedicalVisit).filter(
        models.MedicalVisit.patient_id == patient.id
    ).all()

    if not visits:
        raise HTTPException(status_code=404, detail="No medical visits found for this patient")

    return visits

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.MedicalVisitModel)
async def add_medical_visit_2_patient(
    medicalVisitForm: BaseModels.MedicalVisitBase,
    firstname_patient: str,
    lastname_patient: str,
    db: Session = Depends(get_db)
):
    try:
        patient = db.query(models.Patient).filter(
            models.Patient.firstname == firstname_patient,
            models.Patient.lastname == lastname_patient
        ).first()
        
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        current_datetime = datetime.now()
        formatted_date = current_datetime.strftime("%Y-%m-%d")
        formatted_time = current_datetime.strftime("%I:%M %p")  

        medicalVisit = models.MedicalVisit(
            **medicalVisitForm.model_dump(),
            patient_id=patient.id,
            date_visit=formatted_date,
            hour_visit=formatted_time 
        )
        db.add(medicalVisit)
        db.commit()
        db.refresh(medicalVisit)
        
        return medicalVisit
    
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new medical visit: {str(e)}")

# @router.put("/update/{visit_id}", response_model=BaseModels.MedicalVisitModel)
# async def update_medical_visit(
#     visit_id: int,
#     medicalVisitUpdate: BaseModels.MedicalVisitBase,  
#     db: Session = Depends(get_db)
# ):
#     visit = db.query(models.MedicalVisit).filter(models.MedicalVisit.id == visit_id).first()

#     if not visit:
#         raise HTTPException(status_code=404, detail="Medical visit not found")

#     update_data = medicalVisitUpdate.model_dump()
#     for key, value in update_data.items():
#         setattr(visit, key, value)

#     db.commit()
#     db.refresh(visit)

#     return visit

@router.delete("/delete/{visit_id}")
async def delete_medical_visit(visit_id: int, db: Session = Depends(get_db)):
    visit = db.query(models.MedicalVisit).filter(models.MedicalVisit.id == visit_id).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Medical visit not found")
    db.delete(visit)
    db.commit()
