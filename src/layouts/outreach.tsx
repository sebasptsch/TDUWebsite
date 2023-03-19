import parseDate from "@/utils/parseDate";
import { DateTime } from "luxon";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image, { ImageProps } from "next/image";
import { useRouter } from "next/router";
import Main from "./main";

export interface RequiredImageProps extends ImageProps {
  width: number | `${number}`,
  height: number | `${number}`,
  src: string
}

interface OutreachPostLayoutProps {
  children: React.ReactNode[] | React.ReactNode,
  frontMatter: Record<string, string>,
  image?: RequiredImageProps,
}

export default function OutreachPostLayout({ children, frontMatter, image }: OutreachPostLayoutProps) {
  const { title, date, excerpt, slug } = frontMatter;
  const router = useRouter();

  const formattedDate = parseDate(date)?.toLocaleString(DateTime.DATE_MED);

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
                height: parseInt(image.height.toString()),
                width: parseInt(image.width.toString())
              },
            ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        title={title}
        url={`https://www.team3132.com/outreach/${slug}`}
        images={
          image
            ? [`https://www.team3132.com${image.src}`]
            : []
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
          <figure
            className="image is-16by9"
            // style={{
            //   position: "relative",
            // }}
          >
            <Image
              {...image}
              // fill
              alt="Card Image"
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={{
                objectFit: "contain"
              }}
              placeholder="blur"
            />
          </figure>
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
