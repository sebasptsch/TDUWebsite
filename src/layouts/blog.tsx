import parseDate from "@/utils/parseDate";
import { DateTime } from "luxon";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import Main from "./main";

interface BlogPostLayoutProps {
  children: React.ReactNode[] | React.ReactNode,
  frontMatter: Record<string, string>
}

export default function BlogPostLayout({ children, frontMatter }: BlogPostLayoutProps) {
  const { image, title, date, excerpt, slug } = frontMatter;
  const router = useRouter();

  const formattedDate = parseDate(date)?.toLocaleString(DateTime.DATE_MED);

  return (
    <Main>
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          title,
          url: `https://www.team3132.com${router.asPath}`,
          description: excerpt,
          type: "article",
          article: {
            publishedTime: date,
          },
          images: image
            ? [
              {
                url: `https://www.team3132.com/images/data/blog/${image}`,
              },
            ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        title={title}
        url={`https://www.team3132.com/blog/${slug}`}
        images={
          image
            ? [`https://www.team3132.com/images/data/blog/${image}`]
            : []
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
              fill
              style={{
                objectFit: "contain"
              }}
            />
          </div>
        ) : null}
        <section className="hero hero-body">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">
            {formattedDate
              ? `Last Edited ${formattedDate}`
              : null}
          </h2>
        </section>
        <div className="content">{children}</div>
      </article>
    </Main>
  );
}
