import React, { useEffect, useState } from "react";
import TopNavbar from "./Navbar/Topnavbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Editform from "./Editform";
import { toast } from "react-toastify";
import { backendurl } from "./Backendlink";
import axios from "axios";

function EditProduct() {
  const [editdata, setEditdata] = useState({});
  const { id } = useParams();
  const data = useSelector((state) => state.productapireducer.value);
const token=sessionStorage.getItem('token');
  const getoneproduct = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/product/oneproduct/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        setEditdata(response.data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (data.length == 0) {
      getoneproduct();
    } else {
      let seleteddata = data.filter((val) => val._id == id);
      setEditdata(seleteddata[0]);
    }
  }, []);

  return (
    <TopNavbar>
      {editdata._id ? <Editform data={editdata} /> : <div>Loading</div>}
    </TopNavbar>
  );
}

export default EditProduct;
