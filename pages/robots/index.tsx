import RobotPost from "@/components/RobotPost";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { NextSeo } from "next-seo";
import Link from "next/link";

export default function Robots({ posts }) {
  return (
    <>
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
      <section>
        <div className="columns is-multiline">
          {posts.map((post) => (
            <RobotPost frontMatter={post} key={post.slug} />
          ))}
        </div>
        <h1 className="title">GrabCAD</h1>
        <Link href="https://grabcad.com/team.3132-1/models">
          <a className="subtitle">GrabCAD Models</a>
        </Link>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("robots");
  return { props: { posts } };
}
