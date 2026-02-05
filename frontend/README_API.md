# API Service - Error Handling Implementation

This project implements a comprehensive API service with advanced error handling features.

## Features Implemented

### 1. **Timeout Handling**
- Requests automatically timeout after 10 seconds
- Uses AbortController for clean cancellation
- User-friendly timeout error messages

### 2. **Retry Logic**
- Maximum of 2 retries for failed requests
- Exponential backoff strategy (1s, 2s delays)
- Only retries on network errors and 5xx server errors
- Does not retry on client errors (4xx)

### 3. **Fallback Response**
- Graceful degradation when API is unavailable
- Returns cached/default data when requests fail
- Clear indication to users when fallback data is used

### 4. **Clear Error Messages**
- User-friendly error messages for all HTTP status codes
- Specific messages for:
  - 400: Bad request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not found
  - 408: Timeout
  - 422: Validation failed
  - 429: Too many requests
  - 500: Server error
  - 502: Bad gateway
  - 503: Service unavailable
  - 504: Gateway timeout

### 5. **Proper HTTP Status Codes**
- All responses include proper status codes
- Error objects contain status codes for conditional handling
- Network errors return status code 0

## Usage

### Basic GET Request
```javascript
import { api } from './services/apiService';

const fetchData = async () => {
  try {
    const response = await api.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};
```

### POST Request
```javascript
const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    console.log(response.data);
  } catch (error) {
    console.error(`Error ${error.statusCode}: ${error.message}`);
  }
};
```

### Request with Fallback
```javascript
import { apiWithFallback } from './services/apiService';

const fetchDataWithFallback = async () => {
  const response = await apiWithFallback.get('/data');
  
  if (response.isFallback) {
    console.log('Using fallback data:', response.data);
  } else {
    console.log('Data fetched successfully:', response.data);
  }
};
```

## Running the Project

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the API Demo page to see all features in action

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ApiDemo.jsx          # Demo component with test scenarios
│   │   ├── ApiDemo.css          # Styles for demo
│   │   ├── ErrorBoundary.jsx    # Error boundary component
│   │   └── ErrorBoundary.css    # Error boundary styles
│   ├── services/
│   │   └── apiService.js        # Main API service with all features
│   ├── App.jsx                  # Main app component
│   └── App.css                  # App styles
```

## Configuration

You can configure the API service in `apiService.js`:

```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api', // Your API base URL
  TIMEOUT: 10000,                        // 10 seconds
  MAX_RETRIES: 2,                        // Maximum retry attempts
  RETRY_DELAY: 1000,                     // Initial retry delay (1 second)
};
```

## Error Handling Flow

1. **Request Initiated** → Timeout controller started
2. **Network Error** → Retry up to 2 times
3. **5xx Server Error** → Retry up to 2 times
4. **4xx Client Error** → Return error immediately (no retry)
5. **Timeout** → Return timeout error with user-friendly message
6. **All Retries Failed** → Return final error or use fallback

## Testing

The ApiDemo component provides interactive buttons to test different scenarios:
- ✓ Successful Request
- ⏱ Timeout (with retry)
- ⚠ Server Error (with retry)
- 🔄 Fallback Response
- ✗ Validation Error

Click any button to see how the system handles each scenario with proper error messages and retry logic.
