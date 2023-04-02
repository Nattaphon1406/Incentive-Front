import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getAcademy } from "../../../../Utils/Common";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import LogoPMRP from "../../../../assets/img/Logo/PMRP-Logo_V4.png";
import QRCode from "qrcode.react";

function ManageProductTable(params) {
    const [product_data, setProduct_data] = useState([]);
    const [filler_product_data, setfiller_product_data] = useState({
        oem_id: getOem(),
        company_id: getUser().com,
        product_id: "",
        product_name: "",
        product_detail: "",
        product_category_id: "",
    });


    const clearFilter = async () => {
        await setfiller_product_data({
            ...filler_product_data,
            product_name: "",
            product_category_id: "",
        });
        document.getElementById("select_category").value = '';
        filler_product_data.product_name = "";
        filler_product_data.product_category_id = "";
    };

    const row_data = [];
    console.log(product_data);
    for (let index = 1; index < 4; index++) {
        const element = {};
        element['no'] = index;
        element['Order'] = "OROOOOO" + index;
        element['User'] = "emp" + index;
        element['Product'] = "PDOO" + index;
        element['Name'] = index == 1 ? "เมาส์" : index == 2 ? "ทีวี" : "ตู้เย็น";
        element['Model'] = index == 1 ? "สีดำ" : index == 2 ? "32 นิ้ว" : "ขนาดกลาง";
        element['Date'] = index == 1 ? "10/01/2023, 09:56 น." : index == 2 ? "10/01/2023, 08:56 น." : "09/01/2023, 08:56 น.";
        element['Status'] = (
            index == 1 ?
                <div className="row" style={{ flexWrap: "nowrap", padding: "4px" }}>
                    <div class="btn col-6 btn-secondary disabled">
                        Confirm Order
                    </div>
                    <button
                            type="button"
                            id="btn_add"
                            class="ml-1 btn col-6 btn-danger"
                            data-toggle="modal"
                            data-target="#modal-add-remark"
                            data-backdrop="static"
                            data-keyboard="false"
                        >
                            Cancel Order
                        </button>
                </div> :
                index == 2 ?
                    <div className="row" style={{ flexWrap: "nowrap", padding: "4px" }}>
                        <div class="btn col-6 btn-success">
                            Confirm Order
                        </div>
                        <button
                            type="button"
                            id="btn_add"
                            class="ml-1 btn col-6 btn-danger"
                            data-toggle="modal"
                            data-target="#modal-add-remark"
                            data-backdrop="static"
                            data-keyboard="false"
                        >
                            Cancel Order
                        </button>
                    </div> :
                    <div className="row" style={{ flexWrap: "nowrap", padding: "4px" }}>
                        <div class="btn col-6 btn-success">
                            Confirm Order
                        </div>
                        <div class="ml-1 btn col-6 btn-secondary disabled">
                            Cancel Order
                        </div>
                    </div>
        );
        element['Confirm'] = index == 1 ? "10/01/2023, 09:56 น." : index == 2 ? " " : "09/01/2023, 08:56 น.";
        element['Remark'] = index == 1 ? "สินค้าหมด" : index == 2 ? " " : " ";
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
                label: "Order ID",
                field: "Order",
                sort: "asc",
                width: 50,
            },
            {
                label: "User ID",
                field: "User",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product No",
                field: "Product",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product Name",
                field: "Name",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product Model",
                field: "Model",
                sort: "asc",
                width: 50,
            },
            {
                label: "Order Date",
                field: "Date",
                sort: "asc",
                width: 50,
            },
            {
                label: "Order Status",
                field: "Status",
                sort: "asc",
                width: 80,
            },
            {
                label: "Confirm Order Date",
                field: "Confirm",
                sort: "asc",
                width: 50,
            },
            {
                label: "Remark",
                field: "Remark",
                sort: "asc",
                width: 80,
            },
        ],
        rows: row_data,
    };

    function addpage(params) {
        window.location.href = "/Human_Resource/intensive_TTT/manage_product_system/add";
    }

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Purchase Order</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Intensive Point</li>
                                    <li className="breadcrumb-item active">Purchase Order</li>
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
                                        id="text_product_name"
                                        required="false"
                                    />
                                    <label htmlFor="">Order Id</label>{" "}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ap_point_min"
                                        required="false"
                                    />
                                    <label htmlFor="">User Id</label>{" "}
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_search"
                                        className="btn btn-block btn-info  "
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
                                        onClick={() => clearFilter()}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_add"
                                        className="btn btn-block btn-info"
                                    >
                                        Check Stock : Sent Email
                                    </button>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_add"
                                        className="btn btn-block btn-info"
                                    >
                                        Report PO
                                    </button>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_add"
                                        className="btn btn-block btn-info"
                                    >
                                        PO : Sent Email
                                    </button>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_add"
                                        className="btn btn-block btn-primary"
                                    >
                                        Download Excel
                                    </button>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_add"
                                        className="btn btn-block btn-primary"
                                    >
                                        Import from Excel
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Purchase Order</h3>
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
                <div className="modal fade center" id="modal-add-remark">
                    <div className="modal-dialog modal-ml">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Order Remark</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={async () => {

                                    }}
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body divCenter">
                                <div className="container-fluid">
                                    <div className="row ml-1 mr-1">
                                        <div className="col-12">

                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    onChange={(e) => {
                                                    }}
                                                />
                                                <label htmlFor="">Remark :</label>{" "}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-3 ">

                                            <button
                                                type="button"
                                                id="btn_add"
                                                className="btn btn-block btn-primary"
                                                data-dismiss="modal"
                                                style={{ float: "left" }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="col-md-3 offset-md-6">

                                            <button
                                                type="button"
                                                id="btn_close"
                                                className="btn btn-block btn-secondary"
                                                data-dismiss="modal" aria-label="Close"
                                                style={{ float: "right" }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageProductTable;