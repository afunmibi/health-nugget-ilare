const FilterBar = ({ 
  selectedType, 
  setSelectedType, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) => {
  const contentTypes = [
    { value: '', label: 'All', icon: '🔍' },
    { value: 'video', label: 'Video', icon: '🎥' },
    { value: 'audio', label: 'Audio', icon: '🎵' },
    { value: 'image', label: 'Image', icon: '🖼️' },
    { value: 'text', label: 'Text', icon: '📄' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      {/* Content Type Filters */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Filter by Type:
        </label>
        <div className="d-flex flex-wrap gap-2">
          {contentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`btn ${selectedType === type.value ? 'btn-primary' : 'btn-outline-primary'}`}
              style={{
                backgroundColor: selectedType === type.value ? '#1B5E20' : 'transparent',
                borderColor: '#1B5E20',
                color: selectedType === type.value ? 'white' : '#1B5E20',
              }}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      {categories && categories.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Category:
          </label>
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`btn ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`}
              style={{
                backgroundColor: selectedCategory === '' ? '#1B5E20' : 'transparent',
                borderColor: '#1B5E20',
                color: selectedCategory === '' ? 'white' : '#1B5E20',
              }}
            >
              🔍 All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`btn ${selectedCategory === category.name ? 'btn-primary' : 'btn-outline-primary'}`}
                style={{
                  backgroundColor: selectedCategory === category.name ? '#1B5E20' : 'transparent',
                  borderColor: '#1B5E20',
                  color: selectedCategory === category.name ? 'white' : '#1B5E20',
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;