import { query } from '.keystone/api';
import OutreachPost from "@/components/OutreachPost";
import { container } from "@/lib/animations";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { getPlaiceholder } from 'plaiceholder';

export default function Outreach({ posts }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <OutreachPost frontMatter={post} key={post.id} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export async function getStaticProps() {
  const posts = await query.Program.findMany({ query: 'id title slug excerpt image {src width height}', orderBy: { title: "desc" } });
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
