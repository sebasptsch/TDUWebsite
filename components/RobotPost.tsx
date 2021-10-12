import { item } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import CardComponent from "./card";

export default function RobotPost({ frontMatter, ...args }) {
  const { title, image, excerpt, slug } = frontMatter;
  return (
    <Link href={`/robots/${slug}`}>
      <motion.a variants={item} {...args}>
        <CardComponent
          title={title}
          image={image ? image : undefined}
          content={excerpt}
        />
      </motion.a>
    </Link>
  );
}
