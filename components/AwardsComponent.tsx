import { container, item } from "@/lib/animations";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import useSWR from "swr";

export default function AwardComponent({ year }: { year?: number }) {
  const { data, error } = useSWR(`/api/tba/awards/${year || ""}`, fetcher);
  return (
    <>
      <p className="title" id="awards">
        Awards ({data?.length})
      </p>
      <motion.div
        className="has-text-centered pt-6 pb-6 columns is-vcentered is-multiline"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data ? (
          data.map((award) => (
            <motion.div
              className="column is-one-quarter"
              key={award.event_key + award.name}
              variants={item}
            >
              <a
                className="box"
                href={`https://thebluealliance.com/event/${award.event_key}#awards`}
              >
                <p className="subtitle">
                  {award.name} {award.year}
                </p>
                {award.recipient_list.map((recipient) => (
                  <p className="tag is-link ml-1 mr-1" key={recipient}>
                    {recipient}
                  </p>
                ))}
              </a>
            </motion.div>
          ))
        ) : (
          <p className="has-text-centered">Loading</p>
        )}
      </motion.div>
    </>
  );
}
