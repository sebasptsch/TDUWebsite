import OutreachPostLayout from "@/layouts/outreach";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import components from "components/MDXComponents";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";

export default function Post({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <OutreachPostLayout frontMatter={frontMatter}>
      <Component components={components} />
    </OutreachPostLayout>
  );
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("outreach", params.slug);
  return { props: post };
}

export async function getStaticPaths() {
  const posts = await getFiles("outreach");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}
