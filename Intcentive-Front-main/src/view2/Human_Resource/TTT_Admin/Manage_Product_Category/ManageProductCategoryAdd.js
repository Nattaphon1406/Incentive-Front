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

function ManageProductCategoryAdd(mode) {
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);
  const [product_category, setproduct_category] = useState({
    product_category_name: "",
    product_category_image: "",
    product_category_image_path: "",
    product_category_image_name: "",
  });
  const [product_category_name_err, setproduct_category_name_err] = useState(false);
  const [product_category_name_null, setproduct_category_name_null] = useState(false);
  const [product_category_image_path_null, setproduct_category_image_path_null] = useState(false);
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

  }, []);

  const [modal, setModal] = useState(false);
  const toggle_modal = () => setModal(!modal);

  function save_product_category_data() {
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
        if (product_category.product_category_name == "") {
          let temp_err = {
            message: "กรุณากรอก Product Category Name",
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
          console.log("Complete")
          if (mode.mode === "add") {
            const temp = {
              oem_id: getOem(),
              company_id: getUser().com,
              product_category_name: product_category.product_category_name.trim(),
              product_category_image_name: product_category.product_category_image_name || null,
              product_category_image_path: product_category.product_category_image_path || null,
              product_category_is_active: true,
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
            }).then(function (response) {
              console.log("Complete")
                  if (response) {
              console.log("Complete96")

                    Swal.fire({
                      icon: "success",
                      title: "Save",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then((result) => {
                      window.location.href =
                        "/Human_Resource/intensive_TTT/manage_category_roduct";
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
          }
          console.log("Complete2")

          if (mode.mode === "edit") {
            const temp = {
              oem_id: getOem(),
              company_id: getUser().com,
              product_category_name: product_category.product_category_name.trim(),
              product_category_image_name: product_category.product_category_image_name || null,
              product_category_image_path: product_category.product_category_image_path || null,
              product_category_is_active: true,
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
            }).then(function (response) {
                  if (response.data) {
                    Swal.fire({
                      icon: "success",
                      title: "Save",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then((result) => {
                      window.location.href =
                        "/Human_Resource/intensive_TTT/manage_category_roduct";
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
          }
        }
      }
    });
  }

  function cancle_add_product_category(params) {
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
        window.location.href = "/Human_Resource/intensive_TTT/manage_category_roduct";
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
      data.append("typeFile", product_category.ap_point_id);

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
            setproduct_category({
              ...product_category,
              product_category_image_name: response.data.data.orgin_name,
              product_category_image_path: response.data.data.path,
              product_category_image: response.data.data,
            });
            console.log(product_category);
            setproduct_category_image_path_null(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(product_category);
  }

  async function check_product_category_name(e) {
    if (e.target.value.trim() === "") {
      setproduct_category({
        ...product_category,
        product_category_name: e.target.value,
      });
      setproduct_category_name_null(true);
    } else if (e.target.value.trim().length >= 200) {
      setproduct_category_name_err(true);
      setproduct_category_name_null(false);
    } else {
      setproduct_category({
        ...product_category,
        product_category_name: e.target.value,
      });
      setproduct_category_name_null(false);
    }
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Product Category {pageMode}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">Product Category</li>
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
                    onClick={cancle_add_product_category}
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
                    onClick={save_product_category_data}
                    class="btn btn-block btn-success"
                    id="btn-save"
                  >
                    Save
                  </button>
                </div>
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={cancle_add_product_category}
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
              <h3 className="card-title">Product Category {pageMode}</h3>
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
                        id="award_point_name"
                        value={product_category.product_category_name}
                        disabled={disable}
                        onChange={(e) => {
                          check_product_category_name(e);
                        }}
                      />
                      <label>
                      Product Category
                        <span style={{ color: "red" }}>*</span>
                      </label>{" "}
                      {product_category_name_null ? (
                        <span style={{ color: "red" }}>
                          *กรุณากรอก Product Category
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
                            {product_category.product_category_image_name !== ""
                              ? product_category.product_category_image_name.length > 25
                                ? product_category.product_category_image_name.substring(0, 25) +
                                  "..."
                                : product_category.product_category_image_name
                              : "Select Image"}
                          </label>
                        </div>
                      </div>
                      {product_category_image_path_null ? (
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
                      product_category.product_category_image_path !== "" &&
                      product_category.product_category_image_path !== null &&
                      product_category.product_category_image_path !== undefined
                        ? Configs.API_URL_IMG_incentive +
                          product_category.product_category_image_path
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManageProductCategoryAdd;
