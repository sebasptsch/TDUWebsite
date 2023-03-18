import { motion } from "framer-motion";

export default function Main({ children }: any) {
    return <motion.main
        className="container is-max-desktop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        {children}
    </motion.main>
}