import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../Navbar/Topnavbar";
import Table from "react-bootstrap/Table";
import { backendurl } from "../Backendlink";
import axios from "axios";
import { fetchuser } from "../../Redux/userSilce";
import { toast } from "react-toastify";

function Userlist() {
  const isloading = useSelector((state) => state.userapireducer.isLoading);
  const data = useSelector((state) => state.userapireducer.user);
  const myid = sessionStorage.getItem("myid");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  //userList
  async function fetchinguserDetails() {
    try {
      let response = await axios.get(`${backendurl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        dispatch(fetchuser(response.data.user));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchinguserDetails();
  }, []);
  return (
    <TopNavbar>
      {data.length > 0 ? (
        <div>
          <h2>User list</h2>
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
                <th>name</th>
                <th>email</th>
                <th>role</th>
                <th> mobile</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tableItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tableItem.name}</td>
                  <td>{tableItem.email}</td>
                  <td>{tableItem.role}</td>
                  <td>{tableItem.mobile}</td>
                  <td>{tableItem.date}</td>
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

export default Userlist;
