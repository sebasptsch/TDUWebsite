import Layout from "@/components/layout";
import "@/styles.scss";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/dist/shared/lib/router/router";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://thethunderdownunder.org${router.route}`
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <AnimatePresence exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={url} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
