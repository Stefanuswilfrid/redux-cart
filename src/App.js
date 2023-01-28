import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";

import song from "./music/omaewa.mp3";
import ShoppingCart from "./ShoppingCart";
import OrderSummary from "./OrderSummary";

const KEY = process.env.REACT_APP_STRIPE;

function App() {
  const [mode, setMode] = useState(true);

  useEffect(() => {
    const body = document.querySelector(".App");
    const orderSummary = document.querySelector(".order-summary");
    const orderLeftTexts = document.querySelectorAll(".order-left");
    const shoppingCart = document.querySelector(".shopping-cart");
    const shoppingLeftTexts = document.querySelectorAll(".text-cart");

    if (!mode) {
      body.classList.add("dark");
      orderSummary.classList.add("dark");
      // orderLeftText.classList.add("dark")
      for (const o of orderLeftTexts) {
        o.classList.add("dark");
      }
      shoppingCart.classList.add("dark");

      for (const s of shoppingLeftTexts) {
        s.classList.add("dark");
      }
    } else {
      body.classList.remove("dark");
      orderSummary.classList.remove("dark");
      // orderLeftText.classList.remove("dark")
      for (const o of orderLeftTexts) {
        o.classList.remove("dark");
      }
      shoppingCart.classList.remove("dark");

      for (const s of shoppingLeftTexts) {
        s.classList.remove("dark");
      }
    }
  }, [mode]);

  const music = new Audio(song);

  function playVolume() {
    music.play();
  }

  function pause() {
    music.pause();
  }

  return (
    <div className="App">
      <div className="container ">
        <div className="row gap-5">
          <ShoppingCart
            mode={mode}
            setMode={setMode}
            handlePlay={() => {
              playVolume();
            }}

            handlePause ={ () => {
              pause();
            }

            }
          />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default App;
