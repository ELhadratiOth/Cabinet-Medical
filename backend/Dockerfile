FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libffi-dev \
    musl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r ./requirements.txt

COPY . /app/
EXPOSE 8000

CMD ["uvicorn" , "App.api:app" ,"--host" ,"0.0.0.0" , "--port" , "8000" ]
