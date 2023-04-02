import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../config";
import { getOem, getToken, getUser,getAcademy } from "../../Utils/Common";

function Department_Management(params) {
  const [Departmentdata, setDepartmentdata] = useState([]);
  const [company, setCompany] = useState([]);
  /* console.log(getUser().com); */
  const [filler_Departmentdata, setFiller_Departmentdata] = useState({
    dep_name: "",
    oem_id: getOem(),
   company_id: getUser().com,
  });
  /*  const config_company = {
    method: "get",
    url: Configs.API_URL + "/company/all",
    headers: {
      Authorization: getToken(),
      "X-TTT": Configs.API_TTT,
      "Content-Type": "application/json",
    },
  }; */


  const GetDepartmentdata = async () => {
    var get_filler_Departmentdata = {
      oem_id: getOem(),
      company_id: getUser().com,
      dep_name:filler_Departmentdata.dep_name.trim(),
    };
      axios({
        method: "post",
        url: Configs.API_URL_hrMagenatement + "/api/hrManagement/filterdepartmentmgt",
        headers: {
          Authorization: getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
        data: get_filler_Departmentdata,
      })
        .then(function (response) {
          response.data.data.sort((a, b) => a.dep_name.localeCompare(b.dep_name));
        setDepartmentdata(response.data.data);
     
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetDepartmentdata();

  }, []);

  const clearFilter = async () => {
    await setFiller_Departmentdata({
      ...filler_Departmentdata,
      dep_name:"",
    });
   
    filler_Departmentdata.dep_name = "";
    GetDepartmentdata();
   
  };

  function addpage(params) {
    window.location.href =
      "/Human_Resource/Department_Management_add";
  }

  function deldata(id) {
    console.log(id,"aaa")
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "get",
          url: Configs.API_URL_hrMagenatement + "/api/hrManagement/deldepartmentmgtById?id=" +
          id,
          headers: {
            Authorization: getToken(),
            "X-TTT": Configs.API_TTT,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (response.data.data === true) {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              ).then(() => {
                GetDepartmentdata();
              });
            }
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "Something went wrong: " + error, "error");
          });
      }
    });
  }
  const rowsData = [];
 
  for (var index = 0; index < Departmentdata.length; index++) {
    const rowItem = {};
    rowItem["no"] = index + 1;
    rowItem["department_name"] = Departmentdata[index].dep_name;
    rowItem["department_Main"] = Departmentdata[index].subname;
    rowItem["department_detail"] = Departmentdata[index].dep_detail;
console.log(Departmentdata[index].id)
    rowItem["mgt"] = (
      <div className="row" style={{flexWrap:"nowrap"}}>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={"/Human_Resource/Department_Management_add/read/" + Departmentdata[index].id}
            id="btn_read"
            key={Departmentdata[index].id}
            className="btn btn-xs "
          >
            <i class="fas fa-eye"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={"/Human_Resource/department_management_add/edit/" + Departmentdata[index].id}
            id="btn_edit"
            key={Departmentdata[index].id}
            className=" btn btn-xs "
          >
            {"   "}
            <i class="fas fa-pencil-alt"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            key={Departmentdata[index].id}
            id="btn_delete"
            className=" btn btn-xs "
            onClick={deldata.bind(this, Departmentdata[index].id)}
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    );
    rowsData.push(rowItem);
  }

  const data = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Department Name",
        field: "department_name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Main Depatment",
        field: "department_Main",
        sort: "asc",
        width: 50,
      },
      {
        label: "Department Detail",
        field: "department_detail",
        sort: "asc",
        width: 50,
      },
      {
        label: "Management",
        field: "mgt",
        sort: "asc",
        width: 50,
      }
    ],
    rows: rowsData,
  };
  return (
    <div className="wrapper">
    {/* <Header />
    <Sidebar menu="warehouse" activemenu="projmenu" submenu="factmaster" /> */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Manage Department</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">
                  organization_config
                  </li>
                  <li className="breadcrumb-item active">Manage Department</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-md-2">
                <div className="form-group ">
                  
                <input
                    type="text"
                    className="form-control"
                    required="false"    
                    value={filler_Departmentdata.dep_name}
                    onChange={(e) => {
                      setFiller_Departmentdata({
                        ...filler_Departmentdata,
                        dep_name: e.target.value,
                      });
                    }} 
                  />
                  <label htmlFor="">Department Name</label>{" "}
                </div>
              </div>
              <div className="col-4 col-md-3 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-block btn-info  "
                    onClick={() => {
                      GetDepartmentdata();
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="col-4 col-md-3 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-block btn-info"
                    onClick={() => clearFilter()}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {/* <div className="col-md-2">
                <div className="form-group ">
                  <select
                    className="custom-select select2 form-control"
                    value={filler_supplier.company_id}
                    onChange={(e) => {
                      setFiller_supplier({
                        ...filler_supplier,
                        company_id: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled selected>
                      Select Company
                    </option>
                    {company.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="">Company</label>
                </div>
              </div> */}
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              
            <div className="col-4 col-md-3 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={addpage}
                  >
                    Add
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Department Manage</h3>
              <div className="card-tools"></div>
            </div>

            <div
              className="card-body table-responsive " style={{ whiteSpace: 'nowrap' }}
            >
              <MDBDataTable
              sortable = {false}
                className="table table-head-fixed"
                striped
                bordered
                hover
                fixedHeader
                data={data}
              />
            </div>
            {/* /.card-body */}
            <div className="card-footer"></div>
            {/* /.card-footer*/}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
   {/*   <Footter/> */}
     </div>
     
  );
}

export default Department_Management;
