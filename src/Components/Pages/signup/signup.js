import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios"
import { backendurl } from "../../Backendlink";
import {toast} from "react-toastify"
import {useNavigate,Link} from "react-router-dom"

const userSchema = yup.object({
  name: yup.string().required("Enter your Name"),
  email: yup.string().required("Enter your email"),
  mobile: yup.string().required("Enter your Mobile"),
  username: yup.string().required("Enter your userName"),
  password: yup.string().required("Enter your password"),
});

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
const navigate =useNavigate()
  //userdata send backend
  async function datasend({userdata}){
    let response =await axios.post(`${backendurl}/user/signup`,userdata);
    if(response.data.rd==true){
      toast.success(response.data.message);
      navigate('/login');
    }else{
      toast.error(response.data.message);
    }
  }


  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        username: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        datasend({userdata})
      },
    });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <p style={{ backgroundColor: "crimson" }}>{errors.email}</p>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="Name"
              label="Name"
              name="name"
              autoFocus
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.name && errors.name ? (
              <p style={{ backgroundColor: "crimson" }}>{errors.name}</p>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoFocus
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.username && errors.username ? (
              <p style={{ backgroundColor: "crimson" }}>{errors.username}</p>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobile"
              autoFocus
              value={values.mobile}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.mobile && errors.mobile ? (
              <p style={{ backgroundColor: "crimson" }}>{errors.mobile}</p>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <p style={{ backgroundColor: "crimson" }}>{errors.password}</p>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link to="/login" variant="body2">
                  {"All Ready you have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
