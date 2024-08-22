from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from App.compo import (
    patient, medical_visit, examination, vaccin, allergie, radiology, piechart, testsang, autres, charges , user
)
from . import models
from .database import engine, get_db
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from fastapi.security import OAuth2PasswordBearer , OAuth2PasswordRequestForm
from jose import JWTError , jwt # type: ignore
from passlib.context import CryptContext # type: ignore

@asynccontextmanager
async def lifespan(app: FastAPI):
    db: Session = next(get_db())
    try:
        # patient  id=-1
        existing_patient = db.query(models.Patient).filter(models.Patient.id == -1).first()
        if not existing_patient:
            new_patient = models.Patient(
                id=-1,
                firstname="defaultt",
                lastname="defaultt",
                cin="defaultt",
                age="defaultt",
                birthday="defaultt",
                gender="defaultt",
                phonenumber="defaultt",
                first_visit="defaultt"
            )
            db.add(new_patient)
            db.commit()
            print("Added new patient with id=-1")
        else:
            print("Patient with id=-1 already exists")

        ids_to_check = [1, 2, 3, 4]
        existing_charges = db.query(models.Charges).filter(models.Charges.id.in_(ids_to_check)).all()

        if len(existing_charges) == 0:
            old_date = "2022-01-01"  

            charges_to_add = [
                {"id": 1, "label": "Loyer", "value_money": "1000", "creation_date": old_date},
                {"id": 2, "label": "Electricité, Eau, Fix ", "value_money": "2000", "creation_date": old_date},
                {"id": 3, "label": "Assistante", "value_money": "3000", "creation_date": old_date},
                {"id": 4, "label": "Crédit Banque", "value_money": "4000", "creation_date": old_date}
            ]

            for charge_data in charges_to_add:
                new_charge = models.Charges(
                    id=charge_data["id"],
                    label=charge_data["label"],
                    value_money=charge_data["value_money"],
                    creation_date=charge_data["creation_date"]  
                )
                db.add(new_charge)

            db.commit()
            print("added success")
        else:
            db.rollback()  

    except Exception as e:
        db.rollback()
    finally:
        db.close()

    print("Server Start")
    yield
    print("Server Shut Down")
    
    

app = FastAPI(
    lifespan=lifespan
)

oauth2_shema = OAuth2PasswordBearer(tokenUrl="token")


models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173" , "localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "my_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


app.include_router(patient.router, prefix="/patients", tags=["Patients"])
app.include_router(medical_visit.router, prefix="/medical_visits", tags=["Medical Visits"])
app.include_router(examination.router, prefix="/examinations", tags=["Examinations"])
app.include_router(vaccin.router, prefix="/vaccins", tags=["Vaccins"])
app.include_router(allergie.router, prefix="/allergies", tags=["Allergies"])
app.include_router(radiology.router, prefix="/radiologies", tags=["Radiologies"])
app.include_router(testsang.router, prefix="/testsang", tags=["Tests Sang"])
app.include_router(autres.router, prefix="/autres", tags=["Autres"])
app.include_router(charges.router, prefix="/charges", tags=["Charges"])

# DashBord
app.include_router(piechart.router, prefix="/piechart", tags=["PieChart"])

#Authantification
app.include_router(user.router, prefix="/user", tags=["User"])
