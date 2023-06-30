import RobotPost from "@/components/RobotPost";
import Main from "@/layouts/main";
import { RequiredImageProps } from "@/layouts/robot";
import { container } from "@/lib/animations";
import { robotFilePaths, ROBOTS_PATH } from "@/utils/mdxUtils";
import { motion } from "framer-motion";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import path from "path";
import { getPlaiceholder, IGetPlaiceholderOptions } from "plaiceholder";

interface Post {
  content: string;
  data: {
    [key: string]: any;
  };
  filePath: string;
  image?: RequiredImageProps;
  url: string;
}

interface Props {
  posts: Array<Post>;
}

export default function RobotsRoot({ posts }: Props) {
  return (
    <Main>
      <NextSeo
        title="Robots"
        description="A list of our robots year to year."
      />
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Robots</h1>
            <h2 className="subtitle">
              A list of our robots year to year including their accomplishments.
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
          <RobotPost
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
    robotFilePaths.reverse().map(async (filePath) => {
      const source = fs.readFileSync(path.join(ROBOTS_PATH, filePath));
      const { content, data } = matter(source);

      const image = await getImg(data.image);
      const url = filePath.replace(/\.mdx?$/, "")

      return {
        content,
        data,
        filePath,
        image,
        url: `/robots/${url}`,
      };
    })
  );

  return { props: { posts } };
};

const getImg = async (imgUrl?: string, opts?: IGetPlaiceholderOptions) => {
  if (!imgUrl) return null;
  // return getPlaiceholder(imgUrl, opts);
  const { base64, img } = await getPlaiceholder(imgUrl, opts);
  return { ...img, blurDataURL: base64, placeholder: "blur" };
};
