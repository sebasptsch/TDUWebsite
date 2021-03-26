import Link from "next/link";
import CardComponent from "./card";

export default function RobotPost({ frontMatter }) {
  const { title, image, excerpt, slug } = frontMatter;
  return (
    <Link href={`/robots/${slug}`}>
      <a className="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet">
        <CardComponent
          title={title}
          image={image ? `/images/data/robots/${image}` : undefined}
          content={excerpt}
        />
      </a>
    </Link>
  );
}
