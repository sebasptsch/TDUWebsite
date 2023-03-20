import MDXComponents from "@/components/MDXComponents";
import Main from "@/layouts/main";
import SponsorLayout from "@/layouts/sponsors";
import { SPONSORS_PATH } from "@/utils/mdxUtils";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

interface SponsorsProps {
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  data: Record<string, any>;
}

export default function Sponsors({ content, data }: SponsorsProps) {
  return (
    <SponsorLayout frontMatter={data}>
      <MDXRemote {...content} components={MDXComponents} />
    </SponsorLayout>
  );
}

export const getStaticProps = async () => {
  const source = fs.readFileSync(path.join(SPONSORS_PATH));
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });
  return {
    props: {
      content: mdxSource,
      data,
    },
  };
};
