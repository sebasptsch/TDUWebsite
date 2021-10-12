import { motion } from "framer-motion";
import Image from "next/image";

export default function CardComponent({
  title,
  image,
  content,
  category,
  ...props
}: {
  title?: string;
  image?: any;
  content?: string;
  category?: string;
}) {
  return (
    <motion.div
      className="card"
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      {...props}
    >
      {title ? (
        <header className="card-header">
          <div className="card-header-title">
            <p className="subtitle has-text-centered" style={{ width: "100%" }}>
              {title}
            </p>
          </div>
        </header>
      ) : null}
      {image ? (
        <div
          className="card-image"
          style={{
            width: "100%",
            paddingTop: "100%",
            position: "relative",
          }}
        >
          <Image
            src={image.src}
            // width={image.width}
            // height={image.height}
            alt="Card Image"
            className="image is-square"
            layout="fill"
            objectFit="contain"
          />
        </div>
      ) : null}
      {content ? (
        <div className="card-content" style={{ overflow: "hidden" }}>
          <p className="content">{content}</p>
        </div>
      ) : null}
    </motion.div>
  );
}
