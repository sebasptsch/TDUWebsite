import { query } from '.keystone/api';
import RobotPost from "@/components/RobotPost";
import Main from '@/layouts/main';
import { container } from "@/lib/animations";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { getPlaiceholder } from 'plaiceholder';

export default function Robots({ posts, displayimagesize }: { posts: any[], displayimagesize: any }) {
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
          <RobotPost frontMatter={post} key={post.id} className="column is-one-quarter" />
        ))}
      </motion.div>
      <h1 className="title">GrabCAD</h1>
      <Link href="https://grabcad.com/team.3132-1/models">
        <a className="subtitle">GrabCAD Models</a>
      </Link>
    </Main>
  );
}

export async function getStaticProps() {
  const posts = await query.Robot.findMany({ query: 'id title slug excerpt image {src width height}', orderBy: { title: "desc" } });

  const postsWithThumbnail = async () => {
    return Promise.all(posts.map(async post => {
      if (post.image) {
        const { img, base64 } = await getPlaiceholder(post.image.src)
        return {
          ...post,
          image: { ...img, blurDataURL: base64 }
        }
      } else {
        return post
      }
    }))
  }
  return { props: { posts: await postsWithThumbnail() } };
}