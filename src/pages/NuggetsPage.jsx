import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterBar from '../components/ui/FilterBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NuggetCard from '../components/ui/NuggetCard';
import { useCategories } from '../hooks/useCategories';
import { useNuggets } from '../hooks/useNuggets';

const NuggetsPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const categoryFromQuery = searchParams.get('category') || '';
    setSelectedCategory(categoryFromQuery);
  }, [searchParams]);

  const { categories } = useCategories();
  const { nuggets, loading, error } = useNuggets(selectedType, selectedCategory);

  const totalCount = useMemo(() => nuggets.length, [nuggets]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Health Nuggets</h1>
        <span className="badge text-bg-light border">{totalCount} item(s)</span>
      </div>

      <FilterBar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="alert alert-danger">Unable to load nuggets. Ensure json-server is running. {error}</div>
      )}

      {!loading && !error && nuggets.length === 0 && (
        <div className="alert alert-warning">No nuggets matched your selected filters.</div>
      )}

      {!loading && !error && nuggets.length > 0 && (
        <div className="row g-4">
          {nuggets.map((nugget) => (
            <div className="col-12 col-md-6 col-xl-4" key={nugget.id}>
              <NuggetCard nugget={nugget} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NuggetsPage;
