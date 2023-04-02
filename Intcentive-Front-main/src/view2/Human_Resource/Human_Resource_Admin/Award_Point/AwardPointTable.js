import React, { Component, useEffect, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import Configs from "../../../../config";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";

import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";
function AwardPointTable() {
  const [award_point, setaward_point] = useState([]);
  const [filler_award_point, setfiller_award_point] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    ap_id: "",
    ap_point_id: "",
    ap_point_name: "",
    ap_point_min: "",
    ap_point_max: "",
  });
  const [disable, setdisable] = useState(null);

  const GetAwardPointData = async () => {
    console.log(filler_award_point);
    var get_filler_award_point = {
      oem_id: getOem(),
      company_id: getUser().com,
      ap_point_id: filler_award_point.ap_point_id.trim(),
      ap_point_name: filler_award_point.ap_point_name.trim(),
      ap_point_min: filler_award_point.ap_point_min.trim(),
      ap_point_max: filler_award_point.ap_point_max.trim(),
    };
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/awardpoint/filterAwardPoint",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_filler_award_point,
    })
      .then(function (response) {
        console.log(response.data, "ds");
        setaward_point(response.data.award_point_list);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(award_point);
  };
  useEffect(() => {
    GetAwardPointData();
  }, []);

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
            "/api/awardpoint/deleteawardpoint/" +
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
                "/Human_Resource/incentive_hr_admin/award_point";
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
    console.log("id", id);
    console.log("status", status);
    axios({
      method: "get",
      url:
        Configs.API_URL_incentive +
        "/api/awardPoint/changeStatusAwardPoint/" +
        id,
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
        "X-TTT": Configs.API_TTT,
      },
    })
      .then(function (response) {
        console.log(response);
        // Swal.fire({
        //   icon: "success",
        //   text: "เสร็จสิ้น",
        // }).then(() => {
        //   window.location.href =
        //     "/Human_Resource/incentive_hr_admin/award_point";
        // });
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
        console.log(status ? false : true);
        document.getElementById(element_id).checked = status ? false : true;
      });
    // }
    // });
  }
  const getdataToggle = async (e) => {
    console.log("id", e.target.value);
    console.log("value", e.target.checked);
    ChangeStatus(e.target.value, e.target.checked, e.target.id);
  };

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
  function addpage(params) {
    window.location.href = "/Human_Resource/incentive_hr_admin/award_point_add";
  }
  // function gettest() {
  //   var confi_axios = {
  //     method: "post",
  //     url: Configs.API_URL_incentive + "/api/test/filtertest",
  //     headers: {
  //       "x-ttt": Configs.API_TTT,
  //       Authorization: getToken(),
  //     },
  //   };

  //   axios(confi_axios)
  //     .then(function (response) {
  //       // console.log(JSON.stringify(response.data));
  //       setTest_data(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  const row_data = [];
  for (let index = 0; index < award_point.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["img"] = (
      <img
        id="img"
        alt="..."
        className="img-fluid rounded shadow border-0"
        src={
          award_point[index].ap_image_path !== "" &&
          award_point[index].ap_image_path !== null &&
          award_point[index].ap_image_path !== undefined
            ? Configs.API_URL_IMG_incentive + award_point[index].ap_image_path
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
    element["apid"] = award_point[index].ap_point_id;
    element["apn"] = (
      <div>
        {award_point[index].ap_point_name.length > 25
          ? award_point[index].ap_point_name.substring(0, 25) + "..."
          : award_point[index].ap_point_name}
      </div>
    );
    element["ap"] = award_point[index].ap_point;
    element["status"] = (
      <div class="custom-control custom-switch custom-switch-on-success">
        <input
          type="checkbox"
          class="custom-control-input"
          id={"customSwitch" + (index + 1)}
          key={award_point[index].ap_point_id}
          value={award_point[index].ap_id}
          onChange={getdataToggle.bind(this)}
          defaultChecked={award_point[index].ap_is_active}
        ></input>
        <label
          class="custom-control-label"
          for={"customSwitch" + (index + 1)}
        ></label>
      </div>
    );
    element["mng"] = (
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={
              "/Human_Resource/incentive_hr_admin/award_point/read/" +
              award_point[index].ap_id
            }
            id={"btn_read" + award_point[index].ap_point_id}
            key={award_point[index].ap_point_id}
            className="btn btn-xs "
          >
            <i class="fas fa-eye"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={
              "/Human_Resource/incentive_hr_admin/award_point/edit/" +
              award_point[index].ap_id
            }
            id={"btn_edit" + award_point[index].ap_point_id}
            key={award_point[index].ap_point_id}
            className=" btn btn-xs "
          >
            {"   "}
            <i class="fas fa-pencil-alt"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            key={award_point[index].ap_point_id}
            id={"btn_delete" + award_point[index].ap_point_id}
            className=" btn btn-xs "
            onClick={deldata.bind(this, award_point[index].ap_id)}
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    );
    row_data.push(element);
  }

  const clearFilter = async () => {
    await setfiller_award_point({
      ...filler_award_point,
      ap_point_id: "",
      ap_point_name: "",
      ap_point_min: "",
      ap_point_max: "",
    });

    filler_award_point.ap_point_id = "";
    filler_award_point.ap_point_name = "";
    filler_award_point.ap_point_min = "";
    filler_award_point.ap_point_max = "";
    GetAwardPointData();
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
        label: "Image",
        field: "img",
        sort: "asc",
        width: 50,
      },
      {
        label: "Award Point ID",
        field: "apid",
        sort: "asc",
        width: 50,
      },
      {
        label: "Award Point Name",
        field: "apn",
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
        label: "Status",
        field: "status",
        sort: "asc",
        width: 10,
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
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Award Point</h1>
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
                <li className="breadcrumb-item active">Award Point</li>
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
                  id="award_point_id"
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
                  id="award_point_name"
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
                  id="ap_point_min"
                  required="false"
                  value={filler_award_point.ap_point_min}
                  onChange={(e) => {
                    setfiller_award_point({
                      ...filler_award_point,
                      ap_point_min: e.target.value,
                    });
                  }}
                />
                <label htmlFor="">Award Point Min</label>{" "}
              </div>
            </div>

            <div className="col-md-2">
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control"
                  id="ap_point_max"
                  required="false"
                  value={filler_award_point.ap_point_max}
                  onChange={(e) => {
                    setfiller_award_point({
                      ...filler_award_point,
                      ap_point_max: e.target.value,
                    });
                  }}
                />
                <label htmlFor="">Award Point Max</label>{" "}
              </div>
            </div>

            <div className="col-6 col-md-4 col-xl-2">
              <div className="form-group ">
                <button
                  type="button"
                  id="btn_search"
                  className="btn btn-block btn-info  "
                  onClick={() => {
                    GetAwardPointData();
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
                      onClick={addpage}
                    >
                      Add Award Point
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
                <h3 className="card-title">Award Point</h3>
                {/* <div className="card-tools"></div> */}
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

export default AwardPointTable;
