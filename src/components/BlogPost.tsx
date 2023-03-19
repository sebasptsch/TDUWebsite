import { item } from "@/lib/animations";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";
import parseDate from "@/utils/parseDate";

interface BlogPostFrontmatter {
  /** Image Url */
  image: string 
  /** date in ISO format */
  date: string
  excerpt: string
  /** title string */
  title: string
  /** the slug string (derived from the file name) */
  slug: string
}

interface BlogPostProps {
  frontMatter: BlogPostFrontmatter,
  image: ImageProps
}

export default function BlogPost({ frontMatter, image }: BlogPostProps) {
  const { image: imageUrl, date, excerpt, title, slug } = frontMatter;
  return (
    <Link href={`/blog/${slug}`} legacyBehavior>
      <a className="box columns mt-2 mb-2">
        {image ? (
          <div className="column is-4">
            <Image
              fill
              style={{
                objectFit: "cover"
              }}
              {...image}
              alt="Post Image"
            />
          </div>
        ) : null}
        <div className="column">
          <p className="title is-4">{title}</p>
          <p className="subtitle">
            {parseDate(date)?.toLocaleString(DateTime.DATE_MED) ?? null}
          </p>
          <p className="content">{excerpt}</p>
        </div>
      </a>
    </Link>
  );
}
