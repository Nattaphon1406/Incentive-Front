import React, { Children, Component, useEffect, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Configs from "../../../../config";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Resizer from "react-image-file-resizer";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";

function Award_Point_Add(mode) {
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);
  const { id } = useParams();
  const [departmentlist, setdepartmentlist] = useState([]);
  // const [subdepartmentlist, setsubdepartmentlist] = useState([]);
  const [departmentlist2, setdepartmentlist2] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [award_point, setaward_point] = useState({
    ap_id: "",
    ap_point_id: "",
    ap_point_name: "",
    ap_point: "",
    ap_point_detail: "",
    ap_department_id: "",
    ap_image: "",
    ap_image_path: "",
    ap_image_name: "",
    dap_id: "",
  });

  const [ap_point_id_err, setap_point_id_err] = useState(false);
  const [ap_point_id_null, setap_point_id_null] = useState(false);
  const [ap_point_name_err, setap_point_name_err] = useState(false);
  const [ap_point_name_null, setap_point_name_null] = useState(false);
  const [ap_point_errNum, setap_point_errNum] = useState(false);
  const [ap_point_err, setap_point_err] = useState(false);
  const [ap_point_null, setap_point_null] = useState(false);
  const [ap_image_path_null, setap_image_path_null] = useState(false);
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
    getAwardPoint();
    GetDepartmerntList();
    // let id = "ed61b4af-a1b2-4bae-90d2-94f7befaa430"
    // GetSubDepartmerntList(id);
    // GetDepartmentData();
  }, []);

  const [filter_department, setfilter_department] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    dap_department_id: "",
    dap_award_point_id: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  const getAwardPoint = async () => {
    if (mode.mode == "read" || mode.mode == "edit") {
      var temp = {
        ap_id: id,
      };
      axios({
        method: "post",
        url: Configs.API_URL_incentive + "/api/AwardPoint/getawardpoint",
        headers: {
          Authorization: "Bearer " + getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
        data: temp,
      })
        .then(function (response) {
          console.log(response);
          setaward_point({
            ap_id: response.data.award_point_list[0].ap_id || "",
            ap_point_id: response.data.award_point_list[0].ap_point_id || "",
            ap_point_name:
              response.data.award_point_list[0].ap_point_name || "",
            ap_point: response.data.award_point_list[0].ap_point || "",
            ap_point_detail:
              response.data.award_point_list[0].ap_point_detail || "",
            ap_department_id:
              response.data.award_point_list[0].ap_point_detail || "",
            ap_image: response.data.award_point_list[0].ap_image || "",
            ap_image_path:
              response.data.award_point_list[0].ap_image_path || "",
            ap_image_name:
              response.data.award_point_list[0].ap_image_name || "",
            ap_dap_id_list:
              response.data.award_point_list[0].ap_dap_id_list || [],
            dap_id: response.data.award_point_list[0].dap_id || [],
          });
          console.log(response.data.award_point_list[0].ap_dap_id_list || []);
          setChecked(response.data.award_point_list[0].ap_dap_id_list || []);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  function save_award_point_data() {
    Swal.fire({
      title: "คุณต้องการที่จะบันทึกหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: `No`,
    }).then((result) => {
      const error_list = [];
      if (result.isConfirmed) {
        if (award_point.ap_point_id == "") {
          let temp_err = {
            message: "กรุณากรอก Award Point ID",
          };
          error_list.push(temp_err);
        }
        if (award_point.ap_point_name == "") {
          let temp_err = {
            message: "กรุณากรอก Award Point Name",
          };
          error_list.push(temp_err);
        }
        if (award_point.ap_point == "") {
          let temp_err = {
            message: "กรุณากรอก Award Point",
          };
          error_list.push(temp_err);
        }
        if (checked.length == 0) {
          let temp_err = {
            message: "กรุณาเลือก Department",
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
          if (mode.mode === "add") {
            const temp = {
              oem_id: getOem(),
              company_id: getUser().com,
              ap_point_id: award_point.ap_point_id.trim(),
              ap_point_name: award_point.ap_point_name.trim(),
              ap_point: parseInt(award_point.ap_point.trim()),
              ap_point_detail: award_point.ap_point_detail || null,
              ap_image_name: award_point.ap_image_name || null,
              ap_image_path: award_point.ap_image_path || null,
              ap_is_active: true,
              dap_department_id: checked,
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
                  Configs.API_URL_incentive + "/api/awardPoint/addawardpoint",
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
                        "/Human_Resource/incentive_hr_admin/award_point";
                    });
                  }
                  //console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire(
                    "Error",
                    "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis,
                    "error"
                  );
                });
            });
          }
          if (mode.mode === "edit") {
            const temp = {
              ap_id: id,
              oem_id: getOem(),
              company_id: getUser().com,
              ap_point_id: award_point.ap_point_id.trim(),
              ap_point_name: award_point.ap_point_name.trim(),
              ap_point: parseInt(award_point.ap_point.trim()),
              ap_point_detail: award_point.ap_point_detail || null,
              ap_image_name: award_point.ap_image_name || null,
              ap_image_path: award_point.ap_image_path || null,
              dap_department_id: checked,
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
                url:
                  Configs.API_URL_incentive + "/api/awardPoint/editawardpoint",
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
                        "/Human_Resource/incentive_hr_admin/award_point";
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  Swal.fire(
                    "Error",
                    "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis,
                    "error"
                  );
                });
            });
          }
        }
      }
    });
  }

  function cancle_add_award_point(params) {
    Swal.fire({
      title: "คุณมั่นใจว่าคุณจะออกจากหน้านี้ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/Human_Resource/incentive_hr_admin/award_point";
      }
    });
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        300,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        }
        // "base64"
      );
    });

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
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
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

    return file && acceptedImageTypes.includes(file["type"]);
  }

  async function setproductLogo(e) {
    const file = e.target.files[0];
    const regex = /([\u0E00-\u0E7F]+)/gmu;
    const str = file.name;
    let m = regex.exec(str);
    //console.log("image is :",isFileImage(file));

    if (m !== null || isFileImage(file) === false) {
      //console.log("ชื่อไฟล์ไม่ถูกต้อง");
      Swal.fire("Error", "ชื่อไฟล์หรือประเภทไฟล์ไม่ถูกต้อง", "error");
    } else {
      const image = await resizeFile(file);

      var file_image = dataURLtoFile(image, file.name);
      var data = new FormData();
      data.append("Profile", file_image);
      data.append("typeFile", award_point.ap_point_id);

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
            setaward_point({
              ...award_point,
              ap_image_name: response.data.data.orgin_name,
              ap_image_path: response.data.data.path,
              ap_image: response.data.data,
            });
            console.log(award_point);
            setap_image_path_null(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(award_point);
  }
  async function check_award_point_id(e) {
    if (e.target.value.trim() === "") {
      setaward_point({
        ...award_point,
        ap_point_id: e.target.value,
      });
      setap_point_id_null(true);
    } else if (
      e.target.value
        .trim()
        .match(/[`~%^&*!@#$()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g) != null
    ) {
      setap_point_id_err(true);
      setap_point_id_null(false);
    } else if (e.target.value.trim().length > 8) {
      setap_point_id_err(false);
      setap_point_id_null(false);
    } else {
      setaward_point({
        ...award_point,
        ap_point_id: e.target.value,
      });
      setap_point_id_err(false);
      setap_point_id_null(false);
    }
  }

  async function check_award_point_name(e) {
    if (e.target.value.trim() === "") {
      setaward_point({
        ...award_point,
        ap_point_name: e.target.value,
      });
      setap_point_name_null(true);
    } else if (e.target.value.trim().length >= 200) {
      setap_point_name_err(true);
      setap_point_name_null(false);
    } else {
      setaward_point({
        ...award_point,
        ap_point_name: e.target.value,
      });
      setap_point_name_null(false);
    }
  }
  async function check_award_point(e) {
    if (e.target.value.trim() === "") {
      setaward_point({
        ...award_point,
        ap_point: e.target.value,
      });
      setap_point_null(true);
    } else if (parseInt(e.target.value.trim()) < 1) {
      setap_point_errNum(true);
      setap_point_err(false);
      setap_point_null(false);
    } else if (isNaN(e.target.value.trim())) {
      setap_point_errNum(false);
      setap_point_err(true);
      setap_point_null(false);
    } else {
      setaward_point({
        ...award_point,
        ap_point: e.target.value,
      });
      setap_point_errNum(false);
      setap_point_err(false);
      setap_point_null(false);
    }
  }
  
  const row_data = [];
  for (let index = 0; index < 5; index++) {
    const element = {};
    element["no"] = index + 1;
    element["dap_department_id"] = "Ao" + 1;
    element["dap_award_point_id"] = "Ao" + 1;
    element["mng"] = (
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <button
          type="button"
          onClick={() => {}}
          class="btn btn-block btn-primary "
          id="btn_push"
        >
          Push
        </button>
      </div>
    );
    row_data.push(element);
  }

  const clearFilter = async () => {
    await setfilter_department({
      ...filter_department,
      dap_department_id: "",
      dap_award_point_id: "",
    });

    filter_department.dap_department_id = "";
    filter_department.dap_award_point_id = "";
  };

  const GetDepartmerntList = async () => {
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
    };
    console.log();
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/awardPoint/getdepartmentlist",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetDepartmentList");
        setdepartmentlist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const nodes2 = [
    {
      value: "checkall",
      label: "Select All",
      children: [],
    },
  ];

  for (let index = 0; index < departmentlist.length; index++) {
    console.log(departmentlist[index].id);
    console.log(departmentlist[index].dep_name);
    if (departmentlist[index].parent_id === null) {
      if (departmentlist.some((x) => x.parent_id == departmentlist[index].id)) {
        nodes2[0].children.push({
          value: departmentlist[index].id,
          label: departmentlist[index].dep_name,
          children: GetNodesChildren(departmentlist[index].id, departmentlist),
        });
      } else {
        nodes2[0].children.push({
          value: departmentlist[index].id,
          label: departmentlist[index].dep_name,
        });
      }
    }
  }
  console.log("nodes" + nodes2);
  console.log(nodes2);

  function GetNodesChildren(id, data) {
    let tmp;
    if (id !== "") {
      const s1 = data
        .filter((x) => x.parent_id === id)
        .map((x) => {
          if (data.some((y) => y.parent_id != x.id)) {
            return {
              value: x.id,
              label: x.dep_name,
            };
          } else {
            return {
              value: x.id,
              label: x.dep_name,
              children: [],
            };
          }
        });
      for (let i = 0; i < s1.length; i++) {
        // if (s1[i].parent_id !== "") {
        const s2 = data
          .filter((x) => x.parent_id === s1[i].id)
          .map((x) => {
            return {
              value: x.id,
              label: x.dep_name,
            };
          });
        if (s2.length > 0) {
          s1[i].children = s2;
        }
        // }
      }
      return s1;
    } else {
      return "";
    }
  }
  const nodes = [
    {
      value: "0",
      label: "0",
      children: [
        { value: "phobos", label: "Phobos" },
        { value: "deimos", label: "Deimos" },
        { value: "deimos2", label: "Deimos2" },
      ],
      parent_id: "1",
    },
  ];

  function CheckedAllTree() {
    for (let index = 0; index < departmentlist.length; index++) {
      setChecked(departmentlist[index].id);
      console.log(departmentlist[index].id)
    }
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Award Point {pageMode}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">Award Point</li>
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
                    onClick={cancle_add_award_point}
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
                    onClick={save_award_point_data}
                    class="btn btn-block btn-success"
                    id="btn-save"
                  >
                    Save
                  </button>
                </div>
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={cancle_add_award_point}
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
              <h3 className="card-title">Award Point {pageMode}</h3>
            </div>
            <div className="card-body">
              <h3 className="mb-2  mt-5-head"></h3>
              <div className="row">
                <div className="col-5 col-md-6 col-xl-5">
                  <div className="row">
                    <div class="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required
                        id="award_point_id"
                        value={award_point.ap_point_id}
                        // placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                        disabled={disable}
                        onChange={(e) => {
                          check_award_point_id(e);
                        }}
                      />
                      <label>
                        Award Point ID
                        <span style={{ color: "red" }}>*</span>
                      </label>{" "}
                      {ap_point_id_err ? (
                        <span style={{ color: "red" }}>
                          *ห้ามกรอกตัวอักษรพิเศษ
                        </span>
                      ) : (
                        ""
                      )}
                      {ap_point_id_null ? (
                        <span style={{ color: "red" }}>
                          *กรุณากรอก Award Point ID
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div class="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required
                        id="award_point_name"
                        value={award_point.ap_point_name}
                        // placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                        disabled={disable}
                        onChange={(e) => {
                          check_award_point_name(e);
                        }}
                      />
                      <label>
                        Award Point Name
                        <span style={{ color: "red" }}>*</span>
                      </label>{" "}
                      {ap_point_name_null ? (
                        <span style={{ color: "red" }}>
                          *กรุณากรอก Award Point Name
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div class="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required
                        id="award_point_point"
                        value={award_point.ap_point}
                        // placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                        disabled={disable}
                        onChange={(e) => {
                          check_award_point(e);
                        }}
                      />
                      <label>
                        Award Point
                        <span style={{ color: "red" }}>*</span>
                      </label>{" "}
                      {ap_point_errNum ? (
                        <span style={{ color: "red" }}>
                          *กรุณากรอก Award Point มากกว่า 0
                        </span>
                      ) : (
                        ""
                      )}
                      {ap_point_err ? (
                        <span style={{ color: "red" }}>
                          *กรุณากรอก Award Point เป็นตัวเลขเท่านั้น
                        </span>
                      ) : (
                        ""
                      )}
                      {ap_point_null ? (
                        <span style={{ color: "red" }}>
                          *กรุณากรอก Award Point
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="mb-4 col-12 col-md-12 col-xl-8">
                      <label htmlFor="exampleInputFile">
                        Part Image{" "}
                        <span style={{ color: "red" }}>size(400 x 300) px</span>
                      </label>
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
                            {award_point.ap_image_name !== ""
                              ? award_point.ap_image_name.length > 25
                                ? award_point.ap_image_name.substring(0, 25) +
                                  "..."
                                : award_point.ap_image_name
                              : "Select Image"}
                          </label>
                        </div>
                      </div>
                      {ap_image_path_null ? (
                        <span style={{ color: "red" }}>
                          *กรุณาอัปโหลดรูปภาพ
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-7 col-xl-3">
                  <label htmlFor="exampleInputFile"> </label>
                  <img
                    id="img"
                    alt="..."
                    className="img-fluid rounded shadow border-0"
                    src={
                      award_point.ap_image_path !== "" &&
                      award_point.ap_image_path !== null &&
                      award_point.ap_image_path !== undefined
                        ? Configs.API_URL_IMG_incentive +
                          award_point.ap_image_path
                        : userdefault_img.imgs
                    }
                    style={{
                      width: "400px",
                      height: "300px",
                      position: "relative",
                    }}
                  />
                  <br />{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>
                    Recommend Size:400x300px{" "}
                  </span>
                  <span style={{ color: "red", fontSize: "12px" }}></span>
                </div>
              </div>

              <div className="row">
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-4">
                    <label>Award Point Detail</label>
                    <div class="form-group">
                      <textarea
                        className="form-control"
                        required
                        id="award_point_detail"
                        rows="4"
                        cols="150"
                        value={award_point.ap_point_detail}
                        // placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                        disabled={disable}
                        onChange={(e) => {
                          setaward_point({
                            ...award_point,
                            ap_point_detail: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <label>Select Department<span style={{ color: "red" }}>*</span></label>
                <div className="col-12">
                  <div className="row">
                    <CheckboxTree
                      iconsClass="fa5"
                      nodes={nodes2}
                      checked={checked}
                      expanded={expanded}
                      disabled={disable}
                      onCheck={(checked) => {
                        setChecked(checked);
                      }}
                      onExpand={(expanded1) => {
                        setExpanded(expanded1);
                      }}
                      onClick={console.log(checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Award_Point_Add;
