import React, { Component, useEffect, useState } from "react";

import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getAcademy } from "../../../../Utils/Common";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";

function ThankPointTable(params) {
    const [thank_point, setthank_point] = useState([]);
    const [tp_point_min_err, settp_point_min_err] = useState(false);
    const [tp_point_max_err, settp_point_max_err] = useState(false);
    const [filler_thank_point, setfiller_thank_point] = useState({
        oem_id: getOem(),
        company_id: getUser().com,
        tp_point_id: "",
        tp_point_name: "",
        tp_point_min: "",
        tp_point_max: "",
    });

    const GetThankPointData = async () => {
        console.log(filler_thank_point);
        var get_filler_thank_point = {
            oem_id: getOem(),
            company_id: getUser().com,
            tp_point_id: filler_thank_point.tp_point_id.trim(),
            tp_point_name: filler_thank_point.tp_point_name.trim(),
            tp_point_min: filler_thank_point.tp_point_min.trim(),
            tp_point_max: filler_thank_point.tp_point_max.trim(),
        }
        axios({
            method: "post",
            url: Configs.API_URL_incentive + "/api/thankPoint/filterThankPoint",
            headers: {
                Authorization: 'Bearer ' + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_filler_thank_point,
        })
            .then(function (response) {
                console.log(response.data, "ds");
                setthank_point(response.data.thank_point_list);
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(thank_point);
    };

    useEffect(() => {
        GetThankPointData();
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
                        "/api/thankPoint/deletethankpoint/" + id,
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
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            window.location.href = "/Human_Resource/incentive_hr_admin/thank_point";
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
        axios({
            method: "get",
            url:
                Configs.API_URL_incentive +
                "/api/thankPoint/changeStatusThankpoint/" + id,
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
                //     showConfirmButton: false,
                //     timer: 1500,
                // }).then(() => {
                // window.location.href = "/Human_Resource/incentive_hr_admin/thank_point";
                // });
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire("Error", "เกิดข้อผิดพลาด: " + error, "error");
                console.log((status ? false : true));
                document.getElementById(element_id).checked = (status ? false : true);
            });
    }

    const getdataToggle = async (e) => {
        console.log("id", e.target.value);
        console.log("value", e.target.checked);
        ChangeStatus(e.target.value, e.target.checked, e.target.id)
    }

    const clearFilter = async () => {
        await setfiller_thank_point({
            ...filler_thank_point,
            tp_point_id: "",
            tp_point_name: "",
            tp_point_min: "",
            tp_point_max: "",
        });

        filler_thank_point.tp_point_id = "";
        filler_thank_point.tp_point_name = "";
        filler_thank_point.tp_point_min = "";
        filler_thank_point.tp_point_max = "";
        GetThankPointData();
    };

    const row_data = [];
    for (let index = 0; index < thank_point.length; index++) {
        const element = {};
        element['no'] = index + 1;
        element['img'] = (
            <img
                id="img"
                alt="..."
                className="img-fluid rounded shadow border-0"
                src={
                    thank_point[index].tp_image_path !== "" &&
                        thank_point[index].tp_image_path !== null &&
                        thank_point[index].tp_image_path !== undefined
                        ? Configs.API_URL_IMG_incentive + thank_point[index].tp_image_path
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
        element['id'] = thank_point[index].tp_point_id;
        element['name'] = (
            <div>
                {thank_point[index].tp_point_name.length > 25 ? thank_point[index].tp_point_name.substring(0, 25) + "..." : thank_point[index].tp_point_name}
                {/* {thank_point[index].tp_point_name} */}
            </div>
        );
        element['point'] = thank_point[index].tp_point;
        element['status'] = (
            <div class="custom-control custom-switch custom-switch-on-success">
                <input type="checkbox" class="custom-control-input" id={"customSwitch" + (index + 1)}
                    key={thank_point[index].tp_point_id}
                    value={thank_point[index].tp_id}
                    onChange={getdataToggle.bind(this)}
                    defaultChecked={thank_point[index].tp_is_active}
                >
                </input>
                <label class="custom-control-label" for={"customSwitch" + (index + 1)}></label>
            </div>
        );
        element['mgt'] = (
            <div className="row" style={{ flexWrap: "nowrap" }}>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        href={"/Human_Resource/incentive_hr_admin/thank_point/read/" + thank_point[index].tp_id}
                        id={"btn_read" + (index + 1)}
                        key={thank_point[index].tp_point_id}
                        className="btn btn-xs "
                    >
                        <i class="fas fa-eye"></i>
                        {"   "}
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        href={"/Human_Resource/incentive_hr_admin/thank_point/edit/" + thank_point[index].tp_id}
                        id={"btn_edit" + (index + 1)}
                        key={thank_point[index].tp_point_id}
                        className=" btn btn-xs "
                    >
                        {"   "}
                        <i class="fas fa-pencil-alt"></i>
                        {"   "}
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        key={thank_point[index].tp_point_id}
                        id={"btn_delete" + (index + 1)}
                        className=" btn btn-xs "
                        onClick={deldata.bind(this, thank_point[index].tp_id)}
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
                label: "Thank Point ID",
                field: "id",
                sort: "asc",
                width: 50,
            },
            {
                label: "Thank Point Name",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "Thank Point",
                field: "point",
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
                field: "mgt",
                sort: "asc",
                width: 80,
            },
        ],
        rows: row_data,
    };

    function addpage(params) {
        window.location.href = "/Human_Resource/incentive_hr_admin/thank_point/add";
    }

    async function check_thank_point_min(e) {
        if (parseInt(e.target.value.trim()) < 1) {
            settp_point_min_err(true);
        } else if (isNaN(e.target.value.trim())) {
            settp_point_min_err(true);
        } else {
            setfiller_thank_point({
                ...filler_thank_point,
                tp_point_min: e.target.value,
            });
            settp_point_min_err(false);
        }
    }

    async function check_thank_point_max(e) {
        if (parseInt(e.target.value.trim()) < 1) {
            settp_point_max_err(true);
        } else if (isNaN(e.target.value.trim())) {
            settp_point_max_err(true);
        } else {
            setfiller_thank_point({
                ...filler_thank_point,
                tp_point_max: e.target.value,
            });
            settp_point_max_err(false);
        }
    }

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Thank Point</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Human Resource</li>
                                    <li className="breadcrumb-item active">Thank Point</li>
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
                                        id="text_tp_point_id"
                                        required="false"
                                        value={filler_thank_point.tp_point_id}
                                        onChange={(e) => {
                                            setfiller_thank_point({
                                                ...filler_thank_point,
                                                tp_point_id: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="">Thank Point ID</label>{" "}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="text_tp_point_name"
                                        required="false"
                                        value={filler_thank_point.tp_point_name}
                                        onChange={(e) => {
                                            setfiller_thank_point({
                                                ...filler_thank_point,
                                                tp_point_name: e.target.value,
                                            });
                                        }}
                                    />
                                    <label htmlFor="">Thank Point Name</label>{" "}
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="text_tp_point_min"
                                        required="false"
                                        value={filler_thank_point.tp_point_min}
                                        onChange={(e) => {
                                            check_thank_point_min(e)
                                        }}
                                    />
                                    <label htmlFor="">Thank Point Min</label>{" "}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="text_tp_point_max"
                                        required="false"
                                        value={filler_thank_point.tp_point_max}
                                        onChange={(e) => {
                                            check_thank_point_max(e)
                                        }}
                                    />
                                    <label htmlFor="">Thank Point Max</label>{" "}
                                </div>
                            </div>

                            <div className="col-6 col-md-4 col-xl-2">
                                <div className="form-group ">
                                    <button
                                        type="button"
                                        id="btn_search"
                                        className="btn btn-block btn-info  "
                                        onClick={() => { GetThankPointData(); }}
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
                                        Add Thank Point
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Thank Point</h3>
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

export default ThankPointTable;