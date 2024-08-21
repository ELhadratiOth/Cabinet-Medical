from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, Session
from sqlalchemy.event import listen

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

def set_medical_visits_to_placeholder(mapper, connection, target):

    with connection.begin_nested():
        session = Session(bind=connection)
        session.query(MedicalVisit).filter(MedicalVisit.patient_id == target.id).update({"patient_id": -1})
        session.flush()  

listen(Patient, 'before_delete', set_medical_visits_to_placeholder)

class MedicalVisit(Base):
    __tablename__ = "medical_visits"

    id = Column(Integer, primary_key=True, index=True)
    date_visit = Column(String(15) , default="empty")  # Date of visit (format: yyyy-mm-dd)
    hour_visit = Column(String(15) , default="empty")  # 02:59 PM
    label = Column(String(100) , default="empty")  # Label for the visit
    description = Column(Text  , default="empty")  # Description of the medical visit
    patient_id = Column(Integer, ForeignKey('patients.id', ondelete="SET NULL"))  #
    type_visit = Column(String(20)   , default="empty")  # Type of visit
    insurance = Column(String(20) ,   default="empty")  # Insurance type
    insurance_description = Column(Text ,   default="empty")  # Description of insurance
    money = Column(String(10)) 
    medics = Column(Text , default="empty")  

    patient = relationship("Patient", back_populates="medical_visits")



    
    
class Examination(Base):
    __tablename__ = "examinations"

    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    heart_rate = Column(String(15))  # bpm
    height = Column(Float)  # Height in cm
    weight = Column(Float)  # Weight in kg
    temperature = Column(Integer) # Temperature in C
    description = Column(Text)  # Description of the examination
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="examinations")

class Vaccin(Base):
    __tablename__ = "vaccins"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label = Column(String(100))
    description = Column(Text)  # Description of the vaccin
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="vaccins")

class Allergie(Base):
    __tablename__ = "allergies"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label = Column(String(100))
    description = Column(Text)  # Description of the allergie
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="allergies")

class Radiology(Base):
    __tablename__ = "radiologies"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    label = Column(String(100))
    description = Column(Text)  # Description of the radiology
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="radiologies")

class TestSang(Base):
    __tablename__ = "testsang"
    id = Column(Integer, primary_key=True, index=True)
    date_exam = Column(String(15))  # Date of examination (format: yyyy-mm-dd)
    hour_visit = Column(String(15)) # 02:59 PM
    description = Column(Text)  # Description of the test sanguin
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
    description = Column(Text)  # Description of the autre
    patient_id = Column(Integer, ForeignKey('patients.id'))  # Foreign key to the patient

    patient = relationship("Patient", back_populates="autre")

class Charges(Base):
    __tablename__ = "charges"

    id = Column(Integer, primary_key=True, index=True)
    creation_date = Column(String(15))  # (format: yyyy-mm-dd)
    label = Column(String(100))
    value_money = Column(String(20))
    
    
class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username =  Column(String(15) , unique=True  ,index=True )
    password = Column(String(256))