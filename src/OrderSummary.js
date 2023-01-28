import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function OrderSummary() {
  const [discount, setDiscount] = useState(1);

  const [isPromo, setIsPromo] = useState(false);
  const products = useSelector((state) => state.productState.products);
  const [dicountCode, setDiscountCode] = useState("");

  const KEY = process.env.REACT_APP_STRIPE;
  const onToken = (token) => {
    setStripeToken(token);
  };
  const handleChange = (e) => {
    setDiscountCode(e.target.value);
    console.log(dicountCode);
    if (e.target.value === "a") {
      setIsPromo(true);
      setDiscount(0.5);
    } else if (e.target.value === "c") {
      setIsPromo(true);
      setDiscount(0.9);
    } else {
      setIsPromo(false);
    }
  };

  const totalprice = products.reduce((state, value) => {
    return state + value.price * value.quantity;
  }, 0);

  return (
    <div className="col-12 col-md-4 mb-12">
      <div className="shadow-sm p-4 order-summary ">
        <h5 className="text-left mb-8 ">
          {" "}
          Order Summary
          <hr />
        </h5>

        <div>
          <div className="d-flex justify-between">
            <h6 className="order-left">Temporary amount</h6>
            <h6>{totalprice}</h6>
          </div>

          <div className="d-flex justify-between my-2">
            <h6 className="order-left">Shipping</h6>
            <h6 className="">Free</h6>
          </div>

          <div className="order-content mb-4">
            <h6 className="order-left">Add a promo code</h6>
            <select
              name="select"
              onChange={(e) => handleChange(e)}
              style={{ color: "black" }}
            >
              <option value="b">FakeCode</option>
              <option value="a">Stefanus123</option>
              <option value="c">Promo88</option>
              <option value="d">IDK</option>
            </select>
          </div>

          <hr />
        </div>

        <div className="order-content mt-4">
          <h6 className="text-left">
            The total amount of <br /> (including VAT)
          </h6>
          <h6> {isPromo ? discount * totalprice : totalprice}</h6>
        </div>

        {isPromo ? (
          <div class="alert alert-success mt-4 p-2" role="alert">
            You Saved {` ${100 - discount * 100}% `}
          </div>
        ) : (
          ""
        )}

        <StripeCheckout
          name="Stefanus shop"
          image="https://media.licdn.com/dms/image/D5603AQH6hS0fiW31DQ/profile-displayphoto-shrink_800_800/0/1667669250980?e=1678320000&v=beta&t=eK5bPH9zxvUCDMe0HkMt1d94cf6NoawzoNmwK00B1nA"
          billingAddress
          shippingAddress
          description={`Your total is $${
            isPromo ? discount * totalprice : totalprice
          }`}
          amount={(isPromo ? discount * totalprice : totalprice) * 1000}
          token={onToken}
          stripeKey={KEY}
        >
          <button className="checkout-btn mt-2 w-100">GO TO CHECKOUT</button>
        </StripeCheckout>
      </div>
    </div>
  );
}
