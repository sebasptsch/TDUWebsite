import { useState } from "react";

export default function Navigation() {
  const [isActive, setisActive] = useState(false);

  return (
    <nav
      className="navbar is-fixed-top is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="/images/logo.svg" width="28" height="28" alt="logo" />
          </a>

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
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/team">
              The Team
            </a>
            <a className="navbar-item" href="/blog">
              Blog
            </a>
            <a className="navbar-item" href="/outreach">
              Outreach
            </a>
            <a className="navbar-item" href="/robots">
              Robots
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary" href="/contact">
                  <strong>Contact us</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
