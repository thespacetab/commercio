import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const result = await apiService.getAllProducts();
        if (result.success) {
          setStatus('connected');
        } else {
          setStatus('error');
          setError(result.error || 'Unknown error');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Network error');
      }
    };

    checkApi();
  }, []);

  if (status === 'checking') {
    return (
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: '#ffa726', 
        color: 'white', 
        padding: '8px 12px', 
        borderRadius: '6px', 
        fontSize: '12px',
        zIndex: 1000
      }}>
        Проверка API...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: '#f44336', 
        color: 'white', 
        padding: '8px 12px', 
        borderRadius: '6px', 
        fontSize: '12px',
        zIndex: 1000,
        maxWidth: '200px'
      }}>
        Ошибка API: {error}
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#4caf50', 
      color: 'white', 
      padding: '8px 12px', 
      borderRadius: '6px', 
      fontSize: '12px',
      zIndex: 1000
    }}>
      API подключен
    </div>
  );
};

export default ApiStatus; 