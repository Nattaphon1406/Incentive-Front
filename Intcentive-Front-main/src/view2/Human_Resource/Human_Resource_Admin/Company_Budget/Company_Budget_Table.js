import React, { Component, useEffect, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Configs from "../../../../config";
import { useParams } from "react-router";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";
import NumberFormat from "react-number-format";

import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";

function Company_Budget_Table() {
  const [company_budget, setcompany_budget] = useState([]);
  const [filler_company_budget, setfiller_company_budget] = useState({
    cb_id: "",
    cb_budget_year: new Date().getFullYear(),
  });
  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);
  const [select_year, setselect_year] = useState([]);
  const [cb_budget_amount_errNum, setcb_budget_amount_errNum] = useState(false);
  const [cb_budget_amount_err, setcb_budget_amount_err] = useState(false);
  const [cb_budget_amount_null, setcb_budget_amount_null] = useState(false);

  const Getcompany_budgetData = async () => {
    var get_filler_company_budget = {
      oem_id: getOem(),
      company_id: getUser().com,
      cb_budget_year: filler_company_budget.cb_budget_year,
    };
    console.log(get_filler_company_budget);
    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/companybudget/filtercompanybudget",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_company_budget,
    })
      .then(function (response) {
        console.log(response.data, "Getcompany_budgetData");
        setcompany_budget(response.data.company_budget_list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetCompanyBudgetYear = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
    };

    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/companybudget/getCompanyBudgetYear",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        console.log(response.data, "GetCompanyBudgetYear");
        setselect_year(response.data.select_year);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetCompanyBudgetYear();
    Getcompany_budgetData();
  }, []);

  function deldata(id, year) {
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
        let check_del = {
          oem_id: getOem(),
          company_id: getUser().com,
          cb_id: id,
          cb_budget_year: year
        }
        console.log(check_del);
        axios({
          method: "post",
          url:
            Configs.API_URL_incentive +
            "/api/companybudget/delete_companybudget/",
          headers: {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
            "X-TTT": Configs.API_TTT,
          },
          data: check_del,
        })
          .then(function (response) {
            console.log(response);
            Swal.fire({
              icon: "success",
              text: "เสร็จสิ้น",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href =
                "/Human_Resource/incentive_hr_admin/company_budget";
            });
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis, "error");
          });
      }
    });
  }

  function addpage(params) {
    window.location.href =
      "/Human_Resource/incentive_hr_admin/company_budget_add";
  }

  const row_data = [];
  for (let index = 0; index < company_budget.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["bgy"] = company_budget[index].cb_budget_year;
    element["bga"] = (
      <div className="row"
      // style={{ "display": "flex", "justify-content": "flex-end", "max-width": "250px" }}
      >
        {currencyFormat(company_budget[index].cb_budget_amount)}
      </div>
    );
    element["udate"] = company_budget[index].create_date;
    element["mng"] = (
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            key={company_budget[index].cb_id}
            id={"btn_delete" + (index + 1)}
            className=" btn btn-xs "
            onClick={deldata.bind(this, company_budget[index].cb_id, company_budget[index].cb_budget_year)}
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    );
    row_data.push(element);
  }

  const clearFilter = async () => {
    await setfiller_company_budget({
      ...filler_company_budget,
      cb_budget_year: new Date().getFullYear(),
    });

    filler_company_budget.cb_budget_year = new Date().getFullYear();
    Getcompany_budgetData();
  };

  const data = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Budget Year",
        field: "bgy",
        sort: "asc",
        width: 50,
      },
      {
        label: "Budget Amount",
        field: "bga",
        sort: "asc",
        width: 50,
      },
      {
        label: "Create Date",
        field: "udate",
        sort: "asc",
        width: 50,
      },
      {
        label: "Management",
        field: "mng",
        sort: "asc",
        width: 50,
      },
    ],
    rows: row_data,
  };

  const [company_budget_data, setcompany_budget_data] = useState({
    cb_budget_year: "",
    cb_budget_amount: "",
  });
  const [pageMode, setPageMode] = useState("");
  const [mode, setmode] = useState({
    mode: "add",
  });
  const [disable, setdisable] = useState(null);
  const { id } = useParams();
  // const [test_data, setTest_data] = useState();
  useEffect(() => {
    if (mode.mode === "add") {
      setdisable(false);
      setPageMode("Add");
    } else if (mode.mode === "read") {
      setdisable(true);
      setPageMode("Read");
    } else {
      setdisable(false);
      setPageMode("Edit");
    }
    getCompanyBudget();
  }, []);
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const getCompanyBudget = async () => {
    if (mode.mode == "read" || mode.mode == "edit") {
      var temp = {
        cb_budget_year: id,
      };
      axios({
        method: "post",
        url: Configs.API_URL_incentive + "/api/companyBudget/getcompanybudget",
        headers: {
          Authorization: "Bearer " + getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
        data: temp,
      })
        .then(function (response) {
          console.log(response);
          setcompany_budget_data({
            cb_budget_year:
              response.data.company_budget_data_list[0].cb_budget_year,
            cb_budget_amount:
              response.data.company_budget_data_list[0].cb_budget_amount,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  function save_company_budget_data_data() {
    const error_list = [];
    if (company_budget_data.cb_budget_amount == "") {
      let temp_err = {
        message: "กรุณากรอก Budget Amount",
      };
      error_list.push(temp_err);
    }
    if (company_budget_data.cb_budget_year == "") {
      let temp_err = {
        message: "กรุณากรอก Budget Year",
      };
      error_list.push(temp_err);
    }
    if (error_list.length > 0) {
      var err_message = "";
      for (var e = 0; e < error_list.length; e++) {
        err_message += "<br/>" + error_list[e].message;
      }
      Swal.fire("Error", err_message, "error");
    } else {
      const temp = {
        oem_id: getOem(),
        company_id: getUser().com,
        cb_budget_amount: company_budget_data.cb_budget_amount.replace(/[$,]+/g, ""),
        cb_budget_year: company_budget_data.cb_budget_year.getFullYear(),
      };
      console.log("add", temp);
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
            Configs.API_URL_incentive + "/api/companyBudget/addcompanybudget",
          headers: {
            Authorization: "Bearer " + getToken(),
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
                  "/Human_Resource/incentive_hr_admin/company_budget";
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
  }

  function cancle_add_company_budget_data(params) {
    Swal.fire({
      title: "คุณมั่นใจว่าคุณจะออกจากหน้านี้ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `ใช่`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: `ไม่`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          "/Human_Resource/incentive_hr_admin/company_budget";
      }
    });
  }

  const CustomInput = ({ value, onClick }) => (
    <div className="input-group">
      <input
        type="text"
        className="form-control float-left"
        onClick={onClick}
        value={value}
        data-provide="datepicker"
        data-date-language="th-th"
      />{" "}
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="far fa-calendar-alt" />
        </span>

        {/*  <label>test</label> */}
      </div>
    </div>
  );

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  async function check_cb_budget_amount(e) {
    if (e === "") {
      setcompany_budget_data({
        ...company_budget_data,
        cb_budget_amount: e,
      });
      setcb_budget_amount_errNum(false);
      setcb_budget_amount_err(false);
      setcb_budget_amount_null(true);
    } else if (parseFloat(e) < 1) {
      setcb_budget_amount_errNum(true);
      setcb_budget_amount_err(false);
      setcb_budget_amount_null(false);
    } else if (isNaN(parseFloat(e))) {
      setcb_budget_amount_errNum(false);
      setcb_budget_amount_err(true);
      setcb_budget_amount_null(false);
    } else {
      setcompany_budget_data({
        ...company_budget_data,
        cb_budget_amount: e,
      });
      setcb_budget_amount_errNum(false);
      setcb_budget_amount_err(false);
      setcb_budget_amount_null(false);
    }
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Company Budget</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Human Resource</li>
                {/* <li className="breadcrumb-item active">
                  Intensive Point Admin
                </li> */}
                <li className="breadcrumb-item active">Company Budget</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-md-2">
              <div className="form-group ">
                <select
                  className="form-control custom-select select2"
                  type="text"
                  id="cb_budget_year"
                  value={filler_company_budget.cb_budget_year}
                  onChange={(e) => {
                    setfiller_company_budget({
                      ...filler_company_budget,
                      cb_budget_year: e.target.value,
                    });
                  }}
                >
                  {select_year.map((el) => {
                    return (
                      <option value={el.cb_budget_year}>
                        {el.cb_budget_year}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="">Budget Year</label>{" "}
              </div>
            </div>

            <div className="col-6 col-md-4 col-xl-2">
              <div className="form-group ">
                <button
                  type="button"
                  id="btn_search"
                  className="btn btn-block btn-info  "
                  onClick={() => {
                    Getcompany_budgetData();
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
                  className="btn btn-block btn-info  "
                  onClick={() => clearFilter()}
                >
                  Clear
                </button>
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
                      onClick={() => { }}
                      data-toggle="modal"
                      data-target="#modal-add-budget"
                      data-backdrop="static"
                      data-keyboard="false"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Total Budget : </h3>
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
              <div className="card-footer"></div>
            </div>
          </section>
        </div>

        <div className="modal fade" id="modal-add-budget">
          <div className="modal-dialog modal-ml">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Company Budget</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={async (date) => {
                    setcompany_budget_data({
                      ...company_budget_data,
                      cb_budget_year: "",
                      cb_budget_amount: "",
                    });
                    company_budget_data.cb_budget_year = "";
                    company_budget_data.cb_budget_amount = "";
                    setcb_budget_amount_errNum(false);
                    setcb_budget_amount_err(false);
                    setcb_budget_amount_null(false);
                  }}
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="ml-2" style={{ textAlign: "right" }}>
                      <label className="mt-3" htmlFor="">Budget Year
                        <span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="mt-2 ml-2" style={{ "z-index": "99" }}>
                      <DatePicker
                        selected={company_budget_data.cb_budget_year}
                        disabled={disable}
                        id="start_date"
                        dateFormat="yyyy"
                        locale="th"
                        onChange={
                          async (date) => {
                            setcompany_budget_data({
                              ...company_budget_data,
                              cb_budget_year: date,
                            });
                            company_budget_data.cb_budget_year = date;
                          }
                        }
                        startDate={new Date()}
                        minDate={new Date().setFullYear(new Date().getFullYear() - 1)}
                        showYearPicker
                        customInput={<CustomInput />}
                      ></DatePicker>
                      <div className="ml-1">
                        {/* {news_start_date_null ? <span style={{ color: "red" }}>*กรุณาเลือกวันเริ่มต้น</span> : ""} */}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-8">
                      <div className="form-group ">
                        <NumberFormat
                          className="form-control"
                          value={company_budget_data.cb_budget_amount}
                          required
                          id="budget_amount"
                          thousandSeparator={true}
                          decimalScale={2}
                          allowLeadingZeros={false}
                          onChange={(e) => {
                            check_cb_budget_amount(e.target.value.trim())
                          }}
                        />
                        <label htmlFor="">Budget Amount <span style={{ color: "red" }}>*</span></label>{" "}
                        {cb_budget_amount_errNum ? <span style={{ color: "red" }}>*กรุณากรอก Budget Amount มากกว่า 0</span> : ""}
                        {cb_budget_amount_err ? <span style={{ color: "red" }}>*กรุณากรอก Budget Amount เป็นตัวเลขเท่านั้น</span> : ""}
                        {cb_budget_amount_null ? <span style={{ color: "red" }}>*กรุณากรอก Budget Amount</span> : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-between">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md-4 col-xl-2">
                      <div className="form-group ">
                        {company_budget_data.cb_budget_year != ''
                          && company_budget_data.cb_budget_amount != ''
                          && cb_budget_amount_errNum == false
                          && cb_budget_amount_err == false
                          && cb_budget_amount_null == false ?
                          <button
                            type="button"
                            id="btn_add"
                            className="btn btn-block btn-primary"
                            onClick={save_company_budget_data_data}
                            data-dismiss="modal"
                            style={{ float: "right" }}
                          >
                            Add
                          </button>
                          : <button
                            type="button"
                            id="btn_add"
                            disabled={true}
                            className="btn btn-block btn-primary"
                            style={{ float: "right" }}
                          >
                            Add
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Company_Budget_Table;
