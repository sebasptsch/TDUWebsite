import components from "@/components/MDXComponents";
import BlogPostLayout from "@/layouts/blog";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";

export default function Post({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <BlogPostLayout frontMatter={frontMatter}>
      <Component components={components} />
    </BlogPostLayout>
  );
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
