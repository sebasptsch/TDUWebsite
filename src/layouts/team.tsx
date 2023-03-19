import AwardComponent from "@/components/AwardsComponent";
import Image, { ImageProps } from 'next/image';
import Main from "./main";

interface TeamLayoutProps {
  imageProps: ImageProps
}

export default function TeamLayout({ imageProps }: TeamLayoutProps) {
  return (
    <Main>
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
          placeholder="blur"
          className="image"
          alt="Team Photo"
        />
          <hr className="divider" />
          <p>FIRST Team 3132, otherwise known as the Thunder Down Under, is the first Australian
            team to participate in the FIRST Robotics Competition. Our team consists of students
            and mentors who share a passion, ambition and commitment bring &quot;STEM to everyone
            everywhere.&quot;</p>
          <p>Our students come from 50+ high schools in the Greater Sydney Area. They are all eager and determined to achieve our goal of inspiring Australia and the world. Our students in the Greater Sydney Area come from 100km radius around our team headquarters - Macquarie University.
          </p>
          <p> We are passionate about spreading our message of ‘STEM for Everyone, Everywhere’. This means changing the lives of everyone, no matter who they are or where they live. From the outback of Australia to the provinces of China, we want Everyone, Everywhere to have the ability to participate in FIRST. In 2017, our team was honored to become the first team outside North America to win the Championship Chairman&apos;s Award, giving us entry into the FIRST Hall of Fame.
          </p>
        </div>
      </div>
      <hr className="divider" />
      <AwardComponent />
    </Main>
  );
}