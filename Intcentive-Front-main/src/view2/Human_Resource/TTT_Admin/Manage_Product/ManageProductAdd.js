import React, { Component, useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getFeature, getAcademy } from "../../../../Utils/Common";
import { useParams } from "react-router";
import Resizer from "react-image-file-resizer";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";

function ManageProductAdd(mode) {
    const [pageMode, setPageMode] = useState("");
    const [disable, setdisable] = useState(null);
    const [select_category, setselect_category] = useState([]);
    const { id } = useParams();

    const [product_data, setproduct_data] = useState({
        product_no: "",
        product_name: "",
        product_detail: "",
        product_category_id: "",
        product_image: "",
        product_image_name: "",
        product_image_path: "",
        product_point: "",
    });

    const [flash_sale_data, setflash_sale_data] = useState({
        product_start_date: null,
        product_end_date: null,
        product_point: "",
        flash_sale: "",
        product_discount: "",
    });

    const [supplier_data, setsupplier_data] = useState({
        supplier: null,
        buy_price: null,
        mini_order: "",
        days: "",
        remark: "",
    });

    const [product_start_date_null, setproduct_start_date_null] = useState(false);
    const [product_end_date_null, setproduct_end_date_null] = useState(false);


    const CustomInput = ({ value, onClick }) => (
        <div className="input-group">
            <input
                type="text"
                className="form-control float-left"
                onClick={onClick}
                value={value}
                data-provide="datepicker"
                data-date-language="th-th"
            />{" "}
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="far fa-calendar-alt" />
                </span>

                {/*  <label>test</label> */}
            </div>
        </div>
    );

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

    const GetProduct = async () => {
        console.log(id);
        if (mode.mode == "read" || mode.mode == "edit") {
            axios({
                method: "post",
                url:
                    Configs.API_URL_incentive +
                    "/api/manageProduct/getproduct/" + id,
                headers: {
                    Authorization: 'Bearer ' + getToken(),
                    "X-TTT": Configs.API_TTT,
                    "Content-Type": "application/json",
                },
            })
                .then(function (response) {
                    console.log(response);
                    setproduct_data({
                        product_id: response.data.product_list[0].product_id,
                        product_name: response.data.product_list[0].product_name,
                        product_detail: response.data.product_list[0].product_detail,
                        product_image_name: response.data.product_list[0].product_image,
                        product_image_path: response.data.product_list[0].product_image_path,
                        product_point: response.data.product_list[0].product_point,
                        product_category_id: response.data.product_list[0].product_category_id,
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

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

    useEffect(() => {
        GetProduct();
        GetCategoryData();
    }, []);

    function alert_null() {
        var error_list = [];
        if (product_data.product_name == "") {
            let temp_err = {
                message: "กรุณากรอก Product Name",
            };
            error_list.push(temp_err);
        }
        if (product_data.product_name.match(/[1234567890]/g) != null && product_data.product_name != "") {
            let temp_err = {
                message: "กรุณากรอก Product Name เป็นตัวอักษรเท่านั้น",
            };
            error_list.push(temp_err);
        }
        if (product_data.product_detail == "") {
            let temp_err = {
                message: "กรุณากรอก Product Detail"
            }
            error_list.push(temp_err);
        }
        if (product_data.product_category_id == "") {
            let temp_err = {
                message: "กรุณาเลือก Product Category",
            };
            error_list.push(temp_err);
        }
        if (product_data.product_point == "") {
            let temp_err = {
                message: "กรุณากรอก Product Point",
            };
            error_list.push(temp_err);
        }
        if (product_data.product_point.match(/[1234567890]/g) == null && product_data.product_point != "") {
            let temp_err = {
                message: "กรุณากรอก Product Point เป็นตัวเลขเท่านั้น",
            };
            error_list.push(temp_err);
        }
        if (product_data.product_point < 0 && product_data.product_point != "") {
            let temp_err = {
                message: "กรุณากรอก Product Point มากกว่า 0",
            };
            error_list.push(temp_err);
        }
        if (product_data.product_image_path == "") {
            let temp_err = {
                message: "กรุณาใส่รูปภาพ",
            };
            error_list.push(temp_err);
        }
        return error_list;
    }

    function save_product_data() {
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
                    product_name: product_data.product_name,
                    product_point: product_data.product_point,
                    product_detail: product_data.product_detail,
                    product_category_id: product_data.product_category_id,
                    product_image_name: product_data.product_image_name || null,
                    product_image_path: product_data.product_image_path || null
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
                            Configs.API_URL_incentive + "/api/manageProduct/addproduct",
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
                                    title: "Save",
                                    showConfirmButton: false,
                                    timer: 1500,
                                }).then((result) => {
                                    window.location.href = "/Human_Resource/intensive_TTT/manage_product_system";
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            Swal.fire({
                                icon: "warning",
                                title: "กรุณากรอกข้อมูลใหม่",
                                text: "มี ชื่อ - นามสกุล หรือ รหัสพนักงาน ซ้ำกันในระบบ",
                            });
                        });
                });
            }
            if (mode.mode === "edit") {
                const temp = {
                    oem_id: getOem(),
                    company_id: getUser().com,
                    product_id: id,
                    product_name: product_data.product_name,
                    product_point: product_data.product_point,
                    product_detail: product_data.product_detail,
                    product_category_id: product_data.product_category_id,
                    product_image_name: product_data.product_image_name || null,
                    product_image_path: product_data.product_image_path || null
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
                            Configs.API_URL_incentive + "/api/manageProduct/editproduct",
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
                                    title: "Save",
                                    showConfirmButton: false,
                                    timer: 1500,
                                }).then((result) => {
                                    window.location.href = "/Human_Resource/intensive_TTT/manage_product_system";
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            Swal.fire({
                                icon: "warning",
                                title: "กรุณากรอกข้อมูลใหม่",
                                text: "มี ชื่อ - นามสกุล หรือ รหัสพนักงาน ซ้ำกันในระบบ",
                            });
                        });
                });
            }
        }
    }

    function cancle_add_manage_product(params) {
        Swal.fire({
            title: "คุณมั่นใจว่าคุณจะออกจากหน้านี้ใช่หรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `ใช่`,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: `ไม่`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/Human_Resource/intensive_TTT/manage_product_system";
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
                'File name or type are not correct!!!',
                'error'
            )
        } else {
            const image = await resizeFile(file);

            var file_image = dataURLtoFile(image, file.name);
            var data = new FormData();
            data.append("Profile", file_image);
            data.append("typeFile", product_data.product_name);

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
                        setproduct_data({
                            ...product_data,
                            product_image_name: response.data.data.orgin_name,
                            product_image_path: response.data.data.path,
                            product_image: response.data.data,
                        });
                        console.log(product_data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        console.log(product_data);
    }

    async function check_start_date(e) {
        if (e === "") {
            setproduct_data({
                ...product_data,
                product_start_date: e,
            });
            setproduct_start_date_null(true);
        } else if (product_data.product_end_date != "" && e > product_data.product_end_date) {
            setproduct_data({
                ...product_data,
                product_end_date: '',
            });
            product_data.product_end_date = '';
            setproduct_data({
                ...product_data,
                product_start_date: e,
            });
            setproduct_start_date_null(false);
        } else {
            setproduct_data({
                ...product_data,
                product_start_date: e,
            });
            setproduct_start_date_null(false);
        }
    }

    async function check_end_date(e) {
        if (e === "") {
            setproduct_data({
                ...product_data,
                product_end_date: e,
            });
            setproduct_end_date_null(true);
        } else {
            setproduct_data({
                ...product_data,
                product_end_date: e,
            });
            setproduct_end_date_null(false);
        }
    }

    let point_data = [100, 200, 250, 300, 50];
    let point_flash_sale_data = [90, 190, 200, 290, 49];
    let start_date_data = [
        '15/02/2023',
        '02/02/2023',
        '14/01/2023',
        '02/12/2022',
        '01/11/2023',
    ];
    let end_date_data = [
        '16/02/2023',
        '03/02/2023',
        '15/01/2023',
        '03/12/2022',
        '02/11/2023',
    ]

    const test_flash_sale_data = {
        point: point_data,
        point_flash_sale: point_flash_sale_data,
        start_date: start_date_data,
        end_date: end_date_data,
    }

    const row_data = [];
    for (let index = 0; index < 5; index++) {
        const element = {};
        element['no'] = index + 1;
        element['point'] = test_flash_sale_data.point[index];
        element['flash-sale'] = test_flash_sale_data.point_flash_sale[index];
        element['std'] = test_flash_sale_data.start_date[index];
        element['ed'] = test_flash_sale_data.end_date[index];
        element['mgt'] = (
            <div className="row" style={{ flexWrap: "nowrap" }}>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        // href={"/Human_Resource/incentive_hr_admin/thank_point/edit/" + thank_point[index].tp_id}
                        id={"btn_edit" + (index + 1)}
                        // key={thank_point[index].tp_point_id}
                        className=" btn btn-xs "
                    >
                        {"   "}
                        <i class="fas fa-pencil-alt"></i>
                        {"   "}
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 col-xs-3 ">
                    <a
                        // key={thank_point[index].tp_point_id}
                        id={"btn_delete" + (index + 1)}
                        className=" btn btn-xs "
                    // onClick={deldata.bind(this, thank_point[index].tp_id)}
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
                label: "Product Point",
                field: "point",
                sort: "asc",
                width: 50,
            },
            {
                label: "Product Point Flash Sale",
                field: "flash-sale",
                sort: "asc",
                width: 50,
            },
            {
                label: "Start Date",
                field: "std",
                sort: "asc",
                width: 50,
            },
            {
                label: "End Date",
                field: "ed",
                sort: "asc",
                width: 50,
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

    let price_data = [100, 200, 250, 300, 50];
    let minimam_order_data = [10, 3, 5, 8, 30];
    let days_data = [1, 0, 0, 2, 11];
    let date_data = [
        '15/02/2023 ::: 04:16 น.',
        '02/02/2023 ::: 14:57 น.',
        '02/02/2023 ::: 14:57 น.',
        '02/02/2023 ::: 13:57 น.',
        '01/02/2023 ::: 12:57 น.',
    ]

    const test_data = {
        price: price_data,
        minimam_order: minimam_order_data,
        days: days_data,
        date: date_data,
    }

    const row_data_supplier = [];
    for (let index = 0; index < 5; index++) {
        const element = {};
        element['no'] = index + 1;
        element['supplier'] = "Sup0" + (index + 1);
        element['buy'] = test_data.price[index];
        element['mini'] = test_data.minimam_order[index];
        element['lead'] = test_data.days[index];
        element['remark'] = "";
        element['date'] = test_data.date[index];
        element['mgt'] = (
            <div className="row" style={{ flexWrap: "nowrap", padding: "4px" }}>
                <div class="btn btn-block btn-success">
                    Active
                </div>
            </div>
        );
        row_data_supplier.push(element);
    }

    const data_supplier = {
        columns: [
            {
                label: "No",
                field: "no",
                sort: "asc",
                width: 50,
            },
            {
                label: "Supplier",
                field: "supplier",
                sort: "asc",
                width: 50,
            },
            {
                label: "Buy Price",
                field: "buy",
                sort: "asc",
                width: 50,
            },
            {
                label: "Minimum Order",
                field: "mini",
                sort: "asc",
                width: 50,
            },
            {
                label: "Lead Time (Days)",
                field: "lead",
                sort: "asc",
                width: 50,
            },
            {
                label: "Remark",
                field: "remark",
                sort: "asc",
                width: 50,
            },
            {
                label: "Date",
                field: "date",
                sort: "asc",
                width: 50,
            },
            {
                label: "MGT",
                field: "mgt",
                sort: "asc",
                width: 50,
            },
        ],
        rows: row_data_supplier,
    };

    const [inputFields, setInputFields] = useState([]);
    let num = 0;

    const addInputField = () => {
        setInputFields([...inputFields, {
            fullName: '',
        }])
        num++;
    }
    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
        num--;
    }
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }
    const [documentFile, setdocumentFile] = useState([]);

    function isFileImage(file) {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        return file && acceptedImageTypes.includes(file['type'])
    }

    async function encodeImage(file) {
        console.log("file", file);

        if (file[0].name) {
            const regex = /([\u0E00-\u0E7F]+)/gmu;
            const str = file[0].name;
            const m = regex.exec(str);

            if (m !== null || isFileImage(file[0]) === false) {
                Swal.fire({
                    title: 'ชื่อไฟล์ หรือ ประเภทไฟล์ไม่ถูกต้อง',
                    text: '',
                    icon: 'warning',
                    confirmButtonColor: '#032973',
                    confirmButtonText: 'ตกลง',
                });
            } else {
                const oleTempFileUpload = documentFile;
                setdocumentFile([]);

                const tempFileUpload = [];
                if (file.length > 0) {
                    for (let index = 0; index < file.length; index += 1) {
                        const dataImg = new FormData();
                        dataImg.append('Profile', file[index]);
                        dataImg.append('typeFile', product_data.product_no);

                        const tempDataImg = {
                            sbd_document_name: file[index].name,
                            sbd_path_document: '',
                            file_isOld: false,
                        };
                        axios({
                            method: 'post',
                            url: Configs.API_URL_incentive + "/api/upload/profile",
                            headers: {
                                Authorization: getToken(),
                                'X-TTT': `${Configs.API_TTT}`,
                                'Content-Type': 'application/json',
                            },
                            data: dataImg,
                        })
                            .then(function (response) {
                                if (response.data.status) {
                                    tempDataImg.sbd_path_document = response.data.data.path
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                        tempFileUpload.push(tempDataImg);
                    }
                }

                oleTempFileUpload.forEach((el) => {
                    tempFileUpload.push(el);
                });

                setdocumentFile(tempFileUpload);
            }
        }
    }

    async function delDocList(index) {
        const oleTempFileUpload = documentFile;
        setdocumentFile([]);
        oleTempFileUpload.splice(index, 1);
        setdocumentFile(oleTempFileUpload);
    }

    const uploadRef = useRef(null);

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Manage Product {pageMode}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Human Resource</li>
                                    <li className="breadcrumb-item active">
                                        Manage Product
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
                                        onClick={cancle_add_manage_product}
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
                                        onClick={save_product_data}
                                        class="btn btn-block btn-success"
                                        id="btn-save"
                                    >
                                        Save
                                    </button>
                                </div>
                                <div className="col-6 col-md-3 col-xl-1">
                                    <button
                                        type="button"
                                        onClick={cancle_add_manage_product}
                                        class="btn btn-block btn-danger"
                                        id="btn-cancle"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">
                                <h4>Product No: {product_data.product_no}</h4>
                            </div>
                            <div className="col-6">
                                <h4>Product Name: {product_data.product_name}</h4>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div class="card card-primary card-outline card-outline-tabs">
                        <div class="card-header p-0 border-bottom-0">
                            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                <li class="nav-item active">
                                    <a
                                        class="nav-link active"
                                        id="custom-tabs-basic-information-tab"
                                        data-toggle="pill"
                                        href="#custom-tabs-basic-information"
                                        role="tab"
                                        aria-controls="custom-tabs-basic-information"
                                        aria-selected="true"
                                    >
                                        Basic Information
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="custom-tabs-advance-information-tab"
                                        data-toggle="pill"
                                        href="#custom-tabs-advance-information"
                                        role="tab"
                                        aria-controls="custom-tabs-advance-information"
                                        aria-selected="false"
                                    >
                                        Advance Information
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="custom-tabs-flash-sale-tab"
                                        data-toggle="pill"
                                        href="#custom-tabs-flash-sale"
                                        role="tab"
                                        aria-controls="custom-tabs-flash-sale"
                                        aria-selected="false"
                                    >
                                        Flash Sale
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="custom-tabs-supplier-tab"
                                        data-toggle="pill"
                                        href="#custom-tabs-supplier"
                                        role="tab"
                                        aria-controls="custom-tabs-supplier"
                                        aria-selected="false"
                                    >
                                        Supplier
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="tab-content" id="custom-tabs-four-tabContent">
                                <div
                                    class="tab-pane fade show active"
                                    id="custom-tabs-basic-information"
                                    role="tabpanel"
                                    aria-labelledby="custom-tabs-basic-information"
                                >
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-8 col-md-6 col-xl-5">
                                                <div className="row">
                                                    <div className="col-12 col-md-12 col-xl-8">
                                                        <div className="form-group ">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="text_product_no"
                                                                required="false"
                                                                value={product_data.product_no}
                                                                onChange={(e) => {
                                                                    setproduct_data({
                                                                        ...product_data,
                                                                        product_no: e.target.value,
                                                                    });
                                                                }}
                                                            />
                                                            <label htmlFor="">Product No.</label>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-12 col-xl-8">
                                                        <div className="form-group ">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="text_product_name"
                                                                required="false"
                                                                value={product_data.product_name}
                                                                onChange={(e) => {
                                                                    setproduct_data({
                                                                        ...product_data,
                                                                        product_name: e.target.value,
                                                                    });
                                                                }}
                                                            />
                                                            <label htmlFor="">Product Name</label>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-12 col-xl-8">
                                                        <div class="form-group">
                                                            <select
                                                                className="form-control custom-select select2"
                                                                type="text"
                                                                required
                                                                id="select_category"
                                                                disabled={disable}
                                                                value={product_data.product_category_id}
                                                                onChange={(e) => {
                                                                    setproduct_data({
                                                                        ...product_data,
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
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div
                                    class="tab-pane fade"
                                    id="custom-tabs-advance-information"
                                    role="tabpanel"
                                    aria-labelledby="custom-tabs-advance-information"
                                >
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-4 col-md-2 col-xl-5">
                                                <div className="row">
                                                    <div className="col-12 col-md-12 col-xl-8">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="text_product_name_detail"
                                                                required="false"
                                                                value={""}
                                                                onChange={(e) => {

                                                                }}
                                                            />
                                                            <label htmlFor="">Product Name Detail</label>{" "}
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="text_product_brand"
                                                                required="false"
                                                                value={""}
                                                                onChange={(e) => {

                                                                }}
                                                            />
                                                            <label htmlFor="">Product Brand</label>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-12 col-xl-8">
                                                        <div className="form-group ">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="text_product_name"
                                                                required="false"
                                                            // value={filler_award_point.ap_point_id}
                                                            // onChange={(e) => {
                                                            //     setfiller_award_point({
                                                            //         ...filler_award_point,
                                                            //         ap_point_id: e.target.value,
                                                            //     });
                                                            // }}
                                                            />
                                                            <label htmlFor="">Product Deaciplies</label>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-12 col-xl-8">
                                                        <div className="form-group ">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="text_product_name"
                                                                required="false"
                                                                value={product_data.product_point}
                                                                onChange={(e) => {
                                                                    setproduct_data({
                                                                        ...product_data,
                                                                        product_point: e.target.value,
                                                                    });
                                                                }}
                                                            />
                                                            <label htmlFor="">Product Point</label>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-md-8 col-xl-8">
                                                        <div className="form-group ">
                                                            <button
                                                                type="button"
                                                                id="btn_add"
                                                                className="btn btn-block btn-primary"
                                                                onClick={addInputField}
                                                            >
                                                                Add Product Model
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    inputFields.map((data, index) => {
                                                        const { fullName, emailAddress, salary } = data;
                                                        return (
                                                            <div className="row" key={index}>
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            onChange={(evnt) => handleChange(index, evnt)}
                                                                            value={fullName}
                                                                            name="fullName"
                                                                            className="form-control" />
                                                                    </div>
                                                                </div>

                                                                <div className="col">
                                                                    {(num !== 1) ?
                                                                        <div className="col-4 col-md-6 col-xl-4 form-group">
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => removeInputFields(index)}
                                                                                class="btn btn-block btn-danger"
                                                                                id="btn-cancle"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                        : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="col-4 col-md-2 col-xl-3" style={{}}>
                                                <label htmlFor="exampleInputFile"> </label>
                                                <img
                                                    id="img"
                                                    alt="..."
                                                    className="img-fluid rounded shadow border-0"
                                                    src={
                                                        product_data.product_image_path !== "" &&
                                                            product_data.product_image_path !== null &&
                                                            product_data.product_image_path !== undefined
                                                            ? Configs.API_URL_IMG_incentive + product_data.product_image_path
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
                                            <div className="col-3 ml-4">
                                                <div className="row">
                                                    <label htmlFor="exampleInputFile">Part Image <span style={{ color: "red" }}>size(400 x 300) px</span></label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input
                                                                style={{ display: 'none' }}
                                                                type="file"
                                                                id="exampleInputInvoid"
                                                                accept="*"
                                                                multiple
                                                                ref={uploadRef}
                                                                name="customFile"
                                                                onChange={(e) => encodeImage(e.target.files)}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="exampleInputFile"
                                                                onClick={() => uploadRef.current.click()}
                                                            >
                                                                {"Select Image"}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-5">
                                                    <div className="row">
                                                        <div
                                                            className="mb-4"
                                                            style={{
                                                                display: 'flex',
                                                                position: 'relative',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            {' '}
                                                        </div>
                                                        <div className="ml-3 mb-4">
                                                            <table className="table-responsive" style={{ width: '100%' }}>
                                                                <thead>
                                                                    <th style={{ border: '2px solid #032973', textAlign: 'center', padding: '5px' }}>ลำดับ</th>
                                                                    <th style={{ border: '2px solid #032973', textAlign: 'center', padding: '5px' }}>เอกสาร</th>
                                                                    <th style={{ border: '2px solid #032973', textAlign: 'center', padding: '5px' }}>จัดการ</th>
                                                                </thead>
                                                                <tbody>
                                                                    {documentFile.map((el, i) => {
                                                                        return (
                                                                            <tr key={el.sbd_document_name}>
                                                                                <td style={{ border: '2px solid #032973', textAlign: 'center', padding: '5px' }}>{i + 1}</td>
                                                                                <td style={{ border: '2px solid #032973', padding: '5px' }}>
                                                                                    <a href={`${Configs.API_URL_incentive}/static/${el.sbd_path_document}`}>

                                                                                        {el.sbd_document_name}

                                                                                    </a>
                                                                                </td>
                                                                                <td style={{ border: '2px solid #032973', padding: '5px' }}>
                                                                                    <input
                                                                                        key={`${el.sbd_document_name}del`}
                                                                                        className="simple-icon-trash button-color back-color"
                                                                                        style={{ borderRadius: '10px' }}
                                                                                        onClick={() => {
                                                                                            delDocList(i);
                                                                                        }}
                                                                                    >
                                                                                        {' '}
                                                                                    </input>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="tab-pane fade"
                                    id="custom-tabs-flash-sale"
                                    role="tabpanel"
                                    aria-labelledby="custom-tabs-flash-sale"
                                >
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-6 col-md-4 col-xl-2">
                                                <div className="form-group ">
                                                    <button
                                                        type="button"
                                                        id="btn_add"
                                                        className="btn btn-block btn-primary"
                                                        data-toggle="modal"
                                                        data-target="#modal-add-flash-sale"
                                                        data-backdrop="static"
                                                        data-keyboard="false"
                                                    >
                                                        Add Flash Sale
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="content">
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
                                    </section>
                                </div>
                                <div
                                    class="tab-pane fade"
                                    id="custom-tabs-supplier"
                                    role="tabpanel"
                                    aria-labelledby="custom-tabs-supplier"
                                >
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-6 col-md-4 col-xl-2">
                                                <div className="form-group ">
                                                    <button
                                                        type="button"
                                                        id="btn_add"
                                                        className="btn btn-block btn-primary"
                                                        data-toggle="modal"
                                                        data-target="#modal-add-supplier"
                                                        data-backdrop="static"
                                                        data-keyboard="false"
                                                    >
                                                        Add Relationship Supplier
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <section className="content">
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
                                                data={data_supplier}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer"></div>
                </section>
                <div className="modal fade" id="modal-add-flash-sale">
                    <div className="modal-dialog modal-ml">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Flash Sale</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={async () => {
                                        setflash_sale_data({
                                            ...flash_sale_data,
                                            product_start_date: null,
                                            product_end_date: null,
                                        });
                                        flash_sale_data.product_start_date = null;
                                        flash_sale_data.product_end_date = null;
                                    }}
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body divCenter">
                                <div className="container-fluid">
                                    <div className="row ml-1 mr-1">
                                        <div className="col-12">
                                            <div className="ml-1">
                                                <div className="row" style={{ "margin-bottom": "1rem" }}>
                                                    <div className="ml-1" style={{ textAlign: "right" }}>
                                                        <label className="mt-3" htmlFor="">Start Date
                                                            <span style={{ color: "red" }}> *</span>
                                                        </label>
                                                    </div>
                                                    <div className="mt-2 ml-2">
                                                        <DatePicker
                                                            style={{ "z-index": "99" }}
                                                            selected={flash_sale_data.product_start_date}
                                                            disabled={disable}
                                                            id="start_date"
                                                            dateFormat={"dd-MM-yyyy"}
                                                            onChange={async (date) => {
                                                                check_start_date(date);
                                                            }}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            customInput={<CustomInput />}
                                                        ></DatePicker>
                                                        <div className="ml-1">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row" style={{ "margin-bottom": "1rem" }}>
                                                    <div className="ml-1" style={{ textAlign: "right" }}>
                                                        <label className="mt-3" htmlFor="">End Date
                                                            <span style={{ color: "red" }}> *</span>
                                                        </label>
                                                    </div>
                                                    <div className="mt-2 ml-3">
                                                        <DatePicker
                                                            style={{ "z-index": "99" }}
                                                            selected={flash_sale_data.product_end_date}
                                                            disabled={disable}
                                                            id="end_date"
                                                            dateFormat={"dd-MM-yyyy"}
                                                            onChange={async (date) => {
                                                                check_end_date(date);
                                                            }}
                                                            minDate={flash_sale_data.product_start_date}
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            customInput={<CustomInput />}
                                                        ></DatePicker>
                                                        <div className="ml-1">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    disabled={true}
                                                    value={flash_sale_data.product_point}
                                                    onChange={(e) => {
                                                        setflash_sale_data({
                                                            ...flash_sale_data,
                                                            product_point: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Product Point</label>{" "}
                                            </div>
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    value={flash_sale_data.flash_sale}
                                                    onChange={(e) => {
                                                        setflash_sale_data({
                                                            ...flash_sale_data,
                                                            flash_sale: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Product Point Flash Sale</label>{" "}
                                            </div>
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    value={flash_sale_data.product_discount}
                                                    onChange={(e) => {
                                                        setflash_sale_data({
                                                            ...flash_sale_data,
                                                            product_discount: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Product Discount</label>{" "}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-md-4 col-xl-2">
                                            <div className="form-group ">
                                                <button
                                                    type="button"
                                                    id="btn_add"
                                                    className="btn btn-block btn-primary"
                                                    style={{ float: "right" }}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modal-add-supplier">
                    <div className="modal-dialog modal-ml">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Relationship Supplier</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={async () => {
                                        setproduct_data({
                                            ...product_data,
                                            product_start_date: null,
                                            product_end_date: null,
                                        });
                                        product_data.product_start_date = null;
                                        product_data.product_end_date = null;
                                    }}
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body divCenter">
                                <div className="container-fluid">
                                    <div className="row ml-1 mr-1">
                                        <div className="col-12">
                                            <div class="form-group">
                                                <select
                                                    className="form-control custom-select select2"
                                                    type="text"
                                                    required
                                                    id="select_supplier"
                                                    value={supplier_data.supplier}
                                                    onChange={(e) => {
                                                        setsupplier_data({
                                                            ...supplier_data,
                                                            supplier: e.target.value,
                                                        });
                                                    }}
                                                >
                                                    <option value="" disabled selected>
                                                        Select...
                                                    </option>
                                                    {/* {select_category.map((el) => {
                                                        return (
                                                            <option value={el.category_id}>
                                                                {el.category_name}
                                                            </option>
                                                        );
                                                    })} */}
                                                </select>
                                                <label htmlFor="">Supplier:</label>
                                            </div>
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    value={supplier_data.buy_price}
                                                    onChange={(e) => {
                                                        setsupplier_data({
                                                            ...supplier_data,
                                                            buy_price: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Buy Price:</label>{" "}
                                            </div>
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    value={supplier_data.mini_order}
                                                    onChange={(e) => {
                                                        setsupplier_data({
                                                            ...supplier_data,
                                                            mini_order: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Minimam Order:</label>{" "}
                                            </div>
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    value={supplier_data.days}
                                                    onChange={(e) => {
                                                        setsupplier_data({
                                                            ...supplier_data,
                                                            days: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Lead Time (Days):</label>{" "}
                                            </div>
                                            <div className="form-group ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="text_category_name"
                                                    required="false"
                                                    value={supplier_data.remark}
                                                    onChange={(e) => {
                                                        setsupplier_data({
                                                            ...supplier_data,
                                                            remark: e.target.value,
                                                        });
                                                    }}
                                                />
                                                <label htmlFor="">Remark:</label>{" "}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-md-4 col-xl-2">
                                            <div className="form-group ">
                                                <button
                                                    type="button"
                                                    id="btn_add"
                                                    className="btn btn-block btn-primary"
                                                    style={{ float: "right" }}
                                                >
                                                    Add
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
        </div >
    );
}

export default ManageProductAdd;