from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from App import models, BaseModels
from App.database import get_db # type: ignore

router = APIRouter()

@router.get("/five_months_charges", response_model=List[BaseModels.ChargeBase])
async def get_recent_charges(db: Session = Depends(get_db)):
    five_months_ago = datetime.today() - timedelta(days=5*30)  
    
    recent_charges = (
        db.query(models.Charges)
        .filter(models.Charges.creation_date >= five_months_ago.strftime("%Y-%m-%d"))
        .all()
    )
    
    return recent_charges


@router.post("/create", response_model=BaseModels.ChargeBase)
async def add_charge(
    label: str,
    value_money: str,
    db: Session = Depends(get_db)
):
    creation_date = datetime.today().strftime("%Y-%m-%d")
    
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


from datetime import datetime

@router.get("/current_month", response_model=List[BaseModels.ChargeModel])
async def get_current_month_charges(db: Session = Depends(get_db)):
    today = datetime.today()
    
    first_day_of_month = today.replace(day=1)
    
    if today.month == 12:
        last_day_of_month = today.replace(year=today.year + 1, month=1, day=1) - timedelta(days=1)
    else:
        last_day_of_month = today.replace(month=today.month + 1, day=1) - timedelta(days=1)
    
    current_month_charges = (
        db.query(models.Charges)
        .filter(models.Charges.creation_date.between(first_day_of_month, last_day_of_month))
        .all()
    )
    
    return current_month_charges

