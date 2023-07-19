import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setError('Error fetching data from the server.');
        }
      } catch (error) {
        setError('Error fetching data from the server:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);


  return { data, loading, error }
}

export default useFetch;