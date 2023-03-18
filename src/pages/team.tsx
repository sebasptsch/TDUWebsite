import TeamLayout from "@/layouts/team";
import { NextSeo } from "next-seo";
import { ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";

interface TeamProps {
    imageProps: ImageProps   
}

export default function Team({ imageProps }: TeamProps) {

  return (
    <>
      <NextSeo title="The Team" />
      <TeamLayout imageProps={imageProps} />
    </>
  );
}
export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder("/images/team2019.jpg");
  return { props: { imageProps: { ...img, blurDataURL: base64, }, }, };
};