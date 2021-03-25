import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [isActive, setisActive] = useState(false);
  useEffect(() => {
    setisActive(false);
  }, [router]);

  return (
    <nav
      className="navbar is-fixed-top is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <img src="/images/logo.svg" width="28" height="28" alt="logo" />
            </a>
          </Link>

          <a
            onClick={(e) => {
              e.preventDefault();
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="nav-menu"
            id="nav-toggle"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="nav-menu"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item has-text-centered">Home</a>
            </Link>
            <Link href="/team">
              <a className="navbar-item has-text-centered">The Team</a>
            </Link>
            <Link href="/blog">
              <a className="navbar-item has-text-centered">Blog</a>
            </Link>
            <Link href="/outreach">
              <a className="navbar-item has-text-centered">Outreach</a>
            </Link>
            <Link href="/robots">
              <a className="navbar-item has-text-centered">Robots</a>
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item has-text-centered ">
              <div className="buttons is-centered">
                <Link href="/contact">
                  <a className="button is-primary">
                    <strong>Contact us</strong>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
