import { container, item } from "@/lib/animations";
import { trpc } from "@/utils/trpc";
import { motion } from "framer-motion";

export default function AwardComponent() {
  const awardsQuery = trpc.tba.awards.useQuery();
  return (
    <>
      <p className="title" id="awards">
        Awards
      </p>

      {awardsQuery.data &&
        awardsQuery.data.map(({ year, awards }) => {
          return (
            <>
              <h3 className="subtitle is-3 is-full">{year}</h3>
              <motion.div
                className="has-text-centered py-3 columns is-vcentered is-multiline"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {awards.map((award) => (
                  <motion.div
                    className="column is-one-quarter"
                    key={award.event_key + award.name}
                    variants={item}
                  >
                    <a
                      className={`box ${
                        award.blue ? "has-background-link has-text-white" : ""
                      }`}
                      href={`https://thebluealliance.com/event/${award.event_key}#awards`}
                    >
                      <p
                        className={`subtitle ${
                          award.blue ? "has-text-white" : ""
                        }`}
                      >
                        {award.name}
                      </p>
                      {award.recipient_list.filter(recipient => Boolean(recipient.awardee)).map(({awardee}) => (
                        <p className="tag ml-1 mr-1" key={awardee}>
                          {awardee}
                        </p>
                      ))}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </>
          );
        })}
      {/* {data ? (
          data.map((award) => (
            
          ))
        ) : (
          <p className="has-text-centered">Loading</p>
        )} */}
    </>
  );
}
