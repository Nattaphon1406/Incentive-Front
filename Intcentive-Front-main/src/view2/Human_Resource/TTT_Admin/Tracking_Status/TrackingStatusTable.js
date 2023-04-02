import React, { Component, useEffect, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import Configs from "../../../../config";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";

import {
  getOem,
  getToken,
  getUser,
  getAcademy,
} from "../../../../Utils/Common";
function TrackingStatusTable() {
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

  function GetProductCategoryData() {
    console.log("GetProductCategoryData");
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
            "/Human_Resource/intensive_TTT/manage_category_product";
        });
      }
    });
  }
  function addpage(params) {
    window.location.href =
      "/Human_Resource/intensive_TTT/manage_category_product_add";
  }
  let as = {
    product_category_image_path: "img",
    product_category_name: "Product_categoryname",
    product_category_is_active: "active",
  };
  product_category.push(as);

  let order = ["OR000002", "OR000003"];
  let po_date = ["20/02/2023", "21/02/2023"];
  let po_no = ["PO-000001", "PO-000002"];
  let user_id = ["TTT01", "TTT02"];
  let address = ["bangkok", "chonburi"];
  let product_no = ["PD0001", "PD0002"];
  let product_name = ["Shirt", "Pants"];
  let product_model = ["Medium", "Medium"];
  let tracking_status = ["shipping", "noshipping"];
  let tracking_no = ["TH012250", "TH012251"];
  let shipping_name = ["Kerry", "J&T"];
  let supplier = ["SUP", "APL"];
  let update_date = ["21/02/2023", "22/02/2023"];
  const test_data = {
    order: order,
    po_date: po_date,
    po_no: po_no,
    user_id: user_id,
    address: address,
    product_no: product_no,
    product_name: product_name,

    product_model: product_model,
    tracking_status: tracking_status,
    tracking_no: tracking_no,
    shipping_name: shipping_name,
    supplier: supplier,
    update_date: update_date,
  };
  // setproduct_category(product_category)
  // setproduct_category(as)
  const row_data = [];
  for (let index = 0; index < 2; index++) {
    const element = {};
    element["no"] = index + 1;
    element["orderId"] = test_data.order[index];
    element["pono"] = test_data.po_no[index];
    element["podate"] = test_data.po_date[index];
    element["userid"] = test_data.user_id[index];
    element["address"] = test_data.address[index];
    element["prono"] = test_data.product_no[index];
    element["proname"] = test_data.product_name[index];
    element["promodel"] = test_data.product_model[index];
    element["trackingstatus"] = (
      <>
        <div className="row" style={{ flexWrap: "nowrap", padding: "4px" }}>
          {test_data.tracking_status[index] === "shipping" ? (
            <div
              class="btn btn-block btn-success"
              data-toggle="modal"
              data-target="#modal-export"
            >
              Shipping
            </div>
          ) : (
            <div
              class="btn btn-block btn-secondary"
              data-toggle="modal"
              data-target="#modal-export"
            >
              Shipping
            </div>
          )}
        </div>
      </>
    );
    element["trackingno"] = test_data.tracking_no[index];
    element["shipname"] = test_data.shipping_name[index];
    element["supplier"] = test_data.supplier[index];
    element["update"] = test_data.update_date[index];
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
        width: 10,
      },
      {
        label: "Order Id",
        field: "orderId",
        sort: "asc",
        width: 10,
      },
      {
        label: "PO No.",
        field: "pono",
        sort: "asc",
        width: 10,
      },
      {
        label: "PO Date",
        field: "podate",
        sort: "asc",
        width: 10,
      },
      {
        label: "User Id",
        field: "userid",
        sort: "asc",
        width: 10,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 10,
      },
      {
        label: "Product No.",
        field: "prono",
        sort: "asc",
        width: 10,
      },
      {
        label: "Product Name",
        field: "proname",
        sort: "asc",
        width: 10,
      },
      {
        label: "Product Model",
        field: "promodel",
        sort: "asc",
        width: 10,
      },
      {
        label: "Tracking Status",
        field: "trackingstatus",
        sort: "asc",
        width: 10,
      },
      {
        label: "Tracking No.",
        field: "trackingno",
        sort: "asc",
        width: 10,
      },
      {
        label: "Shipping Name",
        field: "shipname",
        sort: "asc",
        width: 10,
      },
      {
        label: "Supplier",
        field: "supplier",
        sort: "asc",
        width: 10,
      },
      {
        label: "Update Date",
        field: "update",
        sort: "asc",
        width: 10,
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
              <h1>Tracking Status</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Human Resource</li>
                <li className="breadcrumb-item active">Tracking Status</li>
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
                    //    product_category_name: e.target.value,
                    // });
                  }}
                />
                <label htmlFor="">Order Id</label>{" "}
              </div>
            </div>

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
                    //    product_category_name: e.target.value,
                    // });
                  }}
                />
                <label htmlFor="">PO No.</label>{" "}
              </div>
            </div>

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
                    //    product_category_name: e.target.value,
                    // });
                  }}
                />
                <label htmlFor="">User Id</label>{" "}
              </div>
            </div>

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
                    //    product_category_name: e.target.value,
                    // });
                  }}
                />
                <label htmlFor="">Supplier</label>{" "}
              </div>
            </div>

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
                    //    product_category_name: e.target.value,
                    // });
                  }}
                />
                <label htmlFor="">PO Date</label>{" "}
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
                    // GetProductCategoryData();
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

            <div className="col-6 col-md-4 col-xl-2">
              <div className="form-group ">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="btn btn-block btn-primary"
                  table={"table-to-xls-export"}
                  filename={
                    "tracking_status_" + moment(new Date()).format("DDMMyyyy")
                  }
                  sheet="tablexls"
                  buttonText="Download Excel"
                />
              </div>
            </div>
            <div style={{ display: "none" }}>
              <MDBDataTable
                className="table table-head-fixed"
                striped
                id="table-to-xls-export"
                sortable={false}
                bordered
                paging={false}
                hover
                fixedHeader
                data={data}
              />
            </div>
            <div className="col-6 col-md-4 col-xl-2">
              <div className="form-group ">
                <button
                  type="button"
                  id="btn_add"
                  className="btn btn-block btn-primary"
                  // onClick={addpage}
                >
                  Import Excel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tracking Status</h3>
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
        <div class="modal fade show" id="modal-export">
          <div class="modal-dialog modal-m">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Tracking Status</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  // onClick={}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div
                    className="col-11 mt-2 ml-2"
                    style={{ Align: "center", paddingLeft: "30px" }}
                  >
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
                          //    product_category_name: e.target.value,
                          // });
                        }}
                      />
                      <label htmlFor="">Tracking No.</label>{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-11 mt-2 ml-2"
                    style={{ Align: "center", paddingLeft: "30px" }}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="product_category_id"
                        required="false"
                        // value={filler_product_category.product_category_name}
                        onChange={(e) => {}}
                      />
                      <label htmlFor="">Supplier Name</label>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingStatusTable;
