from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App.database import get_db
from App import models, BaseModels
from typing import List
from datetime import datetime
from sqlalchemy import desc

router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.TestSangModel])
async def get_testsang_for_patient(
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

    testsang = db.query(models.TestSang).filter(
        models.TestSang.patient_id == patient.id
    ).order_by(desc(models.TestSang.id)).all()

    if not testsang:
        raise HTTPException(status_code=404, detail="No Test Sang found for this patient")

    return testsang

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.TestSangModel)
async def add_testsang_to_patient(
    testsangForm: BaseModels.TestSangBase,
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
        
        testsang = models.TestSang(
            **testsangForm.model_dump(),
            patient_id=patient.id,
            date_exam=formatted_date,
            hour_visit=formatted_time
        )
        db.add(testsang)
        db.commit()
        db.refresh(testsang)
        
        return testsang
    
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new testsang : {str(e)}")

@router.put("/update/{testsang_id}", response_model=BaseModels.TestSangModel)
async def update_testsang(
    testsang_id: int,
    testsangUpdate: BaseModels.TestSangBase,
    db: Session = Depends(get_db)
):
    testsang = db.query(models.TestSang).filter(models.TestSang.id == testsang_id).first()

    if not testsang:
        raise HTTPException(status_code=404, detail="Test Sang not found")

    update_data = testsangUpdate.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(testsang, key, value)

    db.commit()
    db.refresh(testsang)

    return testsang

@router.delete("/delete/{testsang_id}")
async def delete_testsang(testsang_id: int, db: Session = Depends(get_db)):
    testsang = db.query(models.TestSang).filter(models.TestSang.id == testsang_id).first()
    if not testsang:
        raise HTTPException(status_code=404, detail="Test Sang not found")
    db.delete(testsang)
    db.commit()
    return {"detail": "Test Sang deleted successfully"}
