import React from "react";
import "../assets/css/comingsoon.css";
import BG_CON from "../assets/img/Landing_Page/constaruction_img.jpg";
import Login_BG from "../assets/img/Login/Login_BG.png";
import Construccomponent from "../component/Construction";
import Footter from "../component/Footter";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
function Construction(params) {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar menu="pp" activemenu="materail" submenu="factmaster" />
      <Construccomponent name="Production Planing" />
      <Footter />
    </div>
  );
}
export default Construction;
