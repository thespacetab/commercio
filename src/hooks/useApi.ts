import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { ApiResponse } from '../types/api';

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Unknown error');
      }
      
      setLoading(false);
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    const result = await apiCall();
    
    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  return { data, loading, error, refetch };
}

export function useApiMutation<T, R>(
  apiCall: (data: T) => Promise<ApiResponse<R>>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<R | null>(null);

  const mutate = async (payload: T) => {
    setLoading(true);
    setError(null);
    
    const result = await apiCall(payload);
    
    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
    return result;
  };

  return { mutate, loading, error, data };
} 