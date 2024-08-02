from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from App.database import get_db
from App import models, BaseModels
from typing import List

router = APIRouter()

@router.get("/{firstname_patient}/{lastname_patient}", response_model=List[BaseModels.ExaminationModel])
async def get_examinations_for_patient(
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

    examinations = db.query(models.Examination).filter(
        models.Examination.patient_id == patient.id
    ).all()

    if not examinations:
        raise HTTPException(status_code=404, detail="No examinations found for this patient")

    return examinations

@router.post("/add/{firstname_patient}/{lastname_patient}", response_model=BaseModels.ExaminationModel)
async def add_examination_to_patient(
    examinationForm: BaseModels.ExaminationBase,
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
        
        examination = models.Examination(
            **examinationForm.dict(),
            patient_id=patient.id
        )
        db.add(examination)
        db.commit()
        db.refresh(examination)
        
        return examination
    
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error creating new examination: {str(e)}")

@router.put("/update/{examination_id}", response_model=BaseModels.ExaminationModel)
async def update_examination(
    examination_id: int,
    examinationUpdate: BaseModels.ExaminationBase,
    db: Session = Depends(get_db)
):
    examination = db.query(models.Examination).filter(models.Examination.id == examination_id).first()

    if not examination:
        raise HTTPException(status_code=404, detail="Examination not found")

    update_data = examinationUpdate.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(examination, key, value)

    db.commit()
    db.refresh(examination)

    return examination

@router.delete("/delete/{examination_id}")
async def delete_examination(examination_id: int, db: Session = Depends(get_db)):
    examination = db.query(models.Examination).filter(models.Examination.id == examination_id).first()
    if not examination:
        raise HTTPException(status_code=404, detail="Examination not found")
    db.delete(examination)
    db.commit()
