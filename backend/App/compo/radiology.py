from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App.database import get_db
from App import models, BaseModels
from typing import List
from datetime import datetime
from sqlalchemy import desc

router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.RadiologyModel])
async def get_radiology_for_patient(
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

    radiology = db.query(models.Radiology).filter(
        models.Radiology.patient_id == patient.id
    ).order_by(desc(models.Radiology.id)).all()

    if not radiology:
        raise HTTPException(status_code=404, detail="No radiology found for this patient")

    return radiology

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.RadiologyModel)
async def add_radiology_to_patient(
    radiologyForm: BaseModels.RadiologyBase,
    firstname_patient: str,
    lastname_patient: str,
    db: Session = Depends(get_db)
):
    current_datetime = datetime.now()
    formatted_date = current_datetime.strftime("%Y-%m-%d")
    formatted_time = current_datetime.strftime("%I:%M %p")  

    try:
        patient = db.query(models.Patient).filter(
            models.Patient.firstname == firstname_patient,
            models.Patient.lastname == lastname_patient
        ).first()
        
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        radiology = models.Radiology(
            **radiologyForm.model_dump(),
            patient_id=patient.id,
            date_exam=formatted_date,
            hour_visit=formatted_time
        )
        db.add(radiology)
        db.commit()
        db.refresh(radiology)
        
        return radiology
    
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new radiology : {str(e)}")

@router.put("/update/{radiology_id}", response_model=BaseModels.RadiologyModel)
async def update_radiology(
    radiology_id: int,
    radiologyUpdate: BaseModels.RadiologyBase,
    db: Session = Depends(get_db)
):
    radiology = db.query(models.Radiology).filter(models.Radiology.id == radiology_id).first()

    if not radiology:
        raise HTTPException(status_code=404, detail="Radiology not found")

    update_data = radiologyUpdate.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(radiology, key, value)

    db.commit()
    db.refresh(radiology)

    return radiology

@router.delete("/delete/{radiology_id}")
async def delete_radiology(radiology_id: int, db: Session = Depends(get_db)):
    radiology = db.query(models.Radiology).filter(models.Radiology.id == radiology_id).first()
    if not radiology:
        raise HTTPException(status_code=404, detail="Radiology not found")
    db.delete(radiology)
    db.commit()
    return {"detail": "Radiology deleted successfully"}
