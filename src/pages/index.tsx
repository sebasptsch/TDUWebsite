import AnimatedLogo from "@/components/AnimatedLogo";
import Playlist from "@/components/Playlist";
import SocialButtons from "@/components/socialButtons";
import SponsorsComponent from "@/components/Sponsors";
import UpcomingComponent from "@/components/UpcomingEvents";
import Main from "@/layouts/main";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";

export default function Home({ imageProps }: any) { 

  return (
    <Main>
      <NextSeo title="Home" />
      <div className="hero">
        <div className="hero-body">
          <div className="title" style={{paddingRight: "3em", paddingLeft: "3em"}}>
            <AnimatedLogo />
          </div>
        </div>
        {/* <div className="column is-three-quarters">
         
        </div> */}
      </div>

      {/* <div className="py-6">
        <SocialButtons />
      </div> */}
      {/* <hr className="divider" /> */}
      <SponsorsComponent />
      <hr className="divider" />
      <div>
        <UpcomingComponent />
      </div>
      <hr className="divider" />
      <div className="columns">
        <div className="column is-6">
          <p className="title">About Us</p>
          <p className="content">
            FIRST Team 3132 is Australia’s first FRC team based in Sydney, New
            South Wales. We’re a team all about diversity, inclusion,
            inspiration, impact and innovation. Our motto, ‘Innovate. Improve.
            Inspire the World.’ guides us as we strive towards our mission of
            ‘STEM for Everyone, Everywhere’.
          </p>
        </div>
        <div className="column">
          <figure className="image is-3by2">
            <Image
              {...imageProps}
              alt="Team Photo"
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 50vw, 50vw"
            />
          </figure>
        </div>
      </div>

      {/* <hr className="divider" />
      <Playlist id="PLm8WT2AGvaJzX7wPs44aJW8XlZwxanLHk" /> */}
      <hr className="divider" />
      <div className="columns">
        <div className="column is-7">
          <p className="title">About FIRST</p>
          <p className="content">
            FIRST‘s mission is to inspire young people to be science and
            technology leaders through exciting mentor-based programs in a
            competition setting. These competitions build science, engineering
            and technology skills, inspire innovation, and foster well-rounded
            life capabilities including self-confidence, communication, and
            leadership.
          </p>
          <p className="buttons is-centered">
            <button className="button">
              <Link href="https://www.firstinspires.org/" legacyBehavior>
                <a>FIRST International</a>
              </Link>
            </button>
            <button className="button">
              <Link href="https://firstaustralia.org/" legacyBehavior>
                <a>FIRST Australia</a>
              </Link>
            </button>
          </p>
        </div>
        <div className="column">
          <figure className="image">
            <img src="/images/FIRST_Logo.svg" alt="FIRST logo" />
          </figure>
        </div>
      </div>
    </Main>
  );
}

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder("/images/team2019.jpg");
  return {
    props: { imageProps: { ...img, blurDataURL: base64, placeholder: "blur" } },
  };
};
