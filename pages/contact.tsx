import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Contact() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LePQYcaAAAAADCt0y4pP_nCj1VNMOXheQG-mh-f"
      scriptProps={{
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: "head", // optional, default to "head", can be "head" or "body",
        nonce: undefined, // optional, default undefined
      }}
    >
      <motion.div
        className="columns is-centered is-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
        <div className="column is-one-third-widescreen">
          <h1 className="title">Contact Us</h1>
          <ContactForm />
        </div>
        <hr className="divider is-hidden-widescreen" />
        <div className="column is-two-thirds-widescreen">
          <h1 className="title">FAQ</h1>
          <p className="subtitle is-5">How do I contact the team?</p>
          <p>
            You can contact us using our team email address here or via our
            Instagram or Facebook pages.
          </p>

          <hr className="divider" />
          <p className="subtitle is-5">Who can join the team?</p>

          <p>
            Team 3132 welcomes students in Year 7 or above (ages 12-18).
            University students, professionals and parents can become involved
            through mentoring the team.
          </p>
          <hr className="divider" />
          <p className="subtitle is-5">How do I join the team?</p>
          <p>
            You can join Team 3132 for a trial period during the off-season
            (May-October). Just send an expression of interest via email!
          </p>
        </div>
      </motion.div>
    </GoogleReCaptchaProvider>
  );
}
