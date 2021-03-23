import OutreachPost from "@/components/OutreachPost";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { NextSeo } from "next-seo";
import React from "react";

export default function Outreach({ posts }) {
  return (
    <>
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
      <section className="section">
        <div className="columns is-multiline">
          {posts.map((post) => (
            <OutreachPost frontMatter={post} key={post.slug} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("outreach");
  return { props: { posts } };
}
