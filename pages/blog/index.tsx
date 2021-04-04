import BlogPost from "@/components/BlogPost";
import { container } from "@/lib/animations";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import React from "react";

export default function Blog({ posts }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NextSeo
        title="Blog"
        description="A place to see what's happening around the team and in our
              community."
      />
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Blog</h1>
            <h2 className="subtitle">
              A place to see what's happening around the team and in our
              community.
            </h2>
          </div>
        </div>
      </section>
      <hr className="divider" />
      <motion.div variants={container} initial="hidden" animate="show">
        {posts.map((post) => (
          <BlogPost frontMatter={post} key={post.slug} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");
  return { props: { posts } };
}
