import { container, item } from "@/lib/animations";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import useSWR from "swr";
import CardComponent from "./card";

export default function Playlist(props: any) {
  const { id } = props;
  const { data, error } = useSWR(`/api/youtube/playlist/${id}`, fetcher);

  return (
    <motion.div
      className="columns is-multiline"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {data?.map((post: any) => (
        <motion.a
          className="column is-one-quarter"
          variants={item}
          href={`https://www.youtube.com/watch?v=${post.id}`}
        >
          <CardComponent
            title={post.title}
            content={post.description}
            image={
              post.thumbnails.maxres ||
              post.thumbnails.high ||
              post.thumbnails.standard ||
              post.thumbnails.default
            }
          />
        </motion.a>
      ))}
    </motion.div>
  );
}
