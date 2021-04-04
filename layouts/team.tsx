import AwardComponent from "@/components/AwardsComponent";
import { motion } from "framer-motion";

export default function TeamLayout({ children }) {
  return (
    <>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">The Team</h1>
              <h2 className="subtitle">A brief description of the team.</h2>
            </div>
          </div>
        </section>
        <hr className="divider" />
        <div className="columns is-centered">
          <div className="column is-three-fifths content">{children}</div>
        </div>
        <hr className="divider" />
        <AwardComponent />
      </motion.article>
    </>
  );
}
