import React, { useState } from 'react';
import './ApiDemo.css';

const ApiDemo = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Real API request to backend
  const makeRandomRequest = async () => {
    setLoading(true);
    clearLogs();
    
    const maxRetries = 1;
    let attemptNumber = 0;
    
    addLog('Starting API request to backend...', 'info');
    
    const makeRequest = async () => {
      attemptNumber++;
      addLog(`Attempt ${attemptNumber}/${maxRetries + 1}`, 'info');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      try {
        const response = await fetch('http://localhost:8080/api/test', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const data = await response.json();
        
        if (response.ok) {
          addLog(`✓ Request successful (Status: ${response.status})`, 'success');
          addLog(`Response: ${JSON.stringify(data)}`, 'info');
          return { success: true };
        } else {
          addLog(`✗ Error (Status: ${response.status})`, 'error');
          addLog(`Message: ${data.message}`, 'error');
          throw new Error(data.message || 'Request failed');
        }
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          addLog(`✗ Request timeout (>10s)`, 'error');
          throw new Error('Timeout');
        }
        addLog(`✗ Network error: ${error.message}`, 'error');
        throw error;
      }
    };
    
    const executeWithRetry = async (retryCount = 0) => {
      try {
        await makeRequest();
        setLoading(false);
      } catch (error) {
        if (retryCount < maxRetries) {
          const delay = 1000 * (retryCount + 1);
          addLog(`Retrying in ${delay}ms...`, 'warning');
          await new Promise(resolve => setTimeout(resolve, delay));
          return executeWithRetry(retryCount + 1);
        } else {
          addLog(`All retries exhausted. Using fallback data.`, 'warning');
          addLog(`✓ Fallback: { cached: true, items: [] }`, 'success');
          setLoading(false);
        }
      }
    };
    
    await executeWithRetry(0);
  };

  return (
    <div className="api-demo">
      <h1>API Error Handling Demo</h1>
      
      <div className="controls">
        <button onClick={makeRandomRequest} disabled={loading}>
          Make API Request
        </button>
        <button onClick={clearLogs} disabled={loading}>
          Clear Logs
        </button>
      </div>

      {loading && <div className="loading">Processing...</div>}

      <div className="logs">
        <h3>Request Logs:</h3>
        {logs.length === 0 ? (
          <p className="no-logs">Click "Make API Request" to test random scenarios</p>
        ) : (
          <ul>
            {logs.map((log, index) => (
              <li key={index} className={`log-${log.type}`}>
                <span className="log-time">[{log.timestamp}]</span> {log.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApiDemo;
