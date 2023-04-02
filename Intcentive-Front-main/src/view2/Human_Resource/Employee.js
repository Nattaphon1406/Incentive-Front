import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../config";
import { getOem, getToken, getUser, getAcademy } from "../../Utils/Common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function Employee(params) {
  const [Employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [filler_employee, setfiller_employee] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    emp_no: "",
    emp_name_th: "",
    emp_type_id: "",
  });

  const [emptype, setemptype] = useState([]);

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const [template_stats_text, set_template_stats_text] = useState("");
  const [cltext, setcltext] = useState("");
  const [template_name, set_template_name] = useState("");
  const [exlx_detail_view, set_exlx_detail_view] = useState([]);
  const [exlx_detail_status, set_exlx__detail_status] = useState({
    success: "",
    not_success: "",
  });
  const [externaldata, setexternaldata] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    data_list: "",
  });

  const upload_file_exlx = async (e) => {
    if (e.target.files[0]) {
      var data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("file_name", e.target.files[0].name);

      data.append("oem_id", getOem());
      data.append("company_id", getUser().com);
      console.log("list", data);

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
          url:
            Configs.API_URL_hrMagenatement +
            "/api/hrManagement/importEmployeeFile",
          headers: {
            Authorization: getToken(),
            "X-TTT": Configs.API_TTT,
            "Content-Type": "application/json",
          },
          data: data,
        })
          .then(function (response) {
            console.log("ดาต้า", response.data);

            if (response.data) {
              var check = response.data.data.filter((e) => {
                return e.is_success === false;
              });
              var check2 = response.data.data.filter((e) => {
                return e.is_success === true;
              });

              set_exlx__detail_status({
                ...exlx_detail_status,
                success: check2.length,
                not_success: check.length,
              });
              // set_template_name("ทดสอบโมเดว รอดาต้าจริง");
              setcltext("green");
              set_template_stats_text("ตรง Template");
              set_exlx_detail_view(response.data.data); //เปิดเมื่อดาต้าพร้อม
              set_template_name(response.data.template_result);

              Swal.fire(
                "อัพโหลด ไฟล์ สำเร็จ",
                "ไฟล์ ได้ถูกอัพโหลดเข้าฐานข้อมูลเรียบร้อย",
                "susccess"
              ).then((result) => {
                toggle_modal();
              });
            }
            document.getElementById("import_external_file_input").value = "";

            /*  getexternaldate(); */
          })
          .catch(function (error) {
            set_template_stats_text("ไม่ตรง Template");
            setcltext("red");
            console.log(error);
            Swal.fire("Error", error.response.data.message, "error");
            document.getElementById("import_external_file_input").value = "";
            /* getexternaldate(); */
          });
      });
    }
  };

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
        /*   console.log(response.data); */
        setCompany(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetEmployee = async () => {
    var get_filler_employee = {
      oem_id: getOem(),
      company_id: getUser().com,
      emp_no: filler_employee.emp_no.trim(),
      emp_name_th: filler_employee.emp_name_th.trim(),
      emp_type_id: filler_employee.emp_type_id.trim(),
    };
    //console.log(filler_employee);
    axios({
      method: "post",
      url: Configs.API_URL_hrMagenatement + "/api/hrManagement/filterEmployee",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_employee,
    })
      .then(function (response) {
        console.log(response.data, "ds");
        setEmployee(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetemployeeTyer = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
    };
    /*  console.log("get_com_oem",get_com_oem); */
    axios({
      method: "post",
      url: Configs.API_URL_hrMagenatement + "/api/hrManagement/getEmployeeType",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        /*  console.log(response.data.data,"dddd"); */
        setemptype(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetEmployee();
    GetCompany();
    GetemployeeTyer();
  }, []);

  const clearFilter = async () => {
    await setfiller_employee({
      ...filler_employee,
      emp_no: "",
      emp_name_th: "",
      emp_type_id: "",
    });

    filler_employee.emp_no = "";
    filler_employee.emp_name_th = "";
    filler_employee.emp_type_id = "";
    GetEmployee();
  };

  function addpage(params) {
    window.location.href = "/Human_Resource/Employee/add";
  }

  function deldata(id) {
    console.log("id", id);
    Swal.fire({
      title: "คุณต้องการลบข้อมูลใช่หรือไม่?",
      text: "ข้อมูลที่ถูกลบจะไม่สามารถนำกลับมาได้กรุณาตรวจสอบให้ชัดเจนก่อลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: `ไม่`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "get",
          url:
            Configs.API_URL_hrMagenatement +
            "/api/hrManagement/delEmployeeById?id=" +
            id,
          headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
            "X-TTT": Configs.API_TTT,
          },
        })
          .then(function (response) {
            Swal.fire({
              icon: "success",
              text: "เสร็จสิ้น",
            }).then(() => {
              window.location.href = "/Human_Resource/Employee";
            });
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
          });
      }
    });
  }

  const rowsData = [];
  /*   console.log(Employee,"ds"); */
  for (var index = 0; index < Employee.length; index++) {
    const rowItem = {};
    rowItem["no"] = index + 1;

    rowItem["emp_name_th"] = Employee[index].emp_name_th || null;
    rowItem["emp_no"] = Employee[index].emp_no || null;
    rowItem["emp_period_time"] = Employee[index].emp_period_time || null;
    rowItem["emp_salary"] =
      parseFloat(Employee[index].emp_salary || 0)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท";
    rowItem["emp_email"] = Employee[index].emp_email || null;
    rowItem["emp_line"] = Employee[index].emp_line || null;
    rowItem["emp_mobile"] = (
      <>
        <a href={"tel:" + Employee[index].emp_mobile}>
          {Employee[index].emp_mobile}
        </a>
      </>
    );
    if (Employee[index].emp_is_connect == true) {
      rowItem["emp_is_connect"] = (
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="btn btn-block btn-success"
            /*  disabled = {true} */
          >
            เชื่อมแล้ว
          </button>
        </div>
      );
    } else {
      rowItem["emp_is_connect"] = (
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="btn btn-block btn-danger"
            /* disabled = {true} */
          >
            ไม่เชื่อม
          </button>
        </div>
      );
    }

    rowItem["mgt"] = (
      <div className="row" style={{flexWrap:"nowrap"}}>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={"/Human_Resource/Employee/read/" + Employee[index].emp_id}
            id="btn_read"
            key={Employee[index].emp_id}
            className="btn btn-xs "
          >
            <i class="fas fa-eye"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={"/Human_Resource/Employee/edit/" + Employee[index].emp_id}
            id="btn_edit"
            key={Employee[index].emp_id}
            className=" btn btn-xs "
          >
            {"   "}
            <i class="fas fa-pencil-alt"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            key={Employee[index].emp_id}
            id="btn_delete"
            className=" btn btn-xs "
            onClick={deldata.bind(this, Employee[index].emp_id)}
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
        label: "ลำดับ",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "ชื่อ ~ นามสกุล ",
        field: "emp_name_th",
        sort: "asc",
        width: 50,
      },
      {
        label: "รด/รหัส",
        field: "emp_no",
        sort: "asc",
        width: 50,
      },
      {
        label: "ประเภท",
        field: "emp_period_time",
        sort: "asc",
        width: 50,
      },
      {
        label: "อัตราเงินเดือน",
        field: "emp_salary",
        sort: "asc",
        width: 50,
      },
      {
        label: "Email",
        field: "emp_email",
        sort: "asc",
        width: 50,
      },
      {
        label: "Line",
        field: "emp_line",
        sort: "asc",
        width: 50,
      },
      {
        label: "เบอร์ติดต่อ",
        field: "emp_mobile",
        sort: "asc",
        width: 50,
      },
      {
        label: "เชื่อม Face",
        field: "emp_is_connect",
        sort: "asc",
        width: 50,
      },
      {
        label: "จัดการ",
        field: "mgt",
        sort: "asc",
        width: 80,
      },
    ],
    rows: rowsData,
  };

  const pad_cync_connect = async () => {
    /* 

    Swal.fire({
      icon: "success",
      text: Employee.length,
    }); */
    let employee_id = { employee_id: [] };
    Employee.forEach((element) => {
      employee_id.employee_id.push(element.emp_id);
    });
    let allPad = [];
    let status_api = "";
    await axios({
      method: "get",
      url:
        Configs.API_URL_hrMagenatement +
        "/config?company_id=" +
        getUser().com +
        "&&oem_id=" +
        getOem(),
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        response.data.data.sort((a, b) => a.pad_name.localeCompare(b.pad_name));
        /* console.log("ฟีลเตอร์", response.data.data); */
        /*  set_Log_pad_connection(response.data.data); */
        allPad = response.data.data.filter((e) => {
          return e.is_active === true && e.is_use === true;
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    /* console.log("allPad",allPad); */
    if (allPad.length > 0 && employee_id.employee_id.length > 0) {
      /*  console.log("allPad", allPad);
      console.log("employee_id", employee_id); */
      for (const elementData of allPad) {
        /* console.log("employee_id2",elementData.id); */
        await axios({
          method: "post",
          url:
            Configs.API_URL_hrMagenatement +
            "/pad/personnel/findPersonnelName?pad_id=" +
            elementData.id,
          headers: {
            Authorization: "Bearer " + getToken(),
            "X-TTT": Configs.API_TTT,
            "Content-Type": "application/json",
          },
          data: employee_id,
        })
          .then(function (response) {
            if (response.data.status === "success") {
              status_api = "success";
            } else {
              status_api = "fail";
            }
            /* console.log(response.data); */
          })
          .catch(function (error) {
            console.log(error);
          });

        if (status_api === "success") {
          let timerInterval;
          Swal.fire({
            title: "Updating !!!",
            html: "Data is updating progress.",
            timer: 20000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              window.location.href = "/Human_Resource/Employee";
            }
          });
        } else {
          Swal.fire({
            icon: "warning",
            text: "ไม่มึพนักงาน หรือ ไม่พบข้องมูล Pad2",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "ไม่มึพนักงาน หรือ ไม่พบข้องมูล Pad1",
      });
    }
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
                <h1>ข้อมูลพนักงาน</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">Employee</li>
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
                    id="text_empid"
                    required="false"
                    value={filler_employee.emp_no}
                    onChange={(e) => {
                      setfiller_employee({
                        ...filler_employee,
                        emp_no: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="">รด/รหัส</label>{" "}
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control"
                    required="false"
                    id="text_empname"
                    value={filler_employee.emp_name_th}
                    onChange={(e) => {
                      setfiller_employee({
                        ...filler_employee,
                        emp_name_th: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="">ชือพนักงาน</label>{" "}
                </div>
              </div>

              <div
                className="col-md-2 col-sm-12 col-lg-2"
                style={{ "z-index": "99" }}
              >
                <div className="form-group ">
                  <select
                    className="form-control custom-select select2"
                    type="text"
                    required
                    id="drop_emptype"
                    value={filler_employee.emp_type_id}
                    onChange={(e) => {
                      setfiller_employee({
                        ...filler_employee,
                        emp_type_id: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled selected></option>
                    {emptype.map((el) => {
                      return (
                        <option value={el.period_time_id}>
                          {el.period_time}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor=""> ประเภทพนักงาน</label>
                </div>
              </div>
              <div className="col-6 col-md-4 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    id="btn_search"
                    className="btn btn-block btn-info  "
                    onClick={() => {
                      GetEmployee();
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="col-6 col-md-4 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    id="btn_clear"
                    className="btn btn-block btn-info"
                    onClick={() => clearFilter()}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-6 col-md-4 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    id="btn_add"
                    className="btn btn-block btn-primary"
                    onClick={addpage}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="col-6 col-md-4 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    id="btn_import_excel"
                    className="btn btn-block btn-primary"
                    data-toggle="modal"
                    data-target="#modal-importexcel"
                    /*   onClick={ImportExcel} */
                  >
                    Import Excel
                  </button>
                </div>
              </div>

              <div className="modal fade" id="modal-importexcel">
                <div className="modal-dialog modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Import Excel</h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        //onClick={set_bomlist_excel}
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-12 ">
                          <div className="none-nolmalinput"></div>

                          <div className="col-12">
                            <label htmlFor="">ไฟล์ภายนอก:</label>
                            <small style={{ color: "red" }}>
                              ** เทมเพลตรูปแบบ Excel **
                            </small>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  // onClick={clickclear}
                                  type="file"
                                  required
                                  //disabled={externaldata.template === "" || externaldata.template === "ค่าซ่อม.xlsx"  ? true : false}
                                  className="custom-file-input"
                                  id="import_external_file_input"
                                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                  onChange={upload_file_exlx}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="import_external_file_input"
                                >
                                  {externaldata.file_name !== null &&
                                  externaldata.file_name !== "" &&
                                  externaldata.file_name !== undefined
                                    ? externaldata.file_name
                                    : "Select File"}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-dismiss="modal"
                        /*  onClick={ImportExcel} */
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-3 col-xl-2">
                <div className="form-group ">
                  <button
                    type="button"
                    className="btn btn-block btn-info"
                    onClick={pad_cync_connect}
                  >
                    Sync Face Recognition
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-header">
              {/* <h3 className="card-title">Project</h3> */}
              <div className="card-tools"></div>
            </div>

            <div className="card-body">
              <div
                className="table-responsive "
                style={{ whiteSpace: "nowrap" }}
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
            </div>
            <Modal
              isOpen={modal}
              toggle={toggle_modal}
              className="modal-dialog modal-xl"
            >
              <ModalHeader toggle={toggle_modal}>
                <h1>
                  รายการ {template_name} ::: [{" "}
                  <font color="green">สำเร็จ {exlx_detail_status.success}</font>{" "}
                  /{" "}
                  <font color="red">
                    {" "}
                    ไม่สำเร็จ {exlx_detail_status.not_success}
                  </font>
                  ]
                </h1>
              </ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-4">
                    <label>ตารางแสดงสถานะการอัพเดต {template_name}</label>
                  </div>
                </div>
                <div className="table-responsive" style={{ height: "500px" }}>
                  <MDBTable striped hover bordered small searching={true}>
                    <MDBTableHead>
                      <tr>
                        <th>No.</th>
                        <th>ชื่อ (ไทย)</th>
                        <th>ชื่อ (อังกฤษ)</th>
                        <th>เวลาทำงาน</th>
                        <th>เงินเดื่อน</th>
                        <th>สถานะ</th>
                        <th>email</th>
                        <th>line</th>
                        <th>เบอร์โทรศัทพ์</th>
                        <th>หมายเหตุ</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {exlx_detail_view.map((el, index) => {
                        var color;
                        var text_status;
                        if (el.is_success === false) {
                          color = "red";
                          text_status = "ไม่สำเร็จ";
                        } else {
                          color = "green";
                          text_status = "สำเร็จ";
                        }
                        return (
                          <tr id={index}>
                            <td>
                              <font color={color}>{el.emp_no}</font>
                            </td>
                            <td>
                              <font color={color}>{el.emp_name_th}</font>
                            </td>
                            <td>
                              <font color={color}>{el.emp_name_eng}</font>
                            </td>
                            <td>
                              <font color={color}>{el.time_working}</font>
                            </td>
                            <td>
                              <font color={color}>{el.salary}</font>
                            </td>
                            <td>
                              <font color={color}>{el.status}</font>
                            </td>
                            <td>
                              <font color={color}>{el.email}</font>
                            </td>
                            <td>
                              <font color={color}>{el.line}</font>
                            </td>
                            <td>
                              <font color={color}>{el.mobile}</font>
                            </td>
                            <td>
                              <font color={color}>{el.remark}</font>
                            </td>
                          </tr>
                        );
                      })}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </ModalBody>
              <ModalFooter>
                {/*  <Button color="primary" onClick={toggle_modal}>Do Something</Button>{' '} */}
                <Button color="secondary" onClick={toggle_modal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>

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

export default Employee;
