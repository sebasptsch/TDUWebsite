import moment from "moment";
import { BlogJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";

export default function BlogPostLayout({ children, frontMatter }) {
  const { image, title, date, excerpt, slug } = frontMatter;
  return (
    <div className="columns is-centered">
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          title,
          description: excerpt,
          type: "article",
          article: {
            publishedTime: date,
          },
          images: image
            ? [
                {
                  url: `https://thethunderdownunder.org/images/data/blog/${image}`,
                },
              ]
            : undefined,
        }}
      />
      <BlogJsonLd
        title={title}
        url={`https://thethunderdownunder.org/blog/${slug}`}
        images={
          image
            ? [`https://thethunderdownunder.org/images/data/blog/${image}`]
            : undefined
        }
        datePublished={date}
        description={excerpt}
        dateModified={date}
        authorName={"Team 3132"}
      />
      <div className="column is-three-fifths-tablet">
        {image ? (
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <Image
                src={`/images/data/blog/${image}`}
                alt="Card Image"
                className="image is-square"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ) : null}
        <section className="hero hero-body">
          <div className="container has-text-centered">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">
              {date
                ? `Last Edited ${moment(date).format("MMMM DD, YYYY")}`
                : null}
            </h2>
          </div>
        </section>
        {children}
      </div>
    </div>
  );
}
