export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", height: "100vh", backgroundColor: "yellow" }}>
        Navbar
      </div>
      <div style={{ width: "80%" }}>{children}</div>
    </div>
  );
}
