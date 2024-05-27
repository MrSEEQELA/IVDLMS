**Integrated Vehicle and Driver Licence Management System (IVDLMS)**

Table of Contents
Introduction
Features
Tech Stack
Architecture
Installation
Usage
Docker Setup
Database
Contributing


**Introduction**
The Integrated Vehicle and Driver Licence Management System (IVDLMS) is a microservice-based project designed to streamline the process of managing vehicle and driver licenses. This system allows for efficient handling of license applications, renewals, and related data management.

**Features**
User authentication and authorization
License application and renewal management
Vehicle registration and management
Real-time data validation and processing
Administrative dashboard for managing system data

**Tech Stack**
Backend: Node.js
Frontend: React Native
Database: PostgreSQL
Build Tool: Maven
Containerization: Docker
API Gateway: Spring Cloud Gateway
Service Discovery: Eureka

**Architecture**
The IVDLMS project follows a microservice architecture, ensuring modularity, scalability, and ease of maintenance. Each service is containerized using Docker and managed independently.

Key components include:

Microservices: Implemented using Node.js.
API Gateway: Implemented using Spring Cloud Gateway to route requests to the appropriate microservice.
Service Discovery: Eureka Discovery Server is used to manage the registration and discovery of microservices.

**Installation**
To set up the project locally, follow these steps:

**Prerequisites**
Node.js and npm installed
Java and Maven installed
Docker installed
PostgreSQL installed and running

**Steps**
Clone the repository:
  $git clone https://github.com/yourusername/ivdlms.git
  $cd ivdlms

Backend Setup:

Navigate to the backend directory:
  $cd backend
Navigate to each folder 
Install the dependencies:
  $npm install

Frontend Setup:
Navigate to the frontend directory:
  $cd ivdlms
Install the dependencies:
  $npm install

Gateway Setup:
Navigate to the gateway directory:
cd backend/API-Gateway-Server
Build the gateway using Maven:
  $mvn clean install
  
Eureka Discovery Server Setup:
Navigate to the discovery server directory:
  $cd Discovery-Server
Build the discovery server using Maven:
  $mvn clean install

Build the entire project:
Navigate to the root directory and build the project using Maven:
  $mvn clean install

**Usage**
To run the project locally, follow these steps:

Start the Eureka Discovery Server:
  $cd discovery-server
  $mvn spring-boot:run

Start the Gateway:
  $cd gateway
  $mvn spring-boot:run

Start the Backend:
  $cd backend
  $npm start

Start the Frontend:
  $cd frontend
  $npx expo start 
  Then click "w" to run on the web.

Access the Application:
Open your browser and navigate to http://localhost:19006 for the frontend.
The backend API will be accessible through the gateway at http://localhost:8080.

**Docker Setup**
To run the project using Docker, follow these steps:

Build and run Docker containers:
Run this on the root of the project
  $docker-compose up --build

Access the Application:
The frontend will be accessible at http://localhost:3000.
The backend API will be accessible through the gateway at http://localhost:8080.

Database
The project uses PostgreSQL as the database. Ensure that PostgreSQL is running and properly configured.
Database Configuration
Host: localhost
Port: 5432
Database Name: postgres
Username: postgres
Password: your-password

Running Migrations
To apply database migrations, use the following command:
  $cd backend
  $npm run migrate

Contributing
We welcome contributions to the IVDLMS project. To contribute, follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/your-feature-name.
Open a pull request.
