import { item } from "@/lib/animations";
import { motion } from "framer-motion";
import { ImageProps } from "next/image";
import Link from "next/link";
import CardComponent from "./card";

interface OutreachPostFrontmatter {
  /** Image Url */
  image: string 
  excerpt: string
  /** title string */
  title: string
  /** the slug string (derived from the file name) */
  slug: string
}

interface BlogPostProps {
  frontMatter: Record<string, string>
  image?: ImageProps
  url: string
}

export default function OutreachPost({ frontMatter, image, url }: BlogPostProps) {
  const { title, image: imageSrc, excerpt, slug } = frontMatter;

  return (
    <Link href={url} legacyBehavior>
      <motion.a className="column is-one-quarter" variants={item}>
        <CardComponent
          title={title}
          content={excerpt}
          image={image}
        />
      </motion.a>
    </Link>
  );
}
