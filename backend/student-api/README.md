# Student API

A Spring Boot REST API for managing student records.

## Requirements
- Java 17
- Maven
- MySQL

## Setup
1. Create the database by running `schema.sql` in MySQL.
2. Set environment variables:
   - `DB_USERNAME` (default: root)
   - `DB_PASSWORD`
3. Run the application: `mvn spring-boot:run`
4. API available at `http://localhost:8080/api/students`

## Endpoints
- GET /api/students — list all students
- POST /api/students — create a student
- GET /api/students/{id} — get one student
- PUT /api/students/{id} — update a student
- DELETE /api/students/{id} — delete a student