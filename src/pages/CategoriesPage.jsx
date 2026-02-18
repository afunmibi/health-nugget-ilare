import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/useCategories';
import { useNuggets } from '../hooks/useNuggets';

const CategoriesPage = () => {
  const { categories, loading, error } = useCategories();
  const { nuggets } = useNuggets();

  const counts = useMemo(() => {
    const map = new Map();
    nuggets.forEach((item) => {
      map.set(item.category, (map.get(item.category) || 0) + 1);
    });
    return map;
  }, [nuggets]);

  return (
    <div className="container">
      <h1 className="h3 mb-4">Categories</h1>

      {loading && <LoadingSpinner />}
      {!loading && error && <div className="alert alert-danger">Unable to load categories. {error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {categories.map((category) => (
            <div className="col-12 col-md-6" key={category.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="h5 mb-1">{category.name}</h2>
                    <p className="mb-0 text-muted small">{counts.get(category.name) || 0} nugget(s)</p>
                  </div>
                  <Link
                    to={`/nuggets?category=${encodeURIComponent(category.name)}`}
                    className="btn btn-outline-success btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
