import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.button,
          ...styles.prevButton,
        }}
        onClick={handlePrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <img
        style={styles.image}
        src={images[currentImageIndex]}
        alt="carousel"
      />
      <button
        style={{
          ...styles.button,
          ...styles.nextButton,
        }}
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
    position: "relative",
  },
  button: {
    padding: "10px",
    margin: "0 10px",
    border: "none",
    backgroundColor: "#BAB2B2",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  prevButton: {
    left: "10px",
  },
  nextButton: {
    right: "10px",
  },
  image: {
    maxWidth: "100%",
    height: "400px", // Set a fixed height
    objectFit: "cover", // Maintain aspect ratio and cover container
  },
};

export default Carousel;
