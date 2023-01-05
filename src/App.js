import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "./redux/slices/productSlice";
import { addQuantity,removeQuantity,clearQuantity } from "./redux/slices/productSlice";
import { useState,useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios"



const KEY = process.env.REACT_APP_STRIPE;


function App() {
  const products = useSelector((state) => state.productState.products);
  const itemLength = products.length;
  const dispatch = useDispatch();
  const [dicountCode,setDiscountCode] = useState("");
  const [isPromo,setIsPromo] = useState(false);
  const [discount,setDiscount] = useState(1);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken =(token) => {
    setStripeToken(token);
}


  const handleChange = (e)=> {
    setDiscountCode(e.target.value);
    console.log(dicountCode)
    if (e.target.value==="a")  {
      setIsPromo(true)
      setDiscount(0.5)

    }
    else if (e.target.value==="c"){
      setIsPromo(true)
      setDiscount(0.9)
    }
    else {
      setIsPromo(false)
    }
  }

  

  const totalprice = products.reduce((state,value) => {
    return state + value.price*value.quantity
  },0)

  return (
    <div className="App">
      

      <div className="container " >
        <div className="row gap-5">
          <div className="col-12 col-md-7 ">
            <div className="shadow-md p-4 shopping-cart">
              <h5
                style={{
                  textAlign: "left",
                  marginBottom: "2rem",
                  justifyContent:"space-between"
                }}
              >
                {" "}
                Shopping Cart <span style={{marginLeft:"1rem"}}>({itemLength} items)</span>
                <hr/>
              </h5>
              
                {products.map((product) => (
                  <div key={product.id} className="row" style={{
                  paddingBottom: "2rem",
                }}>
                    <div className="col-3">
                      <div
                        className="shadow-md"
                        style={{
                          backgroundColor: "lightgrey",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0.3rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <img src={product.img} width={"200px"} alt="" />
                      </div>
                    </div>

                    <div
                      className="col-6"
                      style={{ textAlign: "left",display:"flex",flexDirection:"column",justifyContent:"space-around"  }}
                    >
                      <h5 style={{ fontWeight: "bold" }}>{product.nama}</h5>
                      <h6>Category :  {product.category}</h6>
                      <h6>Detail : <span></span>{product.detail}</h6>
                      <div className="row">
                        <div className="col" style={{ color: "grey",fontSize: "14px" }} 
                          onClick={() => dispatch(clearQuantity(product.id))}>
                          REMOVE ITEM
                        </div>
                        
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div
                        className="d-flex align-center"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <button className=" pb-1 pt-1 pl-3 pr-3 " onClick={() =>  dispatch(removeQuantity(product.id))}>
                          -
                        </button>
                        <button className="border pb-1 pt-1 pl-3 pr-3 ">{product.quantity}</button>
                        <button className=" pb-1 pt-1 pl-3 pr-3 " onClick={() =>  dispatch(addQuantity(product.id))}>
                          +
                        </button>
                      </div>

                      <p
                        style={{
                          color: "grey",
                          marginTop: "4.5rem",
                          fontSize: "16px",
                        }}
                      >
                        Price : {product.price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-12 col-md-4 mb-12">
            <div className="shadow-sm p-4 order-summary ">
              <h5
                style={{
                  textAlign: "left",
                  color: "black",
                  marginBottom: "1rem",
                }}
              >
                {" "}
                Order Summary
                <hr/>

              </h5>

              <div style={{ borderBottom: "1px solid lightgrey" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h6 style={{ textAlign: "left", color: "grey" }}>
                    Temporary amount
                  </h6>
                  <h6>{totalprice}</h6>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin:"0.5rem 0"
                  }}
                >
                  <h6 style={{ textAlign: "left", color: "grey" }}>Shipping</h6>
                  <h6>Free</h6>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}>
                <h6 style={{ textAlign: "left", color: "grey", }}>Add a promo code</h6>
                <select id="cars" name="cars" onChange={(e)=>handleChange(e)}>
                  <option value="a">Stefanus123</option>
                  <option value="b">FakeCode</option>
                  <option value="c">Promo88</option>
                  <option value="d">IDK</option>
                </select>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <h6 style={{ textAlign: "left" }}>
                  The total amount of <br /> (including VAT)
                </h6>
                <h6> {isPromo? discount*totalprice: totalprice}</h6>
              </div>

              {isPromo ?  <div class="alert alert-success mt-4" role="alert" style={{padding:"0.4rem"}}>
                You Saved {` ${100 - discount*100}% `} 
              </div>:""}

              <StripeCheckout
                  name='Stefanus shop'
                  image='https://media.licdn.com/dms/image/D5603AQH6hS0fiW31DQ/profile-displayphoto-shrink_800_800/0/1667669250980?e=1678320000&v=beta&t=eK5bPH9zxvUCDMe0HkMt1d94cf6NoawzoNmwK00B1nA'
                  billingAddress
                  shippingAddress
                  description={`Your total is $${isPromo? discount*totalprice: totalprice}`}
                  amount={(isPromo? discount*totalprice: totalprice)*1000 }
                  token={onToken}
                  stripeKey={KEY}
              >

              <button className="checkout-btn mt-2 w-100">
                GO TO CHECKOUT
              </button>
              </StripeCheckout>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
