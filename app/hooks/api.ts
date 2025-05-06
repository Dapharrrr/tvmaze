// hooks/useApi.ts
import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

function useApi<T>(fetchFunction: () => Promise<T>): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [fetchFunction]);

  return { data, isLoading, error };
}


export default useApi;
