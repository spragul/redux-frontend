import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../Navbar/Topnavbar";
import Table from "react-bootstrap/Table";
import { backendurl } from "../Backendlink";
import { deletedata } from "../../Redux/productSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductList() {
  const navigate = useNavigate();
  const isloading = useSelector((state) => state.productapireducer.isLoading);
  const data = useSelector((state) => state.productapireducer.value);
  const myid = sessionStorage.getItem("myid");
  const dispatch = useDispatch();

  //delete product
  async function deleteproduct(id) {
    try {
      const response = await axios.delete(`${backendurl}/product/delete/${id}`);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        console.log(response.data);
        dispatch(deletedata(id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
  return (
    <TopNavbar>
      {data.length > 0 ? (
        <div>
          <h2>Product List</h2>
          <Table
            responsive
            striped
            bordered
            hover
            variant="dark"
            className="order-table"
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>title</th>
                <th>category</th>
                <th className="w-25">price</th>
                <th>image</th>
                <th>Button</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tableItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tableItem.title}</td>
                  <td>{tableItem.category}</td>
                  <td className="w-25">
                    {tableItem.price}
                    <span>₹ </span>
                  </td>
                  <td>
                    <img
                      src={tableItem.image}
                      alt={tableItem.title}
                      title={tableItem.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <button className="editbutton"
                      onClick={() => navigate(`/edit/product/${tableItem._id}`)}
                    >
                      Edit
                    </button>
                    <button className="deletebutton" onClick={() => deleteproduct(tableItem._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </TopNavbar>
  );
}

export default ProductList;
