import Layout from "@/components/layout";
import "@/styles.scss";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import SEO from "../next-seo.config";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
