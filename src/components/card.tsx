import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";

type SafeNumber = `${number}` | number

export default function CardComponent({
  title,
  image,
  content,
  category,
  ...props
}: {
  title?: string;
  image?: ImageProps;
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
        >
          <figure className="image is-3by4">
          <Image
            {...image}
            alt="Card Image"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, (max-width: 1920px) 33vw, 25vw"
            // fill
            style={{
              objectFit: "contain"
            }}
          />
          </figure>
          
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
