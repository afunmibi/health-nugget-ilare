import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import { formatDate } from '../../utils/formatDate';

const NuggetCard = ({ nugget }) => {
  const { id, title, category, type, thumbnail, description, doctorNote, datePosted } = nugget;

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'video':
        return 'bg-forest text-white';
      case 'audio':
        return 'bg-gold text-forest';
      case 'text':
        return 'bg-terra text-white';
      case 'image':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'audio':
        return '🎵';
      case 'text':
        return '📄';
      case 'image':
        return '🖼️';
      default:
        return '📎';
    }
  };

  return (
    <Link to={`/nuggets/${id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x300/1B5E20/FFFFFF?text=${encodeURIComponent(title)}`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-forest/10 flex items-center justify-center">
              <span className="text-6xl">{getTypeIcon(type)}</span>
            </div>
          )}
          
          {/* Type Badge */}
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${getTypeBadgeColor(type)}`}>
            {getTypeIcon(type)} {type}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-2">
            <CategoryBadge category={category} />
          </div>
          
          <h3 className="font-display text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {description}
          </p>
          
          {/* Doctor Note */}
          <div className="bg-gold/10 border-l-4 border-gold p-3 rounded-r mb-4">
            <p className="text-xs text-forest italic">
              ⚕️ {doctorNote}
            </p>
          </div>
          
          {/* Date */}
          <p className="text-xs text-gray-400">
            {formatDate(datePosted)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NuggetCard;