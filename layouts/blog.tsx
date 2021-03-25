import moment from "moment";
import { BlogJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function BlogPostLayout({ children, frontMatter }) {
  const { image, title, date, excerpt, slug } = frontMatter;
  const router = useRouter();
  return (
    <div className="container is-max-desktop">
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          title,
          url: `https://thethunderdownunder.org${router.asPath}`,
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
      <article>
        {image ? (
          <div style={{ height: "20em", width: "100%", position: "relative" }}>
            <Image
              src={`/images/data/blog/${image}`}
              alt="Card Image"
              className="image is-square"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}
        <section className="hero hero-body">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">
            {date
              ? `Last Edited ${moment(date).format("MMMM DD, YYYY")}`
              : null}
          </h2>
        </section>
        <div className="content">{children}</div>
      </article>
    </div>
  );
}
