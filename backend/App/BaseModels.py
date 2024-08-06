from pydantic import BaseModel
from typing import Optional

class PatientBase(BaseModel):
    firstname: str
    lastname: str
    cin: Optional[str] = None
    description: Optional[str] = None
    disease: Optional[str] = None
    birthday: Optional[str] = None
    age : Optional[int] = None
    gender: Optional[bool] = None
    phonenumber: Optional[str] = None
    insurance: Optional[str] = None
    insurance_description: Optional[str] = None

class PatientModel(PatientBase):
    id: int
    first_visit : Optional[str] = None


    class Config:
        from_attributes = True

class MedicalVisitBase(BaseModel):
    label: str
    description: Optional[str] = None

class MedicalVisitModel(MedicalVisitBase):
    id: int
    patient_id: int
    date_visit: str 

    class Config:
        from_attributes = True

class MedicalVisitUpdate(BaseModel):
    label: Optional[str] = None
    date_visit: Optional[str] = None
    description: Optional[str] = None

class ExaminationBase(BaseModel):
    height: Optional[float] = None
    weight: Optional[float] = None
    temperature: Optional[int] = None
    description: Optional[str] = None
    date_exam: Optional[str] = None

class ExaminationModel(ExaminationBase):
    id: int
    patient_id: int

    class Config:
        from_attributes = True
