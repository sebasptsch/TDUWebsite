import MDXComponents from "@/components/MDXComponents";
import BlogPostLayout from "@/layouts/blog";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import hydrate from "next-mdx-remote/hydrate";
import React from "react";

export default function Post({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });
  return <BlogPostLayout frontMatter={frontMatter}>{content}</BlogPostLayout>;
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("blog", params.slug);
  return { props: post };
}

export async function getStaticPaths() {
  const posts = await getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}
