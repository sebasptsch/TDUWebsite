import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <div className="container mx-4 my-4">{children}</div>
      <Footer />
    </div>
  );
}
