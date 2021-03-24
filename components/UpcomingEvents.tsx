import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function UpcomingComponent() {
  const { data, error } = useSWR("/api/tba/events", fetcher);
  return (
    <div className="has-text-centered pt-6 pb-6 columns is-vcentered is-gapless">
      <div className="column" />
      <div className="column is-half">
        <p className="content">
          <p className="title">Upcoming Events</p>
          {data ? (
            data.map((event) => (
              <a className="box" href={event.url}>
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
              </a>
            ))
          ) : (
            <p className="has-text-centered">Loading</p>
          )}
        </p>
      </div>
      <div className="column" />
    </div>
  );
}
