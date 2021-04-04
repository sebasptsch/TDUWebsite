import { item } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import CardComponent from "./card";

export default function OutreachPost({ frontMatter }) {
  const { title, image, excerpt, slug } = frontMatter;

  return (
    <Link href={`/outreach/${slug}`}>
      <motion.a
        className="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet"
        variants={item}
      >
        <CardComponent
          title={title}
          content={excerpt}
          image={image ? `/images/data/outreach/${image}` : undefined}
        />
      </motion.a>
    </Link>
  );
}
