import MDXComponents from "@/components/MDXComponents";
import fs from "fs";
import matter from "gray-matter";
import _ from "lodash";
import renderToString from "next-mdx-remote/render-to-string";
import path from "path";
import readingTime from "reading-time";
const autoLink = require("rehype-autolink-headings");

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [require("remark-gfm"), require("./bulma-format")],
      rehypePlugins: [
        require("mdx-prism"),
        require("rehype-slug"),
        [
          autoLink,
          {
            behavior: "wrap",
          },
        ],
      ],
    },
  });
  const excerpt = _.truncate(content, {
    length: 150,
  });
  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      excerpt,
      ...data,
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
