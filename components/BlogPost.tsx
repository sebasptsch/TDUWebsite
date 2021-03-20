import moment from "moment";
import Image from "next/image";

export default function BlogPost({ frontMatter }) {
  const { image, date, excerpt, title, slug } = frontMatter;
  return (
    <>
      <a href={`/blog/${slug}`} className="box columns">
        {image ? (
          <div className="column is-4">
            <Image
              alt="Post Image"
              src={`/images/data/blog/${image}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ) : null}
        <div className="column">
          <p className="title is-4">{title}</p>
          <p className="subtitle">
            {date ? moment(date).format("MMMM DD, YYYY") : null}
          </p>
          <p className="content">{excerpt}</p>
        </div>
      </a>
      <br />
    </>
  );
}
