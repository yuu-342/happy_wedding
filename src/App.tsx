import React, { useEffect, useState } from "react";
import ClassNames from "classnames";
import { Player } from "@lottiefiles/react-lottie-player";
import { imagesWithMessage } from "./sample/mock-responce";
import { images } from "./sample/images";
import Background from "./background";
import "./App.css";

const App: React.FC = () => {
  // アニメーションをシーンごとに分割
  const [section1, setSection1] = useState(true);
  const [section2, setSection2] = useState(false);
  const [section3, setSection3] = useState(false);
  const [section4, setSection4] = useState(false);
  const [section5, setSection5] = useState(true);
  // UA
  const [isSmp, setIsSmp] = useState(false);
  const onClick = () => {
    setSection1(false);
    setTimeout(() => {
      setSection2(true);
    }, 50);
    setTimeout(() => {
      setSection3(true);
    }, 200);
    setTimeout(() => {
      setSection2(false);
      setSection3(false);
      setSection4(!section4);
    }, 4500);

    // 最後 全体の透過を下げる
    setTimeout(() => {
      // setSection5(!section5);
      // このあとモザイクアートへ
    }, 9000); // TODO:メッセージ量を見て採光したほうが良いかも
  };

  // UA取得
  const ut = navigator.userAgent;

  console.log(ut);

  const UA = () => {
    console.log("😺UA 走ったよー");
    if (
      ut.indexOf("iPhone") > 0 ||
      ut.indexOf("iPod") > 0 ||
      (ut.indexOf("Android") > 0 && ut.indexOf("Mobile") > 0)
    ) {
      setIsSmp(true);
    } else if (ut.indexOf("iPad") > 0 || ut.indexOf("Android") > 0) {
      // tabletもSP判定にする
      setIsSmp(true);
    } else {
      setIsSmp(false);
    }
  };

  useEffect(() => {
    UA();

    window.addEventListener("resize", UA);
    return () => window.removeEventListener("resize", UA);
  }, [isSmp]);

  const mainClass = ClassNames("Main", {
    "Main--show": section5,
  });

  const messageListClass = ClassNames("MessageList", {
    "MessageList--smartphone": isSmp,
  });

  return (
    <div className={mainClass}>
      {section1 && (
        <div className="Section1">
          <div className="ImageSlider">
            <div className="ImageSlider__unit">
              <ul className="ImageSlider__list">
                {images.slice(0, 10).map((item, index) => (
                  <li key={index} className="ImageSlider__item">
                    <img
                      src={item.image}
                      alt="Unit-1の画像"
                      className="ImageSlider__image"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="ImageSlider__unit">
              <ul className="ImageSlider__list">
                {images.slice(10, 20).map((item, index) => (
                  <li key={index} className="ImageSlider__item">
                    <img
                      src={item.image}
                      alt="Unit-2の画像"
                      className="ImageSlider__image"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="ImageSlider__unit">
              <ul className="ImageSlider__list">
                {images.slice(10, 20).map((item, index) => (
                  <li key={index} className="ImageSlider__item">
                    <img
                      src={item.image}
                      alt="Unit-3の画像"
                      className="ImageSlider__image"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Background />
        </div>
      )}

      {section1 && (
        <button type="button" className="Button" onClick={onClick}>
          Happy Wedding
        </button>
      )}

      {section2 && <div className="CircleBackGround" />}

      {section3 && (
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

      {section4 && (
        <div className={messageListClass}>
          {/* 繰り返し要素 */}
          {imagesWithMessage.map((item, index) => {
            const messageClass = ClassNames("Comment", {
              "Comment--small": item.comment.length > 50,
              "Comment--large": item.comment.length < 15,
            });

            return (
              <div
                className="Column"
                key={index}
                style={{
                  position: isSmp ? "static" : "absolute",
                  top: `calc(${Math.floor(Math.random() * 86)}% - 120px)`, // カードのベース高さを引いてる
                  left: `${Math.floor(Math.random() * 68)}%`, // TODO: 計算を調整したほうがいいと思われ
                  animationDelay: `${index * 0.6}s`,
                }}
              >
                <div className="Column__item">
                  <img
                    src={`https://d4e9fae3tu9x1.cloudfront.net${item.image}`}
                    width=""
                    height=""
                    alt="写真"
                    className="Thumbnail"
                    decoding="async"
                  />
                </div>
                {item.comment && item.comment !== "" && (
                  <div className="Column__item">
                    <p
                      className={messageClass}
                      dangerouslySetInnerHTML={{
                        __html: item.comment.replace(/\n/g, "<br>"),
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {/* 繰り返し要素 */}
        </div>
      )}
    </div>
  );
};

export default App;
