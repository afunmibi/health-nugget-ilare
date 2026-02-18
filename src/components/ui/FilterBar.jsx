const FilterBar = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const contentTypes = [
    { value: '', label: 'All' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
    { value: 'image', label: 'Image' },
    { value: 'text', label: 'Text' },
  ];

  return (
    <section className="bg-white p-4 rounded-3 shadow-sm mb-4">
      <div className="mb-3">
        <label className="form-label fw-semibold">Filter by Type</label>
        <div className="d-flex flex-wrap gap-2">
          {contentTypes.map((type) => (
            <button
              key={type.value || 'all'}
              type="button"
              onClick={() => setSelectedType(type.value)}
              className={`btn ${selectedType === type.value ? 'btn-success' : 'btn-outline-success'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {categories && categories.length > 0 && (
        <div>
          <label className="form-label fw-semibold">Filter by Category</label>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className={`btn ${selectedCategory === '' ? 'btn-success' : 'btn-outline-success'}`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`btn ${selectedCategory === category.name ? 'btn-success' : 'btn-outline-success'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FilterBar;
