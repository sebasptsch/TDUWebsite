import fs from "fs";
import matter from "gray-matter";
import _ from "lodash";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import readingTime from "reading-time";
const autoLink = require("rehype-autolink-headings");

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type, slug?) {
  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        require("remark-gfm"),
      ];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        require("rehype-slug"),
        require("mdx-prism"),
        [
          require("rehype-autolink-headings"),
          {
            behavior: "wrap",
          },
        ],
      ] as any;
      return options;
    },
  });

  const excerpt = _.truncate(source, {
    length: 150,
  });
  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      excerpt,
      ...frontmatter,
    },
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", type, postSlug),
      "utf8"
    );

    const { data, content } = matter(source);

    const excerpt = _.truncate(content, {
      length: 150,
    });
    return [
      {
        ...data,
        excerpt,
        readingTime: readingTime(content),
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
