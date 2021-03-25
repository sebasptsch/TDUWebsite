import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="section">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
