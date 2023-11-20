import React from "react";
import "./App.css";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {
  addQuantity,
  removeQuantity,
  clearQuantity,
} from "./redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function ShoppingCart({ mode, setMode, handleBeep,handleClick }) {
  const products = useSelector((state) => state.productState.products);
  const itemLength = products.length;
  const dispatch = useDispatch();

  return (
    <div className="col-12 col-md-7 shopping-cart-wrapper">
      <div className="shadow-md p-4 shopping-cart">
        <h5>
          <span className="ml-2">
            Shopping Cart <span className="ml-4">({itemLength} items) </span>
          </span>

          <span className="ml-auto">
            {mode ? (
              <ModeNightIcon
                className="cursor-pointer"
                onClick={() => {
                  setMode(!mode);
                  handleBeep();

                }}
              />
            ) : (
              <WbSunnyIcon
                className="cursor-pointer"
                onClick={() => {
                  handleClick();
                  setMode(!mode);
                }}
              />
            )}
          </span>
          <hr />
        </h5>

        {products.map((product) => (
          <div key={product.id} className="row pb-8">
            <div className="col-3">
              <div className="shadow-md image-wrapper">
                <img className="product-img" src={product.img} alt="" />
              </div>
            </div>

            <div className="col-6 text-left d-flex flex-col justify-around">
              <h5 className="fw-bold">{product.nama}</h5>
              <h6>Category : {product.category}</h6>
              <h6>
                Detail : <span></span>
                {product.detail}
              </h6>
              <div className="row">
                <div
                  className="col text-cart cursor-pointer"
                  style={{ fontSize: "14px" }}
                  onClick={() => dispatch(clearQuantity(product.id))}
                >
                  REMOVE ITEM
                </div>
              </div>
            </div>

            <div className="col-3 ">
              <div className="d-flex align-center justify-center">
                <button
                  className=" pb-1 pt-1 pl-3 pr-3 "
                  onClick={() => dispatch(removeQuantity(product.id))}
                >
                  -
                </button>
                <button className="border pb-1 pt-1 pl-3 pr-3 ">
                  {product.quantity}
                </button>
                <button
                  className=" pb-1 pt-1 pl-3 pr-3 "
                  onClick={() => dispatch(addQuantity(product.id))}
                >
                  +
                </button>
              </div>

              <p className="text-cart price">Price : {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
