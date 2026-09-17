# Employee Leave Management System

A Spring Boot REST API project for managing employees and their leave requests using MySQL, Spring Data JPA, and Hibernate.

##  Project Overview

The Employee Leave Management System is a backend application developed using Spring Boot and MySQL.

The application allows an organization to:

- Add employees
- View all employees
- View an employee by ID
- Update employee details
- Delete employees
- Apply for leave
- View all leave requests
- View a leave request by ID
- Update leave status
- Delete leave requests
- View the leave history of a particular employee

The project establishes a relationship between Employee and LeaveRequest using Spring Data JPA.

---

##  Objective

The main objective of this project is to develop a Spring Boot REST API with MySQL database connectivity for managing employee information and leave requests.

The system maintains employee records and their corresponding leave requests.

---

##  Technologies Used

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- REST API
- Postman
- IntelliJ IDEA

---

##  Project Structure

```text
leave
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.example.leave
│   │   │       │
│   │   │       ├── controller
│   │   │       │   ├── EmployeeController.java
│   │   │       │   └── LeaveController.java
│   │   │       │
│   │   │       ├── entity
│   │   │       │   ├── Employee.java
│   │   │       │   └── LeaveRequest.java
│   │   │       │
│   │   │       ├── repository
│   │   │       │   ├── EmployeeRepository.java
│   │   │       │   └── LeaveRepository.java
│   │   │       │
│   │   │       ├── service
│   │   │       │   ├── EmployeeService.java
│   │   │       │   └── LeaveService.java
│   │   │       │
│   │   │       └── LeaveApplication.java
│   │   │
│   │   └── resources
│   │       └── application.properties
│   │
│   └── test
│
├── .gitignore
├── .gitattributes
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md




Application Architecture

The application follows a layered architecture.

                    USER / POSTMAN
                          │
                          │ HTTP Request
                          ▼
                 ┌─────────────────┐
                 │   CONTROLLER    │
                 └─────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │     SERVICE     │
                 └─────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   REPOSITORY    │
                 └─────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ JPA / HIBERNATE │
                 └─────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │      MYSQL      │
                 │    DATABASE     │
                 └─────────────────┘
                          │
                          ▼
                    JSON RESPONSE


Controller

Handles HTTP requests and responses.

Service

Contains the application business logic.

Repository

Communicates with the database using Spring Data JPA.

Entity

Represents database tables as Java classes.

JPA / Hibernate

Handles object-relational mapping between Java objects and MySQL tables.


The Employee entity contains the following fields:

| Field      | Data Type | Description         |
| ---------- | --------- | ------------------- |
| id         | Long      | Primary Key         |
| name       | String    | Employee name       |
| email      | String    | Employee email      |
| department | String    | Employee department |
| salary     | Double    | Employee salary     |


The LeaveRequest entity contains the following fields:

| Field     | Data Type | Description          |
| --------- | --------- | -------------------- |
| id        | Long      | Primary Key          |
| leaveType | String    | Type of leave        |
| startDate | LocalDate | Leave starting date  |
| endDate   | LocalDate | Leave ending date    |
| reason    | String    | Reason for leave     |
| status    | String    | Leave status         |
| employee  | Employee  | Employee who applied |

Employee-leave relationship (one to many relationship)

             Employee
                │
                │ 1
                │
                ▼
        ┌───────────────┐
        │               │
        ▼               ▼
 Leave Request 1   Leave Request 2


Employee APIs

| HTTP Method | Endpoint          | Description        |
| ----------- | ----------------- | ------------------ |
| POST        | `/employees`      | Add Employee       |
| GET         | `/employees`      | Get All Employees  |
| GET         | `/employees/{id}` | Get Employee By ID |
| PUT         | `/employees/{id}` | Update Employee    |
| DELETE      | `/employees/{id}` | Delete Employee    |


Leave APIs

| HTTP Method | Endpoint              | Description         |
| ----------- | --------------------- | ------------------- |
| POST        | `/leaves`             | Apply Leave         |
| GET         | `/leaves`             | Get All Leaves      |
| GET         | `/leaves/{id}`        | Get Leave By ID     |
| PUT         | `/leaves/{id}/status` | Update Leave Status |
| DELETE      | `/leaves/{id}`        | Delete Leave        |


Employee Request

POST /employees
       │
       ▼
EmployeeController
       │
       ▼
EmployeeService
       │
       ▼
EmployeeRepository
       │
       ▼
JPA / Hibernate
       │
       ▼
MySQL
       │
       ▼
employee table

Leave Request

POST /leaves
       │
       ▼
LeaveController
       │
       ▼
LeaveService
       │
       ▼
LeaveRepository
       │
       ▼
JPA / Hibernate
       │
       ▼
MySQL
       │
       ▼
leave_request table

Project features

Employee Management
        │
        ├── Add Employee
        ├── View Employees
        ├── View Employee By ID
        ├── Update Employee
        └── Delete Employee

Leave Management
        │
        ├── Apply Leave
        ├── View Leaves
        ├── View Leave By ID
        ├── Update Leave Status
        └── Delete Leave

Employee Leave History
        │
        └── View leaves of a particular employee

Testing Status
Employee APIs
 POST /employees
 GET /employees
 GET /employees/{id}
 PUT /employees/{id}
 DELETE /employees/{id}
Leave APIs
 POST /leaves
 GET /leaves
 GET /leaves/{id}
 PUT /leaves/{id}/status
 DELETE /leaves/{id}
Relationship API
 GET /employees/{employeeId}/leaves
Database
 MySQL Database Connected
 Employee Table Created
 Leave Request Table Created
 Employee-Leave Relationship Created

Author

G. Thamarai Selvan

B.Tech Artificial Intelligence and Data Science

Sri Eshwar College of Engineering
