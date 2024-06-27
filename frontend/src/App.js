import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/saveproduct";
import GetAll from "./components/showallproducts";
import AdminView from "./components/AdminView";
import "./App.css";
import Admin from "./components/AdminLogin";
import { selectUser } from "./slices/userSlice";
import { useSelector } from "react-redux";
import Logout from "./components/Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography,Button } from "@mui/material";

import image from "../src/image/aa.jpg"
const App = () => {
    const user = useSelector(selectUser);
    console.log(user);

    const userType = user?.userType;

    const isLoggedInAndAdmin = ( user && userType === "admin") || false;

    return (

        <div className="app"
        sx={{
            
            // background: 'linear-gradient(180deg, rgba(227, 208, 255, 0.87) 0%, #FFF 42.71%)',
        }}
        >

            <Container
            sx={{
                
                height: '738px',
                width: '1440px'
            }}

            >
       <AppBar >
        <Toolbar>
          <Typography variant="h6" >
            Ticket Booking
          </Typography>
          {/* <Button color="inherit" >
            Home
          </Button>
          <Button color="inherit" >
            About
          </Button>
          <Button color="inherit" >
            Contact
          </Button> */}
        </Toolbar>
      </AppBar>
                <Router>
                    <Routes>

                        <Route path="/" element={
                            user ? <GetAll /> :
                                <Login />
                        } />
                        {/* <Route path="/logout" element={
                            //only show the logout component if the user is logged in
                            user ? <Logout /> : <Login />
                        } /> */}
                        <Route path="/register" element={
                            //only show the logout component if the user is logged in
                            user ? <GetAll /> : <Register />
                        } />
                        <Route path="/admin" element={
                            isLoggedInAndAdmin ? <AdminView /> : <Admin />
                        } />

                        <Route path="/dashboard" element={
                            isLoggedInAndAdmin ? <AdminView /> : <Admin />
                        } />
                        <Route path="/addticket" element={
                            //only show the logout component if the user is logged in
                            user ? <CreateProduct /> : <Login />
                        } />

                        <Route path="/addticket/:id" element={
                            //only show the logout component if the user is logged in
                            user ? <CreateProduct /> : <Login />
                        } />

                        <Route path="/tickets" element={
                            //only show the logout component if the user is logged in
                            user ? <GetAll /> : <Login />
                        } />




                    </Routes>
                </Router>
            </Container>
        </div>

    );
};

export default App;
