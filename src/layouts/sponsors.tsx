import { DateTime } from "luxon";
import { NextSeo } from "next-seo";
import Main from "./main";

interface SponsorLayoutProps {
  children: React.ReactNode;
  frontMatter: Record<string, any>;
}

export default function SponsorLayout(props: SponsorLayoutProps) {
  const date = DateTime.fromISO(props.frontMatter.date);
  const title = props.frontMatter.title as string;
  const description = props.frontMatter.description as string;

  return (
    <Main>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: `https://www.team3132.com/sponsors`,
          type: "article",
          article: {
            publishedTime: date.toISO() ?? undefined,
            modifiedTime: date.toISO() ?? undefined,
          },
        }}
      />
      <div className="content">{props.children}</div>
    </Main>
  );
}
