const Main = () => {
  // Data dummy produk
  const products = [
    { id: 1, name: "Modern Sneakers", price: "Rp 750.000", image: "👟", category: "Footwear" },
    { id: 2, name: "Cotton T-Shirt", price: "Rp 150.000", image: "👕", category: "Apparel" },
    { id: 3, name: "Leather Jacket", price: "Rp 1.200.000", image: "🧥", category: "Outerwear" },
    { id: 4, name: "Sport Watch", price: "Rp 2.500.000", image: "⌚", category: "Accessories" },
  ];

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Daftar Produk Terbaru</h2>
        <span style={{ color: '#0070f3', cursor: 'pointer', fontWeight: '500' }}>Lihat Semua →</span>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px' 
      }}>
        {products.map((product) => (
          <div key={product.id} style={{ 
            border: '1px solid #eee', 
            borderRadius: '12px', 
            padding: '20px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}>
            {/* Placeholder Gambar Produk */}
            <div style={{ 
              height: '180px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '60px',
              marginBottom: '15px'
            }}>
              {product.image}
            </div>

            <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>
              {product.category}
            </p>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#222' }}>
              {product.name}
            </h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#0070f3', marginBottom: '15px' }}>
              {product.price}
            </p>
            
            <button style={{ 
              width: '100%', 
              padding: '10px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;