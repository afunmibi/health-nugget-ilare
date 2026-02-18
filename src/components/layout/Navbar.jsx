import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `nav-link fw-semibold ${isActive ? 'text-warning' : 'text-light'}`;

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container">
        <NavLink className="navbar-brand fw-bold app-navbar-brand" to="/">
          Health Nugget Ilare
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-2 align-items-lg-center">
            <li className="nav-item">
              <NavLink className={linkClass} to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/nuggets">
                Nuggets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item mt-2 mt-lg-0">
              <NavLink className="btn btn-warning btn-sm fw-semibold" to="/admin/login">
                Admin Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
