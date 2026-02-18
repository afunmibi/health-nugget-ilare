import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import { formatDate } from '../../utils/formatDate';

const NuggetCard = ({ nugget }) => {
  const { id, title, category, type, thumbnail, description, doctorNote, datePosted } = nugget;

  const typeLabel = (type || 'unknown').toUpperCase();
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/nuggets/${id}` : '';
  const shareHref = shareUrl ? `https://wa.me/?text=${encodeURIComponent(`${title} - ${shareUrl}`)}` : '';

  return (
    <article className="card nugget-card bg-white">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-100 nugget-thumb"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <CategoryBadge category={category} />
          <span className="badge text-bg-secondary">{typeLabel}</span>
        </div>

        <h3 className="h5 fw-bold mb-2">{title}</h3>
        <p className="text-muted nugget-description mb-3">{description}</p>

        <div className="small bg-light border-start border-4 ps-3 py-2 mb-3" style={{ borderColor: '#f9a825' }}>
          {doctorNote}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <p className="text-secondary small mb-0">{formatDate(datePosted)}</p>
          <div className="d-flex gap-2">
            {shareHref && (
              <a
                className="btn btn-sm btn-outline-success"
                href={shareHref}
                target="_blank"
                rel="noreferrer"
              >
                Share WhatsApp
              </a>
            )}
            <Link to={`/nuggets/${id}`} className="btn btn-sm btn-success">View details</Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NuggetCard;