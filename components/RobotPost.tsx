import { item } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import CardComponent from "./card";

export default function RobotPost({ frontMatter }) {
  const { title, image, excerpt, slug } = frontMatter;
  return (
    <Link href={`/robots/${slug}`}>
      <motion.a className="column is-one-quarter" variants={item}>
        <CardComponent
          title={title}
          image={image ? `/images/data/robots/${image}` : undefined}
          content={excerpt}
        />
      </motion.a>
    </Link>
  );
}
