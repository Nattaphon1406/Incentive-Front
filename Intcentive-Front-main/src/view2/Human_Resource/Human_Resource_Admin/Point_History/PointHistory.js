import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../../../config";
import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { async } from "q";


function PointHistory(params) {
  var start_date = moment(new Date()).startOf('month')
  var end_date = moment(new Date()).endOf('month')
  const [award_point, setaward_point] = useState([]);
  const [filler_award_point, setfiller_award_point] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    ap_point_id: "",
    ap_point_name: "",
    gp_date_from: "",
    gp_date_to: "",
    user_receive_point: "",
  });
  const [thank_point, setthank_point] = useState([]);
  const [filler_thank_point, setfiller_thank_point] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    tp_point_id: "",
    tp_point_name: "",
    tph_date_from: "",
    tph_date_to: "",
    user_give_point: "",
    user_receive_point: "",
  });
  const [user_data, setuser_data] = useState([]);
  const [user_data_give, setuser_data_give] = useState([]);
  const [user_data_receive, setuser_data_receive] = useState([]);

  async function SetDate_start_thank_point(date) {
    setfiller_thank_point({ ...filler_thank_point, tph_date_to: date });
    console.log(filler_thank_point);
  }
  async function SetDate_end_thank_point(date) {
    setfiller_thank_point({ ...filler_thank_point, tph_date_from: date });
    console.log(filler_thank_point);
  }

  const CheckInputUserAwardPoint = async () => {
    if (filler_award_point.user_receive_point.trim() == '') {
      GetAwardPointData();
    } else {
      GetAwardPointDataByUser();
    }
  }

  const GetAwardPointData = async () => {
    var get_filler_award_point = {
      oem_id: getOem(),
      company_id: getUser().com,
      ap_point_id: filler_award_point.ap_point_id.trim(),
      ap_point_name: filler_award_point.ap_point_name.trim(),
      gp_date_from: filler_award_point.gp_date_from || null,
      gp_date_to: filler_award_point.gp_date_to || null,
    };
    console.log(get_filler_award_point);
    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/pointHistory/filterAwardPointHistory",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_award_point,
    }).then(function (response) {
      console.log(response.data.point_history_list, "GetAwardPointData");
      setaward_point(response.data.point_history_list);
      if (response.data.point_history_list.length != 0) {
        var req_employee = [];
        for (let i = 0; i < response.data.point_history_list.length; i++) {
          req_employee.push(response.data.point_history_list[i].gp_emp_id);
        }
        var employee = {
          employee: req_employee,
        };
        axios({
          method: "post",
          url: Configs.API_URL_getEmployeeList,
          headers: {
            Authorization: "Bearer " + getToken(),
            "X-TTT": Configs.API_TTT,
            "Content-Type": "application/json",
          },
          data: employee,
        })
          .then(function (response) {
            console.log(response.data, "GetEmployeeList");
            setuser_data(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetAwardPointDataByUser = async () => {
    var get_filler_award_point = {
      oem_id: getOem(),
      company_id: getUser().com,
      ap_point_id: filler_award_point.ap_point_id.trim(),
      ap_point_name: filler_award_point.ap_point_name.trim(),
      gp_date_from: filler_award_point.gp_date_from || null,
      gp_date_to: filler_award_point.gp_date_to || null,
      user_receive_point: filler_award_point.user_receive_point.trim(),
    };
    console.log(get_filler_award_point);
    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/pointHistory/filterAwardPointHistoryByUser",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_award_point,
    }).then(function (response) {
      console.log(response.data.point_history_list, "GetAwardPointData");
      setaward_point(response.data.point_history_list);
      console.log(response.data.user_list, "GetEmployeeList");
      setuser_data(response.data.user_list);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const CustomInput = ({ value, onClick }) => (
    <div className="input-group">
      <input
        type="text"
        className="form-control float-left"
        onClick={onClick}
        value={value}
      />{" "}
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="far fa-calendar-alt" />
        </span>
      </div>
    </div>
  );

  const CheckInputUserThankPoint = async () => {
    if (filler_thank_point.tph_date_from == '' && filler_thank_point.tph_date_to != '') {
      Swal.fire("Error", "คุณต้องเลือกทั้งวันที่เริ่มต้นกับวันที่สิ้นสุด", "error");
    } else if (filler_thank_point.tph_date_from != '' && filler_thank_point.tph_date_to == '') {
      Swal.fire("Error", "คุณต้องเลือกทั้งวันที่เริ่มต้นกับวันที่สิ้นสุด", "error");
    } else {
      GetThankPointData();
    }
  }

  const GetThankPointData = async () => {
    var get_filler_thank_point = {
      oem_id: getOem(),
      company_id: getUser().com,
      tp_point_id: filler_thank_point.tp_point_id.trim(),
      tp_point_name: filler_thank_point.tp_point_name.trim(),
      tph_date_from: filler_thank_point.tph_date_from || null,
      tph_date_to: filler_thank_point.tph_date_to || null,
      user_give_point: filler_thank_point.user_give_point.trim(),
      user_receive_point: filler_thank_point.user_receive_point.trim(),
    };
    console.log(get_filler_thank_point);
    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/pointHistory/filterThankPointHistory",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_thank_point,
    }).then(function (response) {
      console.log(response.data, "GetThankPointData");
      setthank_point(response.data.point_history_list);
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetAwardPointData();
  }, []);

  const clearFilterAward = async () => {
    await setfiller_award_point({
      ...filler_award_point,
      ap_point_id: "",
      ap_point_name: "",
      gp_date_from: "",
      gp_date_to: "",
      user_receive_point: "",
    });

    filler_award_point.ap_point_id = "";
    filler_award_point.ap_point_name = "";
    filler_award_point.gp_date_from = "";
    filler_award_point.gp_date_to = "";
    filler_award_point.user_receive_point = "";
    GetAwardPointData();
  };

  const clearFilterThank = async () => {
    await setfiller_thank_point({
      ...filler_thank_point,
      tp_point_id: "",
      tp_point_name: "",
      tph_date_from: "",
      tph_date_to: "",
      user_give_point: "",
      user_receive_point: "",
    });

    filler_thank_point.tp_point_id = "";
    filler_thank_point.tp_point_name = "";
    filler_thank_point.tph_date_from = "";
    filler_thank_point.tph_date_to = "";
    filler_thank_point.user_give_point = "";
    filler_thank_point.user_receive_point = "";
    GetThankPointData();
  };

  const row_award_data = [];
  for (let index = 0; index < award_point.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["id"] = award_point[index].ap_point_id;
    element["name"] = award_point[index].ap_point_name;
    element["ap"] = award_point[index].ap_point;
    element["date"] = award_point[index].date;
    for (let i = 0; i < user_data.length; i++) {
      if (user_data[i] != null) {
        if (user_data[i].id == award_point[index].gp_emp_id) {
          element["userReceive"] = user_data[i].emp_name_th;
        }
      }
    }
    element["remark"] = award_point[index].gp_remark;
    row_award_data.push(element);
  }

  const award_data = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Award Point ID",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Award Point Name",
        field: "name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Award Point",
        field: "ap",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 50,
      },
      {
        label: "User Receive Point",
        field: "userReceive",
        sort: "asc",
        width: 50,
      },
      {
        label: "Remark",
        field: "remark",
        sort: "asc",
        width: 50,
      },
    ],
    rows: row_award_data,
  };

  const row_thank_data = [];
  for (let index = 0; index < thank_point.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["id"] = thank_point[index].tp_point_id;
    element["name"] = thank_point[index].tp_point_name;
    element["point"] = thank_point[index].tp_point;
    element["ap"] = thank_point[index].tp_point;
    element["date"] = thank_point[index].date;
    element["userGive"] = thank_point[index].give_name;
    element["userReceive"] = thank_point[index].receive_name;
    element["remark"] = thank_point[index].tph_remark;
    row_thank_data.push(element);
  }

  const thank_data = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Thank Point ID",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Thank Point Name",
        field: "name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Thank Point",
        field: "ap",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 50,
      },
      {
        label: "User Give Point",
        field: "userGive",
        sort: "asc",
        width: 50,
      },
      {
        label: "User Receive Point",
        field: "userReceive",
        sort: "asc",
        width: 50,
      },
      {
        label: "Remark",
        field: "remark",
        sort: "asc",
        width: 50,
      },
    ],
    rows: row_thank_data,
  };

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Point History</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">Point History</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div class="card card-primary card-outline card-outline-tabs">
          <div class="card-header p-0 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
              <li class="nav-item active">
                <a
                  class="nav-link active"
                  id="custom-tabs-award-point-tab"
                  data-toggle="pill"
                  href="#custom-tabs-award-point"
                  role="tab"
                  aria-controls="custom-tabs-award-point"
                  aria-selected="true"
                  onClick={() => {
                    clearFilterAward();
                  }}
                >
                  Award Point
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="custom-tabs-thank-point-tab"
                  data-toggle="pill"
                  href="#custom-tabs-thank-point"
                  role="tab"
                  aria-controls="custom-tabs-thank-point"
                  aria-selected="false"
                  onClick={() => {
                    clearFilterThank();
                  }}
                >
                  Thank Point
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="custom-tabs-four-tabContent">
              <div
                class="tab-pane fade show active"
                id="custom-tabs-award-point"
                role="tabpanel"
                aria-labelledby="custom-tabs-award-point"
              >
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_ap_point_id"
                          required="false"
                          value={filler_award_point.ap_point_id}
                          onChange={(e) => {
                            setfiller_award_point({
                              ...filler_award_point,
                              ap_point_id: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">Award Point ID</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_ap_point_name"
                          required="false"
                          value={filler_award_point.ap_point_name}
                          onChange={(e) => {
                            setfiller_award_point({
                              ...filler_award_point,
                              ap_point_name: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">Award Point Name</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_user_receive_point"
                          required="false"
                          value={filler_award_point.user_receive_point}
                          onChange={(e) => {
                            setfiller_award_point({
                              ...filler_award_point,
                              user_receive_point: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">User Receive Point</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-6" >
                      <div className="row">
                        <div className="col-1.5 ml-2" style={{ textAlign: "right" }}>
                          <label className="mt-3" htmlFor="">Start Date</label>
                        </div>
                        <div className="col-3 mt-2" style={{ "z-index": "99" }}>
                          <DatePicker
                            selected={filler_award_point.gp_date_from}
                            dateFormat={"dd-MM-yyyy"}
                            id="date-picker-start"
                            onChange={
                              async (date) => {
                                if (filler_award_point.gp_date_to != '' && date > filler_award_point.gp_date_to) {
                                  setfiller_award_point({
                                    ...filler_award_point,
                                    gp_date_to: date,
                                  });
                                  filler_award_point.gp_date_to = '';
                                }
                                setfiller_award_point({
                                  ...filler_award_point,
                                  gp_date_from: date,
                                });
                                filler_award_point.gp_date_from = date;
                              }
                            }
                            showYearDropdown
                            showMonthDropdown
                            customInput={<CustomInput />}

                          />
                        </div>
                        <div className="col-1.5 ml-2" style={{ textAlign: "right" }}>
                          <label className="mt-3" htmlFor="">End Date</label>
                        </div>
                        <div className="col-3 mt-2" style={{ "z-index": "99" }}>
                          <DatePicker
                            selected={filler_award_point.gp_date_to}
                            dateFormat={"dd-MM-yyyy"}
                            id="date-picker-end"
                            onChange={
                              async (date) => {
                                setfiller_award_point({
                                  ...filler_award_point,
                                  gp_date_to: date,
                                });
                                filler_award_point.gp_date_to = date;
                              }

                            }
                            showYearDropdown
                            showMonthDropdown
                            minDate={filler_award_point.gp_date_from}
                            customInput={<CustomInput />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="form-group ">
                        <button
                          type="button"
                          id="btn_search"
                          className="btn btn-block btn-info  "
                          onClick={() => {
                            CheckInputUserAwardPoint();
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
                          onClick={() => clearFilterAward()}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
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
                    data={award_data}
                  />
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="custom-tabs-thank-point"
                role="tabpanel"
                aria-labelledby="custom-tabs-thank-point-tab"
              >
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_tp_point_id"
                          required="false"
                          value={filler_thank_point.tp_point_id}
                          onChange={(e) => {
                            setfiller_thank_point({
                              ...filler_thank_point,
                              tp_point_id: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">Thank Point ID</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_tp_point_name"
                          required="false"
                          value={filler_thank_point.tp_point_name}
                          onChange={(e) => {
                            setfiller_thank_point({
                              ...filler_thank_point,
                              tp_point_name: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">Thank Point Name</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_user_give_point"
                          required="false"
                          value={filler_thank_point.user_give_point}
                          onChange={(e) => {
                            setfiller_thank_point({
                              ...filler_thank_point,
                              user_give_point: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">User Give Point</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          id="text_user_receive_point"
                          required="false"
                          value={filler_thank_point.user_receive_point}
                          onChange={(e) => {
                            setfiller_thank_point({
                              ...filler_thank_point,
                              user_receive_point: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="">User Receive Point</label>{" "}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-1.5 ml-2" style={{ textAlign: "right" }}>
                          <label className="mt-3" htmlFor="">Start Date</label>
                        </div>
                        <div className="col-md-4 mt-2" style={{ "z-index": "99" }}>
                          <DatePicker
                            selected={filler_thank_point.tph_date_from}
                            id="date-picker-start"
                            dateFormat={"dd-MM-yyyy"}
                            onChange={
                              async (date) => {
                                if (filler_thank_point.tph_date_to != '' && date > filler_thank_point.tph_date_to) {
                                  setfiller_thank_point({
                                    ...filler_thank_point,
                                    tph_date_to: '',
                                  });
                                  filler_thank_point.tph_date_to = '';
                                }
                                setfiller_thank_point({
                                  ...filler_thank_point,
                                  tph_date_from: date,
                                });
                                filler_thank_point.tph_date_from = date;
                              }
                            }
                            showYearDropdown
                            showMonthDropdown
                            customInput={<CustomInput />}
                          />
                        </div>
                        <div className="col-1.5 ml-2" style={{ textAlign: "right" }}>
                          <label className="mt-3" htmlFor="">End Date</label>
                        </div>
                        <div className="col-md-4 mt-2" style={{ "z-index": "99" }}>
                          <DatePicker
                            selected={filler_thank_point.tph_date_to}
                            id="date-picker-end"
                            dateFormat={"dd-MM-yyyy"}
                            onChange={
                              async (date) => {
                                setfiller_thank_point({
                                  ...filler_thank_point,
                                  tph_date_to: date,
                                });
                                filler_thank_point.tph_date_to = date;
                              }

                            }
                            showYearDropdown
                            showMonthDropdown
                            minDate={filler_thank_point.tph_date_from}
                            customInput={<CustomInput />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 col-md-4 col-xl-2">
                      <div className="form-group ">
                        <button
                          type="button"
                          id="btn_search"
                          className="btn btn-block btn-info  "
                          onClick={() => {
                            GetThankPointData();
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
                          onClick={() => clearFilterThank()}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                    data={thank_data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointHistory;
