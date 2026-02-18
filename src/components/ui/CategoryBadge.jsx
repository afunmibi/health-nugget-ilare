const CategoryBadge = ({ category }) => {
  return (
    <span className="inline-block bg-forest/10 text-forest px-3 py-1 rounded-full text-sm font-semibold">
      {category}
    </span>
  );
};

export default CategoryBadge;