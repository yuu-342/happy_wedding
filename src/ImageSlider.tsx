import React from "react";
import "./ImageSlider.css";

interface ImageSliderProps {
  isSmp?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = (props) => (
  <div
    className={`ImageSlider${props.isSmp ? " ImageSlider--smartphone" : ""}`}
  >
    {props.children}
  </div>
);

export default ImageSlider;
