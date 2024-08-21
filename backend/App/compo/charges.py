from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, func, cast, Float , or_
from typing import List
from datetime import datetime, timedelta

from App import models, BaseModels
from App.database import get_db # type: ignore
from dateutil.relativedelta import relativedelta
from datetime import datetime

router = APIRouter()

@router.get("/six_months_charges", response_model=List[BaseModels.ChargeModel])
async def get_recent_charges(db: Session = Depends(get_db)):
    five_months_ago = datetime.today() - timedelta(days=6*30)  
    
    recent_charges = (
        db.query(models.Charges)
        .filter(models.Charges.creation_date >= five_months_ago.strftime("%Y-%m-%d"))
        .all()
    )
    
    return recent_charges


@router.post("/create", response_model=BaseModels.ChargeModel)
async def add_charge(
    label: str,
    value_money: str,
    db: Session = Depends(get_db)
):
    creation_date =  ( datetime.today()- relativedelta(months=0)).strftime("%Y-%m-%d")
    
    new_charge = models.Charges(
        creation_date=creation_date,
        label=label,
        value_money=value_money
    )
    
    db.add(new_charge)
    db.commit()
    db.refresh(new_charge)
    
    return new_charge
    


@router.delete("/delete/{charge_id}", response_model=BaseModels.ChargeBase)
async def delete_charge(
    charge_id: int,
    db: Session = Depends(get_db)
):
    charge = db.query(models.Charges).filter(models.Charges.id == charge_id).first()
    
    if charge is None:
        raise HTTPException(status_code=404, detail="Charge not found")
    
    db.delete(charge)
    db.commit()
    
    return charge



@router.get("/current_month", response_model=List[BaseModels.ChargeModel])
async def get_current_month_charges(db: Session = Depends(get_db)):
    current_year_month = datetime.today().strftime("%Y-%m")

    current_month_charges = (
        db.query(models.Charges)
        .filter( or_(
                models.Charges.creation_date.startswith(current_year_month),
                models.Charges.id.in_([1, 2, 3, 4])
            ))
       .all()
    )
    
    return current_month_charges


@router.get("/reccurent", response_model=dict)
async def get_current_month_charges(db: Session = Depends(get_db)):
    result = db.execute(
        select(func.sum(cast(models.Charges.value_money, Float)))
        .where(models.Charges.id.in_([1, 2, 3, 4]))
    ).scalar()

    return {"reccurent_money" : result }




@router.put("/update/{id}", response_model=BaseModels.ChargeModel)
def update_charge(id: int, charge_update: BaseModels.ChargeBase, db: Session = Depends(get_db)):
    charge = db.query(models.Charges).filter(models.Charges.id == id).first()
    
    if charge is None:
        raise HTTPException(status_code=404, detail="Charge not found")

    for key, value in charge_update.model_dump(exclude_unset=True).items():
        setattr(charge, key, value)

    db.commit()
    db.refresh(charge)
    
    return charge