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
function ManageProductCategoryTable() {
  const [product_category, setproduct_category] = useState([]);
  const [filler_product_category, setfiller_product_category] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    product_category_name: "",
  });
  const [disable, setdisable] = useState(null);
  useEffect(() => {
    GetProductCategoryData();
  }, []);

  function GetProductCategoryData(){
    console.log("GetProductCategoryData")
  }
  function deldata(id) {
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
            Swal.fire({
              icon: "success",
              text: "เสร็จสิ้น",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href =
                "/Human_Resource/intensive_TTT/manage_category_roduct";
            });
      }
    });
  }
  function addpage(params) {
    window.location.href =
      "/Human_Resource/intensive_TTT/manage_category_product_add";
  }
  let as = {
    product_category_image_path : "img",
    product_category_name : "Product_categoryname",
    product_category_is_active : "active",
  }
  product_category.push(as)
  // setproduct_category(as)
  const row_data = [];
  for (let index = 0; index < product_category.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["img"] = (
      <img
        id="img"
        alt="..."
        className="img-fluid rounded shadow border-0"
        src={
          product_category[index].product_category_image_path !== "" &&
          product_category[index].product_category_image_path !== null &&
          product_category[index].product_category_image_path !== undefined
            ? Configs.API_URL_IMG_incentive + product_category[index].product_category_image_path
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
    element["pcname"] = (
      <div>
        {product_category[index].product_category_name.length > 25
          ? product_category[index].product_category_name.substring(0, 25) + "..."
          : product_category[index].product_category_name}
      </div>
    );
    element["status"] = (
      <div class="custom-control custom-switch custom-switch-on-success">
        <input
          type="checkbox"
          class="custom-control-input"
          id={"customSwitch" + (index + 1)}
          key={product_category[index].product_category_id}
          value={product_category[index].product_category_id}
          defaultChecked={product_category[index].product_category_is_active}
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
              "/Human_Resource/intensive_TTT/manage_category_product/read/" +
              product_category[index].ap_id
            }
            id={"btn_read" + product_category[index].product_category_id}
            key={product_category[index].product_category_id}
            className="btn btn-xs "
          >
            <i class="fas fa-eye"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            href={
              "/Human_Resource/intensive_TTT/manage_category_product/edit/" +
              product_category[index].product_category_id
            }
            id={"btn_edit" + product_category[index].product_category_id}
            key={product_category[index].product_category_id}
            className=" btn btn-xs "
          >
            {"   "}
            <i class="fas fa-pencil-alt"></i>
            {"   "}
          </a>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-3 ">
          <a
            key={product_category[index].product_category_id}
            id={"btn_delete" + product_category[index].product_category_id}
            className=" btn btn-xs "
            onClick={deldata.bind(this, product_category[index].product_category_id)}
          >
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    );
    row_data.push(element);
  }

  const clearFilter = async () => {
    await setfiller_product_category({
      ...filler_product_category,
      product_category_name: "",
    });
    filler_product_category.product_category_name = "";
    GetProductCategoryData();
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
        label: "Product Category Name",
        field: "pcname",
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
              <h1>Manage Product Category</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Human Resource</li>
                <li className="breadcrumb-item active">
                  Manage Product Category
                </li>
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
                  id="product_category_id"
                  required="false"
                  // value={filler_product_category.product_category_name}
                  onChange={(e) => {
                    // setfiller_product_category({
                    //   ...filler_product_category,
                    //   product_category_name: e.target.value,
                    // });
                  }}
                />
                <label htmlFor="">Product Category Name</label>{" "}
              </div>
            </div>

            <div className="col-6 col-md-4 col-xl-2">
              <div className="form-group ">
                <button
                  type="button"
                  id="btn_search"
                  className="btn btn-block btn-info  "
                  onClick={() => {
                    GetProductCategoryData();
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
                <h3 className="card-title">Product Category</h3>
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

export default ManageProductCategoryTable;
