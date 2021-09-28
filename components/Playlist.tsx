import { container, item } from "@/lib/animations";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import useSWR from "swr";
import CardComponent from "./card";

export default function Playlist(props) {
  const { id } = props;
  const { data, error } = useSWR(`/api/youtube/playlist/${id}`, fetcher);

  return (
    <motion.div
      className="columns is-multiline"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {data?.map((post) => (
        <motion.a
          className="column is-one-quarter"
          variants={item}
          href={`https://www.youtube.com/watch?v=${post.id}`}
        >
          <CardComponent
            title={post.title}
            content={post.description}
            image={
              post.thumbnails.maxres?.url ||
              post.thumbnails.high?.url ||
              post.thumbnails.standard?.url ||
              post.thumbnails.default?.url
            }
          />
        </motion.a>
      ))}
    </motion.div>
  );
}
