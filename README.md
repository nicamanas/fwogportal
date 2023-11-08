# Skill-Based Role Portal (SBRP)

Skill-Based Role Portal for All-In-One
(IS212 - Software Project Management)

## Description

An internal Skill-Based Role Portal application, designed for All-In-One.
For staff of All-In-One to manage skills, manage and apply for roles within the company.
Key functionalities include:

- User Authentication and Management
- Creation and Update of Staff and their Skills
- Creation and Retrieval of Role Listings - open roles in All-In-One that staff can apply for
- Application for open roles

## Getting Started

### Prerequisites

* Python
* Docker
* Node.js
* npm

### Cloning Repo
* Clone this repository
```
git clone https://github.com/nicamanas/fwogportal
```

### Starting frontend

* Change directory to frontend folder
```
cd frontend
```

* Install dependencies
```
npm i
```

* Start development server
```
npm run dev
```
* Open server in browser, port may be different (check terminal message): ```http://localhost:5173/```

### Starting backend

* Change directory to backend folder
```
cd backend
```

* Start containers
```
docker-compose up 
```

* View documentation and test endpoints at ```http://localhost:8003/docs```

### Stopping backend
* Shut down containers and remove volumes
```
docker-compose down -v
```

## Running Tests
### Frontend tests
* Change directory to frontend folder
```
cd frontend
```
* Install dependencies
```
npm i
```
* Run tests
```
npm run test
```
<img width="464" alt="Screenshot 2023-11-08 at 5 40 51 PM" src="https://github.com/nicamanas/fwogportal/assets/101983505/8aeea40c-10f7-4db8-9eac-3ed7e1ed74fb">

### Backend tests
* Change directory to backend folder
```
cd backend
```

* Change directory to /src folder
```
cd src
```

* Install dependencies from requirements.txt
```
pip install -r requirements.txt
```

* Run tests
```
pytest
```
or
```
python -m pytest
```
<img width="1139" alt="Screenshot 2023-11-08 at 3 14 48 PM" src="https://github.com/nicamanas/fwogportal/assets/101983505/974d6719-0259-463d-bc44-05e1424d1cc6">


## Team
Allyne Zhang  
Esther Lam  
Nicholas Tan  
Hsu Thitsar Lwin  
Thaddeus Lee
