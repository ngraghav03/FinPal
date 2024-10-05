// import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/LoginPage";
import Register from "./components/Login/RegisterPage";
import Home from "./components/Home";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import NewTransaction from "./components/NewTransaction";
import AppLayout from "./components/AppLayout";
import NewAccount from "./components/NewAccount";

axios.defaults.withCredentials = true;

function App () {
  return (
    <>
      {/* <Home /> */}
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="newtransaction" element={<NewTransaction />} />
          <Route path="newaccount" element={<NewAccount />} />

        </Route>
      </Routes>
    </>
  )
}

export default App;