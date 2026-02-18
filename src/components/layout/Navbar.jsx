import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1B5E20' }}>
      <div className="container">
        <Link 
          className="navbar-brand" 
          to="/"
          style={{ 
            fontFamily: '"Playfair Display", serif',
            color: '#F9A825',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}
        >
          🩺 Health Nugget-Ilare
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ borderColor: '#F9A825' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/"
                style={{ color: '#FAF7F0' }}
                activeStyle={{ color: '#F9A825', fontWeight: 'bold' }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/nuggets"
                style={{ color: '#FAF7F0' }}
                activeStyle={{ color: '#F9A825', fontWeight: 'bold' }}
              >
                Nuggets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/categories"
                style={{ color: '#FAF7F0' }}
                activeStyle={{ color: '#F9A825', fontWeight: 'bold' }}
              >
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/about"
                style={{ color: '#FAF7F0' }}
                activeStyle={{ color: '#F9A825', fontWeight: 'bold' }}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;