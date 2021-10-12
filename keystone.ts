// keystone.ts

import { config, list } from "@keystone-next/keystone";
import { text, image, timestamp } from "@keystone-next/keystone/fields";

import { document } from "@keystone-next/fields-document";
import { kebabCase } from "lodash";

const Post = list({
  fields: {
    title: text({
      db: { isNullable: true },
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
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});

const Robot = list({
  fields: {
    title: text({
      db: { isNullable: true },
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
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});

const Program = list({
  fields: {
    title: text({
      db: { isNullable: true },
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
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      // console.log(resolvedData);
      const { title } = resolvedData;
      if (title) {
        // Ensure the first letter of the title is capitalised
        resolvedData.slug = kebabCase(title);
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
  lists: { Post, Robot, Program },
  images: {
    upload: "local",
    local: {
      storagePath: "public/images",
      baseUrl: "/images",
    },
  },
});
