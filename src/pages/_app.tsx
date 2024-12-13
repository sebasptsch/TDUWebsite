import Layout from "@/components/layout";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import "@/styles/styles.scss";
import { trpc } from "@/utils/trpc";

function App({ Component, pageProps, router }: AppProps) {
  return (
      <Layout>
        <DefaultSeo {...SEO} />
        {/* <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      > */}
        <Component {...pageProps} key={router.route} />
        {/* </AnimatePresence> */}
      </Layout>
  );
}

export default trpc.withTRPC(App);