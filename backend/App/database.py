from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# MySQL configuration (original)
# DATABASE_URL = "mysql+pymysql://root:maroc2019@localhost:3306/medicaloffice"
# engine = create_engine(DATABASE_URL, connect_args={"check_same_thread" : False} )  
#
# SQLite configuration
DATABASE_URL = "sqlite:///./medicaloffice.db"
engine = create_engine(DATABASE_URL, echo=True)  

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
