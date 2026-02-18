import { useEffect, useState } from 'react';
import { getAllNuggets } from '../api/nuggetService';

export const useNuggets = (filterType = '', filterCategory = '') => {
  const [nuggets, setNuggets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNuggets = async () => {
      try {
        setLoading(true);
        const allNuggets = await getAllNuggets();

        const filtered = allNuggets.filter((item) => {
          const matchesType = !filterType || item.type === filterType;
          const matchesCategory = !filterCategory || item.category === filterCategory;
          return matchesType && matchesCategory;
        });

        setNuggets(filtered);
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
