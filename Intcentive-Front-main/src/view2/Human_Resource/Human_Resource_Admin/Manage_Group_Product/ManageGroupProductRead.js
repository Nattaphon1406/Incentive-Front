import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getFeature, getAcademy } from "../../../../Utils/Common";
import { useParams } from "react-router";
import Resizer from "react-image-file-resizer";

function ManageGroupProductRead(mode) {
    const [pageMode, setPageMode] = useState("");
    const [disable, setdisable] = useState(null);
    const { id } = useParams();

    const [product_group_data, setproduct_group_data] = useState({});
    const [product_data, setproduct_data] = useState({});

    useEffect(() => {
        getProductGroup();
    }, []);

    const getProductGroup = async () => {
        console.log(id);
        axios({
            method: "post",
            url:
                Configs.API_URL_incentive +
                "/api/manageGroupProduct/getProductGroup/" + id,
            headers: {
                Authorization: 'Bearer ' + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                console.log(response.data, 'getProductGroup');
                setproduct_group_data(response.data.category_data);
                setproduct_data(response.data.product_group);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function cancle_add_thank_point(params) {
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
                window.location.href = "/Human_Resource/incentive_hr_admin/manage_group_product";
            }
        });
    }

    const row_data = [];
    console.log(product_data);
    for (let index = 0; index < product_data.length; index++) {
        const element = {};
        element['no'] = index + 1;
        element['product_no'] = product_data[index].product_no;
        element['product_name'] = product_data[index].product_name;
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
                label: "Product No",
                field: "product_no",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product Name",
                field: "product_name",
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
                                <h1>Manage Group Product</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Human Resource</li>
                                    <li className="breadcrumb-item active">
                                        {/* <a href="/Human_Resource/incentive_hr_admin/thank_point"> */}
                                        Thank Point
                                        {/* </a> */}
                                    </li>
                                    <li className="breadcrumb-item active">{pageMode}</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-6 col-md-4 col-xl-2">
                                <button
                                    type="button"
                                    onClick={cancle_add_thank_point}
                                    class="btn btn-block btn-danger "
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Product Group Read</h3>
                        </div>

                        <div className="card-body">
                            <div className="row mt-2 mb-4">
                                <h4 className="card-title ml-3">Product Group Detail</h4>
                            </div>
                            <div className="row">
                                <div className="col-5 col-md-6 col-xl-5">
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-xl-8">
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required
                                                    disabled={true}
                                                    value={product_group_data.category_name}
                                                />
                                                <label htmlFor="">Product Group</label>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2 mb-4">
                                <h4 className="card-title ml-3">Product</h4>
                            </div>
                            <div className="card">
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

                        </div>

                    </div>

                    <div className="card-footer"></div>

                </section>

            </div >
        </div >
    );
}

export default ManageGroupProductRead;