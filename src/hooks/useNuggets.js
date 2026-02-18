import { useState, useEffect } from 'react';
import { getAllNuggets, getNuggetsByType, getNuggetsByCategory } from '../api/nuggetService';

export const useNuggets = (filterType = null, filterCategory = null) => {
  const [nuggets, setNuggets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNuggets = async () => {
      try {
        setLoading(true);
        let data;
        
        if (filterType) {
          data = await getNuggetsByType(filterType);
        } else if (filterCategory) {
          data = await getNuggetsByCategory(filterCategory);
        } else {
          data = await getAllNuggets();
        }
        
        setNuggets(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setNuggets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNuggets();
  }, [filterType, filterCategory]);

  return { nuggets, loading, error };
};