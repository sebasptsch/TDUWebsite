import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <section className="section">
        <div className="container pt-6">{children}</div>
      </section>
      <Footer />
    </>
  );
}
