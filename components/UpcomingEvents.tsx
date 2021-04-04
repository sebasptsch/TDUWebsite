import { container, item } from "@/lib/animations";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import useSWR from "swr";

export default function UpcomingComponent() {
  const { data, error } = useSWR("/api/tba/events", fetcher);
  return (
    <motion.div
      className="has-text-centered pt-6 pb-6 columns is-vcentered is-gapless"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="column" />
      <div className="column is-half">
        <div className="content">
          <div className="title">Upcoming Events</div>
          <motion.div variants={container} initial="hidden" animate="show">
            {data ? (
              data.map((event) => (
                <motion.a
                  className="box"
                  href={`https://www.thebluealliance.com/event/${event.key}`}
                  key={event.key}
                  variants={item}
                >
                  <p className="subtitle">{event.name}</p>
                  {event.active ? (
                    <>
                      <div className="tag is-primary">Ongoing</div>
                      <br />
                    </>
                  ) : null}
                  <b>Starts:</b> {new Date(event.start).toLocaleDateString()}
                  <br />
                  <b>Ends:</b> {new Date(event.end).toLocaleDateString()}
                </motion.a>
              ))
            ) : (
              <p className="has-text-centered">Loading</p>
            )}
          </motion.div>
        </div>
      </div>
      <div className="column" />
    </motion.div>
  );
}
