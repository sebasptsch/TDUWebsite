import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function AwardComponent({ year }: { year?: number }) {
  const { data, error } = useSWR(`/api/tba/awards/${year || ""}`, fetcher);
  return (
    <>
      <p className="title">Awards ({data?.length})</p>
      <div className="has-text-centered pt-6 pb-6 columns is-vcentered is-multiline">
        {data ? (
          data.map((award) => (
            <div className="column is-one-quarter">
              <a
                className="box"
                href={`https://thebluealliance.com/event/${award.event_key}#awards`}
              >
                <p className="subtitle">
                  {award.name} {award.year}
                </p>
                {award.recipient_list.map((recipient) => (
                  <p className="tag is-link ml-1 mr-1">{recipient}</p>
                ))}
              </a>
            </div>
          ))
        ) : (
          <p className="has-text-centered">Loading</p>
        )}
      </div>
    </>
  );
}
