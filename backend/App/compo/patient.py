from fastapi import APIRouter, Depends, HTTPException 
from sqlalchemy.orm import Session 
from sqlalchemy import desc  , or_
from typing import List
from App.database import get_db
from App import models, BaseModels
from datetime import datetime


router = APIRouter()

from sqlalchemy.orm import joinedload

@router.get("/all", response_model=List[BaseModels.PatientModel])
async def get_all_patients(db: Session = Depends(get_db)):
    patients = (
        db.query(models.Patient)
        
        .filter(models.Patient.id != -1)
        .order_by(
            desc(models.Patient.id), 
        )
        .limit(15)
        .all()
    )
    return patients




@router.post("/add", response_model=BaseModels.PatientModel)
async def create_new_patient(patientForm: BaseModels.PatientBase, db: Session = Depends(get_db)):
    try:
        current_date = datetime.now()
        formatted_date = current_date.strftime("%Y-%m-%d")
        patient = models.Patient(**patientForm.model_dump() , first_visit = formatted_date)
        db.add(patient)
        db.commit()
        db.refresh(patient)
        return patient
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating new patient: {str(e)}")

@router.get("/search/{firstname}/{lastname}", response_model=BaseModels.PatientModel)
async def get_patient(
    firstname: str, 
    lastname: str, 
    db: Session = Depends(get_db)
):
    query = db.query(models.Patient).filter(
        models.Patient.firstname.like('%'+firstname+"%"),
        models.Patient.lastname.like('%'+lastname+"%")  
    )
    
    patient = query.first()
    
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return patient

@router.get("/search_by_like/{name}", response_model=List[BaseModels.PatientSummary])
async def get_patients_with_like(
    name: str,  
    db: Session = Depends(get_db)
):
    query = db.query(models.Patient).filter(
        or_(
            models.Patient.firstname.like('%' + name + '%'),
            models.Patient.lastname.like('%' + name + '%')
        )
    )
    
    patients = query.all()
    
    if not patients:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return patients



@router.delete("/delete/{id_patient}")
async def  delete(  id_patient  : int  ,  db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == id_patient).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient Not Found")
    db.delete(patient)
    db.commit()

@router.put('/edit/{id_patient}')
async def edit( id_patient  : int , updated_patient : BaseModels.PatientUpdate ,  db: Session = Depends(get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == id_patient).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient Not Found")
    for key, value in updated_patient.model_dump(exclude_unset=True).items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)
    return patient




