import Layout from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import "@/styles/styles.scss"

export default function App({ Component, pageProps, router }: AppProps) {
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
