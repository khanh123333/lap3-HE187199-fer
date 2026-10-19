import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        ProductStore
      </Link>
      <nav className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">
          Products
        </NavLink>
      </nav>
    </header>
  );
}
