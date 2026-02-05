/**
 * API Service with Retry Logic, Timeout Handling, and Error Management
 */

const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api', // Update with your API URL
  TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 1, // 1 retry = 2 total attempts
  RETRY_DELAY: 1000, // 1 second
};

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(message, statusCode, originalError = null) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with timeout wrapper
 */
const fetchWithTimeout = async (url, options = {}, timeout = API_CONFIG.TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new APIError(
        'Request timeout. Please check your connection and try again.',
        408,
        error
      );
    }
    throw error;
  }
};

/**
 * Parse response with error handling
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return await response.text();
};

/**
 * Handle HTTP errors
 */
const handleHTTPError = (response, data) => {
  const errorMessages = {
    400: 'Bad request. Please check your input.',
    401: 'Unauthorized. Please log in again.',
    403: 'Access forbidden. You don\'t have permission.',
    404: 'Resource not found.',
    409: 'Conflict. The resource already exists.',
    422: 'Validation failed. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Service temporarily unavailable.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Please try again later.',
  };

  const message = data?.message || errorMessages[response.status] || 'An unexpected error occurred.';
  
  throw new APIError(message, response.status, data);
};

/**
 * Main API request function with retry logic
 */
const apiRequest = async (endpoint, options = {}, retryCount = 0) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetchWithTimeout(url, requestOptions);
    const data = await parseResponse(response);

    // Handle successful responses
    if (response.ok) {
      return {
        success: true,
        data,
        statusCode: response.status,
      };
    }

    // Handle HTTP errors
    handleHTTPError(response, data);

  } catch (error) {
    // Retry logic for network errors and 5xx errors
    const shouldRetry = 
      retryCount < API_CONFIG.MAX_RETRIES && 
      (
        error instanceof APIError && error.statusCode >= 500 ||
        error.name === 'TypeError' || // Network error
        error.statusCode === 408 // Timeout
      );

    if (shouldRetry) {
      console.warn(`Retry attempt ${retryCount + 1}/${API_CONFIG.MAX_RETRIES} for ${endpoint}`);
      await sleep(API_CONFIG.RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      return apiRequest(endpoint, options, retryCount + 1);
    }

    // If it's already an APIError, rethrow it
    if (error instanceof APIError) {
      throw error;
    }

    // Handle network errors
    if (error.name === 'TypeError') {
      throw new APIError(
        'Network error. Please check your internet connection.',
        0,
        error
      );
    }

    // Handle unknown errors
    throw new APIError(
      'An unexpected error occurred. Please try again.',
      500,
      error
    );
  }
};

/**
 * Fallback data provider
 */
const getFallbackData = (endpoint) => {
  const fallbacks = {
    '/data': { items: [], message: 'Using cached data' },
    '/users': { users: [], message: 'Using offline mode' },
  };

  return fallbacks[endpoint] || { message: 'Service temporarily unavailable' };
};

/**
 * API request with fallback
 */
export const apiRequestWithFallback = async (endpoint, options = {}) => {
  try {
    return await apiRequest(endpoint, options);
  } catch (error) {
    console.error('API request failed, using fallback:', error);
    
    return {
      success: false,
      data: getFallbackData(endpoint),
      statusCode: error.statusCode || 0,
      error: error.message,
      isFallback: true,
    };
  }
};

/**
 * Convenience methods
 */
export const api = {
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint, data, options = {}) => 
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint, data, options = {}) => 
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  patch: (endpoint, data, options = {}) => 
    apiRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * API methods with fallback
 */
export const apiWithFallback = {
  get: (endpoint, options = {}) => 
    apiRequestWithFallback(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint, data, options = {}) => 
    apiRequestWithFallback(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default api;
