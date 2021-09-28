import MDXComponents from "@/components/MDXComponents";
import TeamLayout from "@/layouts/team";
import { getFileBySlug } from "@/lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { NextSeo } from "next-seo";
import { useMemo } from "react";

export default function Team({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <NextSeo title="The Team" />
      <TeamLayout>
        <Component components={MDXComponents} />
      </TeamLayout>
    </>
  );
}

export async function getStaticProps() {
  const uses = await getFileBySlug("team");

  return { props: uses };
}
