import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "./redux/slices/productSlice";
import { addQuantity,removeQuantity,clearQuantity } from "./redux/slices/productSlice";

function App() {
  const products = useSelector((state) => state.productState.products);
  const itemLength = products.length;
  const dispatch = useDispatch();

  const totalprice = products.reduce((state,value) => {
    return state + value.price*value.quantity
  },0)

  return (
    <div className="App">
      <div className="heading ">
        <h2>Shopping cart</h2>
      </div>

      <div className="container">
        <div className="row gap-5">
          <div className="col-12 col-md-7 ">
            <div className="shadow-md p-4">
              <h5
                style={{
                  textAlign: "left",
                  color: "grey",
                  marginBottom: "2rem",
                }}
              >
                {" "}
                Cart ({itemLength} items)
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
                      style={{ textAlign: "left", color: "grey" }}
                    >
                      <h5 style={{ fontWeight: "bold" }}>{product.nama}</h5>
                      <h6>SHIRT - {product.color}</h6>
                      <h6>COLOR:{product.color}</h6>
                      <h6>SIZE:{product.size}</h6>
                      <div className="row">
                        <div className="col" style={{ fontSize: "12px",cursor:"pointer" }} 
                          onClick={() => dispatch(clearQuantity(product.id))}>
                          REMOVE ITEM
                        </div>
                        <div className="col-7" style={{ fontSize: "12px"}}>
                          MOVE TO WISH LIST
                        </div>
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div
                        className="d-flex gap-3 align-center"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <button className="border pb-1 pt-1 pl-3 pr-3 " onClick={() =>  dispatch(removeQuantity(product.id))}>
                          -
                        </button>
                        <p>{product.quantity}</p>
                        <button className="border pb-1 pt-1 pl-3 pr-3 " onClick={() =>  dispatch(addQuantity(product.id))}>
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
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-12 col-md-4 ">
            <div className="shadow-sm p-4">
              <h5
                style={{
                  textAlign: "left",
                  color: "black",
                  marginBottom: "1rem",
                }}
              >
                {" "}
                The total amount of
              </h5>

              <div style={{ borderBottom: "1px solid lightgrey" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ textAlign: "left", color: "grey" }}>
                    Temporary amount
                  </h5>
                  <h5>{totalprice}</h5>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <h5 style={{ textAlign: "left", color: "grey" }}>Shipping</h5>
                  <h5>Gratis</h5>
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
                <h6>{totalprice}</h6>
              </div>

              <button className="btn btn-primary mt-4 w-100">
                GO TO CHECKOUT
              </button>
            </div>

            <div className="shadow-sm mt-4 mb-4 p-4">
              <h5 style={{ textAlign: "left" }}>add a discount code</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
