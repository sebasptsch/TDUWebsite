import { container, item } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";

interface SponsorsComponentProps {
  showTitle?: boolean;
}

export default function SponsorsComponent({ showTitle = true }: SponsorsComponentProps) {
  const sponsors = [
    {
      name: "Macquarie University",
      link: "https://www.mq.edu.au/",
      logo: "/images/sponsor_logos/sponsors_svg/MQ.svg",
    },
    {
      name: "Google",
      link: "https://www.google.com.au/",
      logo: "/images/sponsor_logos/sponsors_svg/Google.svg",
    },
    {
      name: "IET",
      link: "https://www.theiet.org/",
      logo: "/images/sponsor_logos/sponsors_svg/IET.svg",
    },
    {
      name: "MGI",
      link: "https://en.mgi-tech.com/",
      logo: "/images/sponsor_logos/sponsors_svg/MGI.svg",
    }
    // {
    //   name: "Amazon",
    //   link: "https://www.amazon.com.au/",
    //   logo: "/images/sponsor_logos/sponsors_svg/Amazon.svg",
    // },

    // {
    //   name: "Andymark",
    //   link: "https://www.andymark.com/",
    //   logo: "/images/sponsor_logos/sponsors_svg/Andymark.svg",
    // },
    // {
    //   name: "BAE Systems",
    //   link: "https://www.baesystems.com/en-aus/home",
    //   logo: "/images/sponsor_logos/sponsors_svg/BAESystems.svg",
    // },
    // {
    //   name: "Boeing",
    //   link: "https://www.boeing.com.au/",
    //   logo: "/images/sponsor_logos/sponsors_svg/Boeing.svg",
    // },
    // {
    //   name: "Ford",
    //   link: "https://www.ford.com.au/",
    //   logo: "/images/sponsor_logos/sponsors_svg/Ford.svg",
    // },
    // {
    //   name: "Lego Education",
    //   link: "https://education.lego.com/en-au",
    //   logo: "/images/sponsor_logos/sponsors_svg/LegoEdu.svg",
    // },

    // {
    //   name: "Rockwell Automation",
    //   link: "https://www.rockwellautomation.com/",
    //   logo: "/images/sponsor_logos/sponsors_svg/Rockwell.svg",
    // },
  ];
  return (
    <motion.div
      className="columns is-multiline is-centered is-vcentered is-mobile"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {showTitle ? <div className="column is-12">
        <h1 className="title has-text-centered">Our Sponsors</h1>
      </div> : null}
      {sponsors.map((sponsor) => {
        return (
          <motion.div
            className="column is-one-third-desktop is-full-mobile m-4"
            key={sponsor.name}
            whileHover={{
              x: 5,
            }}
            whileTap={{
              scale: 0.95,
            }}
            variants={item}
          >
            <Link href={sponsor.link}>
              <figure className="image">
                <img src={sponsor.logo} alt={sponsor.name} />
              </figure>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
