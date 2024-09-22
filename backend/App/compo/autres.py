from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from App import models, BaseModels
from typing import List
from datetime import datetime
from sqlalchemy import desc

router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.AutreModel])
async def get_autre_for_patient(
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

    autre = db.query(models.Autre).filter(
        models.Autre.patient_id == patient.id
    ).order_by(desc(models.Autre.id)).all()

    if not autre:
        raise HTTPException(status_code=404, detail="No Autre found for this patient")

    return autre

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.AutreModel)
async def add_autre_to_patient(
    autreForm: BaseModels.AutreBase,
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
        
        autre = models.Autre(
            **autreForm.model_dump(),
            patient_id=patient.id,
            date_exam=formatted_date,
            hour_visit=formatted_time 
        )
        db.add(autre)
        db.commit()
        db.refresh(autre)
        
        return autre
    
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new autre: {str(e)}")

@router.put("/update/{autre_id}", response_model=BaseModels.AutreModel)
async def update_autre(
    autre_id: int,
    autreUpdate: BaseModels.AutreBase,
    db: Session = Depends(get_db)
):
    autre = db.query(models.Autre).filter(models.Autre.id == autre_id).first()

    if not autre:
        raise HTTPException(status_code=404, detail="Autre not found")

    update_data = autreUpdate.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(autre, key, value)

    db.commit()
    db.refresh(autre)

    return autre

@router.delete("/delete/{autre_id}")
async def delete_autre(autre_id: int, db: Session = Depends(get_db)):
    autre = db.query(models.Autre).filter(models.Autre.id == autre_id).first()
    if not autre:
        raise HTTPException(status_code=404, detail="Autre not found")
    db.delete(autre)
    db.commit()
    return {"detail": "Autre deleted successfully"}
