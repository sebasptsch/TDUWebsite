import { container, item } from "@/lib/animations";
import { trpc } from "@/utils/trpc";
import { motion } from "framer-motion";

export default function UpcomingComponent() {
  const { data } = trpc.tba.upcomingEvents.useQuery()
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
            {data
              ? data.map((event) => (
                  <motion.a
                    className="box"
                    href={`https://www.thebluealliance.com/event/${event.key}`}
                    key={event.key}
                    variants={item}
                  >
                    <p className="subtitle">{event.name}</p>
                    {event.ongoing ? (
                      <>
                        <div className="tag is-primary">Ongoing</div>
                        <br />
                      </>
                    ) : null}
                    <b>Starts:</b> {new Date(event.start_date).toLocaleDateString()}
                    <br />
                    <b>Ends:</b> {new Date(event.end_date).toLocaleDateString()}
                  </motion.a>
                ))
              : "Loading"}
            {data?.length === 0 ? "No Events Scheduled" : null}
          </motion.div>
        </div>
      </div>
      <div className="column" />
    </motion.div>
  );
}
