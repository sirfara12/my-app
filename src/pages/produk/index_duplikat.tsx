import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

const Kategori = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Function untuk ambil data
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/produk");
      const responsedata = await response.json();
      setProducts(responsedata.data);
    } catch (error) {
      console.error("Error fetching produk:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ambil data saat pertama kali load
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>

      {/* 🔹 Tombol Refresh */}
      <button onClick={getProducts} style={{ marginBottom: "20px" }}>
        Refresh Data
      </button>

      {loading && <p>Loading...</p>}

      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "15px" }}>
          <h2>{product.name}</h2>
          <p>Price: Rp {product.price}</p>
          <p>Size: {product.size}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Kategori;