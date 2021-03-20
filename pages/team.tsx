import MDXComponents from "@/components/MDXComponents";
import TeamLayout from "@/layouts/team";
import { getFileBySlug } from "@/lib/mdx";
import hydrate from "next-mdx-remote/hydrate";
import { NextSeo } from "next-seo";

export default function Team({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });
  return (
    <>
      <NextSeo title="The Team" />
      <TeamLayout>{content}</TeamLayout>
    </>
  );
}

export async function getStaticProps() {
  const uses = await getFileBySlug("team");

  return { props: uses };
}
