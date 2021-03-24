import moment from "moment";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
export default function OutreachPostLayout({ children, frontMatter }) {
  const { image, title, date, excerpt, slug } = frontMatter;
  const router = useRouter();
  return (
    <div className="columns is-centered">
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          url: `https://thethunderdownunder.org${router.asPath}`,
          title,
          description: excerpt,
          type: "article",
          article: {
            publishedTime: date,
          },
          images: image
            ? [
                {
                  url: `https://thethunderdownunder.org/images/data/outreach/${image}`,
                },
              ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        title={title}
        url={`https://thethunderdownunder.org/outreach/${slug}`}
        images={
          image
            ? [`https://thethunderdownunder.org/images/data/outreach/${image}`]
            : undefined
        }
        datePublished={date}
        description={excerpt}
        dateModified={date}
        authorName={"Team 3132"}
        publisherName="Team 3132"
        publisherLogo="https://thethunderdownunder.org/images/applogo.png"
      />
      <div className="container is-max-desktop">
        {image ? (
          <div style={{ height: "20em", width: "100%", position: "relative" }}>
            <Image
              src={`/images/data/outreach/${image}`}
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
      </div>
    </div>
  );
}
