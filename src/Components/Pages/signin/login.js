import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link,useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./login.css";
import { useFormik } from "formik";
import {toast} from "react-toastify";
import axios from "axios"
import { backendurl } from "../../Backendlink";

const userSchema=yup.object({
  username:yup.string().required("Enter your userName"),
  password:yup.string().required("Enter your password")
})
export default function Loginpage() {
  const [showpassword, setShowpassword] = useState("password");
  const navigate=useNavigate();

  //login backend
  const loginuser=async({userdata})=>{
    try {
      const response = await axios.post(`${backendurl}/user/login`,userdata);
      if(response.data.rd===true){
        toast.success(response.data.message);
        sessionStorage.setItem("token",response.data.token);
        sessionStorage.setItem("myname",response.data.myname);
        sessionStorage.setItem("myRole",response.data.myRole);
        sessionStorage.setItem("myid",response.data.myid);
        navigate('/')
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error)
    }

  }

  //formik controll
  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:{
      username:"",
      password:""
    },
    validationSchema:userSchema,
    onSubmit:(userdata)=>{
     console.log(userdata);
     loginuser({userdata})
    }

  })
  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="text-part">
          <ul>
            <li className="log-content">
              <h1>WELCOME</h1>
              <p>Login product webpage</p>
            </li>
            <li className="log-content">
              <label>
                <span>
                  <PersonIcon />
                </span>
                USERNAME
              </label>
              <input
                placeholder="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="username"
                className="login-input"
              />
              {touched.username && errors.username ? <p style={{ color: "crimson" }}>{errors.username}</p> : ""}
            </li>
            <li className="log-content">
              <label>
                <span>
                  <LockIcon />
                </span>
                PASSWORD
              </label>
              <div className="buttonIn">
                <input
                name="password"
                  type={showpassword}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="password"
                  className="login-input "
                />
                {showpassword === "text" ? (
                  <button
                    onClick={() => setShowpassword("password")}
                    className="input-button"
                  >
                    <VisibilityOffIcon />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowpassword("text")}
                    className="input-button"
                  >
                    <VisibilityIcon />
                  </button>
                )}
                {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
              </div>
            </li>
            <li className="log-content-btn">
              <button className="log-dum-btn" type="submit">
                Login
              </button>
            </li>
            <li className="log-content">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "black" }}>
                  Sign Up
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <div className="image-container">
          <img
            className="login-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkgSQlMtN7db88vjEQaN2p-S-V5tnPAMgvWA&usqp=CAU"
            title="logimg"
            alt="logimg"
          />
        </div>
      </form>
    </div>
  );
}
