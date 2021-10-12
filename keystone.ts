// keystone.ts

import { config, list } from "@keystone-next/keystone";
import { text, image, timestamp } from "@keystone-next/keystone/fields";

import { document } from "@keystone-next/fields-document";
import { kebabCase } from "lodash";
import { Node } from "slate";
import { truncate } from "lodash";
import { componentBlocks } from "./lib/componentBlocks";

const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

const Post = list({
  fields: {
    title: text({
      isOrderable: true,
      db: { isNullable: false },
    }),
    slug: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    excerpt: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    image: image(),
    published_at: timestamp({ isOrderable: true, db: { isNullable: false } }),
    content: document({
      formatting: true,
      dividers: true,
      links: true,
      ui: {
        views: require.resolve("./lib/componentBlocks.tsx"),
      },
      componentBlocks,
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title, content } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
      }

      if (content) {
        resolvedData.excerpt = truncate(serialize(JSON.parse(content)), {
          length: 150,
        });
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});

const Robot = list({
  fields: {
    title: text({
      isOrderable: true,
      db: { isNullable: false },
    }),
    excerpt: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    slug: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    image: image(),
    published_at: timestamp({ isOrderable: true, db: { isNullable: false } }),
    content: document({
      formatting: true,
      dividers: true,
      links: true,
      ui: {
        views: require.resolve("./lib/componentBlocks.tsx"),
      },
      componentBlocks,
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title, content } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
      }

      if (content) {
        resolvedData.excerpt = truncate(serialize(JSON.parse(content)), {
          length: 150,
        });
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});

const Program = list({
  fields: {
    title: text({
      isOrderable: true,
      db: { isNullable: false },
    }),
    excerpt: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    slug: text({
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: "read",
        },
        listView: {
          fieldMode: "read",
        },
      },
    }),
    image: image(),
    published_at: timestamp({ isOrderable: true, db: { isNullable: false } }),
    content: document({
      formatting: true,
      dividers: true,
      links: true,
      ui: {
        views: require.resolve("./lib/componentBlocks.tsx"),
      },
      componentBlocks,
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title, content } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
      }

      if (content) {
        resolvedData.excerpt = truncate(serialize(JSON.parse(content)), {
          length: 150,
        });
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});

export default config({
  db: { provider: "sqlite", url: "file:./app.db" },
  experimental: {
    enableNextJsGraphqlApiEndpoint: true,
    generateNodeAPI: true,
    generateNextGraphqlAPI: true,
  },
  lists: { Robot, Program },
  images: {
    upload: "local",
    local: {
      storagePath: "public/images",
      baseUrl: "/images",
    },
  },
});
