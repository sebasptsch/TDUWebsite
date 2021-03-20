export default function TeamLayout({ children }) {
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">The Team</h1>
            <h2 className="subtitle">A brief description of the team.</h2>
          </div>
        </div>
      </section>
      <hr className="divider" />
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-three-fifths">{children}</div>
        </div>
      </section>
    </>
  );
}
