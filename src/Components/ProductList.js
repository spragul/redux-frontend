import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchData } from "../Redux/productSlice";
import { createcart } from "../Redux/cartSilce";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./Navbar/Topnavbar";
import { backendurl } from "./Backendlink";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

function ProductList() {
  const navigate = useNavigate();
  const myid = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const isloading = useSelector((state) => state.productapireducer.isLoading);
  let data = useSelector((state) => state.productapireducer.value);
  const [search, setSearch] = useState("");
  // console.log(isloading, data);
  const dispatch = useDispatch();

  //get All product
  async function getdata() {
    try {
      const response = await axios.get(`${backendurl}/product/allproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        console.log(response.data.product);
        dispatch(fetchData(response.data.product));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  //add to cart
  async function addcart(item) {
    let data = {
      _id: item._id,
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      price: item.price,
      rating: item.rating,
      numberofproduct: 1,
      userid: myid,
    };
    try {
      const response = await axios.post(`${backendurl}/cart/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.rd == true) {
        toast.success(response.data.message);
        dispatch(createcart(response.data.createdcart));
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  useEffect(() => {
    if (data.length == 1 || data.length == 0) {
      if (token) {
        getdata();
      } else {
        toast.error("token not found Login again");
      }
    }
  }, []);
  console.log(data)
  return (
    <TopNavbar>
      <div className="product-top">
        <input
          className="search"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <MDBContainer fluid className="my-5 text-center list-background">
        <MDBRow>
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.category
                      .toLowerCase()
                      .includes(search.toLowerCase())
            })
            .map((item, index) => (
              <MDBCol key={index} md="6" lg="4" className="mb-4">
                <MDBCard style={{ marginTop: "10px" }}>
                  <MDBRipple
                    type="button"
                    onClick={() => navigate(`/detail/${item._id}`)}
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom"
                  >
                    <MDBCardImage
                      src={item.image}
                      fluid
                      style={{
                        width: "300px",
                        height: "300px",
                        marginTop: "15px",
                      }}
                    />
                    <div>
                      <div className="mask">
                        <div class="d-flex justify-content-start align-items-end h-100"></div>
                      </div>
                      <div className="hover-overlay">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </MDBRipple>
                  <MDBCardBody>
                    <div onClick={() => navigate(`/detail/${item._id}`)}>
                      <div className="text-reset">
                        <h5 className="card-title mb-3">{item.title}</h5>
                      </div>
                      <div className="text-reset">
                        <p>{item.category}</p>
                      </div>
                      <h6 className="mb-3">
                        <span>₹ </span>
                        {item.price}
                      </h6>
                    </div>
                    <div className="d-grid gap-3 d-md-block">
                      <button className="cartbtn" onClick={() => addcart(item)}>
                        Add to cart
                      </button>
                      <button
                        className="buybtn"
                        onClick={() => {
                          navigate(`/payment/${item._id}`);
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </TopNavbar>
  );
}

export default ProductList;
