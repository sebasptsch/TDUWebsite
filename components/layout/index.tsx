import { AnimatePresence, motion } from "framer-motion";
import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({ children }) {
  return (
    <div className="has-navbar-fixed-top">
      <Navigation />
      <section className="section">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container pt-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
}
