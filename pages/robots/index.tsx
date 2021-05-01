import RobotPost from "@/components/RobotPost";
import { container } from "@/lib/animations";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Image from 'next/image';
import Link from "next/link";
const sizeOf = require('image-size')

export default function Robots({ posts, displayimagesize }: { posts: any[], displayimagesize: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
      <div className="columns">
        <div className="column is-6">
          <p className="title">{posts[0].title}</p>
          <p className="content">
            {posts[0].excerpt}
            <br />


          </p>
          <div className="buttons is-centered">
            <Link href={`/robots/${posts[0].slug}`}><a className="button">Read More</a></Link>
          </div>
        </div>
        {posts[0]?.image ? <div className="column"
        >
          <Image
            src={`/images/data/robots/${posts[0]?.image}`}
            className="image is-square"
            layout="responsive"
            width={displayimagesize.width}
            height={displayimagesize.height}
          />
        </div> : undefined}
      </div>
      <hr className="divider" />
      <motion.div
        className="columns is-multiline"
        variants={container}
        initial="hidden"
        animate="show"
      >

        {posts.slice(1).map((post) => (
          <RobotPost frontMatter={post} key={post.slug} className="column is-one-quarter" />
        ))}
      </motion.div>
      <h1 className="title">GrabCAD</h1>
      <Link href="https://grabcad.com/team.3132-1/models">
        <a className="subtitle">GrabCAD Models</a>
      </Link>
    </motion.div>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("robots");
  const displayimagesize = sizeOf(`./public/images/data/robots/${posts[0]?.image}`)
  return { props: { posts, displayimagesize } };
}
