import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getAcademy } from "../../../../Utils/Common";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import LogoPMRP from "../../../../assets/img/Logo/PMRP-Logo_V4.png";

function ManageProductTable(params) {
    const [product_data, setProduct_data] = useState([]);
    const [select_category, setselect_category] = useState([]);
    const [filler_product_data, setfiller_product_data] = useState({
        oem_id: getOem(),
        company_id: getUser().com,
        product_id: "",
        product_no: "",
        product_name: "",
        product_detail: "",
        product_category_id: "",
    });

    const GetCategoryData = async () => {
        var get_category = {
            oem_id: getOem(),
            company_id: getUser().com,
        }
        axios({
            method: "post",
            url: Configs.API_URL_incentive + "/api/manageProduct/productCategory",
            headers: {
                Authorization: 'Bearer ' + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_category,
        })
            .then(function (response) {
                console.log(response.data, "ds");
                setselect_category(response.data.category_list);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(select_category);
    }

    const GetProductData = async () => {
        console.log(filler_product_data);
        var get_filler_product = {
            oem_id: getOem(),
            company_id: getUser().com,
            product_name: filler_product_data.product_name,
            product_category_id: filler_product_data.product_category_id,
        }
        axios({
            method: "post",
            url: Configs.API_URL_incentive + "/api/manageProduct/filterManageProduct",
            headers: {
                Authorization: 'Bearer ' + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_filler_product,
        })
            .then(function (response) {
                console.log(response.data, "GetProductData");
                setProduct_data(response.data.product_list);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(product_data);
    };

    useEffect(() => {
        GetProductData();
        GetCategoryData();
    }, []);

    function ChangeStatusRe(id, status, element_id) {
        // axios({
        //     method: "get",
        //     url:
        //         Configs.API_URL_incentive +
        //         "/api/thankPoint/changeStatusThankpoint/" + id,
        //     headers: {
        //         Authorization: 'Bearer ' + getToken(),
        //         "Content-Type": "application/json",
        //         "X-TTT": Configs.API_TTT,
        //     },
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
        //         console.log((status ? false : true));
        //         document.getElementById(element_id).checked = (status ? false : true);
        //     });
    }

    function ChangeStatus(id, status, element_id) {
        // axios({
        //     method: "get",
        //     url:
        //         Configs.API_URL_incentive +
        //         "/api/thankPoint/changeStatusThankpoint/" + id,
        //     headers: {
        //         Authorization: 'Bearer ' + getToken(),
        //         "Content-Type": "application/json",
        //         "X-TTT": Configs.API_TTT,
        //     },
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
        //         console.log((status ? false : true));
        //         document.getElementById(element_id).checked = (status ? false : true);
        //     });
    }

    const getdataToggleRe = async (e) => {
        console.log("id", e.target.value);
        console.log("value", e.target.checked);
        ChangeStatusRe(e.target.value, e.target.checked, e.target.id)
    }

    const getdataToggle = async (e) => {
        console.log("id", e.target.value);
        console.log("value", e.target.checked);
        ChangeStatus(e.target.value, e.target.checked, e.target.id)
    }

    function deldata(id) {
        console.log("id", id);

        Swal.fire({
            title: "คุณต้องการลบข้อมูลใช่หรือไม่?",
            text: "ข้อมูลที่ถูกลบจะไม่สามารถนำกลับมาได้กรุณาตรวจสอบให้ชัดเจนก่อลบข้อมูล",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: `ไม่`,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("test delete");
                axios({
                    method: "get",
                    url:
                        Configs.API_URL_incentive +
                        "/api/manageProduct/deleteProductCategory/" + id,
                    headers: {
                        Authorization: 'Bearer ' + getToken(),
                        "Content-Type": "application/json",
                        "X-TTT": Configs.API_TTT,
                    },
                })
                    .then(function (response) {
                        console.log(response);
                        Swal.fire({
                            icon: "success",
                            text: "เสร็จสิ้น",
                        }).then(() => {
                            window.location.href = "/Human_Resource/intensive_TTT/manage_product_system";
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
                    });
            }
        });
    }

    const clearFilter = async () => {
        await setfiller_product_data({
            ...filler_product_data,
            product_no: "",
            product_name: "",
            product_category_id: "",
        });
        document.getElementById("select_category").value = '';
        filler_product_data.product_no = "";
        filler_product_data.product_name = "";
        filler_product_data.product_category_id = "";
        GetProductData();
    };

    const row_data = [];
    console.log(product_data);
    for (let index = 0; index < product_data.length; index++) {
        const element = {};
        element['no'] = index + 1;
        element['img'] =
            (
                <img
                    id="img"
                    alt="..."
                    className="img-fluid rounded shadow border-0"
                    src={
                        product_data[index].product_image_path !== "" &&
                            product_data[index].product_image_path !== null &&
                            product_data[index].product_image_path !== undefined
                            ? Configs.API_URL_IMG_incentive + product_data[index].product_image_path
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
        element['id'] = product_data[index].product_no;
        element['name'] = product_data[index].product_name;
        element['cat'] = product_data[index].category_name;
        element['re'] = (
            <div class="custom-control custom-switch custom-switch-on-success">
                <input type="checkbox" class="custom-control-input" id={"customSwitchRe" + (index + 1)}
                    key={product_data[index].product_no}
                    value={product_data[index].product_id}
                    onChange={getdataToggleRe.bind(this)}
                    defaultChecked={true}
                >
                </input>
                <label class="custom-control-label" for={"customSwitchRe" + (index + 1)}></label>
            </div>
        );
        element['status'] = (
            <div class="custom-control custom-switch custom-switch-on-success">
                <input type="checkbox" class="custom-control-input" id={"customSwitch" + (index + 1)}
                    key={product_data[index].product_no}
                    value={product_data[index].product_id}
                    onChange={getdataToggle.bind(this)}
                    defaultChecked={product_data[index].product_is_active}
                >
                </input>
                <label class="custom-control-label" for={"customSwitch" + (index + 1)}></label>
            </div>
        );
        element['mgt'] = (
            <div className="row" style={{ flexWrap: "nowrap" }}>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        href={"/Human_Resource/intensive_TTT/manage_product_system/read/" + product_data[index].product_id}
                        id={"btn_read" + (index + 1)}
                        key={product_data[index].product_id}
                        className="btn btn-xs "
                    >
                        <i class="fas fa-eye"></i>
                        {"   "}
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        href={"/Human_Resource/intensive_TTT/manage_product_system/edit/" + product_data[index].product_id}
                        id={"btn_edit" + (index + 1)}
                        key={product_data[index].product_id}
                        className=" btn btn-xs "
                    >
                        {"   "}
                        <i class="fas fa-pencil-alt"></i>
                        {"   "}
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        key={product_data[index].product_id}
                        id={"btn_delete" + (index + 1)}
                        className=" btn btn-xs "
                        onClick={deldata.bind(this, product_data[index].category_id)}
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
                label: "Product No.",
                field: "id",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product Name",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product Category",
                field: "cat",
                sort: "asc",
                width: 50,
            },
            {
                label: "Recommended Product",
                field: "re",
                sort: "asc",
                width: 50,
            },
            {
                label: "Status Active",
                field: "status",
                sort: "asc",
                width: 10,
            },
            {
                label: "Management",
                field: "mgt",
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
                                <h1>Manage Product</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Human Resource</li>
                                    <li className="breadcrumb-item active">Manage Product</li>
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
                                        id="text_product_no"
                                        required="false"
                                        value={filler_product_data.product_no}
                                        onChange={(e) => {
                                            setfiller_product_data({
                                                ...filler_product_data,
                                                product_no: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="">Product No.</label>{" "}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="text_product_name"
                                        required="false"
                                        value={filler_product_data.product_name}
                                        onChange={(e) => {
                                            setfiller_product_data({
                                                ...filler_product_data,
                                                product_name: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="">Product Name</label>{" "}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div class="form-group">
                                    <select
                                        className="form-control custom-select select2"
                                        type="text"
                                        required
                                        id="select_category"
                                        value={product_data.category_id}
                                        onChange={(e) => {
                                            setfiller_product_data({
                                                ...filler_product_data,
                                                product_category_id: e.target.value,
                                            });
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            Select...
                                        </option>
                                        {select_category.map((el) => {
                                            return (
                                                <option value={el.category_id}>
                                                    {el.category_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <label htmlFor="">Product Category</label>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_search"
                                        className="btn btn-block btn-info  "
                                        onClick={() => { GetProductData(); }}
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
                                        className="btn btn-block btn-primary"
                                        onClick={addpage}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Product</h3>
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

export default ManageProductTable;