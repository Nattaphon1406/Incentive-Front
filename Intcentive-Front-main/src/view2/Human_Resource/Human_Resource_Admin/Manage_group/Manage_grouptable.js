import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getFeature, getAcademy } from "../../../../Utils/Common";
import { useParams } from "react-router";
import Resizer from "react-image-file-resizer";

function Manage_grouptable(params) {
  const [Groupdata, setGroupdata] = useState([]);
  const [company, setCompany] = useState([]);

  const [filler_Groupdata, setfiller_Groupdata] = useState({
    group_name: "",
    oem_id: getOem(),
    company_id: getUser().com,
  });

  const GetGroupdata = async () => {
    var get_filler_Groupdata = {
      oem_id: getOem(),
      company_id: getUser().com,
      group_name: filler_Groupdata.group_name.trim(),
    };
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/manageGroup/filterManageGroup",
      headers: {
        Authorization: 'Bearer ' + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_Groupdata,
    })
      .then(function (response) {
        console.log(response.data, 'GetGroupdata');
        setGroupdata(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetGroupdata();
  }, []);

  const clearFilter = async () => {
    await setfiller_Groupdata({
      ...filler_Groupdata,
      group_name: "",
    });

    filler_Groupdata.group_name = "";
    GetGroupdata();

  };

  function addpage(params) {
    window.location.href =
      "/Human_Resource/incentive_hr_admin/Manage_groupAdd/";
  }

  function deldata(id) {
    console.log("id", id);

    Swal.fire({
      title: "คุณต้องการลบข้อมูลใช่หรือไม่?",
      text: "ข้อมูลที่ถูกลบจะไม่สามารถนำกลับมาได้กรุณาตรวจสอบให้ชัดเจนก่อนลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "get",
          url:
            Configs.API_URL_incentive +
            "/api/manageGroup/deleteGroup/" + id,
          headers: {
            Authorization: 'Bearer ' + getToken(),
            "Content-Type": "application/json",
            "X-TTT": Configs.API_TTT,
          },
        })
          .then(function (response) {
            console.log(response);
            Swal.fire({
              icon: "success",
              text: "เสร็จสิ้น",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = "/Human_Resource/incentive_hr_admin/manage_group";
            });
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
          });
      }
    });
  }

  function ChangeStatus(id, status, element_id) {
    axios({
      method: "get",
      url:
        Configs.API_URL_incentive +
        "/api/manageGroup/changeStatusManageGroup/" + id,
      headers: {
        Authorization: 'Bearer ' + getToken(),
        "Content-Type": "application/json",
        "X-TTT": Configs.API_TTT,
      },
    })
      .then(function (response) {
        console.log(response);
        // GetGroupdata();
        // Swal.fire({
        //   icon: "success",
        //   text: "เสร็จสิ้น",
        //   showConfirmButton: false,
        //   timer: 1500,
        // }).then(() => {
        // window.location.href = "/Human_Resource/incentive_hr_admin/manage_group";
        // });
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
        console.log((status ? false : true));
        document.getElementById(element_id).checked = (status ? false : true);
      });
  }

  const getdataToggle = async (e) => {
    console.log("id", e.target.value);
    console.log("value", e.target.checked);
    ChangeStatus(e.target.value, e.target.checked, e.target.id)
  }

  const divEllipsis = {
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "width": "150px",
  }
  const divListEllipsis = {
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "width": "390px",
  }
  const divGroupNameEllipsis = {
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "width": "110px",
  }

  const rowsData = [];
  for (var index = 0; index < Groupdata.length; index++) {
    const rowItem = {};
    rowItem["no"] = index + 1;
    rowItem["group_name"] =
      (
        <div style={divGroupNameEllipsis}>
          {
            Groupdata[index].group_name
          }
        </div>
      )
    rowItem["member_ship"] = Groupdata[index].member_ship;
    rowItem["member_list"] =
      (
        <div style={divListEllipsis}>
          {
            Groupdata[index].member_list.map((data) => {
              return (data.membership_name + ' ');
            })
          }
        </div>
      )
    rowItem["group_description"] = (
      <div style={divEllipsis}>
        {
          Groupdata[index].group_description
        }
      </div>
    );
    rowItem['status'] = (
      <div class="custom-control custom-switch custom-switch-on-success">
        <input type="checkbox" class="custom-control-input" id={"customSwitch" + (index + 1)}
          key={Groupdata[index].id}
          value={Groupdata[index].id}
          onChange={getdataToggle.bind(this)}
          defaultChecked={Groupdata[index].group_active}
        >
        </input>
        <label class="custom-control-label" for={"customSwitch" + (index + 1)}></label>
      </div>
    );
    rowItem["mgt"] = (
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <div className="col-xl-3 col-md-3 col-xs-3 mr-2" style={{ "margin-left": "auto", "margin-right": "auto" }}>
          <a
            href={"/Human_Resource/incentive_hr_admin/Manage_groupAdd/read/" + Groupdata[index].id}
            id={"btn_read" + (index + 1)}
            key={Groupdata[index].id}
            className="btn btn-xs "
          >
            <i class="fas fa-eye"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 mr-2" style={{ "margin-left": "auto", "margin-right": "auto" }}>
          <a
            href={"/Human_Resource/incentive_hr_admin/Manage_groupAdd/edit/" + Groupdata[index].id}
            id={"btn_edit" + (index + 1)}
            key={Groupdata[index].id}
            className=" btn btn-xs "
          >
            {"   "}
            <i class="fas fa-pencil-alt"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 " style={{ "margin-left": "auto", "margin-right": "auto" }}>
          <a
            key={Groupdata[index].id}
            id={"btn_delete" + (index + 1)}
            className=" btn btn-xs "
            onClick={deldata.bind(this, Groupdata[index].id)}
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
        label: "Group Name",
        field: "group_name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Membership",
        field: "member_ship",
        sort: "asc",
        width: 50,
      },
      {
        label: "Member List",
        field: "member_list",
        sort: "asc",
        width: 20,
      },
      {
        label: "Group Description",
        field: "group_description",
        sort: "asc",
        width: 50,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 10,
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
                <h1>Manage Group</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">
                    Human Resource
                  </li>
                  <li className="breadcrumb-item active">Manage Group</li>
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
                    value={filler_Groupdata.group_name}
                    onChange={(e) => {
                      setfiller_Groupdata({
                        ...filler_Groupdata,
                        group_name: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="">Group Name</label>{" "}
                </div>
              </div>
              <div className="col-4 col-md-3 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-block btn-info  "
                    onClick={() => {
                      GetGroupdata();
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
              <h3 className="card-title">Group</h3>
              <div className="card-tools"></div>
            </div>

            <div
              className="card-body table-responsive " style={{ whiteSpace: 'nowrap' }}
            >
              <MDBDataTable
                sortable={false}
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

export default Manage_grouptable;