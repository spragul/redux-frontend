import axios from "axios";
import { backendurl } from "../Backendlink";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TopNavbar from "../Navbar/Topnavbar";
import Loading from "../Pages/Loading/Loading";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function LoadPayment() {
  const myid = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(5);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isloading = useSelector((state) => state.productapireducer.isLoading);
  const data = useSelector((state) => state.productapireducer.value);
  const { id } = useParams();
  let a = data.filter((val) => val._id === id);
  let productdata = a[0];

  function loadRazorpay(productdata, price) {
    console.log(productdata);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(
          `${backendurl}/payment/create-order`,
          {
            amount: price + "00",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`${backendurl}/payment/get-razorpay-key`);

        const options = {
          key: razorpayKey,
          amount: price,
          currency: currency,
          name: "Rental App",
          description: productdata.title + "rental pay",
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(
              `${backendurl}/payment/pay-order`,
              {
                product: productdata,
                userId: myid,
                amount: price,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(result.data.msg);
            if (result.data.rd === true) {
              navigate("/");
            }
          },
          prefill: {
            name: "example name",
            email: "ufa@afagmail.com",
            contact: "91",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  //
  const remove = (myprice) => {
    if (count === 1) {
      alert("Your Selecting wrong value");
    } else {
      setCount(count - 1);
      setPrice(myprice * (count - 1));
    }
  };
  const add = (myprice) => {
    if (count == 10) {
      alert("One user only buy 10 products");
    } else {
      setCount(count + 1);
      setPrice(myprice * (count + 1));
    }
  };
  useEffect(() => {
    if (productdata.price > 0) {
      setPrice(productdata.price);
    }
  }, []);
  return (
    <TopNavbar>
      <div className="buy-container">
        {isloading === false ? (
          <Loading />
        ) : (
          <div className="buy-card">
            <div className="buy-img-container">
              <img
                className="buy-img"
                src={productdata.image}
                alt=" "
                title=""
              />
            </div>

            <div className="buy-details">
              <h1>{productdata.title}</h1>
              <h3>{productdata.category}</h3>
              <p>{productdata.description}</p>
              <p>{productdata.rating}</p>
              <h2>
                <span>₹ </span>
                {price}
              </h2>
              <div>
                <p>
                  <button
                    className="price-remove-btn"
                    onClick={() => remove(productdata.price)}
                  >
                    <RemoveCircleOutlineIcon />
                  </button>
                  <span className="count-size">{count}</span>
                  <button
                    className="price-add-btn"
                    onClick={() => add(productdata.price)}
                  >
                    <ControlPointIcon />
                  </button>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  loadRazorpay(productdata, price);
                }}
                className="buy-buy-btn"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="buy-back-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </TopNavbar>
  );
}
