import { motion } from "framer-motion";
import _ from "lodash";
import Image from "next/image";
import React from "react";

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
            <p>{title}</p>
            {category ? (
              <div className="has-text-right" style={{ width: "100%" }}>
                <span className="tag">{_.capitalize(category)}</span>
              </div>
            ) : null}
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
            src={image}
            alt="Card Image"
            className="image is-square"
            layout="fill"
            objectFit="contain"
          />
        </div>
      ) : null}
      {content ? (
        <div className="card-content">
          <p className="content">{content}</p>
        </div>
      ) : null}
    </motion.div>
  );
}
