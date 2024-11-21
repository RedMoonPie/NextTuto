import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Custom hook for client-side fetching
const useFetchData = <T>(endpoint: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<T>(endpoint);
        setData(response.data);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;