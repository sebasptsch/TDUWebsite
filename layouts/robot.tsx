import CardComponent from "@/components/card";
import moment from "moment";
import { ArticleJsonLd, NextSeo } from "next-seo";
import React from "react";

export default function RobotPostLayout({ children, frontMatter }) {
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
                  url: `https://thethunderdownunder.org/images/data/robots/${image}`,
                },
              ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        title={title}
        url={`https://thethunderdownunder.org/robots/${slug}`}
        images={
          image
            ? [`https://thethunderdownunder.org/images/data/robots/${image}`]
            : undefined
        }
        datePublished={date}
        description={excerpt}
        dateModified={date}
        authorName={"Team 3132"}
        publisherName="Team 3132"
        publisherLogo="https://thethunderdownunder.org/images/applogo.png"
      />
      <div className="column is-three-fifths-tablet">
        {image ? (
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <CardComponent image={`/images/data/robots/${image}`} />
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
