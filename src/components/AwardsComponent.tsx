import { container, item } from "@/lib/animations";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import useSWR from "swr";

export default function AwardComponent() {
  const { data, error } = useSWR(`/api/tba/awards`, fetcher);
  return (
    <>
      <p className="title" id="awards">
        Awards
      </p>

      {data &&
        Object.keys(data)
          .reverse()
          .map((key) => {
            const awards = data[key];
            return (
              <>
                <h3 className="subtitle is-3 is-full">{key}</h3>
                <motion.div
                  className="has-text-centered py-3 columns is-vcentered is-multiline"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {awards.map((award: any) => (
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
                          {award.name} {award.year}
                        </p>
                        {award.recipient_list.map((recipient: any) => (
                          <p className="tag ml-1 mr-1" key={recipient}>
                            {recipient}
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
