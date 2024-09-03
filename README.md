

# Medical Office Management

**Medical Office Management** is a comprehensive system designed to optimize the administrative tasks of a medical office. This project is focused solely on the admin (doctor) side, providing a robust interface for doctors and administrative staff to manage patient records, appointments, and financial data efficiently. The project is built using FastAPI for the backend, React with Tailwind CSS and ShadCN for the frontend, MySQL as the database, and JWT authentication for more security, all containerized using Docker for easy deployment.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Docker Setup](#docker-setup)
  - [Manual Setup](#manual-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)


## Features

- **Admin Dashboard**: A comprehensive dashboard for doctors and administrative staff to view and manage all relevant data, including patient records and financial transactions.
- **Revenue Tracking**: Detailed insights into the revenue generated each month, allowing for easy financial analysis.
- **Data Visualization**: Intuitive charts and graphs to visualize key metrics such as patient visits, revenue, and other critical data.
- **Modern Design**: A modern UI built with React, Tailwind CSS, and ShadCN, ensuring a seamless experience.
- **JWT Security**: Implemented JWT authentication for strong and secure access control.
- **Dockerized Deployment**: Simplified deployment using Docker, with the project readily available on Docker Hub.

## Tech Stack

- **Frontend**: React, Tailwind CSS, ShadCN
- **Backend**: FastAPI, SQLAlchemy
- **Database**: MySQL/SQLite
- **Containerization**: Docker

## Installation

### Docker Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ELhadratiOth/Cabinet-Medical.git
   cd Cabinet-Medical
   ```

2. **Run the application using Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Backend API: `http://localhost:8000`
   - Frontend: `http://localhost:5173`

### Manual Setup

If you prefer to set up the project manually:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ELhadratiOth/Cabinet-Medical.git
   cd Cabinet-Medical
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create and activate a virtual environment:
     ```bash
     python3 -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the FastAPI server:
     ```bash
     uvicorn App.main:app --reload
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm run dev
     ```

4. **Database Setup**:
   - Ensure MySQL is installed and running.
   - Create a database (db name: `medicaloffice`) and configure the connection in the FastAPI app.

## Usage

After starting the application, the admin dashboard can be accessed at `http://localhost:5173`. The dashboard provides various features, including:

- **Patient Management**: View, add, update, and delete patient records, and more services .
- **Revenue Insights**: Track the revenue generated over time with detailed financial reports.
- **Data Analysis**: Analyze key metrics through interactive charts and graphs to make informed decisions.

## Docker Hub

The Docker images for both the backend and frontend are available on Docker Hub:

- [Backend Image](https://hub.docker.com/r/othmanelhadrati/backendapp)
- [Frontend Image](https://hub.docker.com/r/othmanelhadrati/frontendapp)
The version of the two images are : v1.0

## Project Structure

```
/
├── backend/
│   ├── app/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, please feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request
