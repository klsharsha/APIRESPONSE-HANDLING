# API Response Handling - Full Stack Application

A comprehensive full-stack application demonstrating best practices for API response handling, error management, and user experience patterns.

## 📋 Overview

This project showcases professional API error handling techniques with a Spring Boot backend and React frontend, featuring:
- ✅ Robust error handling with retry logic
- ✅ User-friendly error messages
- ✅ Loading states and fallback mechanisms
- ✅ Undo/delete functionality
- ✅ Unsaved changes warnings
- ✅ Error boundary implementation

## 🏗️ Architecture

```
APIResponse-handling/
├── backend-springboot/     # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/infosys/backend/
│   │       │   ├── controller/    # REST endpoints
│   │       │   ├── service/       # Business logic
│   │       │   ├── model/         # Data models
│   │       │   ├── dto/           # Data transfer objects
│   │       │   └── exception/     # Exception handling
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/               # React + Vite application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   │   ├── ApiDemo.jsx         # API error handling demo
    │   │   ├── UndoDelete.jsx      # Undo delete functionality
    │   │   ├── UnsavedChanges.jsx  # Unsaved changes warning
    │   │   └── ErrorBoundary.jsx   # React error boundary
    │   ├── services/       # API service layer
    │   ├── App.jsx         # Main application
    │   └── main.jsx        # Entry point
    └── package.json
```

## 🚀 Features

### Backend (Spring Boot)
- **RESTful API** with proper HTTP status codes
- **CORS Configuration** for cross-origin requests
- **Global Exception Handling** with custom error responses
- **Validation** with Jakarta Bean Validation
- **Structured API Responses** with consistent format
- **Simulated scenarios** for testing (success, errors, timeouts)

### Frontend (React)
- **Retry Logic** with exponential backoff
- **Error Boundaries** to catch and handle React errors
- **Undo Delete** functionality with toast notifications
- **Unsaved Changes** detection and warnings
- **Loading States** and user feedback
- **Fallback Data** when API fails
- **Clean UI** with modern CSS

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.2
- Maven
- H2 Database (in-memory)

### Frontend
- React 18
- Vite
- JavaScript (ES6+)
- CSS3

## 📦 Installation & Setup

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6+

### Backend Setup

```bash
cd backend-springboot

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🎯 Usage

1. **Start the Backend**: Follow backend setup instructions above
2. **Start the Frontend**: Follow frontend setup instructions above
3. **Open Browser**: Navigate to `http://localhost:5173`
4. **Test Features**:
   - Click "Make API Request" to test error handling
   - Add items and delete them to test undo functionality
   - Make changes to test unsaved changes warning

## 📡 API Endpoints

### Items API
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `DELETE /api/items/{id}` - Delete item by ID

### Test API
- `GET /api/test` - Random success/error for testing (70% success, 15% error, 15% timeout)

### Health Check
- `GET /` - API health check and available endpoints

## 🔍 Key Components

### API Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "count": 1
}
```

### Error Response Format
```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🎨 UX Patterns Demonstrated

1. **Error Recovery**: Automatic retry with user feedback
2. **Optimistic Updates**: Immediate UI updates with rollback on failure
3. **Undo Actions**: Grace period for accidental deletions
4. **Form Protection**: Warning before leaving with unsaved changes
5. **Error Boundaries**: Graceful degradation when errors occur
6. **Loading States**: Clear indication of pending operations

## 📝 Configuration

### Backend Port (application.properties)
```properties
server.port=8080
```

### CORS Origins
```properties
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

### Frontend API Base URL (ApiDemo.jsx)
```javascript
const response = await fetch('http://localhost:8080/api/test', { ... });
```

## 🧪 Testing

### Test Error Handling
1. Click "Make API Request" button
2. Observe different scenarios:
   - Success (70% probability)
   - Server error (15% probability)
   - Timeout (15% probability)
3. Watch retry logic and fallback data

### Test Undo Delete
1. Add several items
2. Delete an item
3. Click "Undo" within 5 seconds
4. Item is restored

### Test Unsaved Changes
1. Make changes in the form
2. Try to navigate away
3. Confirm or cancel the warning

## 📚 Learning Outcomes

This project demonstrates:
- Professional API error handling patterns
- User-centric error messaging
- Retry strategies and fallback mechanisms
- React component composition
- Spring Boot best practices
- RESTful API design
- CORS configuration
- Global exception handling
- Validation techniques

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

## 📄 License

MIT License - feel free to use this project for learning and reference.

## 👤 Author

**klsharsha**

---

**Note**: This is an educational project demonstrating API response handling patterns and UX best practices in full-stack development.
