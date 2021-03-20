import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";

const SocialButton = ({ text, icon, url }) => (
  <motion.a
    className="button is-rounded is-primary has-text-centered"
    href={url}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="icon">
      <FontAwesomeIcon icon={icon} size="lg" />
    </span>
    <span>{text}</span>
  </motion.a>
);

const SocialButtons = () => {
  return (
    <div className="buttons is-centered">
      <SocialButton
        text="Youtube"
        icon={faYoutube}
        url="https://www.youtube.com/user/roboroos"
      />
      <SocialButton
        text="Facebook"
        icon={faFacebook}
        url="https://www.facebook.com/firstteam3132/"
      />
      <SocialButton
        text="Instagram"
        icon={faInstagram}
        url="https://www.instagram.com/team3132/"
      />
      <SocialButton
        text="Twitter"
        icon={faTwitter}
        url="https://twitter.com/Team3132"
      />
      <SocialButton
        text="Github"
        icon={faGithub}
        url="https://github.com/Team3132"
      />
      <SocialButton
        text="GrabCAD"
        icon={faCube}
        url="https://grabcad.com/team.3132-1/models"
      />
    </div>
  );
};

export default SocialButtons;
