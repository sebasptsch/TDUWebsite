import { RequiredImageProps } from "@/layouts/robot";
import { item } from "@/lib/animations";
import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";
import CardComponent from "./card";

interface RobotPostFrontmatter {
  /** Image Url */
  image: string 
  excerpt: string
  /** title string */
  title: string
  /** the slug string (derived from the file name) */
  slug: string
}

interface RobotPostProps extends  HTMLMotionProps<"a"> {
  frontMatter: Record<string, string>,
  image?: RequiredImageProps
  url: string
}

export default function RobotPost({ frontMatter, image,url, ...args }: RobotPostProps) {
  const { title, excerpt, slug } = frontMatter;
  return (
    <Link href={url} legacyBehavior>
      <motion.a variants={item} {...args}>
        <CardComponent
          title={title}
          image={image}
          content={excerpt}
        />
      </motion.a>
    </Link>
  );
}
