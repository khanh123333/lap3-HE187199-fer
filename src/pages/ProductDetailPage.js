import { useParams, Link } from 'react-router-dom';
import { products } from '../../products';

export default function ProductDetailPage() {
  const { id } = useParams();


  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <Link to="/products" className="btn" style={{ marginBottom: '15px' }}>
          Quay lại danh sách
        </Link>

        <div className="not-found">
          <h2>Không tìm thấy sản phẩm</h2>
          <p>Sản phẩm với ID {id} không tồn tại trong hệ thống.</p>
          <Link to="/products" className="btn btn-primary">
            Về danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/products" className="btn" style={{ marginBottom: '15px' }}>
        Quay lại danh sách
      </Link>

      <div className="detail-box">

        <div className="image-box">
          <img src="/product.png" alt={product.name} className="product-detail-img" />
        </div>


        <div className="detail-content">
          <h3>{product.name}</h3>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Danh mục:</strong> {product.category}</p>
          <p><strong>Giá:</strong> {product.price.toLocaleString('vi-VN')}đ</p>
          <p><strong>Mô tả:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  );
}
