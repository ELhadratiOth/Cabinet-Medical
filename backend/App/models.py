from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(100), nullable=False)  # First name
    lastname = Column(String(100), nullable=False)  # Last name
    cin = Column(String(15))  # National ID or CIN
    age = Column(Integer) #
    birthday = Column(String(15))  # Date of birth (format: yyyy-mm-dd)
    gender = Column(Boolean)  # Gender (0: male, 1: female)
    phonenumber = Column(String(20))  # Phone number
    disease = Column(String(20))
    description = Column(String(256))  # Additional information about the patient
    first_visit = Column(String(20)) # la premier visite du patient
    insurance = Column(String(20))  
    insurance_description = Column(String(256))  # Description of insurance

    medical_visits = relationship(
        "MedicalVisit",
        back_populates="patient",
        cascade="all, delete-orphan"
    )
    
    examinations = relationship(
        "Examination",
        back_populates="patient",
        cascade="all, delete-orphan"
    )

class MedicalVisit(Base):
    __tablename__ = "medical_visits"

    id = Column(Integer, primary_key=True, index=True)
    date_visit = Column(String(15))  # Date of visit (format: yyyy-mm-dd)
    label = Column(String(100))  # Label or type of medical visit
    description = Column(String(256))  # Description of the medical visit
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="medical_visits")

class Examination(Base):
    __tablename__ = "examinations"

    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    height = Column(Float)  # Height in cm
    weight = Column(Float)  # Weight in kg
    temperature = Column(Integer) # Temperature en C
    description = Column(String(256))  # Description of the examination
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="examinations")
