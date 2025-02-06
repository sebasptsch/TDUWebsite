import TeamLayout from "@/layouts/team";
import { appRouter } from "@/server/routers/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { getPlaiceholder } from "plaiceholder";
import SuperJSON from "superjson";

export default function Team(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo title="The Team" />
      <TeamLayout imageProps={props.imageProps} />
    </>
  );
}
export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder("/images/team2019.jpg");

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: SuperJSON,
  });

  await helpers.tba.awards.prefetch();
  await helpers.tba.pastEvents.prefetch();

  return {
    props: {
      imageProps: { ...img, blurDataURL: base64, alt: "Team Photo" },
      trpcState: helpers.dehydrate(),
    },
    revalidate: 60 * 60 * 24,
  };
};
