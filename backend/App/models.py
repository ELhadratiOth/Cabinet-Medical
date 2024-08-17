from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(100), nullable=False)  # First name
    lastname = Column(String(100), nullable=False)  # Last name
    cin = Column(String(15))  # National ID or CIN
    age = Column(String(15)) #
    birthday = Column(String(15))  # Date of birth (format: yyyy-mm-dd)
    gender = Column(String(20))  # Gender (0: male, 1: female)
    phonenumber = Column(String(20))  # Phone number
    disease = Column(String(20))
    description = Column(Text)  # Additional information about the patient
    first_visit = Column(String(20)) # la premier visite du patient

    medical_visits = relationship(
        "MedicalVisit",
        back_populates="patient",
        cascade="save-update, merge, refresh-expire",
        passive_deletes=True,
    )

    examinations = relationship(
        "Examination",
        back_populates="patient",
        cascade="all, delete-orphan"
    )

    vaccins = relationship(
        "Vaccin",
        back_populates="patient",
        cascade="all, delete-orphan"
    )

    allergies = relationship(
        "Allergie",
        back_populates="patient",
        cascade="all, delete-orphan"
    )

    radiologies = relationship(
        "Radiology",
        back_populates="patient",
        cascade="all, delete-orphan"
    )

    testsang = relationship(
        "TestSang",
        back_populates="patient",
        cascade="all, delete-orphan"
    )
    
    autre = relationship(
        "Autre",
        back_populates="patient",
        cascade="all, delete-orphan"
    )

class MedicalVisit(Base):
    __tablename__ = "medical_visits"

    id = Column(Integer, primary_key=True, index=True)
    date_visit = Column(String(15))  # Date of visit (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label = Column(String(100))  # Label or type of medical visit
    description = Column(Text)  # Description of the medical visit
    patient_id = Column(Integer, ForeignKey('patients.id', ondelete="SET NULL"))  # Foreign key to the patient
    type_visit = Column(String(20))  # type de visite {nv visite / controle}
    insurance = Column(String(20))  # non  , cnss , assurance
    insurance_description = Column(Text)  # Description of insurance
    money=Column(String(10)) 

    patient = relationship("Patient", back_populates="medical_visits")


class Examination(Base):
    __tablename__ = "examinations"

    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    heart_rate =Column(String(15))  # bpm

    height = Column(Float)  # Height in cm
    weight = Column(Float)  # Weight in kg
    temperature = Column(Integer) # Temperature en C
    description = Column(Text)  # Description of the examination
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="examinations")


class Vaccin(Base):
    __tablename__ = "vaccins"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label  = Column(String(100))
    description = Column(Text)  # Description of the vaccin
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient
    patient = relationship("Patient", back_populates="vaccins")


class Allergie(Base):
    __tablename__ = "allergies"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label  = Column(String(100))
    description = Column(Text)  # Description of the vaccin
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient
    
    patient = relationship("Patient", back_populates="allergies")


class Radiology(Base):
    __tablename__ = "radiologies"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label  = Column(String(100))
    description = Column(Text)  # Description of the vaccin
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="radiologies")



class TestSang(Base):
    __tablename__ = "testsang"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    description = Column(Text)  # Description of the vaccin
    systolic = Column(String(10))
    diastolic = Column(String(10))
    pulse = Column(String(10))

    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="testsang")




class Autre(Base):
    __tablename__ = "autre"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label = Column(String(100))
    description = Column(Text)  # Description of the vaccin


    patient_id = Column(Integer, ForeignKey('patients.id')) 

    patient = relationship("Patient", back_populates="autre")
    
    
    
class Charges(Base):
    __tablename__ = "charges"

    id = Column(Integer, primary_key=True, index=True)
    creation_date = Column(String(15))  # (format: yyyy-mm-dd)
    label = Column(String(100))
    value_money = Column(String(20))