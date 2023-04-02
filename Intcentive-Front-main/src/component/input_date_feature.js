import React, { useState, useEffect } from "react";
import "../assets/css/Oem.css";
import DatePicker from "react-datepicker";
//import Configs from "../config";

//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function input_date_feature(params) {
  
  return (
     
    <>
<div  className="row" >
            <div className="col-4" style ={{textAlign:"right"}}><label> {params.txt} : </label></div>
            <div className="col-8">
<div className="form-group ">
                        
                        <DatePicker
                          selected={params.selected}
                          dateFormat={"dd-MM-yyyy"}
                          onClick={params.onClick}
                          onChange={params.onChange}
                          selectsStart
                          startDate={params.selected}
                
                          customInput={params.customInput}

                        />
               
               </div>
               </div>
               </div>
</>

    /*  </div> */
  );
}

export default input_date_feature;
