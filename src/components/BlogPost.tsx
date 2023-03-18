import { item } from "@/lib/animations";
import { motion } from "framer-motion";
import moment from "moment";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

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
      <motion.a className="box columns mt-2 mb-2" variants={item}>
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
            {date ? moment(date).format("MMMM DD, YYYY") : null}
          </p>
          <p className="content">{excerpt}</p>
        </div>
      </motion.a>
    </Link>
  );
}
