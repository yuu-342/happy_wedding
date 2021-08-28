import React, { useState } from "react";
import { data } from "./sample/mock-responce.";
import "./App.css";

const App: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const onClick = () => {
    setIsShow(true);
  };

  return (
    <div className="Main">
      <button type="button" onClick={onClick}>
        結婚おめでとう
      </button>

      <div className="MessageList">
        {/* 繰り返し要素 */}
        {data.map((item, index) => (
          <div
            className="Column"
            key={index}
            style={{
              top: `${Math.floor(Math.random() * 100) + index}%`,
              left: `${Math.floor(Math.random() * 60)}%`,
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
    </div>
  );
};

export default App;
