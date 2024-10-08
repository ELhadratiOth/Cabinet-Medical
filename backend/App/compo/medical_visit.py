from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from database.database import get_db
from typing import List
from App import models, BaseModels
from datetime import datetime


from dateutil.relativedelta import relativedelta


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
        raise HTTPException(status_code=404, detail="Medical Visit not found")

    visits = db.query(models.MedicalVisit).filter(
        models.MedicalVisit.patient_id == patient.id
    ).order_by(desc(models.MedicalVisit.id)).all()

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
        
        current_datetime = datetime.now() - relativedelta(months=0)
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

@router.put("/update/{visit_id}", response_model=BaseModels.MedicalVisitModel)
async def update_medical_visit(
    visit_id: int,
    medicalVisitUpdate: BaseModels.MedicalVisitUpdate,  
    db: Session = Depends(get_db)
):
    visit = db.query(models.MedicalVisit).filter(models.MedicalVisit.id == visit_id).first()

    if not visit:
        raise HTTPException(status_code=404, detail="Medical visit not found")

    update_data = medicalVisitUpdate.model_dump(exclude_unset=True)  
    
    for key, value in update_data.items():
        setattr(visit, key, value)

    db.commit()
    db.refresh(visit)

    return visit

@router.delete("/delete/{visit_id}")
async def delete_medical_visit(visit_id: int, db: Session = Depends(get_db)):
    visit = db.query(models.MedicalVisit).filter(models.MedicalVisit.id == visit_id).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Medical visit not found")
    db.delete(visit)
    db.commit()
    
    
from datetime import datetime

@router.get("/quick/certificat/current/month", response_model=List[BaseModels.MedicalVisit4CertificatModel])
async def get_certif_current_month(db: Session = Depends(get_db)):
    current_month = datetime.now().strftime("%m")
    current_year = datetime.now().strftime("%Y")

    quick_visits = db.query(models.MedicalVisit).filter(
        models.MedicalVisit.patient_id == -1,
        models.MedicalVisit.date_visit.startswith(f"{current_year}-{current_month}")
    ).order_by(desc(models.MedicalVisit.date_visit)).all()

    return quick_visits

@router.post("/quick/certificat/add", response_model=BaseModels.MedicalVisit4CertificatModel)
async def set_certif_(   
medicalVisitForm: BaseModels.MedicalVisit4Certificat,
db: Session = Depends(get_db)):
    
    try:
        current_datetime = datetime.now() - relativedelta(months=0)
        formatted_date = current_datetime.strftime("%Y-%m-%d")
        formatted_time = current_datetime.strftime("%I:%M %p")  
        quickMedicalVisit = models.MedicalVisit(
            **medicalVisitForm.model_dump(),
            patient_id=-1,
            date_visit=formatted_date,
            hour_visit=formatted_time 
        )
        db.add(quickMedicalVisit)
        db.commit()
        db.refresh(quickMedicalVisit)

        return quickMedicalVisit
    
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new quick visit: {str(e)}")


