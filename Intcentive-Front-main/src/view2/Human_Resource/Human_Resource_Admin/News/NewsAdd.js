import React, { Component, useEffect, useState } from "react";
import Configs from "../../../../config";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";
import Resizer from "react-image-file-resizer";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";

import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";

function NewsAdd(mode) {
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);
  const [getMasterNewsType, setgetMasterNewsType] = useState([]);

  const { id } = useParams();

  const [news_data, setnews_data] = useState({
    news_id: "",
    news_name: "",
    news_start_date: "",
    news_end_date: "",
    news_detail: "",
    news_type_id: "",
    news_image: "",
    news_image_name: "",
    news_image_path: "",
  });

  const [news_name_null, setnews_name_null] = useState(false);
  const [news_name_err, setnews_name_err] = useState(false);
  const [news_detail_null, setnews_detail_null] = useState(false);
  const [news_type_null, setnews_type_null] = useState(false);
  const [news_start_date_null, setnews_start_date_null] = useState(false);
  const [news_end_date_null, setnews_end_date_null] = useState(false);
  const [news_img_path_null, setnews_img_path_null] = useState(false);

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
    getNews();
    GetNewsType();
  }, []);
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

  const GetNewsType = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
    };

    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/news/getNewsList",
      headers: {
        Authorization: 'Bearer ' + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        console.log(response.data, "GetNewsType",);
        setgetMasterNewsType(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        800,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);

        },
        // "base64"
      );
    });

  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    return file && acceptedImageTypes.includes(file['type'])
  }

  async function setproductLogo(e) {
    const file = e.target.files[0];
    const regex = /([\u0E00-\u0E7F]+)/gmu;
    const str = file.name;
    let m = regex.exec(str);
    //console.log("image is :",isFileImage(file)); 

    if (m !== null || isFileImage(file) === false) {
      //console.log("ชื่อไฟล์ไม่ถูกต้อง"); 
      Swal.fire(
        'Error',
        'ชื่อไฟล์หรือประเภทไฟล์ไม่ถูกต้อง',
        'error'
      )
    } else {
      const image = await resizeFile(file);

      var file_image = dataURLtoFile(image, file.name);
      var data = new FormData();
      data.append("Profile", file_image);
      data.append("typeFile", news_data.news_name.trim());

      var config_uploadProfile = {
        method: "post",
        url: Configs.API_URL_incentive + "/api/upload/profile",
        headers: {
          Authorization: getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config_uploadProfile)
        .then(function (response) {
          if (response.data.status) {
            console.log("test photo", response.data.data.path);
            setnews_data({
              ...news_data,
              news_image_name: response.data.data.orgin_name,
              news_image_path: response.data.data.path,
              news_image: response.data.data,
            });
            setnews_img_path_null(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(news_data);
  }

  const getNews = async () => {
    if (mode.mode == "read" || mode.mode == "edit") {
      var temp = {
        news_id: id,
      };
      axios({
        method: "post",
        url: Configs.API_URL_incentive + "/api/news/getnews",
        headers: {
          Authorization: "Bearer " + getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
        data: temp,
      })
        .then(function (response) {
          console.log(response.data.news_list);
          setnews_data({
            news_id: response.data.news_list[0].news_id || '',
            news_name: response.data.news_list[0].news_name || '',
            news_detail: response.data.news_list[0].news_detail || '',
            news_type_id: response.data.news_list[0].news_type_id || '',
            news_start_date: new Date(response.data.news_list[0].news_start_date) || '',
            news_end_date: new Date(response.data.news_list[0].news_end_date) || '',
            news_image: response.data.news_list[0].news_image || '',
            news_image_name: response.data.news_list[0].news_image_name || '',
            news_image_path: response.data.news_list[0].news_image_path || '',
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  function save_news_data() {
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
        const error_list = [];
        if (news_data.news_name.trim() == "") {
          let temp_err = {
            message: "กรุณากรอก News",
          };
          error_list.push(temp_err);
          setnews_name_null(true);
        }
        if (news_data.news_start_date == "") {
          let temp_err = {
            message: "กรุณาเลือก Start Date",
          };
          error_list.push(temp_err);
          setnews_start_date_null(true)
        }
        if (news_data.news_end_date == "") {
          let temp_err = {
            message: "กรุณาเลือก End Date",
          };
          error_list.push(temp_err);
          setnews_end_date_null(true)
        }
        if (news_data.news_type_id == "") {
          let temp_err = {
            message: "กรุณาเลือก News Type",
          };
          error_list.push(temp_err);
          setnews_type_null(true);
        }
        if (news_data.news_detail == "") {
          let temp_err = {
            message: "กรุณากรอก News Detail",
          };
          error_list.push(temp_err);
          setnews_detail_null(true);
        }
        if (news_data.news_image_path == "") {
          let temp_err = {
            message: "กรุณาอัปโหลดรูปภาพ",
          };
          error_list.push(temp_err);
          setnews_img_path_null(true);
        }
        if (error_list.length > 0) {
          var err_message = "";
          for (var e = 0; e < error_list.length; e++) {
            err_message += "<br/>" + error_list[e].message;
          }
          Swal.fire("Error", err_message, "error");
        } else {
          if (mode.mode === "add") {
            const temp = {
              oem_id: getOem(),
              company_id: getUser().com,
              news_name: news_data.news_name.trim(),
              news_detail: news_data.news_detail,
              news_type_id: news_data.news_type_id,
              news_start_date: news_data.news_start_date,
              news_end_date: news_data.news_end_date,
              news_image_name: news_data.news_image_name || null,
              news_image_path: news_data.news_image_path || null,
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
                url: Configs.API_URL_incentive + "/api/news/addnews",
                headers: {
                  Authorization: "Bearer " + getToken(),
                  "X-TTT": Configs.API_TTT,
                  "Content-Type": "application/json",
                },
                data: temp,
              })
                .then(function (response) {
                  console.log("Console for test :: " + response.data);
                  if (response.data) {
                    Swal.fire({
                      icon: "success",
                      title: "Save",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then((result) => {
                      window.location.href =
                        "/Human_Resource/incentive_hr_admin/news";
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire("Error", "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis, "error");
                });
            });
          }
          if (mode.mode === "edit") {
            const temp = {
              news_id: id,
              oem_id: getOem(),
              company_id: getUser().com,
              news_id: news_data.news_id,
              news_name: news_data.news_name.trim(),
              news_detail: news_data.news_detail,
              news_type_id: news_data.news_type_id,
              news_start_date: news_data.news_start_date,
              news_end_date: news_data.news_end_date,
              news_image_name: news_data.news_image_name || null,
              news_image_path: news_data.news_image_path || null,
            };
            console.log("edit", temp);
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
                url: Configs.API_URL_incentive + "/api/news/editnews",
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
                        "/Human_Resource/incentive_hr_admin/news";
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

  function cancle_add_news(params) {
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
        window.location.href = "/Human_Resource/incentive_hr_admin/news";
      }
    });
  }

  async function check_news_name(e) {
    if (e.target.value.trim() === "") {
      setnews_data({
        ...news_data,
        news_name: e.target.value,
      });
      setnews_name_null(true);
      setnews_name_err(false);
    } else if (e.target.value.trim().length >= 201) {
      setnews_name_null(false);
      setnews_name_err(true);
    } else {
      setnews_data({
        ...news_data,
        news_name: e.target.value,
      });
      setnews_name_null(false);
      setnews_name_err(false);
    }
  }

  async function check_news_detail(e) {
    if (e.target.value.trim() === "") {
      setnews_data({
        ...news_data,
        news_detail: e.target.value,
      });
      setnews_detail_null(true);
    } else {
      setnews_data({
        ...news_data,
        news_detail: e.target.value,
      });
      setnews_detail_null(false);
    }
  }

  async function check_news_type(e) {
    if (e.target.value.trim() === "") {
      setnews_data({
        ...news_data,
        news_type_id: e.target.value,
      });
      setnews_type_null(true);
    } else {
      setnews_data({
        ...news_data,
        news_type_id: e.target.value,
      });
      setnews_type_null(false);
    }
  }

  async function check_news_start_date(e) {
    if (e === "") {
      setnews_data({
        ...news_data,
        news_start_date: e,
      });
      setnews_start_date_null(true);
    } else if (news_data.news_end_date != "" && e > news_data.news_end_date) {
      setnews_data({
        ...news_data,
        news_end_date: '',
      });
      news_data.news_end_date = '';
      setnews_data({
        ...news_data,
        news_start_date: e,
      });
      setnews_start_date_null(false);
    } else {
      setnews_data({
        ...news_data,
        news_start_date: e,
      });
      setnews_start_date_null(false);
    }
  }

  async function check_news_end_date(e) {
    if (e === "") {
      setnews_data({
        ...news_data,
        news_end_date: e,
      });
      setnews_end_date_null(true);
    } else {
      setnews_data({
        ...news_data,
        news_end_date: e,
      });
      setnews_end_date_null(false);
    }
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>News {pageMode}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">News</li>
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
                    onClick={cancle_add_news}
                    class="btn btn-block btn-danger "
                    id="btn-cancle"
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
                    onClick={save_news_data}
                    class="btn btn-block btn-success"
                    id="btn-save"
                  >
                    Save
                  </button>
                </div>
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={cancle_add_news}
                    class="btn btn-block btn-danger"
                    id="btn-cancle"
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
              <h3 className="card-title">News Information</h3>
            </div>
            <div className="card-body">
              <h3 className="mb-2  mt-5-head"></h3>
              <div className="row">
                <div className="col-5 col-md-6 col-xl-5">
                  <div className="row col-12">
                    <div class="form-group col-12 col-md-12 col-xl-8">
                      <input
                        type="text"
                        className="form-control"
                        required
                        id="news_name"
                        value={news_data.news_name}
                        // placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                        disabled={disable}
                        onChange={(e) => {
                          check_news_name(e);
                        }}
                      />
                      <label>News <span style={{ color: "red" }}>*</span></label>{" "}
                      {news_name_null ? <span style={{ color: "red" }}>*กรุณากรอก News</span> : ""}
                      {news_name_err ? <span style={{ color: "red" }}>*ห้ามกรอกตัวอักษรเกิน 200 ตัวอักษร</span> : ""}
                    </div>
                  </div>
                  <div className="row col-12 col-md-12 col-xl-9">
                    <div class="form-group">
                      <textarea
                        className="form-control"
                        required
                        id="news_detail"
                        rows="4"
                        cols="150"
                        value={news_data.news_detail}
                        disabled={disable}
                        onChange={(e) => {
                          check_news_detail(e);
                        }}
                      />
                      <label htmlFor="">News Detail <span style={{ color: "red" }}>*</span></label>{" "}
                      {news_detail_null ? <span style={{ color: "red" }}>*กรุณากรอก News Detail</span> : ""}
                    </div>
                  </div>
                  <div className="row col-12">
                    <div class="form-group col-12 col-md-12 col-xl-8">
                      <select
                        className="form-control custom-select select2"
                        type="text"
                        required
                        id="select_news_type"
                        value={news_data.news_type_id}
                        disabled={disable}
                        onChange={(e) => {
                          check_news_type(e);
                        }}
                      >
                        <option value="" disabled selected>
                          ----เลือก----
                        </option>
                        {getMasterNewsType.map((el) => {
                          return <option value={el.nt_id}>{el.nt_name}</option>;
                        })}
                      </select>
                      <label htmlFor="">News Type <span style={{ color: "red" }}>*</span></label>{" "}
                      {news_type_null ? <span style={{ color: "red" }}>*กรุณาเลือก News Type</span> : ""}
                    </div>
                  </div>


                  <div className="row mb-4 col-12 col-md-12 col-xl-8">
                    <label htmlFor="exampleInputFile">Part Image <span style={{ color: "red" }}>*</span></label>
                    <span style={{ color: "red" }}> size(600 x 800) px</span>
                    <div className="input-group">

                      <div className="custom-file">

                        <input
                          type="file"
                          className="custom-file-input"
                          id="exampleInputFile"
                          disabled={disable}
                          accept="image/*"
                          onChange={setproductLogo}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="exampleInputFile"
                        >
                          {news_data.news_image_name !== ""
                            ? (news_data.news_image_name.length > 35
                              ? (news_data.news_image_name.substring(0, 35) + "...")
                              : news_data.news_image_name)
                            : "Select Image"}
                        </label>

                      </div>
                    </div>
                    {news_img_path_null ? <span style={{ color: "red" }}>*กรุณาอัปโหลดรูปภาพ</span> : ""}
                  </div>

                  <div className="row">
                    <div className="ml-1" style={{ textAlign: "right" }}>
                      <label className="mt-3" htmlFor="">Start Date
                        <span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="mt-2 ml-2" style={{ "z-index": "99" }}>
                      <DatePicker
                        selected={news_data.news_start_date}
                        disabled={disable}
                        id="start_date"
                        dateFormat={"dd-MM-yyyy"}
                        onChange={async (date) => {
                          check_news_start_date(date);
                        }}
                        showYearDropdown
                        showMonthDropdown
                        customInput={<CustomInput />}
                      ></DatePicker>
                      <div className="ml-1">
                        {news_start_date_null ? <span style={{ color: "red" }}>*กรุณาเลือกวันเริ่มต้น</span> : ""}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="ml-1" style={{ textAlign: "right" }}>
                      <label className="mt-3" htmlFor="">End Date
                        <span style={{ color: "red" }}> *</span>
                      </label>
                    </div>
                    <div className="mt-2 ml-3" style={{ "z-index": "99" }}>
                      <DatePicker
                        selected={news_data.news_end_date}
                        disabled={disable}
                        id="end_date"
                        dateFormat={"dd-MM-yyyy"}
                        onChange={async (date) => {
                          check_news_end_date(date);
                        }}
                        minDate={news_data.news_start_date}
                        showYearDropdown
                        showMonthDropdown
                        customInput={<CustomInput />}
                      ></DatePicker>
                      <div className="ml-1">
                        {news_end_date_null ? <span style={{ color: "red" }}>*กรุณาเลือกวันสิ้นสุด</span> : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6" style={{ marginLeft: "100px" }}>
                  <label htmlFor="exampleInputFile"> </label>
                  <img
                    id="img"
                    alt="..."
                    className="img-fluid rounded shadow border-0"
                    src={
                      news_data.news_image_path !== "" &&
                        news_data.news_image_path !== null &&
                        news_data.news_image_path !== undefined
                        ? Configs.API_URL_IMG_incentive + news_data.news_image_path
                        : userdefault_img.imgs
                    }
                    style={{
                      width: "400px",
                      height: "300px",
                      position: "relative",
                    }}
                  />
                  <br />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    Recommend Size:600x800px{" "}
                  </span>
                </div>
              </div>

              <div className="row"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NewsAdd;
