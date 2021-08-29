import React, { useState } from "react";
import ClassNames from "classnames";
import { Player } from "@lottiefiles/react-lottie-player";
import { data } from "./sample/mock-responce.";
import "./App.css";

const App: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const [isMain, setIsMain] = useState(true);
  const onClick = () => {
    setIsHeart(true);
    setTimeout(() => {
      setIsShow(!isShow);
    }, 4000);

    // 最後 全体の透過を下げる
    setTimeout(() => {
      setIsMain(!isMain);
      // このあとモザイクアートへ
    }, 8000); // TODO:メッセージ量を見て採光したほうが良いかも
  };

  const mainClass = ClassNames("Main", {
    "Main--show": isMain,
  });

  return (
    <div className={mainClass}>
      {!isHeart && (
        <button type="button" className="Button" onClick={onClick}>
          Happy Wedding
        </button>
      )}

      {isHeart && (
        <Player
          src="https://assets3.lottiefiles.com/packages/lf20_5Vz7xX.json"
          background="transparent"
          speed={1}
          style={{ width: "80%", height: "80%" }}
          loop
          controls
          autoplay
        />
      )}

      {isShow && (
        <div className="MessageList">
          {/* 繰り返し要素 */}
          {data.map((item, index) => (
            <div
              className="Column"
              key={index}
              style={{
                top: `calc(${Math.floor(Math.random() * 93)}%)`,
                left: `${Math.floor(Math.random() * 60)}%`, // TODO: 計算を調整したほうがいいと思われ
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="Column__item">
                <img
                  src={item.image}
                  width=""
                  height=""
                  alt="写真"
                  className="Thumbnail"
                />
                {/* <img src={item.image} width="" height="" alt="写真" /> */}
              </div>
              {item.comment && item.comment !== "" && (
                <div className="Column__item">
                  <p className="Comment">{item.comment}</p>
                </div>
              )}
            </div>
          ))}
          {/* 繰り返し要素 */}
        </div>
      )}
    </div>
  );
};

export default App;
