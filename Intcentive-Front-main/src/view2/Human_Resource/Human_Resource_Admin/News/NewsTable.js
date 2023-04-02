import React, { Component, useEffect, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import Configs from "../../../../config";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Swal from "sweetalert2";
import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
function News() {
  const [news_data, setnews_data] = useState([]);
  const [getMasterNewsType, setgetMasterNewsType] = useState([]);
  const [filter_News, setfilter_News] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    news_id: "",
    news_name: "",
    news_start_date: "",
    news_end_date: "",
    // news_type: "",
  });

  const GetNewsData = async () => {
    var get_filter_News = {
      oem_id: getOem(),
      company_id: getUser().com,
      news_name: filter_News.news_name.trim(),
      news_start_date: filter_News.news_start_date || null,
      news_end_date: filter_News.news_end_date || null,
      // news_type_id: filter_News.news_type,
    };
    console.log(get_filter_News);
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/news/filternews",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filter_News,
    })
      .then(function (response) {
        console.log(response.data.news_list, "GetNewsData");
        setnews_data(response.data.news_list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetNewsData();
  }, []);

  // const GetNewsType = async () => {
  //   let get_com_oem = {
  //     oem_id: getOem(),
  //     company_id: getUser().com,
  //   };

  //   axios({
  //     method: "post",
  //     url:
  //       Configs.API_URL_incentive + "/api/news/getNewsList",
  //     headers: {
  //       Authorization: 'Bearer ' + getToken(),
  //       "X-TTT": Configs.API_TTT,
  //       "Content-Type": "application/json",
  //     },
  //     data: get_com_oem,
  //   })
  //     .then(function (response) {
  //       console.log(response.data, "GetNewsType",);
  //       setgetMasterNewsType(response.data);
  //       GetNewsData();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  function deldata(id) {
    console.log("id", id);
    Swal.fire({
      title: "คุณต้องการลบข้อมูลใช่หรือไม่?",
      text: "ข้อมูลที่ถูกลบจะไม่สามารถนำกลับมาได้กรุณาตรวจสอบให้ชัดเจนก่อนลบข้อมูล",
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
            Configs.API_URL_incentive +
            "/api/news/deletenews/" +
            id,
          headers: {
            Authorization: "Bearer " + getToken(),
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
              window.location.href =
                "/Human_Resource/incentive_hr_admin/news";
            });
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
          });
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
      />{" "}
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="far fa-calendar-alt" />
        </span>
      </div>
    </div>
  );

  const clearFilter = async () => {
    await setfilter_News({
      ...filter_News,
      news_name: "",
      news_start_date: "",
      news_end_date: "",
      news_type: "",
    });

    filter_News.news_name = "";
    filter_News.news_start_date = "";
    filter_News.news_end_date = "";
    filter_News.news_type = "";
    GetNewsData();
  };

  function addpage(params) {
    window.location.href = "/Human_Resource/incentive_hr_admin/news_add";
  }

  const divGroupNameEllipsis = {
    // "white-space": "normal",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "width": "250px",
    // "height": "100px"
  }

  const row_data = [];
  for (let index = 0; index < news_data.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["news"] =
      (
        <div style={divGroupNameEllipsis}>
          {
            news_data[index].news_name
          }
        </div>
      );
    element["std"] = news_data[index].start_date;
    element["ed"] = news_data[index].end_date;
    element["nt"] = news_data[index].nt_name;
    element['img'] = (
      <img
        id="img"
        alt="..."
        className="img-fluid rounded shadow border-0"
        src={
          news_data[index].news_img_path !== "" &&
            news_data[index].news_img_path !== null &&
            news_data[index].news_img_path !== undefined
            ? Configs.API_URL_IMG_incentive + news_data[index].news_img_path
            : userdefault_img.imgs
        }
        style={{
          width: "120px",
          height: "100px",
          position: "relative",
          display: "block",
          "margin-left": "auto",
          "margin-right": "auto",
        }}
      />
    );
    element["mng"] = (
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={
              "/Human_Resource/incentive_hr_admin/news_add/read/" +
              news_data[index].news_id
            }
            id={"btn_read" + (index + 1)}
            key={news_data[index].news_id}
            className="btn btn-xs "
          >
            <i class="fas fa-eye"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={
              "/Human_Resource/incentive_hr_admin/news_add/edit/" +
              news_data[index].news_id
            }
            id={"btn_edit" + (index + 1)}
            key={news_data[index].news_id}
            className=" btn btn-xs "
          >
            {"   "}
            <i class="fas fa-pencil-alt"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            key={news_data[index].news_id}
            id={"btn_delete" + (index + 1)}
            className=" btn btn-xs "
            onClick={deldata.bind(this, news_data[index].news_id)}
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    );
    row_data.push(element);
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
        label: "Image",
        field: "img",
        sort: "asc",
        width: 50,
      },
      {
        label: "News",
        field: "news",
        sort: "asc",
        width: 50,
      },
      {
        label: "News Type",
        field: "nt",
        sort: "asc",
        width: 50,
      },
      {
        label: "Start Date",
        field: "std",
        sort: "asc",
        width: 50,
      },
      {
        label: "End Date",
        field: "ed",
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
  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>News</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">News</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-md-2">
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="news_name"
                  required="false"
                  value={filter_News.news_name}
                  onChange={(e) => {
                    setfilter_News({
                      ...filter_News,
                      news_name: e.target.value,
                    });
                  }}
                />
                <label htmlFor="">News</label>{" "}
              </div>
            </div>
            {/* <div className="col-md-2">
              <div className="form-group ">
                <select
                  className="form-control custom-select select2"
                  type="text"
                  required
                  id="news_type"
                  value={filter_News.news_type}
                  onChange={(e) => {
                    setfilter_News({
                      ...filter_News,
                      news_type: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled selected>
                    ----เลือก----
                  </option>
                  {getMasterNewsType.map((el) => {
                    return (
                      <option value={el.nt_id}>
                        {el.nt_name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="">News Type</label>{" "}
              </div>
            </div> */}
            <div className="row ml-2">
              <div className="col-1.5 ml-2" style={{ textAlign: "right" }}>
                <label className="mt-3" htmlFor="">Start Date</label>
              </div>
              <div className="col-md-4 mt-2" style={{ "z-index": "99" }}>
                <DatePicker
                  selected={filter_News.news_start_date}
                  id="date-picker-start"
                  dateFormat={"dd-MM-yyyy"}
                  onChange={
                    async (date) => {
                      if (filter_News.news_end_date != "" && date > filter_News.news_end_date) {
                        setfilter_News({
                          ...filter_News,
                          news_end_date: '',
                        });
                        filter_News.news_end_date = '';
                      }
                      setfilter_News({
                        ...filter_News,
                        news_start_date: date,
                      });
                      filter_News.news_start_date = date;
                    }
                  }
                  showYearDropdown
                  showMonthDropdown
                  customInput={<CustomInput />}
                />
              </div>
              <div className="col-1.5 ml-3" style={{ textAlign: "right" }}>
                <label className="mt-3" htmlFor="">End Date</label>
              </div>
              <div className="col-md-4 mt-2" style={{ "z-index": "99" }}>
                <DatePicker
                  selected={filter_News.news_end_date}
                  id="date-picker-end"
                  dateFormat={"dd-MM-yyyy"}
                  onChange={
                    async (date) => {
                      setfilter_News({
                        ...filter_News,
                        news_end_date: date,
                      });
                      filter_News.news_end_date = date;
                    }

                  }
                  showYearDropdown
                  showMonthDropdown
                  minDate={filter_News.news_start_date}
                  customInput={<CustomInput />}
                />
              </div>
            </div>

            <div className="col-6 col-md-4 col-xl-2">
              <div className="form-group ">
                <button
                  type="button"
                  id="btn_search"
                  className="btn btn-block btn-info  "
                  onClick={() => { GetNewsData(); }}
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
                      onClick={addpage}
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
                <h3 className="card-title">News</h3>
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
      </div>
    </div>
  );
}

export default News;
