import { DefaultSeoProps } from "next-seo";

const defaultSeoOptions: DefaultSeoProps = {
  defaultTitle: "Unknown",
  titleTemplate: "%s | TDU Team 3132",
  description:
    "FIRST Team 3132 is Australia’s first FRC team based in Sydney, New South Wales. We’re a team all about diversity, inclusion, inspiration, impact and innovation.",
  twitter: {
    site: "@Team3132",
    handle: "@Team3132",
  },
  openGraph: {
    site_name: "TDU Team 3132",
  },
};

export default defaultSeoOptions;
