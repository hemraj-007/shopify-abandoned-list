import { useState, useEffect } from 'react';

export const useFetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  })
  .then(data => setData(data))
  .catch(err => console.error(err));

  }, []);

  return data;
};
