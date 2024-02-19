import "./styles.css";
import Lottie from "lottie-react";
import PropTypes from 'prop-types'
import React, { useRef } from "react";
import OverlayAnimation from "@/app/assets/lottie-overlay.json";

const LottieLoader = ({ show }) => {
  const lottieRef = useRef();
  return (
    <>
      {show ? (
        <div className="overlay-loader-container">
          <div className="lottie-container">
            <Lottie
              loop={true}
              autoPlay={true}
              animationData={OverlayAnimation}
              lottieRef={lottieRef}
              onComplete={() => {}}
            />
          </div>
        </div>
      ) : (
        null
      )}
    </>
  );
};

LottieLoader.propTypes = {
 
  show: PropTypes.bool,
}

export default LottieLoader;
