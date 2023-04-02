import React, { useState, useEffect } from "react";
import "../assets/css/Oem.css";
import { MDBDataTable } from "mdbreact";
import Configs from "../config";

//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function historyDetail_feature(params) {
  
  return (
    
    <>
 

<div className="card card-primary card-outline card-outline-tabs">
            <div className="card-header p-0 border-bottom-0">
              <ul
                className="nav nav-tabs"
                id="custom-tabs-four-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="custom-tabs-four-warehouse-tab"
                    data-toggle="pill"
                    href="#custom-tabs-four-warehouse"
                    role="tab"
                    aria-controls="custom-tabs-four-warehouse"
                    aria-selected="false"
                  >
                    Lot in Stock
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="custom-tabs-four-rack-tab"
                    data-toggle="pill"
                    href="#custom-tabs-four-rack"
                    role="tab"
                    aria-controls="custom-tabs-four-rack"
                    aria-selected="false"
                  >
                    Lot History
                  </a>
                </li>
                
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="custom-tabs-four-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="custom-tabs-four-warehouse"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-four-warehouse-tab"
                >
                  <div className="row">
                    <div className="col-4"></div>
                  </div>

                  <h3 class="title ng-binding">
                    Lot In Stock 
                   
                  </h3>
                  <div classNmae = "row">
                    <div className="col-6 col-md-4 col-xl-2">
                    {params.approve_cts}
                    </div>
                  </div>
                 
                  <div className="row">
                  <div
                      className="table-responsive"
                      style={{ height: "350px",whiteSpace: 'nowrap' }}
                    >
                  <MDBDataTable
                        className="table"
                        searching={true}
                        sortable={false}
                        disableRetreatAfterSorting={true}
                        is
                        striped
                        bordered
                        hover
                        data={params.data}
                      />
                          </div>
                  </div>
                  {/*   <div className="tab-custom-content"></div>
                  <div className="row">

                  </div> */}
                </div>



                <div
                  className="tab-pane fade"
                  id="custom-tabs-four-rack"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-four-rack-tab"
                >
                  <div className="row">
                    <div className="col-4"></div>
                  </div>

                  <h3 class="title ng-binding">
                    Lot History
                  </h3>
         
                  <div className="row">
                  <div
                      className="table-responsive"
                      style={{ height: "350px",whiteSpace: 'nowrap' }}
                    >
                  <MDBDataTable
                        className="table"
                        disableRetreatAfterSorting={true}
                        sortable={false}
                        searching={true}
                        striped
                        bordered
                        hover
                        data={params.history}
                      />
                         </div>
                  </div>
                  {/*   <div className="tab-custom-content"></div>
                  <div className="row">

                  </div> */}
                </div>






                </div>
                </div>
            </div>
               {/*    <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lot In Stock</p>
                  <div className="row">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 

                    <div className="col-1">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle = "modal"
                        data-target = "#modal-history"
                        //onClick={params.onClick}
                      >
                        History
                      </button>
                    </div>


                  </div>

                  <div className="card-body">
                    <div
                      className="table-responsive"
                      style={{ height: "300px" }}
                    >
                      <MDBDataTable
                        className="table"
                        searching={false}
                        striped
                        bordered
                        hover
                        data={params.data}
                      />
                    </div>
                  </div>
                </div>



                <div className = "modal fade"id = "modal-history" >
        <div className = "modal-dialog modal-xl" >
        <div className = "modal-content" >

        <div className = "modal-body" >

        <div className = "row" >

        <div className="col-12"><h3> History </h3></div>
            <br/>
          
                       
            <div
                      className="table-responsive"
                      style={{ height: "500px" }}
                    >
                      <MDBDataTable
                        className="table"
                        searching={false}
                        striped
                        bordered
                        hover
                        data={params.history}
                      />
                    </div>
          

        </div> 
        
        
        </div> 
        
        
        <div className = "modal-footer justify-content-center" >


        <a data-toggle = "modal"
        data-target = "#modal-history" >
               
        <button type = "button"
        className = "btn btn-danger"
        //onClick = { set_order }
        data-dismiss = "#modal-history"
        aria-label = "Close" >
         Close
        </button> 
              
        </a> 
        </div> 
        </div> 
        </div>  */}
     {/*    //</div> */}

          


</>

    /*  </div> */
  );
}

export default historyDetail_feature;
