import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function UpcomingComponent() {
  const { data, error } = useSWR("/api/tba/matches", fetcher);
  return (
    <div className="has-text-centered p-6 columns is-vcentered">
      <div className="column" />
      <div className="column is-half">
        <p className="content">
          <p className="title">Upcoming Events</p>
          {data &&
            data.map((event) => (
              <a className="box" href={event.url}>
                <p className="subtitle">{event.name}</p>
                {event.active ? (
                  <div className="tag is-primary">Ongoing</div>
                ) : null}
                <br />
                <b>Starts:</b> {new Date(event.start).toLocaleDateString()}
                <br />
                <b>Ends:</b> {new Date(event.end).toLocaleDateString()}
              </a>
            ))}
        </p>
      </div>
      <div className="column" />
    </div>
  );
}
