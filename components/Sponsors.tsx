import { motion } from "framer-motion";
import Link from "next/link";

export default function SponsorsComponent() {
  const sponsors = [
    {
      name: "Google",
      link: "https://www.google.com.au/",
      logo: "/images/sponsor_logos/sponsors_svg/Google.svg",
    },
    {
      name: "Amazon",
      link: "https://www.amazon.com.au/",
      logo: "/images/sponsor_logos/sponsors_svg/Amazon.svg",
    },
    {
      name: "Andymark",
      link: "https://www.andymark.com/",
      logo: "/images/sponsor_logos/sponsors_svg/Andymark.svg",
    },
    {
      name: "BAE Systems",
      link: "https://www.baesystems.com/en-aus/home",
      logo: "/images/sponsor_logos/sponsors_svg/BAESystems.svg",
    },
    {
      name: "Boeing",
      link: "https://www.boeing.com.au/",
      logo: "/images/sponsor_logos/sponsors_svg/Boeing.svg",
    },
    {
      name: "Ford",
      link: "https://www.ford.com.au/",
      logo: "/images/sponsor_logos/sponsors_svg/Ford.svg",
    },
    {
      name: "Lego Education",
      link: "https://education.lego.com/en-au",
      logo: "/images/sponsor_logos/sponsors_svg/LegoEdu.svg",
    },
    {
      name: "Macquarie University",
      link: "https://www.mq.edu.au/",
      logo: "/images/sponsor_logos/sponsors_svg/MQ.svg",
    },
    {
      name: "Rockwell Automation",
      link: "https://www.rockwellautomation.com/",
      logo: "/images/sponsor_logos/sponsors_svg/Rockwell.svg",
    },
  ];
  return (
    <div className="columns is-multiline is-centered is-vcentered is-mobile px-6">
      <div className="column is-12">
        {" "}
        <h1 className="title has-text-centered">Our Sponsors</h1>
      </div>
      {sponsors.map((sponsor) => {
        return (
          <motion.div
            className="column is-one-fifth-desktop is-one-third-tablet is-half-mobile"
            key={sponsor.name}
            whileHover={{
              x: 5,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <Link href={sponsor.link}>
              <a>
                <img src={sponsor.logo} alt={sponsor.name} className="image" />
              </a>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
