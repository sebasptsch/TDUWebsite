import Link from "next/link";
import SocialButtons from "../socialButtons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div
          className="columns"
          style={{
            textAlign: "center",
          }}
        >
          <div className="column">
            <h1 className="subtitle">Social Media</h1>
            <SocialButtons />
            <hr className="divider" />
            <Link href="/contact" className="button is-primary">
              Contact Us!
            </Link>
            <Link href="/sponsor" className="button is-link">
              Support us!
            </Link>
          </div>
          <div className="column is-two-fifths">
            <h1 className="subtitle">Acknowledgement of Country</h1>
            <p>
              Team 3132 acknowledges the Traditional Custodians of
              the land where the team is situated, the Wallumattagal
              Clan of the Dharug Nation - whose cultures and customs have
              nurtured, and continue to nurture, the land since time immemorial.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
