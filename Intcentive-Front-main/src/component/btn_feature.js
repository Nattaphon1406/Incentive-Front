import React, { useState, useEffect } from "react";
import "../assets/css/Oem.css";

import Configs from "../config";

//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function btn_feature(params) {
  
  return (
    /* <div  className="row" >*/
    <>
    
    <div className="col-2">
    
    <div className="form-group ">
    <a href={params.href} download={params.download} >
      <button
        className="btn btn-block btn-primary"
       
        onClick={params.onClick}
      >
        {params.name}
      </button>
      </a>
      
    </div>
  </div>

          


</>

    /*  </div> */
  );
}

export default btn_feature;
