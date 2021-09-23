import React, { useEffect, useState } from "react";
import ClassNames from "classnames";
import { Player } from "@lottiefiles/react-lottie-player";

import ImageSlider from "./ImageSlider";
import ImageSliderItem from "./ImageSliderItem";

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
  const [section5, setSection5] = useState(false);
  // UA
  const [isSmp, setIsSmp] = useState(false);

  // 写真の枚数
  let UNIT_3_IMAGES = 210;

  // animation trigger
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
      setSection5(true);
      // このあとモザイクアートへ
    }, 22000); // TODO:メッセージ量を見て採光したほうが良いかも
  };

  // UA取得
  const ut = navigator.userAgent;
  // 画面幅取得
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const UA = () => {
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

  const messageListClass = ClassNames("MessageList", {
    "MessageList--smartphone": isSmp,
    "MessageList--hide": section5,
  });

  const sectionLast = ClassNames("Section5", {
    "Section5--show": section5,
  });

  const mainClass = ClassNames("Main", {
    "Main--smartphone": isSmp,
  });

  return (
    <div className={mainClass}>
      {section1 && (
        <div className="Section1">
          <ImageSlider isSmp>
            <ImageSliderItem images={images.slice(0, isSmp ? 30 : 70)} />
            <ImageSliderItem
              images={images.slice((isSmp ? 30 : 70) + 1, isSmp ? 60 : 140)}
            />
            {!isSmp && (
              <ImageSliderItem images={images.slice(141, UNIT_3_IMAGES)} />
            )}
          </ImageSlider>
          <Background />
        </div>
      )}

      {section1 && (
        <button
          type="button"
          className={`Button${isSmp ? " Button--smartphone" : ""}`}
          onClick={onClick}
        >
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

            // 縦軸の計算
            // 画面高さ/100*乱数 - 基本カードの高さ - カード内余白
            let topPos =
              (screenHeight / 100) * Math.floor(Math.random() * 90) -
              (screenWidth > 1366 ? 220 : 80);

            topPos = topPos > 60 ? topPos : Math.floor(Math.random() * 20); //画面上部に固まらないように、0以下判定分も乱数

            return (
              <div
                className="Column"
                key={index}
                style={{
                  position: isSmp ? "static" : "absolute",
                  top: `${topPos}px`, // カードのベース高さを引いてる
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
      <div className={sectionLast}>
        <p className="Section5__message Section5__messageName">
          <span>
            悠一<span className="Section5__messageNameSmall">さん</span> 晴菜
            <span className="Section5__messageNameSmall">さん</span>
          </span>
        </p>
        <p className="Section5__message Section5__messageText1">
          <span className="Section5__messageKekkon">
            <span className="Section5__messageKekkonSmall">ご</span>結婚
          </span>
        </p>
        <p className="Section5__message Section5__messageText2">
          <span>
            おめでとう
            <br />
            ございます
            <span className="Section5__messageExclamation">！!</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
