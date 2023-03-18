import { robotFilePaths, ROBOTS_PATH } from "@/utils/mdxUtils";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import RobotPostLayout, { RequiredImageProps } from "@/layouts/robot";
import { getPlaiceholder, IGetPlaiceholderOptions } from "plaiceholder";
import components from "@/components/MDXComponents";

interface PostProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: Record<string, any>;
  image?: RequiredImageProps
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("Error with params");
  const postFilePath = path.join(ROBOTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  const image = await getImg(data.image)

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      image
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = robotFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default function RobotPost({ frontMatter, source, image }: PostProps) {
  return (
    <RobotPostLayout frontMatter={frontMatter} image={image}>
      <MDXRemote {...source} components={components} />
    </RobotPostLayout>
  );
}


const getImg = async (imgUrl?: string, opts?: IGetPlaiceholderOptions) => {
  if (!imgUrl) return null;
  // return getPlaiceholder(imgUrl, opts);
  const { base64, img } = await getPlaiceholder(imgUrl, opts);
  return  { ...img, blurDataURL: base64, };
}