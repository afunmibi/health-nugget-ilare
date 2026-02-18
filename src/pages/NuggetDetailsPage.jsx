import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNuggetById } from '../api/nuggetService';
import MediaPlayer from '../components/ui/MediaPlayer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatDate } from '../utils/formatDate';

const NuggetDetailsPage = () => {
  const { id } = useParams();
  const [nugget, setNugget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNuggetById(id);
        setNugget(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return (
    <div className="container">
      <Link to="/nuggets" className="btn btn-outline-success btn-sm mb-3">Back to Nuggets</Link>

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="alert alert-danger">Unable to load nugget details. {error}</div>
      )}

      {!loading && !error && nugget && (
        <article className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h1 className="h3 mb-2">{nugget.title}</h1>
            <p className="text-muted mb-3">{nugget.category} - {formatDate(nugget.datePosted)}</p>

            {nugget.type !== 'text' && nugget.mediaUrl && (
              <MediaPlayer
                type={nugget.type}
                mediaUrl={nugget.mediaUrl}
                thumbnail={nugget.thumbnail}
                title={nugget.title}
              />
            )}

            <p className={`${nugget.type !== 'text' && nugget.mediaUrl ? 'mt-4' : 'mt-0'} mb-3`}>{nugget.fullText}</p>
            <div className="alert alert-warning mb-3">
              <strong>Doctor Note:</strong> {nugget.doctorNote}
            </div>
            <p className="mb-0 text-muted small">Author: {nugget.author}</p>
          </div>
        </article>
      )}
    </div>
  );
};

export default NuggetDetailsPage;
