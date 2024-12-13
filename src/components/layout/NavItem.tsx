import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";

export type NavItemProp = {
  url: string;
  children: React.JSX.Element | React.JSX.Element[];
};

export default function NavItem({
  children,
  url,
  ...props
}: NavItemProp) {
  return (
    <Link href={url} className="navbar-item has-text-centered" {...props}>
        {children}
    </Link>
  );
}
