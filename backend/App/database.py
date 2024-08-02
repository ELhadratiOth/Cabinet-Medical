from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Database URL
DATABASE_URL = "mysql+pymysql://root:maroc2019@localhost:3306/medicaloffice"

# Create the engine
engine = create_engine(DATABASE_URL, echo=True)  # `echo=True` for SQL logging (optional)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for model classes
Base = declarative_base()

def get_db():
    """Dependency to get the database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
