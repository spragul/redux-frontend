import React, { useEffect, useState } from "react";
import TopNavbar from "./Navbar/Topnavbar";
import axios from "axios";
import { backendurl } from "./Backendlink";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchorder } from "../Redux/orderSilce";
import Loading from "./Pages/Loading/Loading";

function Orders() {
  const orderList=useSelector((state)=>state.orderapireducer.order);
  const isloading =useSelector((state)=>state.orderapireducer.isLoading)
  const myid = sessionStorage.getItem("myid");
  const token=sessionStorage.getItem('token');
  const role=sessionStorage.getItem('myRole')
  console.log(orderList);
  const dispatch =useDispatch()

  const getOrders = async () => {
    try {
      
      let response = await axios.get(
        `${backendurl}/payment/list-orders/${myid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(fetchorder(response.data.orders))
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminOrders = async () => {
    try {
      
      let response = await axios.get(
        `${backendurl}/payment/list-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        dispatch(fetchorder(response.data.orders))
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(role=='user'){
    getOrders();
    }else{
      getAdminOrders();
    }
  }, []);
  return (
    <TopNavbar>
      {orderList.length > 0 ? (
        <div>
          <Table responsive striped bordered hover variant="dark" className="order-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>OrderId</th>
                <th>PaymentId</th>
                <th className="w-25">Signature</th>
                <th>Title</th>
                <th>Image</th>
                <th>Price</th>
                <th>isPaid</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((tableItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tableItem.razorpay.orderId}</td>
                  <td>{tableItem.razorpay.paymentId}</td>
                  <td className="w-25">{tableItem.razorpay.signature}</td>
                  <td>{tableItem.product.title}</td>
                  <td>
                    <img
                      src={tableItem.product.image}
                      alt={tableItem.product.title}
                      title={tableItem.product.title}
                      style={{ width: "200px", height: "200px" }}
                    />
                  </td>
                  <td>{tableItem.product.price}<span>₹ </span></td>
                  {tableItem.isPaid ? <td>true</td> : <td>false</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="empty-container"><img className="empty-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroKQ0Y8zYqpG2mN5ctYE4ksR8saJNq4jp3j5H3v82aIHofpbT0HlytxZBI2E8UvbC7Z0&usqp=CAU" alt="" title=""/></div>
      )}
    </TopNavbar>
  );
}

export default Orders;
