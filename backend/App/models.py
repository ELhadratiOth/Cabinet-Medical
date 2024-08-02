from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(100), nullable=False)  # First name
    lastname = Column(String(100), nullable=False)  # Last name
    cin = Column(String(15))  # National ID or CIN
    description = Column(String(256))  # Additional information about the patient
    birthday = Column(String(15))  # Date of birth (format: yyyy-mm-dd)
    gender = Column(Boolean)  # Gender (0: male, 1: female)
    phonenumber = Column(String(20))  # Phone number
    insurance = Column(Boolean)  # Insurance status (1: insured, 0: not insured)
    insurance_description = Column(String(256))  # Description of insurance

class MedicalVisit(Base):
    __tablename__ = "medical_visits"

    id = Column(Integer, primary_key=True, index=True)
    date_visit = Column(String(15))  # Date of visit (format: yyyy-mm-dd)
    label = Column(String(100))  # Label or type of medical visit
    description = Column(String(256))  # Description of the medical visit
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

class Examination(Base):
    __tablename__ = "examinations"

    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    height = Column(Float)  # Height in cm
    weight = Column(Float)  # Weight in kg
    temperature = Column(Integer) # Temperature en C
    description = Column(String(256))  # Description of the examination
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient
