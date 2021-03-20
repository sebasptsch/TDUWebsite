import moment from "moment";
import Image from "next/image";
import Link from "next/link";
export default function BlogPost({ frontMatter }) {
  const { image, date, excerpt, title, slug } = frontMatter;
  return (
    <Link href={`/blog/${slug}`}>
      <a className="box columns m-3">
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
    </Link>
  );
}
