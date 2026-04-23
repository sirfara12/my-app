import { ProductType } from "../../types/Product.type";
import TampilanProduk from "../../views/produk";

const HalamanProdukServer = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1>Halaman Produk Server (SSR)</h1>

      <TampilanProduk products={products} />
    </div>
  );
};

export default HalamanProdukServer;

export async function getServerSideProps() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produk`);
  const response = await res.json();

  return {
    props: {
      products: response.data || [],
    },
  };
}