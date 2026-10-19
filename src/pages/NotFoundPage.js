import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className="not-found">
        <h2>404 - Không tìm thấy trang</h2>
        <p>Trang bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
        {/* <Link to="/products" className="btn" style={{ marginLeft: '10px' }}>
          Về danh sách sản phẩm
        </Link> */}
      </div>
    </div>
  );
}
