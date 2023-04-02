import React, { useState, useEffect } from "react";
import "../assets/css/Oem.css";

import Configs from "../config";

//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function input_feature(params) {
  
  return (
    /* <div  className="row" >*/
    <>
                    <div className="form-group ">
                      <input
                        thousandSeparator={true}
                        type="text"
                        className="form-control"
                        value={params.value}
                        disabled={params.disabled}
                        onChange={params.onChange}
                    
                      />
                      <label htmlFor="">{params.label}</label>{" "}
                      
                    </div>
                    
</>

    /*  </div> */
  );
}

export default input_feature;
