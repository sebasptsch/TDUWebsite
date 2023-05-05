import Layout from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import "@/styles/styles.scss";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "@/components/AlertTemplate";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  // offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
}
