from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App.database import get_db
from App import models, BaseModels
from typing import List
from datetime import datetime
from sqlalchemy import desc

router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.AllergieModel])
async def get_allergies_for_patient(
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

    allergies = db.query(models.Allergie).filter(
        models.Allergie.patient_id == patient.id
    ).order_by(desc(models.Allergie.id)).all()

    if not allergies:
        raise HTTPException(status_code=404, detail="No allergies found for this patient")

    return allergies

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.AllergieModel)
async def add_allergie_to_patient(
    allergieForm: BaseModels.AllergieBase,
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

        allergie = models.Allergie(
            **allergieForm.model_dump(),
            patient_id=patient.id,
            date_exam=formatted_date,
            hour_visit=formatted_time
        )
        db.add(allergie)
        db.commit()
        db.refresh(allergie)

        return allergie

    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new allergy: {str(e)}")

@router.put("/update/{allergie_id}", response_model=BaseModels.AllergieModel)
async def update_allergie(
    allergie_id: int,
    allergieUpdate: BaseModels.AllergieBase,
    db: Session = Depends(get_db)
):
    allergie = db.query(models.Allergie).filter(models.Allergie.id == allergie_id).first()

    if not allergie:
        raise HTTPException(status_code=404, detail="Allergy not found")

    update_data = allergieUpdate.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(allergie, key, value)

    db.commit()
    db.refresh(allergie)

    return allergie

@router.delete("/delete/{allergie_id}")
async def delete_allergie(allergie_id: int, db: Session = Depends(get_db)):
    allergie = db.query(models.Allergie).filter(models.Allergie.id == allergie_id).first()
    if not allergie:
        raise HTTPException(status_code=404, detail="Allergy not found")
    db.delete(allergie)
    db.commit()
    return {"detail": "Allergy deleted successfully"}
