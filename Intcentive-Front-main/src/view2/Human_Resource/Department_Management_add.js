import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../config";
import NumberFormat from "react-number-format";
import { getOem, getToken, getUser,getAcademy } from "../../Utils/Common";

function Department_Management_add(mode) {
  const [company, setCompany] = useState([]);
  const [getDepartmentType, setgetDepartmentType] = useState([]);
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);
  const [Departmentdata, setDepartmentdata] = useState({
    company_id: getUser().com,
    dep_id:"",
    dep_name:"",
    dep_detail:"",
    parent_id:"",
    is_use:"",

  });
  const [chacktabel] = useState({
    chackdropdown: false
  });
  const { id } = useParams();
  useEffect(() => {
    if (mode.mode === "read") {
      setdisable(true);
      setPageMode("Read");
    } else if (mode.mode === "add") {
      setdisable(false);
      setPageMode("Add");
    } else {
      setdisable(false);
      setPageMode("Edit");
    }
  }, []);

  const GetCompany = async () => {
    axios({
      method: "get",
      url: Configs.API_URL + "/company/all",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        //console.log(response.data);
        setCompany(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
  useEffect(() => {
    GetCompany();
    //console.log("id:"+id);
    GetDepartmentdata_viwe();
    GetDepartmentType();
  }, []);

  const GetDepartmentType = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
      check: true
    };

    axios({
      method: "post",
      url:
        Configs.API_URL_hrMagenatement +
        "/api/hrManagement/filterdepartmentmgt",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        console.log(response.data.data,"xx",);
       const loopdropdown = [];
      /*   for(let item of response.data.data){
            console.log(item)
            if (item.parent_id !== null) {
                
                let as = {
                    id:item.id,
                    dep_name:item.dep_name
                  }  
                  loopdropdown.push(as);
            }
            if (loopdropdown.length > 0) {
                chacktabel.chackdropdown =true
            }
        } */
          /*   console.log(loopdropdown) */
            setgetDepartmentType(response.data.data);
       
     
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const GetDepartmentdata_viwe = async () => {
     
    if ( mode.mode =="read" || mode.mode =="edit"  ) {
      axios({
        method: "get",
        url: Configs.API_URL_hrMagenatement + "/api/hrManagement/getdepartmentmgtById?id="+ id,
        headers: {
          Authorization: getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response.data);
          setDepartmentdata({
            dep_id:id,
            dep_name:response.data.data[0].dep_name || "",
            dep_detail:response.data.data[0].dep_detail || "",
            parent_id:response.data.data[0].parent_id || "",
            is_use:response.data.data[0].is_use,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  }
  
  
  function saveOption(params) {
    const error_list = [];
    if(Departmentdata.dep_name.trim() == ""){
      let temp_err ={
        message:"Please enter information in the fields >>> [Department Name]."
      }
      error_list.push(temp_err);
    }
 
    if(error_list.length > 0){
      var err_message = "";
      for(var e = 0; e < error_list.length;e++){
        err_message += "<br/>"+error_list[e].message;
      }
      Swal.fire("Error", err_message, "error");
    }else{
      if (mode.mode === "add") {
        const temp ={
          user_id: getUser().fup,
          company_id: Departmentdata.company_id,    
          oem_id:getOem(),
          dep_name:Departmentdata.dep_name.trim(),
          dep_detail:Departmentdata.dep_detail.trim(),
          parent_id:Departmentdata.parent_id,
        
        }
        Swal.fire({
          title: "Saving",
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 1000,
          onOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          axios({
            method: "post",
            url: Configs.API_URL_hrMagenatement + "/api/hrManagement/adddepartmentmgt",
            headers: {
              Authorization: getToken(),
              "X-TTT": Configs.API_TTT,
              "Content-Type": "application/json",
            },
            data: temp,
          })
            .then(function (response) {
              if (response.data) {
                Swal.fire({
                  icon: "success",
                  title: "Save",
                  showConfirmButton: false,
                  timer: 1500,
                }).then((result) => {
                  window.location.href =
                    "/Human_Resource/organization_config/department_management";
                });
              }
  
              //console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire("Error", error.response.data.message, "error");
            });
        });
      }
      if (mode.mode === "edit") {

        const temp ={
          dep_id:id,
          user_id: getUser().fup,
          company_id: Departmentdata.company_id,
          oem_id:getOem(),
          dep_name:Departmentdata.dep_name.trim(),
          dep_detail:Departmentdata.dep_detail.trim(),
          parent_id:Departmentdata.parent_id,
    
        }
        //console.log(temp);
       
        Swal.fire( {
          title: "Saving",
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 1000,
          onOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          axios({
            method: "post",
            url: Configs.API_URL_hrMagenatement + "/api/hrManagement/editdepartmentmgt",
            headers: {
              Authorization: getToken(),
              "X-TTT": Configs.API_TTT,
              "Content-Type": "application/json",
            },
            data: temp,
          })
            .then(function (response) {
              if (response.data) {
                Swal.fire({
                  icon: "success",
                  title: "Save",
                  showConfirmButton: false,
                  timer: 1500,
                }).then((result) => {
                  window.location.href =
                  "/Human_Resource/organization_config/department_management";
                });
              }
    
              //console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire("Error", error.response.data.message, "error");
            });
        });
       }
    }
  
  }

  

  function cancleOption(params) {
    Swal.fire({
      title: 'Do you want to cancel and leave the changes?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:`No`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
        "/Human_Resource/organization_config/department_management";
      }
    }
    );
  }
  return (
    <div className="wrapper">
    {/* <Header />
    <Sidebar menu="warehouse" activemenu="projmenu" submenu="factmaster" /> */}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Department {pageMode}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Department</li>
                  <li className="breadcrumb-item active">{pageMode}</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            {mode.mode === "read" ? (
              <div className="row mb-2">
                <div className="col-6 col-md-4 col-xl-2">
                  <button
                    type="button"
                    onClick={cancleOption}
                    class="btn btn-block btn-danger "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="row mb-2">
                     <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={saveOption}
                    class="btn btn-block btn-success "
                  >
                    Save
                  </button>
                </div>
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    if
                      onClick={cancleOption}
                    class="btn btn-block btn-danger "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Department {pageMode}</h3>
              <div className="card-tools"></div>
            </div>

            <div className="card-body">
         
              <div className="row">
              
              <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group ">
                    <select
                      className="form-control custom-select select2"
                      type="text"
                      required
                      id="text_nation_id"
                      value={Departmentdata.parent_id}
                      disabled={disable}
                      onChange={(e) => {
                        setDepartmentdata({
                          ...Departmentdata,
                          parent_id: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled selected>
                        ----เลือก----
                      </option>
                      {getDepartmentType.map((el) => {
                        return (
                          <option value={el.id}>
                            {el.dep_name}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor=""> Main Department</label>
                  </div>
                </div>
                </div>

                <div className="row">
              <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={Departmentdata.dep_name}
                      disabled={disable}
                      onChange={(e) => {
                        setDepartmentdata({
                          ...Departmentdata,
                          dep_name: e.target.value,
                        });
                      }}
                
                    />
                    <label>
                    Department Name
                      {Departmentdata.dep_name.trim() === "" ? (
                        <span style={{ color: "red" }}> *</span>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                </div>

              </div>

              <div className="row">
              <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={Departmentdata.dep_detail}
                      disabled={disable}
                      onChange={(e) => {
                        setDepartmentdata({
                          ...Departmentdata,
                          dep_detail: e.target.value,
                        });
                      }}
                
                    />
                    <label>
                    Department Description
                     
                    </label>
                  </div>
                </div>

              </div>

              {/* <h3 className="mt-5 mt-5-head">
                    Contact Point
                  </h3>
                <div className="tab-custom-content">
                 </div>
                 <br/>
               */}
             
            </div>
            
          </div>
        </section>
      </div>
     {/*  <Footter/> */}
      </div>
  );
}
export default Department_Management_add;
