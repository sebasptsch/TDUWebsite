import { motion } from "framer-motion";
import React from "react";
import { IconType } from "react-icons";

import { FaCube, FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

interface SocialButtonProps {
  text: string,
  url: string,
  Icon: IconType;
}

const SocialButton = ({ text, Icon, url }: SocialButtonProps) => (
  <motion.a
    className="button is-rounded is-primary has-text-centered"
    href={url}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="icon">
      <Icon />
    </span>
    <span>{text}</span>
  </motion.a>
);

const SocialButtons = () => {
  return (
    <div className="buttons is-centered">
      <SocialButton
        text="Youtube"
        Icon={FaYoutube}
        url="https://www.youtube.com/user/roboroos"
      />
      <SocialButton
        text="Facebook"
        Icon={FaFacebook}
        url="https://www.facebook.com/firstteam3132/"
      />
      <SocialButton
        text="Instagram"
        Icon={FaInstagram}
        url="https://www.instagram.com/team3132/"
      />
      {/* <SocialButton
        text="Twitter"
        Icon={FaTwitter}
        url="https://twitter.com/Team3132"
      /> */}
      <SocialButton
        text="Github"
        Icon={FaGithub}
        url="https://github.com/Team3132"
      />
      <SocialButton
        text="GrabCAD"
        Icon={FaCube}
        url="https://grabcad.com/team.3132-1/models"
      />
    </div>
  );
};

export default SocialButtons;
