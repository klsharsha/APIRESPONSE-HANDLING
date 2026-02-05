# Spring Boot Backend API

Backend API for UX Challenges Frontend built with Spring Boot.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Installation

1. Navigate to the backend-springboot directory:
```bash
cd backend-springboot
```

2. Build the project:
```bash
mvn clean install
```

## Running the Application

### Option 1: Using Maven
```bash
mvn spring-boot:run
```

### Option 2: Using Java
```bash
mvn clean package
java -jar target/backend-api-1.0.0.jar
```

The server will start on http://localhost:5000

## API Endpoints

- `GET /` - Root endpoint with API information
- `GET /api/items` - Get all items
- `GET /api/test` - Random success/error for testing
- `POST /api/items` - Create new item
- `DELETE /api/items/{id}` - Delete item

## Project Structure

```
backend-springboot/
├── src/
│   ├── main/
│   │   ├── java/com/infosys/backend/
│   │   │   ├── BackendApplication.java      # Main application class
│   │   │   ├── controller/
│   │   │   │   └── ItemController.java      # REST API endpoints
│   │   │   ├── service/
│   │   │   │   └── ItemService.java         # Business logic
│   │   │   ├── model/
│   │   │   │   └── Item.java                # Item entity
│   │   │   ├── dto/
│   │   │   │   ├── ApiResponse.java         # API response wrapper
│   │   │   │   └── CreateItemRequest.java   # Create item request DTO
│   │   │   └── exception/
│   │   │       └── GlobalExceptionHandler.java # Global error handler
│   │   └── resources/
│   │       └── application.properties        # Configuration
│   └── test/                                 # Test files
├── pom.xml                                   # Maven configuration
└── README.md
```

## Features

- ✅ CORS enabled for frontend
- ✅ RESTful API endpoints
- ✅ Global exception handling
- ✅ Request validation
- ✅ Random delays and errors for testing
- ✅ Hot reload with Spring DevTools

## Technology Stack

- Spring Boot 3.2.2
- Java 17
- Maven
- Lombok
