import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authenticateAdmin, getDemoCredentials, isAdminAuthenticated } from '../utils/adminAuth';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const demoCredentials = getDemoCredentials();

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const ok = authenticateAdmin(username.trim(), password);

    if (!ok) {
      setError('Invalid admin credentials.');
      return;
    }

    setError('');
    navigate('/admin');
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <h1 className="h3 mb-3">Admin Login</h1>
      <p className="text-muted mb-4">Use your admin credentials to access the admin area.</p>
      <div className="alert alert-info py-2">
        Demo credentials: <strong>{demoCredentials.username}</strong> / <strong>{demoCredentials.password}</strong>
      </div>

      <form className="card border-0 shadow-sm" onSubmit={handleSubmit}>
        <div className="card-body p-4">
          <div className="mb-3">
            <label htmlFor="admin-username" className="form-label">Username</label>
            <input
              id="admin-username"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="admin-password" className="form-label">Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button className="btn btn-success w-100" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
