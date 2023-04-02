import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getAcademy } from "../../../../Utils/Common";

function ManageGroupProductTable(params) {
    const [product_category, setproduct_category] = useState([]);
    const [filler_product_category, setfiller_product_category] = useState({
        oem_id: getOem(),
        company_id: getUser().com,
        category_name: "",
    });

    const GetProductCategoryData = async () => {
        console.log(filler_product_category);
        var get_filler_product_category = {
            oem_id: getOem(),
            company_id: getUser().com,
            category_name: filler_product_category.category_name.trim(),
        }
        axios({
            method: "post",
            url: Configs.API_URL_incentive + "/api/manageGroupProduct/filterManageGroupProduct",
            headers: {
                Authorization: 'Bearer ' + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_filler_product_category,
        })
            .then(function (response) {
                console.log(response.data, "GetProductCategoryData");
                setproduct_category(response.data.category_list);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        GetProductCategoryData();
    }, []);

    function ChangeStatus(id, status, element_id) {
        console.log("test delete");
        axios({
            method: "get",
            url:
                Configs.API_URL_incentive +
                "/api/manageGroupProduct/changeStatusCategory/" + id,
            headers: {
                Authorization: 'Bearer ' + getToken(),
                "Content-Type": "application/json",
                "X-TTT": Configs.API_TTT,
            },
        })
            .then(function (response) {
                console.log(response);
                // Swal.fire({
                //     icon: "success",
                //     text: "เสร็จสิ้น",
                // }).then(() => {
                //     window.location.href = "/Human_Resource/incentive_hr_admin/manage_group_product";
                // });
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
            });
    }

    const clearFilter = async () => {
        await setfiller_product_category({
            ...filler_product_category,
            category_name: "",
        });

        filler_product_category.category_name = "";
        GetProductCategoryData();
    };

    const getdataToggle = async (e) => {
        ChangeStatus(e.target.value, e.target.checked, e.target.id)
    }

    const row_data = [];
    console.log(product_category);
    for (let index = 0; index < product_category.length; index++) {
        const element = {};
        element['no'] = index + 1;
        element['name'] = product_category[index].category_name;
        element['status'] = (
            <div class="custom-control custom-switch custom-switch-on-success">
                <input type="checkbox" class="custom-control-input" id={"customSwitch" + (index + 1)}
                    key={product_category[index].category_id}
                    value={product_category[index].category_id}
                    onChange={getdataToggle.bind(this)}
                    defaultChecked={product_category[index].category_is_active}
                >
                </input>
                <label class="custom-control-label" for={"customSwitch" + (index + 1)}
                    key={product_category[index].category_id}></label>
            </div>
        );
        element['mgt'] = (
            <div className="row" style={{ flexWrap: "nowrap" }}>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        href={"/Human_Resource/incentive_hr_admin/manage_group_product_read/" + product_category[index].category_id}
                        id={"btn_read" + (index + 1)}
                        key={product_category[index].category_id}
                        className="btn btn-xs "
                    >
                        <i class="fas fa-eye"></i>
                        {"   "}
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
                label: "Product Group",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "Status",
                field: "status",
                sort: "asc",
                width: 50,
            },
            {
                label: "Management",
                field: "mgt",
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
                                <h1>Manage Product Group</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Human Resource</li>
                                    <li className="breadcrumb-item active">Manage Product Group</li>
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
                                        id="text_category_name"
                                        required="false"
                                        value={filler_product_category.category_name}
                                        onChange={(e) => {
                                            setfiller_product_category({
                                                ...filler_product_category,
                                                category_name: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="">Product Group Name</label>{" "}
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_search"
                                        className="btn btn-block btn-info  "
                                        onClick={() => { GetProductCategoryData(); }}
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
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Product Group</h3>
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
    );
}

export default ManageGroupProductTable;