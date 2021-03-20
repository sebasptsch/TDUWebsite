import CardComponent from "./card";

export default function OutreachPost({ frontMatter }) {
  const { title, image, excerpt, slug } = frontMatter;

  return (
    <div className="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet">
      <a href={`/outreach/${slug}`}>
        <CardComponent
          title={title}
          content={excerpt}
          image={image ? `/images/data/outreach/${image}` : undefined}
        />
      </a>
    </div>
  );
}
