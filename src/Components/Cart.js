import React, { useEffect, useState } from "react";
import TopNavbar from "./Navbar/Topnavbar";
import Loading from "./Pages/Loading/Loading";
import { backendurl } from "./Backendlink";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCart } from "../Redux/cartSilce";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartdata, setCartdata] = useState([]);
  const myid = sessionStorage.getItem("myid");
  const [loading, setLoading] = useState(true);
  // let userName = sessionStorage.getItem("myname");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  // const isloading = false;
  console.log(cartdata);
  //react-redux
  const dispatch = useDispatch();
  const carddata = useSelector((state) => state.cartapireducer.cart);
  const isloading = useSelector((state) => state.cartapireducer.cart);

  console.log(carddata);

  //delete cart data
  async function deletecartdata(id) {
    try {
      let response = await axios.delete(`${backendurl}/cart/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        console.log(response.data);
        dispatch(deleteCart(id));
      } else {
        console.log(response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //get cart data
  const getcartdata = async () => {
    try {
      let response = await axios.get(`${backendurl}/cart/list/${myid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd == true) {
        if (response.data.cart.length === 0) {
          toast.error("data empty");
          navigate("/dashboard");
        } else {
          toast.success(response.data.message);
          setCartdata(response.data.cart);
          dispatch(fetchCart(response.data.cart));
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    if (carddata.length == 0) {
      getcartdata();
    }
  }, []);
  return (
    <TopNavbar>
      <div className="cart-container">
        {isloading == true ? (
          <Loading />
        ) : (
          <>
            {carddata.map((cartItem, index) => (
              <div key={index} className="cart-card">
                <div className="cart-img-container">
                  <img
                    className="cart-img"
                    src={cartItem.image}
                    alt=" "
                    title=""
                  />
                </div>
                <div className="cart-details">
                  <h1>{cartItem.title}</h1>
                  <h3>{cartItem.category}</h3>
                  <p>{cartItem.description}</p>
                  <p>{cartItem.rating}</p>
                  <h2>
                    <span>₹ </span>
                    {cartItem.price}
                  </h2>

                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/payment/${cartItem._id}`);
                    }}
                    className="cart-buy-btn"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="cart-buy-btn"
                    onClick={() => {
                      deletecartdata(cartItem._id);
                    }}
                  >
                    Delete Cart
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </TopNavbar>
  );
}

export default Cart;
