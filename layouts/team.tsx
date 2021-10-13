import AwardComponent from "@/components/AwardsComponent";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function TeamLayout({ imageProps }) {
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
          <div className="column is-three-fifths content"><Image
            {...imageProps}
            className="image"
            alt="Team Photo"
            layout="responsive"
          />
            <hr className="divider" />
            <p>FIRST Team 3132, otherwise known as the Thunder Down Under, is the first Australian
              team to participate in the FIRST Robotics Competition. Our team consists of students
              and mentors who share a passion, ambition and commitment bring "STEM to everyone
              everywhere."</p>
            <p>Our students come from 50+ high schools in the Greater Sydney Area. They are all eager and determined to achieve our goal of inspiring Australia and the world. Our students in the Greater Sydney Area come from 100km radius around our team headquarters - Macquarie University.
            </p>
            <p> We are passionate about spreading our message of ‘STEM for Everyone, Everywhere’. This means changing the lives of everyone, no matter who they are or where they live. From the outback of Australia to the provinces of China, we want Everyone, Everywhere to have the ability to participate in FIRST. In 2017, our team was honored to become the first team outside North America to win the Championship Chairman's Award, giving us entry into the FIRST Hall of Fame.
            </p>
          </div>
        </div>
        <hr className="divider" />
        <AwardComponent />
      </motion.article>
    </>
  );
}