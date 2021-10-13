import { query } from '.keystone/api';
import RobotPostLayout from "@/layouts/robot";
import { componentBlockRenderers } from '@/lib/renderers';
import { DocumentRenderer } from '@keystone-next/document-renderer';
import { GetStaticPropsContext } from "next";
import { getPlaiceholder } from 'plaiceholder';

export default function Post({ post }) {

  return (
    <RobotPostLayout frontMatter={post}>
      <DocumentRenderer document={post.content.document} componentBlocks={componentBlockRenderers} />
    </RobotPostLayout>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext) {
  const post = await query.Robot.findOne({
    where: { slug: params!.slug as string },
    query: 'id title content { document } image { width height src }',
  });
  const postWithImage = async () => {
    if (post.image) {
      const { img, base64 } = await getPlaiceholder(post.image.src)
      return {
        ...post,
        image: { ...img, blurDataURL: base64 }
      }
    } else {
      return post
    }
  }
  return { props: { post: await postWithImage() } };
}

export async function getStaticPaths() {
  const posts = await query.Robot.findMany({
    query: `slug`,
  });

  const paths = posts
    .map(post => post.slug)
    .filter((slug): slug is string => !!slug)
    .map(slug => `/robots/${slug}`);

  return {
    paths,
    fallback: false,
  };
}