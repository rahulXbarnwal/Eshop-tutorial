import { Link } from "react-router-dom";
import React from "react";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[30px] leading-[1.2] 800px:text-[50px] text-[#3d3a3a] font-[400] capitalize`}
        >
          Welcome to Proximity Shop Network
          <br />
          Your Ultimate Online Marketplace for Groceries!
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          🛒 Explore, Shop, and Save - All in One Place! 🌐
          <br />
          At Proximity Shop Network, we bring together a curated selection of
          top-quality groceries from trusted vendors.
          <br />
          Experience the convenience of online shopping with a vast range of
          products, competitive prices, and doorstep delivery.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
