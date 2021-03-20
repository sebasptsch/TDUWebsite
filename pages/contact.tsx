import SocialButtons from "@/components/socialButtons";
import { FAQPageJsonLd, NextSeo } from "next-seo";

export default function Contact() {
  return (
    <div className="columns is-centered is-3">
      <NextSeo title="Contact" />
      <FAQPageJsonLd
        mainEntity={[
          {
            questionName: "How do I contact the team?",
            acceptedAnswerText:
              "You can contact us using our team email address here or via our Instagram or Facebook pages.",
          },
          {
            questionName: "Who can join the team?",
            acceptedAnswerText:
              "Team 3132 welcomes students in Year 8 or above (ages 13-18). University students, professionals and parents can become involved through mentoring the team.",
          },
          {
            questionName: "How do I join the team?",
            acceptedAnswerText:
              "You can join Team 3132 for a trial period during the off-season (May-October). Just send an expression of interest via email!",
          },
        ]}
      />
      <div className="column is-one-third-widescreen has-text-centered">
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Contact Us</h1>
            </div>
          </div>
        </section>
        <section>
          <SocialButtons />
          <p>
            Contact us using our social-media accounts or alternatively, via the
            team's email address.
          </p>
          <br />
          <a
            className="button is-centered"
            href="mailto:firstroboticsteam3132@gmail.com"
          >
            firstroboticsteam3132@gmail.com
          </a>
          <br />
          {/* <img src="../images/nootdab.png"/> */}
        </section>
      </div>
      <hr className="divider is-hidden-widescreen" />
      <div className="column is-two-thirds-widescreen">
        <section className="hero">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">FAQ</h1>
            </div>
          </div>
        </section>
        <section>
          <p className="subtitle is-5">How do I contact the team?</p>
          <p>
            You can contact us using our team email address here or via our
            Instagram or Facebook pages.
          </p>

          <hr className="divider" />
          <p className="subtitle is-5">Who can join the team?</p>

          <p>
            Team 3132 welcomes students in Year 8 or above (ages 13-18).
            University students, professionals and parents can become involved
            through mentoring the team.
          </p>
          <hr className="divider" />
          <p className="subtitle is-5">How do I join the team?</p>
          <p>
            You can join Team 3132 for a trial period during the off-season
            (May-October). Just send an expression of interest via email!
          </p>
        </section>
      </div>
    </div>
  );
}
