import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../../products';
import NotFoundPage from './NotFoundPage';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc từ khóa tìm kiếm và số trang từ URL (useSearchParams)
  const searchKeyword = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  // Quản lý giá trị ô nhập tìm kiếm bằng useState
  const [searchInput, setSearchInput] = useState(searchKeyword);
  const [category, setCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('default');
  const itemsPerPage = 4; // 1 trang hiển thị 4 id

  // Đồng bộ searchInput khi param search trên URL thay đổi
  useEffect(() => {
    setSearchInput(searchKeyword);
  }, [searchKeyword]);

  // 1. Chỉ cập nhật kết quả tìm kiếm khi người dùng submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (searchInput.trim()) {
        next.set('search', searchInput.trim());
      } else {
        next.delete('search');
      }
      next.set('page', '1'); // Reset về trang 1 khi tìm kiếm mới
      return next;
    });
  };

  // 2. Lọc sản phẩm: không phân biệt chữ hoa/thường (case-insensitive)
  // Chỉ hiển thị sản phẩm khớp với searchKeyword được lưu trên URL
  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchCategory = category === 'ALL' || p.category === category;
    return matchName && matchCategory;
  });

  // 3. Sắp xếp: mặc định, giá tăng/giảm, tên A-Z/Z-A
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return a.id - b.id;
  });

  // 4. Tính toán tổng số trang
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Bảo toàn từ khóa tìm kiếm (search keyword) khi chuyển trang hoặc đổi trạng thái
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', newPage.toString());
      return next;
    });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    handlePageChange(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    handlePageChange(1);
  };

  // NẾU HẾT TRANG (page vượt quá totalPages hoặc không hợp lệ) -> HIỂN THỊ TRANG 404
  if (sortedProducts.length > 0 && (isNaN(page) || page < 1 || page > totalPages)) {
    return <NotFoundPage />;
  }

  // Cắt đúng 4 sản phẩm cho trang hiện tại
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Hiển thị các nút trang (ít nhất đến trang 5 để nhấn vào trang 5 sẽ ra 404)
  const maxDisplayPages = Math.max(totalPages, 5);

  return (
    <div className="container">
      <h2>Danh sách sản phẩm</h2>

      {/* Bộ lọc: Form tìm kiếm theo tên, Lọc danh mục, Ô sắp xếp */}
      <div className="filter-bar">
        {/* Form tìm kiếm: submit mới cập nhật kết quả và URL */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Tìm theo tên..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn">
            Tìm kiếm
          </button>
        </form>

        <select value={category} onChange={handleCategory}>
          <option value="ALL">Tất cả danh mục</option>
          <option value="Điện thoại">Điện thoại</option>
          <option value="Laptop">Laptop</option>
          <option value="Máy tính bảng">Máy tính bảng</option>
          <option value="Phụ kiện">Phụ kiện</option>
        </select>

        <select value={sortBy} onChange={handleSort}>
          <option value="default">Sắp xếp: Mặc định</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
          <option value="name-asc">Tên: A - Z</option>
          <option value="name-desc">Tên: Z - A</option>
        </select>
      </div>

      {/* Cùng hàng: Hiện tổng số sản phẩm, số trang và các nút trang ở dưới filter, trên bảng */}
      <div className="toolbar-row">
        <div className="toolbar-info">
          <span>Tổng số sản phẩm: <strong>{sortedProducts.length}</strong></span>
          <span style={{ margin: '0 8px' }}>|</span>
          <span>Trang: <strong>{totalPages > 0 ? page : 0} / {totalPages}</strong></span>
        </div>

        {totalPages > 0 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Trước
            </button>

            {Array.from({ length: maxDisplayPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={num === page ? 'active' : ''}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= maxDisplayPages}
            >
              Sau
            </button>
          </div>
        )}
      </div>

      {/* Bảng danh sách sản phẩm */}
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>ID</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th className="text-center" style={{ width: '100px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price.toLocaleString('vi-VN')}đ</td>
                <td className="text-center">
                  <Link to={`/products/${p.id}`} className="btn">
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không tìm thấy sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
