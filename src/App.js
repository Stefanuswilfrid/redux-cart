import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import beep from "./music/beep.mp3";
import click from "./music/click.mp3";

import ShoppingCart from "./ShoppingCart";
import OrderSummary from "./OrderSummary";

const KEY = process.env.REACT_APP_STRIPE;

function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const toggleDarkMode = (add) => {
      const elements = [
        document.querySelector(".App"),
        document.querySelector(".order-summary"),
        ...document.querySelectorAll(".order-left"),
        document.querySelector(".shopping-cart"),
        ...document.querySelectorAll(".text-cart"),
      ];

      elements.forEach((el) => {
        if (add) {
          el.classList.add("dark");
        } else {
          el.classList.remove("dark");
        }
      });
    };

    toggleDarkMode(mode);
  }, [mode]);

  const beepSound = new Audio(beep);
  const clickSound = new Audio(click);

  const playSound = (sound) => sound.play();

  const playBeep = () => playSound(beepSound);
  const playClick = () => playSound(clickSound);

  const pause = () => music.pause();

  return (
    <div className="App">
      <div className="container ">
        <div className="row gap-5">
          <ShoppingCart
            mode={mode}
            setMode={setMode}
            handleBeep={playBeep}
            handleClick={playClick}
          />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default App;
