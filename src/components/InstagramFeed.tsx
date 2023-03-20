import { useSWRConfig } from "swr";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { InstagramPost } from "@/pages/api/instagram/feed";
import { DateTime } from "luxon";

export default function InstagramFeed() {
  const { data = [] } = useSWR<Array<InstagramPost>>(
    `/api/instagram/feed`,
    fetcher
  );

  return (
    <div className="columns is-multiline">
      {data.map((post) => (
        <Card {...post} key={post.id} />
      ))}
    </div>
  );
}

function Card(props: InstagramPost) {
  return (
    <a className="card" href={props.permalink}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={props.media_url ?? props.thumbnail_url}
            alt={props.caption}
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
         
          <div className="media-content">
            <a className="subtitle is-6" href={`https://www.instagram.com/${props.username}`}>{props.username}</a>
          </div>
        </div>

        <div className="content">
          {props.caption}
          <br />
          <time dateTime={props.timestamp}>{DateTime.fromISO(props.timestamp).toLocaleString(DateTime.DATETIME_MED)}</time>
        </div>
      </div>
    </a>
  );
}
