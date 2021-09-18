import React from "react";
import "./ImageSlider.css";

const ImageSlider: React.FC = (props) => (
  <div className="ImageSlider">{props.children}</div>
);

export default ImageSlider;
