import { useRouter } from "next/router";
import Link from "next/link";

<Link href="/auth/register">Ke Halaman Register</Link>
const LoginPage = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    // simulasi login berhasil
    push("/produk");
  };

  return (
    <div>
      <h1>Halaman Login</h1>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;