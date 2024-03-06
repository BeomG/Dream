import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/img/logo.png";
import { ReactComponent as IntroPicture } from "../assets/img/Intro_picture.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroContainer = styled(motion.div)`
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100vh;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10%;
  font-size: 50px;
  font-weight: bolder;
  text-align: center;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 35%;
  max-width: 100%;
`;

const TextBelowIntroPicture = styled(motion.div)`
  font-size: 24px;
`;

const BoxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const TextVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const animationDuration = 2;

const Intro = () => {
  const [showing, setShowing] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowing(true);
    }, animationDuration * 1000);

    const textShowTimeout = setTimeout(() => {
      setTextVisible(true);
    }, 2000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(textShowTimeout);
    };
  }, []);

  const handleClick = () => {
    setShowing(false);
  };

  const handleExitComplete = () => {
    navigate("/login");
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {showing ? (
        <IntroContainer
          className="IntroContainer"
          variants={BoxVariants}
          initial="initial"
          animate="visible"
          transition={{
            duration: animationDuration,
          }}
          onClick={handleClick}
        >
          <TitleBox className="TitleBox">
            <LogoImg src={Logo} alt="Logo" />
            함께, 드림
          </TitleBox>
          <IntroPicture />
          <TextBelowIntroPicture
            variants={TextVariants}
            initial="hidden"
            animate={textVisible ? "visible" : "hidden"}
          >
            화면을 클릭해주세요
          </TextBelowIntroPicture>
        </IntroContainer>
      ) : null}
    </AnimatePresence>
  );
};

export default Intro;
