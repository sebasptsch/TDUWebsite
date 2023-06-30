// Root dir of outreach projects

import { outreachFilePaths, OUTREACH_PATH } from "@/utils/mdxUtils";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "framer-motion";
import { container } from "@/lib/animations";
import OutreachPost from "@/components/OutreachPost";
import { NextSeo } from "next-seo";
import Main from "@/layouts/main";
import { getPlaiceholder, IGetPlaiceholderOptions } from "plaiceholder";
import { ImageProps } from "next/image";

interface Post {
  content: string;
  data: {
    [key: string]: any;
  };
  filePath: string;
  image?: ImageProps;
  url: string;
}

interface Props {
  posts: Array<Post>;
}

export default function OutreachRoot({ posts }: Props) {
  return (
    <Main>
      <NextSeo
        title="Outreach"
        description="A list of all of the awesome things we have done to help the
                  community around the world."
      />
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Outreach</h1>
            <h2 className="subtitle">
              A list of all of the awesome things we have done to help the
              community around the world.
            </h2>
          </div>
        </div>
      </section>
      <hr className="divider" />
      <motion.div
        className="columns is-multiline"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {posts.map((post) => (
          <OutreachPost
            frontMatter={post.data}
            key={post.data.title}
            image={post.image}
            url={post.url}
          />
        ))}
      </motion.div>
    </Main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await Promise.all(
    outreachFilePaths.map(async (filePath) => {
      const source = fs.readFileSync(path.join(OUTREACH_PATH, filePath));
      const { content, data } = matter(source);
      const url = filePath.replace(/\.mdx?$/, "");

      const image = await getImg(data.image);

      return {
        content,
        data,
        filePath,
        image,
        url: `/outreach/${url}`,
      };
    })
  );

  // console.log({ posts });

  return { props: { posts: posts.sort(sortByPriority) }, fallback: false };
};

interface priorityProps {
  data: Record<string, string | undefined>;
}

const sortByPriority = (
  { data: { priority: priority1 } }: priorityProps,
  { data: { priority: priority2 } }: priorityProps
) => {
  // if greater return 1
  // if less return -1
  // if equal return 0

  if (priority1 === undefined) return 1;
  if (priority2 === undefined) return -1;

  if (parseInt(priority1) > parseInt(priority2)) return 1;
  if (parseInt(priority1) < parseInt(priority2)) return -1;
  return 0;
};

const getImg = async (imgUrl?: string, opts?: IGetPlaiceholderOptions) => {
  if (!imgUrl) return null;
  // return getPlaiceholder(imgUrl, opts);
  const { base64, img } = await getPlaiceholder(imgUrl, opts);
  return { ...img, blurDataURL: base64, placeholder: "blur" };
};
