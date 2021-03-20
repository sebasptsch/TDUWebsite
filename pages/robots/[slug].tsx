import MDXComponents from "@/components/MDXComponents";
import RobotPostLayout from "@/layouts/robot";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import hydrate from "next-mdx-remote/hydrate";
import React from "react";

export default function Post({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });
  return <RobotPostLayout frontMatter={frontMatter}>{content}</RobotPostLayout>;
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("robots", params.slug);
  return { props: post };
}

export async function getStaticPaths() {
  const posts = await getFiles("robots");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}
