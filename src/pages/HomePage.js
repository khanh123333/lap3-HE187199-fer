import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container">
      <div className="home-box">
        <h2>Welcome to ProductStore</h2>
        <p>Manage and explore products for your store.</p>
        <Link to="/products" className="btn btn-primary">
          View Products
        </Link>
      </div>
    </div>
  );
}
