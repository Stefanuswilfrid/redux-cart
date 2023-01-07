import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "./redux/slices/productSlice";
import { addQuantity,removeQuantity,clearQuantity } from "./redux/slices/productSlice";
import { useState,useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const KEY = process.env.REACT_APP_STRIPE;


function App() {
  const products = useSelector((state) => state.productState.products);
  const itemLength = products.length;
  const dispatch = useDispatch();
  const [dicountCode,setDiscountCode] = useState("");
  const [isPromo,setIsPromo] = useState(false);
  const [discount,setDiscount] = useState(1);
  const [stripeToken, setStripeToken] = useState(null);
  const [mode,setMode] = useState(true);

  useEffect(() => {
    const body = document.querySelector(".App");
    const orderSummary = document.querySelector(".order-summary");
    const orderLeftTexts = document.querySelectorAll(".order-left");
    const shoppingCart = document.querySelector(".shopping-cart");
    const shoppingLeftTexts = document.querySelectorAll(".text-cart");

    if (!mode) {
      body.classList.add("dark")
      orderSummary.classList.add("dark")
      // orderLeftText.classList.add("dark")
      for (const o of orderLeftTexts) {
        o.classList.add('dark');
        
      }
      shoppingCart.classList.add("dark");

      for (const s of shoppingLeftTexts) {
        s.classList.add('dark');
        
      }

    }
    else {
      body.classList.remove("dark")
      orderSummary.classList.remove("dark")
      // orderLeftText.classList.remove("dark")
      for (const o of orderLeftTexts) {
        o.classList.remove('dark');
      }
      shoppingCart.classList.remove("dark")

      for (const s of shoppingLeftTexts) {
        s.classList.remove('dark');
        
      }

    }
  },[mode])

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
          <div className="col-12 col-md-7 shopping-cart-wrapper">
            <div className="shadow-md p-4 shopping-cart">
              <h5>
                {" "}
                <span>Shopping Cart <span className="ml-4">({itemLength} items)</span></span> 

                <span className="ml-auto">{mode?<ModeNightIcon  style={{cursor:"pointer"}} onClick={()=>{setMode(!mode)}}/>:<WbSunnyIcon style={{cursor:"pointer"}} onClick={()=>{setMode(!mode)}}/>}</span>
                <hr/>
              </h5>
              
                {products.map((product) => (
                  <div key={product.id} className="row pb-8">
                    <div className="col-3">
                      <div className="shadow-md image-wrapper">
                        <img className="product-img" src={product.img}  alt="" />
                      </div>
                    </div>

                    <div className="col-6 text-left d-flex flex-col justify-around">
                      <h5 className="fw-bold">{product.nama}</h5>
                      <h6>Category :  {product.category}</h6>
                      <h6>Detail : <span></span>{product.detail}</h6>
                      <div className="row">
                        <div className="col text-cart" style={{ fontSize: "14px" }} 
                          onClick={() => dispatch(clearQuantity(product.id))}>
                          REMOVE ITEM
                        </div>
                        
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div className="d-flex align-center justify-center">
                        <button className=" pb-1 pt-1 pl-3 pr-3 " onClick={() =>  dispatch(removeQuantity(product.id))}>
                          -
                        </button>
                        <button className="border pb-1 pt-1 pl-3 pr-3 ">{product.quantity}</button>
                        <button className=" pb-1 pt-1 pl-3 pr-3 " onClick={() =>  dispatch(addQuantity(product.id))}>
                          +
                        </button>
                      </div>

                      <p
                        className="text-cart"
                        style={{
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
              <h5 className="text-left mb-8">
                {" "}
                Order Summary
                <hr/>

              </h5>

              <div style={{ borderBottom: "1px solid lightgrey" }}>
                <div className="d-flex justify-between">
                  <h6 className="order-left">
                    Temporary amount
                  </h6>
                  <h6>{totalprice}</h6>
                </div>

                <div className="d-flex justify-between my-2">
                  <h6 className="order-left">Shipping</h6>
                  <h6 className="">Free</h6>
                </div>

                <div className="order-content mb-4">
                <h6 className="order-left">Add a promo code</h6>
                <select name="select" onChange={(e)=>handleChange(e)} style={{color:"black"}}>
                  <option value="b">FakeCode</option>
                  <option value="a">Stefanus123</option>
                  <option value="c">Promo88</option>
                  <option value="d">IDK</option>
                </select>
                </div>
              </div>

              <div className="order-content mt-4">
                <h6 className="text-left">
                  The total amount of <br /> (including VAT)
                </h6>
                <h6> {isPromo? discount*totalprice: totalprice}</h6>
              </div>

              {isPromo ?  <div class="alert alert-success mt-4 p-2" role="alert" >
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
