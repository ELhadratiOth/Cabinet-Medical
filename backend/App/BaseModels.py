from pydantic import BaseModel
from typing import Optional

class PatientBase(BaseModel):
    firstname: str
    lastname: str
    cin: Optional[str] = "Non Saisi"
    birthday: Optional[str] = "Non Saisi"
    age : Optional[str] = "Non Saisi"
    gender: Optional[str] = "Non Saisi"
    phonenumber: Optional[str] = "Non Saisi"


class PatientUpdate(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]
    cin: Optional[str]
    age: Optional[str]
    birthday: Optional[str]
    gender: Optional[str]
    phonenumber: Optional[str]


class PatientModel(PatientBase):
    id: int
    first_visit : Optional[str] = None


    class Config:
        from_attributes = True
        
class PatientSummary(BaseModel):
    id: int
    firstname: str
    lastname: str
    first_visit: Optional[str] = None

    class Config:
        from_attributes = True

class MedicalVisitBase(BaseModel):
    label: Optional[str] = "Non Saisi"
    description: Optional[str] = "Non Saisi"
    type_visit: Optional[str] = "Non Saisi"
    insurance: Optional[str] = "Non Saisi"
    insurance_description: Optional[str] = "Non Saisi"
    money: Optional[str] = "0"

class MedicalVisitUpdate(BaseModel):
    label: Optional[str] = None
    description: Optional[str] = None
    type_visit: Optional[str] = None
    insurance: Optional[str] = None
    insurance_description: Optional[str] = None
    money: Optional[str] = None
    medics: Optional[str] = None

class MedicalVisitModel(MedicalVisitBase):
    id: int
    patient_id: int
    date_visit: Optional[str] = None
    hour_visit: Optional[str] = None
    medics : Optional[str] = "empty"

    class Config:
        from_attributes = True

class MedicalVisit4Certificat(BaseModel):
    label: Optional[str] = "Non Saisi"
    money:Optional[str] = "0"
    
class MedicalVisit4CertificatModel(MedicalVisit4Certificat):
    id: int
    date_visit: Optional[str] = None 
    hour_visit: Optional[str] = None

    class Config:
        from_attributes = True

class ExaminationBase(BaseModel):
    height: Optional[float] = "0"
    weight: Optional[float] = "0"
    heart_rate: Optional[float] = "0"

    temperature: Optional[int] = "0"
    description: Optional[str] = "Non Saisi"

class ExaminationModel(ExaminationBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True
        
        
class VaccinBase(BaseModel):
    label : Optional[str] = "Non Saisi"
    description: Optional[str] = "Non Saisi"

class VaccinModel(VaccinBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True     

class AllergieBase(BaseModel):
    label : Optional[str] = "Non Saisi"
    description: Optional[str] = "Non Saisi"

class AllergieModel(AllergieBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True  
        
class RadiologyBase(BaseModel):
    label : Optional[str] = "Non Saisi"
    description: Optional[str] = "Non Saisi"

class RadiologyModel(RadiologyBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True   
        
   
class TestSangBase(BaseModel):
    description: Optional[str] = "Non Saisi"
    systolic: Optional[str] = '0'
    diastolic: Optional[str] = '0'
    pulse: Optional[str] = '0'


class TestSangModel(TestSangBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True
   
   
class AutreBase(BaseModel):
    label : Optional[str] = "Non Saisi"
    description: Optional[str] = "Non Saisi"
   

class AutreModel(AutreBase):
    id: int
    patient_id: int
    date_exam: Optional[str] = None
    hour_visit: Optional[str] = None


    class Config:
        from_attributes = True
   
   
   
class ChargeBase(BaseModel):
    label : Optional[str] = "Non Saisi"
    value_money: Optional[str] = "Non Saisi"
   

class ChargeModel(ChargeBase): 
    id: int
    creation_date: Optional[str] = None


    class Config:
        from_attributes = True
   


class UserBase(BaseModel):
    username : str 
    password : str