from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from App import models, BaseModels
from typing import List
from datetime import datetime
from sqlalchemy import desc

router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.VaccinModel])
async def get_vaccins_for_patient(
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

    vaccins = db.query(models.Vaccin).filter(
        models.Vaccin.patient_id == patient.id
    ).order_by(desc(models.Vaccin.id)).all()

    if not vaccins:
        raise HTTPException(status_code=404, detail="No vaccinations found for this patient")

    return vaccins

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.VaccinModel)
async def add_vaccin_to_patient(
    vaccinForm: BaseModels.VaccinBase,
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

        vaccin = models.Vaccin(
            **vaccinForm.model_dump(),
            patient_id=patient.id,
            date_exam=formatted_date,
            hour_visit=formatted_time
        )
        db.add(vaccin)
        db.commit()
        db.refresh(vaccin)

        return vaccin

    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new vaccination: {str(e)}")

@router.put("/update/{vaccin_id}", response_model=BaseModels.VaccinModel)
async def update_vaccin(
    vaccin_id: int,
    vaccinUpdate: BaseModels.VaccinBase,
    db: Session = Depends(get_db)
):
    vaccin = db.query(models.Vaccin).filter(models.Vaccin.id == vaccin_id).first()

    if not vaccin:
        raise HTTPException(status_code=404, detail="Vaccination not found")

    update_data = vaccinUpdate.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(vaccin, key, value)

    db.commit()
    db.refresh(vaccin)

    return vaccin

@router.delete("/delete/{vaccin_id}")
async def delete_vaccin(vaccin_id: int, db: Session = Depends(get_db)):
    vaccin = db.query(models.Vaccin).filter(models.Vaccin.id == vaccin_id).first()
    if not vaccin:
        raise HTTPException(status_code=404, detail="Vaccination not found")
    db.delete(vaccin)
    db.commit()
    return {"detail": "Vaccination deleted successfully"}
