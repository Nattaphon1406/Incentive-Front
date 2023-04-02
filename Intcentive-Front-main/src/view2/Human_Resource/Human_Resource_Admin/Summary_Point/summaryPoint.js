import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React, { Component, useEffect, useState, useRef } from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import { Chart } from "react-google-charts";
import Select from "react-select";
import moment from "moment";

function SummaryPoint(params) {
  var start_date = moment(new Date()).startOf("month");
  var end_date = moment(new Date()).endOf("month");
  const [filter_data, setfilter_data] = useState({
    start_date: new Date(start_date),
    end_date: new Date(end_date),
    department_id: "",
  });

  const [dataNotChart, setDataNotChart] = useState({
    total_point: "",
    balance_point: "",
    award_point_trans: "",
    thank_point_trans: "",
    redeem_point: "",
  });

  const [option_department_point_chart, setoption_department_point_chart] =
    useState({
      title: "",
    });
  const [data_department_point, setdata_department_point] = useState([
    /*      ["Task", "Hours per Day"],
             ["Work", 11],
             ["Eat", 2],
             ["Commute", 2],
             ["Watch TV", 2],
             ["Sleep", 7], */
  ]);

  const [option_award_point_chart, setoption_award_point_chart] = useState({
    title: "",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "",
    },
  });
  const [data_award_point, setdata_award_point] = useState([]);

  const [data_user_point, setdata_user_point] = useState([]);

  const [option_redeem_product_chart, setoption_redeem_product_chart] =
    useState({
      title: "",
      chartArea: { width: "50%" },
      hAxis: {
        title: "Total",
        minValue: 0,
      },
      vAxis: {
        title: "",
      },
    });
  const [data_redeem_product, setdata_redeem_product] = useState([]);

  const [option_thank_chart, setoption_thank_chart] = useState({
    title: "",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "",
    },
  });

  const [data_thank_point, setdata_thank_point] = useState([]);

  const [option_category_chart, setoption_category_chart] = useState({
    title: "",
    pieHole: 0.5,
  });

  const [data_category_point, setdata_category_point] = useState([]);

  const [option_budget_chart, setoption_budget_chart] = useState({
    /* title: 'Density of Precious Metals, in g/cm^3', */
    /*    width: 600,
    height: 400, */
    /*     bar: { groupWidth: '95%' },
    legend: { position: 'none' }, */
  });
  const [data_budget_point, setdata_budget_point] = useState([]);
  const [department, setDepartment] = useState([]);

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

        {/*  <label>test</label> */}
      </div>
    </div>
  );

  async function getDepartmentByCom() {
    var data = {
      company_id: getUser().com,
    };
    await axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/summaryPoint/getDepartment",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(function (response) {
        const options = [];
        var temp = {
          value: "",
          label: "ทั้งหมด",
        };
        options.push(temp);
        response.data.department_list.forEach((el) => {
          var element = {};
          element["value"] = el.id;
          element["label"] = el.dep_name;

          options.push(element);
        });
        setDepartment(options);
        console.log(response.data.department_list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getAllDataSummaryPoint() {
    const data = {
      company_id: getUser().com,
      department_id: filter_data.department_id,
      start_date: filter_data.start_date,
      end_date: filter_data.end_date,
    };
    await axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/summaryPoint/filterSummaryPoint",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(function (response) {
        console.log(response.data);
        setDataNotChart({
          ...dataNotChart,
          total_point: response.data.total_point,
          balance_point: response.data.balance_point,
          award_point_trans: response.data.award_point_transectaion,
          thank_point_trans: response.data.thank_point_transection,
          redeem_point_trans: response.data.redeem_point_transection,
          redeem_point: response.data.sum_redeem_point,
        });
        //chart
        var data_depardment_chart = [];
        data_depardment_chart.push(["Department", "Point"]);
        for (let item of response.data.summary_department_data) {
          var temp_data_department_point_chart = [
            item.department,
            parseInt(item.point || 0),
          ];
          data_depardment_chart.push(temp_data_department_point_chart);
        }
        setdata_department_point(data_depardment_chart);

        var data_award_chart = [];
        data_award_chart.push(["Award", "Count"]);
        for (let item of response.data.award_point_data) {
          var temp_data_award_point_chart = [
            item.award_name,
            parseInt(item.count || 0),
          ];
          data_award_chart.push(temp_data_award_point_chart);
        }
        setdata_award_point(data_award_chart);

        setdata_user_point(response.data.user_point_data);

        var data_redeem_chart = [];
        data_redeem_chart.push(["Product", "Count"]);
        for (let item of response.data.redeem_point_data) {
          var temp_data_redeem_point_chart = [
            item.product_name,
            parseInt(item.count || 0),
          ];
          data_redeem_chart.push(temp_data_redeem_point_chart);
        }
        setdata_redeem_product(data_redeem_chart);

        var data_thank_chart = [];
        data_thank_chart.push(["Point Name", "Count"]);
        for (let item of response.data.thank_point_data) {
          var temp_data_thank_point_chart = [
            item.point_name,
            parseInt(item.count || 0),
          ];
          data_thank_chart.push(temp_data_thank_point_chart);
        }
        setdata_thank_point(data_thank_chart);

        var data_category_chart = [];
        data_category_chart.push(["Category", "Count"]);
        for (let item of response.data.category_data) {
          var temp_data_category_point_chart = [
            item.category_name,
            parseInt(item.count || 0),
          ];
          data_category_chart.push(temp_data_category_point_chart);
        }
        setdata_category_point(data_category_chart);

        var data_budget_chart = [];
        data_budget_chart.push(["Year", "Budget"]);
        for (let item of response.data.budget_year_data) {
          var temp_data_budget_point_chart = [
            item.year,
            parseInt(item.budget || 0),
          ];
          data_budget_chart.push(temp_data_budget_point_chart);
        }
        setdata_budget_point(data_budget_chart);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getDepartmentByCom();
    getAllDataSummaryPoint();
  }, []);

  function resetfilter() {
    setfilter_data({
      ...filter_data,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      department_id: "",
    });
    filter_data.start_date = new Date(start_date);
    filter_data.end_date = new Date(end_date);
    filter_data.department_id = "";
    getAllDataSummaryPoint();
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="wrapper">
      {/* <Header />
    <Sidebar menu="warehouse" activemenu="projmenu" submenu="factmaster" /> */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="row">
            <div className="col-10 col-md-4 col-xl-3">
              <div className="form-group ">
                {/* อันนูน */}
                <Select
                  options={department}
                  disabled={true}
                  value={department.filter((e) => {
                    return e.value === filter_data.department_id;
                  })}
                  /*   ref={selectCompanyGroup} */

                  onChange={(e) => {
                    if (e != null) {
                      setfilter_data({
                        ...filter_data,
                        department_id: e.value,
                      });
                      filter_data.department_id = e.value;
                      getAllDataSummaryPoint();
                    }
                  }}
                />
                <label htmlFor="">Department</label>
              </div>
            </div>
            <div className="col-12 col-md-8 col-xl-4">
              <div className="row">
                <div className="col-2" style={{ textAlign: "right" }}>
                  {" "}
                  <label className="mt-3" htmlFor="">
                    Start Date
                  </label>
                </div>
                <div className="col-4 mt-3">
                  <DatePicker
                    selected={filter_data.start_date}
                    dateFormat={"dd-MM-yyyy"}
                    onChange={async (date) => {
                      setfilter_data({
                        ...filter_data,
                        start_date: date,
                      });
                      filter_data.start_date = date;
                      getAllDataSummaryPoint();
                    }}
                    maxDate={filter_data.end_date}
                    /*       selectsEnd startDate = { filter_logistic.date } */
                    /*        endDate = { filter_bill.date_end }
                                          minDate = { filter_bill.date_start } */
                    showYearDropdown
                    showMonthDropdown
                    customInput={<CustomInput />}
                  />
                </div>
                <div className="col-2" style={{ textAlign: "right" }}>
                  {" "}
                  <label className="mt-3" htmlFor="">
                    End Date
                  </label>
                </div>
                <div className="col-4 mt-3">
                  <DatePicker
                    selected={filter_data.end_date}
                    dateFormat={"dd-MM-yyyy"}
                    onChange={async (date) => {
                      setfilter_data({
                        ...filter_data,
                        end_date: date,
                      });
                      filter_data.end_date = date;
                      getAllDataSummaryPoint();
                    }}
                    minDate={filter_data.start_date}
                    /*   selectsEnd startDate = { filter_logistic.date } */
                    /*        endDate = { filter_bill.date_end }
                                          minDate = { filter_bill.date_start } */
                    showYearDropdown
                    showMonthDropdown
                    customInput={<CustomInput />}
                  />
                </div>
              </div>
            </div>

            <div className="col-2 col-md-2 col-xl-2 mt-2">
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-block btn-info"
                  onClick={() => resetfilter()}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dashboard Summary Point</h3>
              <div className="card-tools"></div>
            </div>

            <div className="card-body table-responsive ">
              <div className="row">
                <div className="col-6 col-md-4 col-xl-2">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      paddingTop: "15px",
                      height: "115px",
                      backgroundColor: "#33CCFF",
                    }}
                  >
                    <h4>Total Point</h4>
                    <div>
                      <h3>{numberWithCommas(dataNotChart.total_point || 0)}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      paddingTop: "15px",
                      height: "115px",
                      backgroundColor: "#00CED1",
                    }}
                  >
                    <h4>Balance Point</h4>
                    <div>
                      <h3>
                        {numberWithCommas(dataNotChart.balance_point || 0)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      paddingTop: "15px",
                      height: "115px",
                      backgroundColor: "#33FF33",
                    }}
                  >
                    <h4>Award Point Transaction</h4>
                    <div>
                      <h3>
                        {numberWithCommas(dataNotChart.award_point_trans || 0)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      paddingTop: "15px",
                      height: "115px",
                      backgroundColor: "#FFD700",
                    }}
                  >
                    <h4>Thank Point Transaction</h4>
                    <div>
                      <h3>
                        {numberWithCommas(dataNotChart.thank_point_trans || 0)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      paddingTop: "15px",
                      height: "115px",
                      backgroundColor: "#F08080",
                    }}
                  >
                    <h4>Redeem Point Transaction</h4>
                    <div>
                      <h3>
                        {numberWithCommas(dataNotChart.redeem_point_trans || 0)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl-2">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      paddingTop: "15px",
                      height: "115px",
                      backgroundColor: "#CD5C5C",
                    }}
                  >
                    <h4>Redeem Point</h4>
                    <div>
                      <h3>
                        {numberWithCommas(dataNotChart.redeem_point || 0)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", height: "400px" }}
                  >
                    <h3>Top 5 Summary Department Point</h3>
                    {data_department_point.length > 1 ? (
                      <Chart
                        options={option_department_point_chart}
                        // ref={chart_ret_cost}
                        chartType="PieChart"
                        width="100%"
                        height="350px"
                        data={data_department_point}
                        legend_toggle={false}
                      />
                    ) : (
                      <div style={{ marginTop: "120px" }}>No Data</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", height: "400px" }}
                  >
                    <h3>Top 10 Award Point</h3>
                    {data_award_point.length > 1 ? (
                      <Chart
                        options={option_award_point_chart}
                        // ref={chart_ret_cost}
                        chartType="BarChart"
                        width="100%"
                        height="350px"
                        data={data_award_point}
                        legend_toggle={false}
                      />
                    ) : (
                      <div style={{ marginTop: "120px" }}>No Data</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card"
                    style={{
                      textAlign: "center",
                      height: "400px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <h3>Top 10 User Point</h3>
                    {data_user_point.length > 0 ? (
                      <table style={{ width: "100%", textAlign: "center" }}>
                        <tr>
                          <td
                            style={{
                              width: "20%",
                              border: "1px solid #ddd",
                              backgroundColor: "#80bfff",
                            }}
                          >
                            No
                          </td>
                          <td
                            style={{
                              width: "50%",
                              border: "1px solid #ddd",
                              backgroundColor: "#80bfff",
                            }}
                          >
                            Name
                          </td>
                          <td
                            style={{
                              width: "30%",
                              border: "1px solid #ddd",
                              backgroundColor: "#80bfff",
                            }}
                          >
                            Point
                          </td>
                        </tr>
                        {data_user_point.map((e, index) => {
                          var color = "#FFFFFF";
                          if (index % 2 == 0) {
                            color = "#cce6ff";
                          }

                          /*  #E0FFFF */
                          return (
                            <>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    backgroundColor: color,
                                  }}
                                >
                                  {index + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    backgroundColor: color,
                                  }}
                                >
                                  {e.emp_name}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    backgroundColor: color,
                                  }}
                                >
                                  {numberWithCommas(e.point)}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    ) : (
                      <div style={{ marginTop: "120px" }}>No Data</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", height: "400px" }}
                  >
                    <h3>Top 10 Redeem Product</h3>
                    {data_redeem_product.length > 1 ? (
                      <Chart
                        options={option_redeem_product_chart}
                        // ref={chart_ret_cost}
                        chartType="BarChart"
                        width="100%"
                        height="350px"
                        data={data_redeem_product}
                        legend_toggle={false}
                      />
                    ) : (
                      <>
                        <div style={{ marginTop: "120px" }}>No Data</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", height: "400px" }}
                  >
                    <h3>Top 10 Thank Point</h3>
                    {data_thank_point.length > 1 ? (
                      <Chart
                        options={option_thank_chart}
                        // ref={chart_ret_cost}
                        chartType="BarChart"
                        width="100%"
                        height="350px"
                        data={data_thank_point}
                        legend_toggle={false}
                      />
                    ) : (
                      <>
                        <div style={{ marginTop: "120px" }}>No Data</div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card"
                    style={{ textAlign: "center", height: "400px" }}
                  >
                    <h3>Top 5 Category Redeem</h3>
                    {data_category_point.length > 1 ? (
                      <Chart
                        options={option_category_chart}
                        // ref={chart_ret_cost}
                        chartType="PieChart"
                        width="100%"
                        height="350px"
                        data={data_category_point}
                        legend_toggle={false}
                      />
                    ) : (
                      <div style={{ marginTop: "120px" }}>No Data</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-12 col-xl-8">
                  <div
                    className="card"
                    style={{ textAlign: "center", height: "400px" }}
                  >
                    <h3>Budget Year</h3>
                    {data_budget_point.length > 1 ? (
                      <Chart
                        options={option_budget_chart}
                        // ref={chart_ret_cost}
                        chartType="ColumnChart"
                        width="100%"
                        height="350px"
                        data={data_budget_point}
                        legend_toggle={false}
                      />
                    ) : (
                      <div style={{ marginTop: "120px" }}>No Data</div>
                    )}
                  </div>
                </div>
              </div>
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

export default SummaryPoint;
