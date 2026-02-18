import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5 mt-auto" style={{ backgroundColor: '#1B5E20', color: '#FAF7F0' }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4 className="mb-3" style={{ color: '#F9A825' }}>Health Nugget Ilare</h4>
            <p className="mb-0 opacity-75">
              Helping everyday people start better conversations with their doctors.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3" style={{ color: '#F9A825' }}>Quick Links</h5>
            <ul className="list-unstyled mb-0 d-grid gap-2">
              <li><Link to="/" className="link-light text-decoration-none">Home</Link></li>
              <li><Link to="/nuggets" className="link-light text-decoration-none">Health Nuggets</Link></li>
              <li><Link to="/categories" className="link-light text-decoration-none">Categories</Link></li>
              <li><Link to="/about" className="link-light text-decoration-none">About</Link></li>
              <li><Link to="/disclaimer" className="link-light text-decoration-none">Medical Disclaimer</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3" style={{ color: '#F9A825' }}>Important</h5>
            <p className="mb-0 opacity-75">
              This platform provides general health education only. Always consult your healthcare provider for personal medical advice.
            </p>
          </div>
        </div>

        <hr className="my-4" />
        <p className="mb-0 small text-center opacity-75">
          Copyright {new Date().getFullYear()} Health Nugget Ilare.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
