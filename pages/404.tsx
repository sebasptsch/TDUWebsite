import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

export default function FourOhFour() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="hero"
    >
      <NextSeo title="404" />
      <div className="hero-body">
        <div className="container">
          <h1 className="title">404</h1>
          <h2 className="subtitle">Page Not Found</h2>
          <img
            className="image is-centered has-text-centered"
            src="/images/nootdab.svg"
            alt="404"
          />
        </div>
      </div>
    </motion.section>
  );
}
