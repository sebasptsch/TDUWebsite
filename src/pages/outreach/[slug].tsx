import components from "@/components/MDXComponents";
import OutreachPostLayout, { RequiredImageProps } from "@/layouts/outreach";
import { outreachFilePaths, OUTREACH_PATH } from "@/utils/mdxUtils";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ImageProps } from "next/image";
import path from "path";
import { getPlaiceholder, IGetPlaiceholderOptions } from "plaiceholder";

interface PostProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: Record<string, any>;
  image?: RequiredImageProps
}

// outreach slug
export default function OutreachPost({ source, frontMatter, image }: PostProps) {
    return <OutreachPostLayout frontMatter={frontMatter} image={image}>
        <MDXRemote {...source} components={components}/>
    </OutreachPostLayout>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("Error with params");
  const postFilePath = path.join(OUTREACH_PATH, `${params.slug}.mdx`);
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
  const paths = outreachFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

    console.log(paths)

  return {
    paths,
    fallback: false,
  };
};

const getImg = async (imgUrl?: string, opts?: IGetPlaiceholderOptions) => {
  if (!imgUrl) return null;
  // return getPlaiceholder(imgUrl, opts);
  const { base64, img } = await getPlaiceholder(imgUrl, opts);
  return  { ...img, blurDataURL: base64, };
}