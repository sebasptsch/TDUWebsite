import {
    component,
    fields
} from "@keystone-next/fields-document/component-blocks";

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
    youtubeVideo: component({
        component: ({ id }) =>
            <iframe
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>,
        label: "Youtube",
        props: {
            id: fields.text({ label: "Id", defaultValue: "dQw4w9WgXcQ" })
        },
        chromeless: false
    })
    // tweet: component({
    // 	component: ({ id }) => <Tweet id={id.value} />,
    // 	label: "Tweet",
    // 	props: {
    // 		id: fields.text({ label: "Id", defaultValue: "" })
    // 	}
    // })
};
