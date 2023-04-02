import React, { useState, useEffect } from "react";
import "../assets/css/Oem.css";
import komatsu_logo from "../assets/img/Landing_Page/komatsu_logo.png";
import kobota_logo from "../assets/img/Landing_Page/kobota_logo.png";
import toyota_logo from "../assets/img/Landing_Page/toyota_logo.png";
import Configs from "../config";
import axios from "axios";
import { getUser, getToken, setOem ,removeOem ,getOem } from "../Utils/Common";
function OEM(paras) {
  
  const [user, setuser] = useState(getUser());
  const [company, setCompany] = useState([]);
  const [oem, setOem] = useState([]);

/*   var config_com = {
    method: "get",
    url: Configs.API_URL + "/company/findById?id=" + user.com,
    headers: {
      'X-TTT': Configs.API_TTT,
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
  }; 
  useEffect(() => {
    
      axios(config_com)
      .then(function (response) {
        setCompany(response.data);
        setOem(response.data.oem); 
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
   
  }, []); */


  return (
    /* <div  className="row" >*/

    <div className="col-12" style={{ textAlign: "center" }}>
      
      <img alt="..." className="img-fluid oem-1" src={Configs.API_URL_IMG+ paras.oem.logo_path} />
      <h2></h2>
 
      <h3>{paras.oem.name}</h3>

    </div>

    /*  </div> */
  );
}

export default OEM;
