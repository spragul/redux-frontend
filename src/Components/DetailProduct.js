import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopNavbar from "./Navbar/Topnavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendurl } from "./Backendlink";
import Button from "@mui/material/Button";

function DetailProduct() {
  const [productdata, setProductdata] = useState({});
  const [productDatas, setProductdatas] = useState([]);
  const [orderAmount, setOrderAmount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const isloading = useSelector((state) => state.productapireducer.isLoading);
  const data = useSelector((state) => state.productapireducer.value);
  const [loading, setLoading] = useState(false);
  const myid = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");

  console.log(isloading, data);
  const getoneproduct = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/product/oneproduct/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.rd == true) {
        toast.success(response.data.message);
        setProductdata(response.data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  function loadRazorpay(productdata, token) {
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
            amount: productdata.price + "00",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`${backendurl}/payment/get-razorpay-key`);

        const options = {
          key: razorpayKey,
          amount: productdata.price,
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
                amount: productdata.price,
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
  useEffect(() => {
    if (data.length > 0) {
      let onedata = data.filter((val) => val._id == id);
      setProductdata(onedata[0]);
      // setProductdatas(onedata[0])
      // setOrderAmount(onedata[0].price)
    } else {
      getoneproduct();
    }
  }, []);
  return (
    <TopNavbar>
      <div className="detail-card-container">
        <h1>Product Detail</h1>
        {productdata ? (
          <div>
            <div className="detail-card">
              <div className="img-container">
                <img
                  className="detail-card-image"
                  src={productdata.image}
                  title={productdata.title}
                  alt={productdata.title}
                />
              </div>
              <div className="content">
                <p>
                  <span>Title:</span>
                  {productdata.title}
                </p>
                <p>
                  <span>Category:</span>
                  {productdata.category}
                </p>
                <p>
                  <span>Description:</span>
                  {productdata.description}
                </p>
                <p>
                  <span>Price:</span>
                  {productdata.price}
                </p>
                <p>
                  <span>Rating:{productdata.rating}</span>
                </p>
              </div>
            </div>
            <div className="detail-button-container">
              <Button
                variant="contained"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={loading}
                onClick={() => {
                  navigate(`/payment/${productdata._id}`);
                }}
              >
                {" "}
                Buy
              </Button>
            </div>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </TopNavbar>
  );
}

export default DetailProduct;
