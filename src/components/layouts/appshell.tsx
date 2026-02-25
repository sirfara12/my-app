import Navbar from "./Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <main>
      <Navbar />

      {children}

      <footer style={{ marginTop: "20px" }}>
        <hr />
        <p>© 2024 Praktikum Next.js</p>
      </footer>
    </main>
  );
}
