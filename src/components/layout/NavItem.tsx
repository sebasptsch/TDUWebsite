import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";

export type NavItemProp = {
  url: string;
  children: JSX.Element | JSX.Element[];
};

export default function NavItem({
  children,
  url,
  ...props
}: NavItemProp & HTMLMotionProps<"a">) {
  return (
    <Link href={url} legacyBehavior>
      <motion.a className="navbar-item has-text-centered" {...props}>
        {children}
      </motion.a>
    </Link>
  );
}
