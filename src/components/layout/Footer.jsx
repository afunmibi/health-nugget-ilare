import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-forest text-white py-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h4 
              className="mb-3"
              style={{ fontFamily: '"Playfair Display", serif', color: '#F9A825' }}
            >
              🩺 Health Nugget-Ilare
            </h4>
            <p className="text-cream/80">
              Helping everyday people start better conversations with their doctors.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3" style={{ color: '#F9A825' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-cream/80 hover:text-gold text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/nuggets" className="text-cream/80 hover:text-gold text-decoration-none">
                  Health Nuggets
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="text-cream/80 hover:text-gold text-decoration-none">
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-cream/80 hover:text-gold text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-cream/80 hover:text-gold text-decoration-none">
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Disclaimer */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3" style={{ color: '#F9A825' }}>Important</h5>
            <p className="text-cream/80 text-sm">
              This platform provides general health education only. Always consult your 
              healthcare provider for personal medical advice.
            </p>
          </div>
        </div>
        
        <hr className="border-cream/20 my-4" />
        
        <div className="text-center text-cream/60 text-sm">
          <p className="mb-0">
            © {new Date().getFullYear()} Health Nugget-Ilare. Built with love for community health literacy.
          </p>
          <p className="mb-0 mt-2">
            <em>"Always talk to your doctor."</em>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;