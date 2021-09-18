import React from "react";

interface ImageSliderItemProps {
  /**
   * 画像の配列
   */
  images: Array<{ item: string }>;
}

const ImageSliderItem: React.FC<ImageSliderItemProps> = (props) => (
  <div className="ImageSlider__unit">
    <ul className="ImageSlider__list">
      {props.images.map((images, index) => (
        <li key={index} className="ImageSlider__item">
          <img
            src={images.item}
            alt="Unit-1の画像"
            className="ImageSlider__image"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default ImageSliderItem;
