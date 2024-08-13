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
    gender: Optional[str] = None
    phonenumber: Optional[str] = None


class PatientUpdate(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]
    cin: Optional[str]
    age: Optional[int]
    birthday: Optional[str]
    gender: Optional[str]
    phonenumber: Optional[str]
    disease: Optional[str]
    description: Optional[str]


class PatientModel(PatientBase):
    id: int
    first_visit : Optional[str] = None


    class Config:
        from_attributes = True

class MedicalVisitBase(BaseModel):
    label: str
    description: Optional[str] = None
    type_visit:Optional[str] = None
    insurance: Optional[str] = None
    insurance_description: Optional[str] = None
    money:Optional[str] = None


class MedicalVisitModel(MedicalVisitBase):
    id: int
    patient_id: int
    date_visit: str 
    hour_visit: str

    class Config:
        from_attributes = True

# class MedicalVisitUpdate(BaseModel):
#     label: Optional[str] = None
#     date_visit: Optional[str] = None
#     description: Optional[str] = None

class ExaminationBase(BaseModel):
    height: Optional[float] = None
    weight: Optional[float] = None
    heart_rate: Optional[float] = None

    temperature: Optional[int] = None
    description: Optional[str] = None

class ExaminationModel(ExaminationBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True
        
        
class VaccinBase(BaseModel):
    label : Optional[str] = None
    description: Optional[str] = None

class VaccinModel(VaccinBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True     

class AllergieBase(BaseModel):
    label : Optional[str] = None
    description: Optional[str] = None

class AllergieModel(AllergieBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True  
        
class RadiologyBase(BaseModel):
    label : Optional[str] = None
    description: Optional[str] = None

class RadiologyModel(RadiologyBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True   