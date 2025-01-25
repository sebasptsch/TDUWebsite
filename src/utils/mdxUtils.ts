import fs from "fs";
import path from "path";

// POSTS_PATH is useful when you want to get the path to a specific file
export const OUTREACH_PATH = path.join(process.cwd(), "src", "data", "outreach");
export const ROBOTS_PATH = path.join(process.cwd(), "src", "data", "robots");
export const SPONSORS_PATH = path.join(process.cwd(), "src", "data", "sponsors.mdx");
export const IndustryOutreach_PATH = path.join(process.cwd(), "src", "data", "Indusrty");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const outreachFilePaths = fs
  .readdirSync(OUTREACH_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const robotFilePaths = fs
  .readdirSync(ROBOTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const IndustryOutreachFilePaths = fs
  .readdirSync(IndustryOutreach_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));
