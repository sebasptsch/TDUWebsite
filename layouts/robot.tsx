import moment from "moment";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import Main from "./main";

export default function RobotPostLayout({ children, frontMatter }) {
  const { image, title, date, excerpt, slug } = frontMatter;
  const router = useRouter();
  return (
    <Main>
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          url: `https://www.team3132.com${router.asPath}`,
          title,
          description: excerpt,
          type: "article",
          article: {
            publishedTime: date,
          },
          images: image
            ? [
              {
                url: `https://www.team3132.com${image.src}`,
                height: image.height,
                width: image.width
              },
            ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        title={title}
        url={`https://www.team3132.com/robots/${slug}`}
        images={
          image
            ? [`https://www.team3132.com${image.src}`]
            : undefined
        }
        datePublished={date}
        description={excerpt}
        dateModified={date}
        authorName={"Team 3132"}
        publisherName="Team 3132"
        publisherLogo="https://www.team3132.com/images/applogo.png"
      />
      <article>
        {image ? (
          <div style={{ height: "20em", width: "100%", position: "relative" }}>
            <Image
              {...image}
              alt="Card Image"
              placeholder="blur"
              className="image is-square"
              objectFit="contain"
              layout="fill"
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
    </Main>
  );
}
