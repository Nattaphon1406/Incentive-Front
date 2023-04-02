import React, { useState, useEffect } from "react";
import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import { getUser, getToken,setOemlist ,getOem,getComConfig } from "../Utils/Common";
import Configs from "../config";
import axios from "axios";
function Dashboad(params) {
  const [user, setUser] = useState(getUser());
  const [user_detail, setUser_detail] = useState({});
  const [company, setCompany] = useState({});
  const [oem, setOem] = useState([]);
  const [po_sign, setpo_sign] = useState(getComConfig())
  const [size, setSize] = useState({
    width:1280,
    height:720,
  });
  var config_user = {
    method: "get",
    url: Configs.API_URL + "/company/findUserById?id=" + user.fup,
    headers: {
      Authorization: getToken(),
      'X-TTT': Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

  var config_com = {
    method: "get",
    url: Configs.API_URL + "/company/findById?id=" + user.com,
    headers: {
      Authorization: getToken(),
      'X-TTT': Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

   var config_oem = {
    method: "get",
    url: Configs.API_URL + "/company/findOEMByCompanyId?id=" + user.com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios(config_user)
      .then(function (response) {
        setUser_detail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(config_com)
      .then(function (response) {
        const data = response.data;
        setCompany(data);
        setOem(data.oem);
        /* console.log(response.data); */
      })
      .catch(function (error) {
        console.log(error);
      });

    /*  axios(config_oem)
      .then(function (response) {
        console.log(oem)
        setOem(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
 */
/* console.log(getOem()); */
  }, []);

  return (
    <div className="content-wrapper">
      
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                Welcome {user.sub}
              
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/Welcome">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
     {/*    <label>Mode</label>
      <div class="custom-control custom-switch">

  <input type="checkbox" class="custom-control-input" id="customSwitches"
  onClick={(e)=>{
    console.log(e);
    if(e.target.checked === true){
      setSize({...size,
        width: "100%",
        height: "90vh"
      });
      size.width = "100%";
      size.height = "90vh";
    }else{
      setSize({...size,
        width: "1280px",
        height: "720px"
      });
      size.width = "1280px";
      size.height = "720px";
    }
   
  }}
  />
  <label class="custom-control-label" for="customSwitches">Full Screen</label>
</div> */}
        <iframe style ={{width: "100%", height:"90vh"}} /*  style={{width:size.width, height:size.height}} */   src={po_sign.dashboard} frameborder="0" allowfullscreen ></iframe>   
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}
export default Dashboad;
