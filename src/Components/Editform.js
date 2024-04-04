import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { editdata } from "../Redux/productSlice";
import { backendurl } from "./Backendlink";
import { useDispatch } from "react-redux";
const productSchemaValidation = yup.object({
    title: yup
      .string()
      .min(5, "Please enter a title more than 5 character")
      .max(150, "Please enter a title more than 50 character")
      .required("Please Fill the  title "),
    description: yup
      .string()
      .min(5, "Please enter a description more than 5 character")
      .max(150, "Please enter a description more than 150 character")
      .required("Please Fill the task description "),
    category: yup.string().required("Please Fill the task category"),
    image: yup.string().required("Please Fill the image url "),
    price: yup.number().required("Enter your price"),
    rating: yup.number().required("Enter your Rating"),
  });

function Editform({data}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token =sessionStorage.getItem('token')
      //edit
  async function editproductdata({ product }) {
    try {
      let response = await axios.put(
        `${backendurl}/product/edit/${data._id}`,
        product,
        {headers:{Authorization:`Bearer ${token}`}}
      );
      if (response.data.rd == true) {
        toast.success(response.data.message);
        console.log(response.data.product);
        dispatch(editdata(response.data.product));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  //formik controll
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        _id: data._id,
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
        price: data.price,
        rating: data.rating,
        count: data.count,
      },
      validationSchema: productSchemaValidation,
      onSubmit: (product) => {
        editproductdata({ product });
      },
    });
  return (
    <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Edit Product</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    className="form-control"
                  ></input>
                </div>
                {touched.title && errors.title ? (
                  <p style={{ color: "crimson" }}>{errors.title}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-control"
                  ></input>
                </div>
                {touched.description && errors.description ? (
                  <p style={{ color: "crimson" }}>{errors.description}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                    className="form-control"
                  ></input>
                </div>
                {touched.category && errors.category ? (
                  <p style={{ color: "crimson" }}>{errors.category}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="url"
                    name="image"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    className="form-control"
                  ></input>
                </div>
                {touched.image && errors.image ? (
                  <p style={{ color: "crimson" }}>{errors.image}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="form-control"
                  ></input>
                </div>
                {touched.price && errors.price ? (
                  <p style={{ color: "crimson" }}>{errors.price}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    name="rating"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rating}
                    className="form-control"
                  ></input>
                </div>
                {touched.rating && errors.rating ? (
                  <p style={{ color: "crimson" }}>{errors.rating}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Product count</label>
                  <input
                    type="number"
                    name="count"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.count}
                    className="form-control"
                  ></input>
                </div>
                {touched.count && errors.count ? (
                  <p style={{ color: "crimson" }}>{errors.count}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>{" "}
            |
            <Link className="btn btn-danger" to={"/admin"}>
              Back
            </Link>
          </div>
        </div>
      </form>
  )
}

export default Editform