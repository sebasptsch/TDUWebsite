import { InferRenderersForComponentBlocks } from "@keystone-next/fields-document/component-blocks";
import { componentBlocks } from "./componentBlocks";

export const componentBlockRenderers: InferRenderersForComponentBlocks<
    typeof componentBlocks
> = {
    youtubeVideo: ({ id }) => <figure className="image is-16by9">
        <iframe
            className="has-ratio"
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </figure>
};