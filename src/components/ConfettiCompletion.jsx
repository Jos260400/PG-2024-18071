import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

/* Animación de confetti al terminar cuestionarios */
const ConfettiCompletion = ({ onComplete }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      onComplete();
    }, 5000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <div style={styles.container}>
        <h1 style={styles.title}>¡Has finalizado el cuestionario!</h1>
      </div>
    </>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  title: {
    color: "#fff",
    fontSize: "3rem",
    textAlign: "center",
  },
};

export default ConfettiCompletion;
