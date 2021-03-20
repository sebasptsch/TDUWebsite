import MDXComponents from "@/components/MDXComponents";
import OutreachPostLayout from "@/layouts/outreach";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import hydrate from "next-mdx-remote/hydrate";
import React from "react";

export default function Post({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });
  return (
    <OutreachPostLayout frontMatter={frontMatter}>{content}</OutreachPostLayout>
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
