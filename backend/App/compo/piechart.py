from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from App.database import get_db
from App import models, BaseModels
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/data", response_model=List[BaseModels.MedicalVisitModel])
async def get_data_4_piechart(db: Session = Depends(get_db)):

    now = datetime.now()
    four_months_ago = now - timedelta(days=12*30)  

    data = (
        db.query(models.MedicalVisit)
        .filter(
            models.MedicalVisit.date_visit >= four_months_ago.strftime('%Y-%m-%d')
        )
        .all()
    )
    if len(data) == 0 :
              raise HTTPException(status_code=404, detail="No medical visits found in the last four months")

    return data
