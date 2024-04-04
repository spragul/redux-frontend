import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetCart } from "../../Redux/cartSilce";
import { resetorder } from "../../Redux/orderSilce";
import { displayData } from "../../Redux/productSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function TopNavbar({ children }) {
  let cart = useSelector((state) => state.cartapireducer.cart);
  const data = useSelector((state) => state.productapireducer.value);
  const isloading = useSelector((state) => state.productapireducer.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = sessionStorage.getItem("myRole");

  function logout() {
    sessionStorage.clear();
    dispatch(resetCart([]));
    dispatch(resetorder([]));
    navigate("/login");
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container fluid>
          <Navbar.Brand href="/">Redux crud</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll">
            <span>
              <MenuIcon />
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {role == "admin" ? (
                <Link to="/addproduct" className="nov-top-button" type="button">
                  AddProduct
                </Link>
              ) : (
                ""
              )}
              {role == "admin" ? (
                <Link to="/admin" className="nov-top-button" type="button">
                  Admin
                </Link>
              ) : (
                ""
              )}

              <Link to="/dashboard" className="nov-top-button" type="button">
                HOME
              </Link>
            </Nav>
            <Nav>
              {role == "user" ? (
                <IconButton
                  aria-label="cart"
                  style={{
                    border: "1px solid red",
                    borderRadius: "20px",
                    marginRight: "10px",
                  }}
                  onClick={() => navigate("/cart")}
                >
                  <StyledBadge badgeContent={cart.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              ) : (
                ""
              )}
              <Nav>
                <Link to="/orders" className="nov-top-button" type="button">
                  ORDERS
                  <span>
                    <BeenhereIcon />
                  </span>
                </Link>
              </Nav>
            </Nav>
            <Nav>
              <Button
                className="nov-top-button"
                type="button"
                onClick={() => logout()}
              >
                <span>
                  <LogoutIcon />
                </span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </div>
  );
}
