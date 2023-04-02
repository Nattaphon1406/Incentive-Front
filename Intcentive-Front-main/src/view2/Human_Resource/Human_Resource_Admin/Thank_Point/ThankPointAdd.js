import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getFeature, getAcademy } from "../../../../Utils/Common";
import { useParams } from "react-router";
import Resizer from "react-image-file-resizer";

function ThankPointAdd(mode) {
    const [pageMode, setPageMode] = useState("");
    const [disable, setdisable] = useState(null);
    const { id } = useParams();

    const [thank_point_data, setthank_point_data] = useState({
        tp_id: "",
        tp_point_id: "",
        tp_point_name: "",
        tp_point: "",
        tp_point_detail: "",
        tp_image: "",
        tp_image_name: "",
        tp_image_path: "",
    });

    const [tp_point_id_err, settp_point_id_err] = useState(false);
    const [tp_point_id_null, settp_point_id_null] = useState(false);
    const [tp_point_name_err, settp_point_name_err] = useState(false);
    const [tp_point_name_null, settp_point_name_null] = useState(false);
    const [tp_point_errNum, settp_point_errNum] = useState(false);
    const [tp_point_err, settp_point_err] = useState(false);
    const [tp_point_null, settp_point_null] = useState(false);
    const [tp_image_path_null, settp_image_path_null] = useState(false);

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
        getThankPoint();
    }, []);

    const getThankPoint = async () => {
        if (mode.mode == "read" || mode.mode == "edit") {
            var temp = {
                tp_id: id,
            }
            axios({
                method: "post",
                url:
                    Configs.API_URL_incentive +
                    "/api/thankPoint/getthankpoint",
                headers: {
                    Authorization: 'Bearer ' + getToken(),
                    "X-TTT": Configs.API_TTT,
                    "Content-Type": "application/json",
                },
                data: temp,
            })
                .then(function (response) {
                    console.log(response);
                    setthank_point_data({
                        tp_id: response.data.thank_point_list[0].tp_id || '',
                        tp_point_id: response.data.thank_point_list[0].tp_point_id || '',
                        tp_point_name: response.data.thank_point_list[0].tp_point_name || '',
                        tp_point: response.data.thank_point_list[0].tp_point || '',
                        tp_point_detail: response.data.thank_point_list[0].tp_point_detail || '',
                        tp_image_name: response.data.thank_point_list[0].tp_image_name || '',
                        tp_image_path: response.data.thank_point_list[0].tp_image_path || '',
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    function alert_null() {
        var error_list = [];
        if (thank_point_data.tp_point_id.trim() == "") {
            let temp_err = {
                message: "กรุณากรอก Thank Point ID",
            };
            error_list.push(temp_err);
            settp_point_id_null(true);
        }
        if (thank_point_data.tp_point_name.trim() == "") {
            let temp_err = {
                message: "กรุณากรอก Thank Point Name"
            }
            error_list.push(temp_err);
            settp_point_name_null(true);
        }
        if (thank_point_data.tp_point.trim() == "") {
            let temp_err = {
                message: "กรุณากรอก Thank Point",
            };
            error_list.push(temp_err);
            settp_point_null(true);
        }
        console.log(thank_point_data);
        return error_list;
    }

    function save_thank_point_data() {
        Swal.fire({
            title: 'คุณต้องการที่จะบันทึกหรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes`,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                const error_list = alert_null();
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
                            tp_point_id: thank_point_data.tp_point_id.trim(),
                            tp_point_name: thank_point_data.tp_point_name.trim(),
                            tp_point: parseInt(thank_point_data.tp_point.trim()),
                            tp_point_detail: thank_point_data.tp_point_detail || null,
                            tp_image_name: thank_point_data.tp_image_name || null,
                            tp_image_path: thank_point_data.tp_image_path || null,
                            tp_is_active: true,
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
                                    Configs.API_URL_incentive + "/api/thankPoint/addthankpoint",
                                headers: {
                                    Authorization: 'Bearer ' + getToken(),
                                    "X-TTT": Configs.API_TTT,
                                    "Content-Type": "application/json",
                                },
                                data: temp,
                            })
                                .then(function (response) {
                                    if (response.data) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "เสร็จสิ้น",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        }).then((result) => {
                                            window.location.href = "/Human_Resource/incentive_hr_admin/thank_point";
                                        });
                                    }

                                    //console.log(response.data);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    Swal.fire("Error", "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis, "error");
                                });
                        });
                    }
                    if (mode.mode === "edit") {
                        const temp = {
                            tp_id: id,
                            oem_id: getOem(),
                            company_id: getUser().com,
                            tp_point_id: thank_point_data.tp_point_id.trim(),
                            tp_point_name: thank_point_data.tp_point_name.trim(),
                            tp_point: parseInt(thank_point_data.tp_point.trim()),
                            tp_point_detail: thank_point_data.tp_point_detail || null,
                            tp_image_name: thank_point_data.tp_image_name || null,
                            tp_image_path: thank_point_data.tp_image_path || null,
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
                                    Configs.API_URL_incentive + "/api/thankPoint/editthankpoint",
                                headers: {
                                    Authorization: 'Bearer ' + getToken(),
                                    "X-TTT": Configs.API_TTT,
                                    "Content-Type": "application/json",
                                },
                                data: temp,
                            })
                                .then(function (response) {
                                    if (response.data) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "เสร็จสิ้น",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        }).then((result) => {
                                            window.location.href = "/Human_Resource/incentive_hr_admin/thank_point";
                                        });
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    Swal.fire("Error", "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis, "error");
                                });
                        });
                    }
                }
            }
        });
    }

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
                window.location.href = "/Human_Resource/incentive_hr_admin/thank_point";
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

                },
                // "base64"
            );
        });

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
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
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        return file && acceptedImageTypes.includes(file['type'])
    }

    async function setproductLogo(e) {
        const file = e.target.files[0];
        const regex = /([\u0E00-\u0E7F]+)/gmu;
        const str = file.name;
        let m = regex.exec(str);
        //console.log("image is :",isFileImage(file)); 

        if (m !== null || isFileImage(file) === false) {
            //console.log("ชื่อไฟล์ไม่ถูกต้อง"); 
            Swal.fire(
                'Error',
                'ชื่อไฟล์หรือประเภทไฟล์ไม่ถูกต้อง',
                'error'
            )
        } else {
            const image = await resizeFile(file);

            var file_image = dataURLtoFile(image, file.name);
            var data = new FormData();
            data.append("Profile", file_image);
            data.append("typeFile", thank_point_data.tp_point_id.trim());

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
                        setthank_point_data({
                            ...thank_point_data,
                            tp_image_name: response.data.data.orgin_name,
                            tp_image_path: response.data.data.path,
                            tp_image: response.data.data,
                        });
                        console.log(thank_point_data);
                        settp_image_path_null(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        console.log(thank_point_data);
    }

    async function check_thank_point_id(e) {
        if (e.target.value.trim() === "") {
            setthank_point_data({
                ...thank_point_data,
                tp_point_id: e.target.value,
            });
            settp_point_id_null(true);
        } else if (e.target.value.trim().match(/[`~%^&*!@#$()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g) != null) {
            settp_point_id_err(true);
            settp_point_id_null(false);
        } else if (e.target.value.trim().length > 8) {
            settp_point_id_err(false);
            settp_point_id_null(false);
        } else {
            setthank_point_data({
                ...thank_point_data,
                tp_point_id: e.target.value,
            });
            settp_point_id_err(false);
            settp_point_id_null(false);
        }
    }

    async function check_thank_point_name(e) {
        if (e.target.value.trim() === "") {
            setthank_point_data({
                ...thank_point_data,
                tp_point_name: e.target.value,
            });
            settp_point_name_null(true);
        } else if (e.target.value.trim().length >= 201) {
            settp_point_name_err(true);
            settp_point_name_null(false);
        } else {
            setthank_point_data({
                ...thank_point_data,
                tp_point_name: e.target.value,
            });
            settp_point_name_null(false);
        }
    }

    async function check_thank_point(e) {
        if (e.target.value.trim() === "") {
            setthank_point_data({
                ...thank_point_data,
                tp_point: e.target.value,
            });
            settp_point_null(true);
        } else if (parseInt(e.target.value.trim()) < 1) {
            settp_point_errNum(true);
            settp_point_err(false);
            settp_point_null(false);
        } else if (isNaN(e.target.value.trim())) {
            settp_point_errNum(false);
            settp_point_err(true);
            settp_point_null(false);
        } else {
            setthank_point_data({
                ...thank_point_data,
                tp_point: e.target.value,
            });
            settp_point_errNum(false);
            settp_point_err(false);
            settp_point_null(false);
        }
    }

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Thank Point  {pageMode}</h1>
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
                        {mode.mode === "read" ? (
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
                        ) : (
                            <div className="row mb-2">
                                <div className="col-6 col-md-3 col-xl-1">
                                    <button
                                        type="button"
                                        onClick={save_thank_point_data}
                                        class="btn btn-block btn-success"
                                        id="btn-save"
                                    >
                                        Save
                                    </button>
                                </div>
                                <div className="col-6 col-md-3 col-xl-1">
                                    <button
                                        type="button"
                                        onClick={cancle_add_thank_point}
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
                            <h3 className="card-title">Thank Point {pageMode}</h3>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-5 col-md-6 col-xl-5">
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-xl-8">
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_tp_point_id"
                                                    required
                                                    disabled={disable}
                                                    value={thank_point_data.tp_point_id}
                                                    onChange={(e) => {
                                                        check_thank_point_id(e)
                                                    }}
                                                />
                                                <label htmlFor="">Thank Point ID <span style={{ color: "red" }}>*</span></label>{" "}
                                                {tp_point_id_err ? <span style={{ color: "red" }}>*ห้ามกรอกตัวอักษรพิเศษ</span> : ""}
                                                {tp_point_id_null ? <span style={{ color: "red" }}>*กรุณากรอก Thank Point ID</span> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-xl-8">
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_tp_point_name"
                                                    required
                                                    disabled={disable}
                                                    value={thank_point_data.tp_point_name}
                                                    onChange={(e) => {
                                                        check_thank_point_name(e)
                                                    }}
                                                />
                                                <label htmlFor="">Thank Point Name <span style={{ color: "red" }}>*</span></label>{" "}
                                                {tp_point_name_null ? <span style={{ color: "red" }}>*กรุณากรอก Thank Point Name</span> : ""}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-12 col-xl-8">
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_tp_point"
                                                    required
                                                    disabled={disable}
                                                    value={thank_point_data.tp_point}
                                                    onChange={(e) => {
                                                        check_thank_point(e)
                                                    }}
                                                />
                                                <label htmlFor="">Thank Point <span style={{ color: "red" }}>*</span></label>{" "}
                                                {tp_point_errNum ? <span style={{ color: "red" }}>*กรุณากรอก Thank Point มากกว่า 0</span> : ""}
                                                {tp_point_err ? <span style={{ color: "red" }}>*กรุณากรอก Thank Point เป็นตัวเลขเท่านั้น</span> : ""}
                                                {tp_point_null ? <span style={{ color: "red" }}>*กรุณากรอก Thank Point</span> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4 col-12 col-md-12 col-xl-8">
                                        <label htmlFor="exampleInputFile">Part Image <span style={{ color: "red" }}>size(400 x 300) px</span></label>
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
                                                    {thank_point_data.tp_image_name !== ""
                                                        ? (thank_point_data.tp_image_name.length > 36
                                                            ? thank_point_data.tp_image_name.substring(0, 36) + "..."
                                                            : thank_point_data.tp_image_name)
                                                        : "Select Image"}
                                                </label>
                                            </div>
                                        </div>
                                        {tp_image_path_null ? <span style={{ color: "red" }}>*กรุณาอัปโหลดรูปภาพ</span> : ""}
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-xl-9">
                                            <div className="form-group ">
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    id="text_tp_point_detail"
                                                    required
                                                    disabled={disable}
                                                    style={{ height: "115px" }}
                                                    value={thank_point_data.tp_point_detail}
                                                    onChange={(e) => {
                                                        setthank_point_data({
                                                            ...thank_point_data,
                                                            tp_point_detail: e.target.value,
                                                        });
                                                    }}
                                                ></textarea>
                                                <label htmlFor="">Thank Point Detail</label>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-7 col-xl-3" style={{}}>
                                    <label htmlFor="exampleInputFile"> </label>
                                    <img
                                        id="img"
                                        alt="..."
                                        className="img-fluid rounded shadow border-0"
                                        src={
                                            thank_point_data.tp_image_path !== "" &&
                                                thank_point_data.tp_image_path !== null &&
                                                thank_point_data.tp_image_path !== undefined
                                                ? Configs.API_URL_IMG_incentive + thank_point_data.tp_image_path
                                                : userdefault_img.imgs
                                        }
                                        style={{
                                            width: "400px",
                                            height: "300px",
                                            position: "relative",
                                        }}
                                    />
                                    <br />
                                    <span style={{ color: "red", fontSize: "15px" }}>
                                        Recommend Size:400x300px{" "}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card-footer"></div>

                </section>

            </div >
        </div >
    );
}

export default ThankPointAdd;