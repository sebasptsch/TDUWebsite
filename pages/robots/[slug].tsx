import RobotPostLayout from "@/layouts/robot";
import { getFileBySlug, getFiles } from "@/lib/mdx";
import components from "components/MDXComponents";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";

export default function Post({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <RobotPostLayout frontMatter={frontMatter}>
      {" "}
      <Component components={components} />
    </RobotPostLayout>
  );
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
