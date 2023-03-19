import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({ children }: any) {
  return (
    <div className="is-flex is-flex-direction-column" style={{
      height: "100vh",
    }}>
      <Navigation />
      <section style={{ flex: 1}} className="section">
        <div className="container">{children}</div>
      </section>
      <Footer />
    </div>
  );
}
