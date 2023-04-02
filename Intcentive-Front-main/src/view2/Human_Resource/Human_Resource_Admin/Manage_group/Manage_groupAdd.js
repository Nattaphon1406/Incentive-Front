import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getFeature, getAcademy } from "../../../../Utils/Common";
import { useParams } from "react-router";
import Resizer from "react-image-file-resizer";

function Manage_groupAdd(mode) {
  const [company, setCompany] = useState([]);
  const [getDepartmentType, setgetDepartmentType] = useState([]);
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);
  const [usertabel, setusertabel] = useState([]);
  const [usertabelin, setusertabelin] = useState([]);
  const [departmentlist, setdepartmentlist] = useState([]);
  const [positionlist, setpositionlist] = useState([]);
  const [Groupdata, setGroupdata] = useState({
    company_id: getUser().com,
    id: "",
    group_name: "",
    group_description: "",
  });
  const [MDBT, setMDBT] = useState(true);
  const [filteruser, setfilteruser] = useState({
    membership_name: "",
    department: "",
    position: "",
  });
  const { id } = useParams();
  const [group_name_err, setgroup_name_err] = useState(false);
  const [group_name_null, setgroup_name_null] = useState(false);

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
    GetManageGroup_viwe();
  }, []);

  const GetUsertabel = async () => {
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
      emp_name_th: filteruser.membership_name.trim(),
      department: filteruser.department.trim(),
      position: filteruser.position.trim(),
    }
    console.log(row);
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/manageGroup/getUsergroup",
      headers: {
        Authorization: 'Bearer ' + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetUsertabel");
        response.data.sort((a, b) => a.membership_number.localeCompare(b.membership_number));

        setusertabelin(response.data)
        setMDBT(true);
        GetDepartmerntList();
        GetPositionList();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const GetManageGroup_viwe = async () => {
    console.log(id);
    if (mode.mode == "read" || mode.mode == "edit") {
      let data_group = {
        company_id: getUser().com,
        oem_id: getOem(),
        id: id,
      }
      axios({
        method: "post",
        url: Configs.API_URL_incentive + "/api/manageGroup/getrManageGroupById",
        headers: {
          Authorization: 'Bearer ' + getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
        data: data_group,
      })
        .then(function (response) {
          console.log(response.data, 'GetManageGroup_viwe');
          setGroupdata({
            id: response.data[0].id.trim() || "",
            group_name: response.data[0].group_name.trim() || "",
            group_description: response.data[0].group_description || "",
          });
          var userontabel = response.data[0].group_user
          userontabel.sort((a, b) => a.membership_number.localeCompare(b.membership_number));

          setusertabel(userontabel)
          console.log(Groupdata, usertabel);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  const GetDepartmerntList = async () => {
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
    }
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/manageGroup/departmentList",
      headers: {
        Authorization: 'Bearer ' + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetDepartmerntList");
        setdepartmentlist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const GetPositionList = async () => {
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
    }
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/manageGroup/positionList",
      headers: {
        Authorization: 'Bearer ' + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetPositionList");
        setpositionlist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function chackusetabel(chack_id, no, name, department, position) {
    var tabel = usertabel
    console.log(chack_id)
    var check = tabel.filter((e) => {
      return e.id === chack_id;
    });
    if (check.length > 0) {
      console.log(tabel)
      var objIndex = tabel.findIndex((e => e.id == chack_id));
      tabel.splice(objIndex, 1);

    } else {
      let as = {
        id: chack_id,
        membership_number: no,
        membership_name: name,
        department: department,
        position: position,
        chackuse: false,
      }
      tabel.push(as)
      console.log(tabel)

    }
    tabel.sort((a, b) => a.membership_number.localeCompare(b.membership_number));
    setusertabel(tabel)
    GetUsertabel()
  }


  function saveOption(params) {
    Swal.fire({
      title: 'คุณต้องการที่จะบันทึกหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const error_list = alert_null();
        if (error_list.length > 0) {
          var err_message = "";
          for (var e = 0; e < error_list.length; e++) {
            err_message += "<br/>" + error_list[e].message;
          }
          Swal.fire("Error", err_message, "error");
        } else {
          if (mode.mode === "add") {
            const temp = {
              group_name: Groupdata.group_name.trim() || "",
              group_description: Groupdata.group_description || "",
              group_active: true,
              group_user: usertabel,
            }
            console.log(temp);
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
                url: Configs.API_URL_incentive + "/api/manageGroup/addUsergroup",
                headers: {
                  Authorization: 'Bearer ' + getToken(),
                  "X-TTT": Configs.API_TTT,
                  "Content-Type": "application/json",
                },
                data: temp,
              })
                .then(function (response) {
                  if (response.data) {
                    Swal.fire({
                      icon: "success",
                      text: "เสร็จสิ้น",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then((result) => {
                      window.location.href =
                        "/Human_Resource/incentive_hr_admin/manage_group";
                    });
                  }

                  //console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire("Error", "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis, "error");
                });
            });
          }
          if (mode.mode === "edit") {

            const temp = {
              id: Groupdata.id,
              group_name: Groupdata.group_name.trim() || "",
              group_description: Groupdata.group_description || "",
              group_user: usertabel,
            }
            console.log(temp);

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
                url: Configs.API_URL_incentive + "/api/manageGroup/editUsergroup",
                headers: {
                  Authorization: 'Bearer ' + getToken(),
                  "X-TTT": Configs.API_TTT,
                  "Content-Type": "application/json",
                },
                data: temp,
              })
                .then(function (response) {
                  if (response.data) {
                    Swal.fire({
                      icon: "success",
                      text: "เสร็จสิ้น",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then((result) => {
                      window.location.href =
                        "/Human_Resource/incentive_hr_admin/manage_group";
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire("Error", "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis, "error");
                });
            });
          }
        }
      }
    });

  }

  function alert_null() {
    var error_list = [];
    if (Groupdata.group_name.trim() == "") {
      let temp_err = {
        message: "กรุณากรอก Group Name"
      }
      error_list.push(temp_err);
      setgroup_name_null(true);
    }
    return error_list;
  }

  async function check_group_name(e) {
    if (e.target.value.trim() === "") {
      setGroupdata({
        ...Groupdata,
        group_name: e.target.value,
      });
      setgroup_name_err(false);
      setgroup_name_null(true);
    } else if (e.target.value.trim().match(/[`~%^&*!@#$()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g) != null) {
      setgroup_name_err(true);
      setgroup_name_null(false);
    } else {
      setGroupdata({
        ...Groupdata,
        group_name: e.target.value,
      });
      setgroup_name_err(false);
      setgroup_name_null(false);
    }
  }

  const rowsData = [];

  for (var index = 0; index < usertabel.length; index++) {
    const rowItem = {};
    rowItem["no"] = index + 1;
    rowItem["USer_name"] = usertabel[index].membership_name;
    rowItem["department"] = usertabel[index].department;
    rowItem["position"] = usertabel[index].position;
    rowItem["mgt"] = (
      <button
        type="button"
        onClick={chackusetabel.bind(this, usertabel[index].id)}
        disabled={disable}
        class="btn btn-block btn-danger"
      >
        <i class="">Remove</i>
      </button>
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
        label: "Username",
        field: "USer_name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Department",
        field: "department",
        sort: "asc",
        width: 50,
      },
      {
        label: "Position",
        field: "position",
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

  const rowsDatainpopup = [];

  for (var index = 0; index < usertabelin.length; index++) {
    const rowItem = {};
    rowItem["no"] = index + 1;
    rowItem["USer_name"] = usertabelin[index].membership_name;
    rowItem["department"] = usertabelin[index].department;
    rowItem["position"] = usertabelin[index].position;
    var check = usertabel.filter((e) => {
      return e.id === usertabelin[index].id;
    });
    if (check.length > 0) {
      rowItem["mgt"] = (
        <button
          type="button"
          onClick={chackusetabel.bind(this, usertabelin[index].id)}

          class="btn btn-block btn-danger"
        >
          <i class="">Remove</i>
        </button>
      );
    } else {
      rowItem["mgt"] = (
        <button
          type="button"
          onClick={chackusetabel.bind(this, usertabelin[index].id, usertabelin[index].membership_number, usertabelin[index].membership_name, usertabelin[index].department, usertabelin[index].position)}
          class="btn btn-block  btn-primary "
        >
          <i class="" style={{ "font-size": "19px;" }}>Select</i>
        </button>
      );
    }

    rowsDatainpopup.push(rowItem);
  }

  const datain = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Username",
        field: "USer_name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Department",
        field: "department",
        sort: "asc",
        width: 50,
      },
      {
        label: "Position",
        field: "position",
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
    rows: rowsDatainpopup,
  };

  function cancleOption(params) {
    Swal.fire({
      title: 'คุณมั่นใจว่าคุณจะออกจากหน้านี้ใช่หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          "/Human_Resource/incentive_hr_admin/manage_group";
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
                <h1>Group {pageMode}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Group</li>
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
              <h3 className="card-title">Group Detail</h3>
              <div className="card-tools"></div>
            </div>

            <div className="card-body">

              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={Groupdata.group_name}
                      disabled={disable}
                      onChange={(e) => {
                        check_group_name(e);
                      }}
                    />
                    <label>Group Name <span style={{ color: "red" }}>*</span></label>{" "}
                    {group_name_err ? <span style={{ color: "red" }}>*ห้ามกรอกตัวอักษรพิเศษ</span> : ""}
                    {group_name_null ? <span style={{ color: "red" }}>*กรุณากรอก Group Name</span> : ""}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      required
                      value={Groupdata.group_description}
                      disabled={disable}
                      onChange={(e) => {
                        setGroupdata({
                          ...Groupdata,
                          group_description: e.target.value,
                        });
                      }}

                    ></textarea>
                    <label>
                      Group Description
                    </label>
                  </div>
                </div>
              </div>

              <h3 className="mt-2 mt-5-head">
                Select User
              </h3>

              <div className="row mb-2">
                <div className="col-4 col-md-3 col-xl-2">
                  <div className="form-group ">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#modal-adduser"
                      disabled={disable}
                      className="btn btn-block btn-primary"
                      onClick={GetUsertabel}
                    >
                      Select User
                    </button>
                  </div>
                </div>
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


      <div className="modal fade" id="modal-adduser">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-label">User</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-md-2">
                  <div className="form-group ">

                    <input
                      type="text"
                      className="form-control"
                      required="false"
                      value={filteruser.membership_name}
                      onChange={(e) => {
                        setfilteruser({
                          ...filteruser,
                          membership_name: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="">Username</label>{" "}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group ">
                    <select
                      className="form-control custom-select select2"
                      type="text"
                      required
                      id="select_department"
                      value={departmentlist.id}
                      onChange={(e) => {
                        setfilteruser({
                          ...filteruser,
                          department: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled selected>
                        ----เลือก----
                      </option>
                      {departmentlist.map((el) => {
                        return (
                          <option value={el.id}>
                            {el.dep_name}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="">Department</label>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group ">
                    <select
                      className="form-control custom-select select2"
                      type="text"
                      required
                      id="select_position"
                      value={positionlist.emp_position}
                      onChange={(e) => {
                        setfilteruser({
                          ...filteruser,
                          position: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled selected>
                        ----เลือก----
                      </option>
                      {positionlist.map((el) => {
                        return (
                          <option value={el.emp_position}>
                            {el.emp_position}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="">Position</label>
                  </div>
                </div>

                <div className="col-4 col-md-3 col-xl-2">
                  <div className="form-group ">
                    <button
                      type="button"
                      className="btn btn-block btn-info  "
                      onClick={() => {
                        setMDBT(false);
                        GetUsertabel();
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
                      onClick={() => {
                        filteruser.membership_name = "";
                        filteruser.department = "";
                        filteruser.position = "";
                        document.getElementById("select_department").value = '';
                        document.getElementById("select_position").value = '';
                        setMDBT(false);
                        GetUsertabel();
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
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
                  data={datain}
                  disableRetreatAfterSorting={MDBT}
                />
              </div>
              <div className="row mb-2">
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    class="btn btn-block btn-secondary"
                    data-dismiss="modal" aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>


    </div>
  );
}
export default Manage_groupAdd;