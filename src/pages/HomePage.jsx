import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWelcomeData } from '../api/nuggetService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const [welcome, setWelcome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getWelcomeData();
        setWelcome(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="container">
      <section className="hero-section p-4 p-md-5 rounded-4 mb-4">
        <h1 className="display-6 fw-bold mb-3">Health Nugget Ilare</h1>
        <p className="mb-0">Reliable community health education to support better conversations with doctors.</p>
      </section>

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="alert alert-danger">Unable to load welcome message. {error}</div>
      )}

      {!loading && !error && welcome && (
        <section className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h2 className="h4 mb-3">Welcome Message</h2>
            <p className="mb-3">{welcome.message}</p>
            <p className="mb-1"><strong>Author:</strong> {welcome.author}</p>
            <p className="mb-4 text-muted">{welcome.bio}</p>
            <Link to="/nuggets" className="btn btn-success">Browse Health Nuggets</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
