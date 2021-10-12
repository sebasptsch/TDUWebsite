import { motion } from "framer-motion";
import moment from "moment";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";

export default function RobotPostLayout({ children, frontMatter }) {
  const { image, title, date, excerpt, slug } = frontMatter;
  const router = useRouter();
  return (
    <motion.div
      className="container is-max-desktop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
                url: `https://thethunderdownunder.org${image.src}`,
                height: image.height,
                width: image.width
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
            ? [`https://thethunderdownunder.org${image.src}`]
            : undefined
        }
        datePublished={date}
        description={excerpt}
        dateModified={date}
        authorName={"Team 3132"}
        publisherName="Team 3132"
        publisherLogo="https://thethunderdownunder.org/images/applogo.png"
      />
      <article>
        {image ? (
          <div style={{ height: "20em", width: "100%", position: "relative" }}>
            <Image
              src={image.src}
              // height={image.height}
              // width={image.width}
              alt="Card Image"
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
    </motion.div>
  );
}
