import { motion } from "framer-motion";
import { HTMLMotionComponents } from "framer-motion/types/render/html/types";
import { SVGMotionComponents } from "framer-motion/types/render/svg/types";
import Link from "next/link";

export type NavItemProp = {
  url: string;
  children: JSX.Element | JSX.Element[];
};

export default function NavItem({
  children,
  url,
  ...props
}: HTMLMotionComponents & SVGMotionComponents & NavItemProp & any) {
  return (
    <Link href={url}>
      <motion.a className="navbar-item has-text-centered" {...props}>
        {children}
      </motion.a>
    </Link>
  );
}
