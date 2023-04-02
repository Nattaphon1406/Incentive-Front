import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import axios from "axios";
import Configs from "../../../../config";
import { getOem, getToken, getUser, getAcademy } from "../../../../Utils/Common";
import { useParams } from "react-router";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../../../../assets/css/Input.css'

function SummaryReport() {
    const [date_start_null, setdate_start_null] = useState(false);
    const [date_end_null, setdate_end_null] = useState(false);
    const [load_date, setload_date] = useState(false);
    const [load_user_date, setload_user_date] = useState(false);
    const [report_data, setreport_data] = useState({
        name: "",
        date_start: null,
        date_end: null,
        file_name: "",
        table: "",
    });
    const [point_data, setpoint_data] = useState([]);
    const [user_data, setuser_data] = useState([]);
    const [award_point_data, setaward_point_data] = useState([]);
    const [award_user_data, setaward_user_data] = useState([]);
    const [thank_point_data, setthank_point_data] = useState([]);
    const [thank_user_data, setthank_user_data] = useState([]);
    const [redeem_point_data, setredeem_point_data] = useState([]);
    const [redeem_user_data, setredeem_user_data] = useState([]);
    const [user_data_receive, setuser_data_receive] = useState([]);

    const CustomInput = ({ value, onClick }) => (
        <div className="input-group">
            <input
                type="text"
                className="form-control float-left"
                onClick={onClick}
                value={value}
            />{" "}
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="far fa-calendar-alt" />
                </span>
            </div>
        </div>
    );

    useEffect(() => {
        GetPointDetail();
    }, []);

    const GetPointDetail = async () => {
        Swal.fire({
            title: "กำลังดึงข้อมูล",
            text: "Loading",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios({
            method: "get",
            url:
                Configs.API_URL_incentive + "/api/summaryReport/filterUserPoint",
            headers: {
                Authorization: "Bearer " + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            console.log(response.data.point_detail, "GetPointDetail");
            setpoint_data(response.data.point_detail);
            // setuser_data(response.data.user_detail);
            if (response.data.point_detail.length != 0) {
                var req_employee = [];
                for (let i = 0; i < response.data.point_detail.length; i++) {
                    req_employee.push(response.data.point_detail[i].ep_emp_id);
                }
                var employee = req_employee
                axios({
                    method: "post",
                    url:
                        Configs.API_URL_incentive + "/api/summaryReport/filterUserData",
                    headers: {
                        Authorization: "Bearer " + getToken(),
                        "X-TTT": Configs.API_TTT,
                        "Content-Type": "application/json",
                    },
                    data: employee,
                })
                    .then(function (response) {
                        console.log(response.data.user_detail, "GetEmployeeList");
                        setuser_data(response.data.user_detail);
                        Swal.close();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                Swal.close();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const GetAwardPointDetail = async () => {
        Swal.fire({
            title: "กำลังดึงข้อมูล",
            text: "Loading",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        var get_filler_award_point = {
            oem_id: getOem(),
            company_id: getUser().com,
            ap_point_id: '',
            ap_point_name: '',
            gp_date_from: report_data.date_start,
            gp_date_to: report_data.date_end,
        };
        axios({
            method: "post",
            url:
                Configs.API_URL_incentive + "/api/pointHistory/filterAwardPointHistory",
            headers: {
                Authorization: "Bearer " + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_filler_award_point,
        }).then(function (response) {
            console.log(response.data.point_history_list, "GetPointDetail");
            setaward_point_data(response.data.point_history_list);
            if (response.data.point_history_list.length != 0) {
                var req_employee = [];
                for (let i = 0; i < response.data.point_history_list.length; i++) {
                    req_employee.push(response.data.point_history_list[i].gp_emp_id);
                }
                var employee = req_employee
                axios({
                    method: "post",
                    url:
                        Configs.API_URL_incentive + "/api/summaryReport/filterUserData",
                    headers: {
                        Authorization: "Bearer " + getToken(),
                        "X-TTT": Configs.API_TTT,
                        "Content-Type": "application/json",
                    },
                    data: employee,
                })
                    .then(function (response) {
                        console.log(response.data.user_detail, "GetEmployeeList");
                        setaward_user_data(response.data.user_detail);
                        Swal.close();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                Swal.close();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const GetThankPointDetail = async () => {
        Swal.fire({
            title: "กำลังดึงข้อมูล",
            text: "Loading",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        var get_filler_thank_point = {
            oem_id: getOem(),
            company_id: getUser().com,
            tph_date_from: report_data.date_start,
            tph_date_to: report_data.date_end,
        };
        axios({
            method: "post",
            url:
                Configs.API_URL_incentive + "/api/pointHistory/filterThankPointHistory",
            headers: {
                Authorization: "Bearer " + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_filler_thank_point,
        }).then(function (response) {
            console.log(response.data.point_history_list, "GetPointDetail");
            setthank_point_data(response.data.point_history_list);
            if (response.data.point_history_list.length != 0) {
                var req_employeeGive = [];
                var req_employeeReceive = [];
                for (let i = 0; i < response.data.point_history_list.length; i++) {
                    req_employeeGive.push(response.data.point_history_list[i].user_give);
                    req_employeeReceive.push(response.data.point_history_list[i].user_receive);
                }
                var employeeGive = req_employeeGive;
                var employeeReceive = {
                    employee: req_employeeReceive,
                };
                axios({
                    method: "post",
                    url:
                        Configs.API_URL_incentive + "/api/summaryReport/filterUserData",
                    headers: {
                        Authorization: "Bearer " + getToken(),
                        "X-TTT": Configs.API_TTT,
                        "Content-Type": "application/json",
                    },
                    data: employeeGive,
                })
                    .then(function (response) {
                        console.log(response.data.user_detail, "GetEmployeeList");
                        setthank_user_data(response.data.user_detail);
                        Swal.close();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios({
                    method: "post",
                    url: Configs.API_URL_getEmployeeList,
                    headers: {
                        Authorization: "Bearer " + getToken(),
                        "X-TTT": Configs.API_TTT,
                        "Content-Type": "application/json",
                    },
                    data: employeeReceive,
                })
                    .then(function (response) {
                        console.log(response.data, "GetEmployeeListReceive");
                        setuser_data_receive(response.data.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                Swal.close();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const GetRedeemPointDetail = async () => {
        Swal.fire({
            title: "กำลังดึงข้อมูล",
            text: "Loading",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        var get_filler_redeem_point = {
            oem_id: getOem(),
            company_id: getUser().com,
            date_start: report_data.date_start,
            date_end: report_data.date_end,
        };
        axios({
            method: "post",
            url:
                Configs.API_URL_incentive + "/api/summaryReport/filterRedeemData",
            headers: {
                Authorization: "Bearer " + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
            },
            data: get_filler_redeem_point,
        }).then(function (response) {
            console.log(response.data.redeem_detail, "GetRedeemDetail");
            setredeem_point_data(response.data.redeem_detail);
            if (response.data.redeem_detail.length != 0) {
                var req_employee = [];
                for (let i = 0; i < response.data.redeem_detail.length; i++) {
                    req_employee.push(response.data.redeem_detail[i].ol_emp_id);
                }
                var employee = req_employee
                axios({
                    method: "post",
                    url:
                        Configs.API_URL_incentive + "/api/summaryReport/filterUserData",
                    headers: {
                        Authorization: "Bearer " + getToken(),
                        "X-TTT": Configs.API_TTT,
                        "Content-Type": "application/json",
                    },
                    data: employee,
                })
                    .then(function (response) {
                        console.log(response.data.user_detail, "GetEmployeeList");
                        setredeem_user_data(response.data.user_detail);
                        Swal.close();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                Swal.close();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const row_data = [];
    console.log('point_data', point_data, user_data);
    for (let index = 0; index < point_data.length; index++) {
        const element = {};
        for (let i = 0; i < user_data.length; i++) {
            if (user_data[i] != null) {
                if (user_data[i].id == point_data[index].ep_emp_id) {
                    element["username"] = user_data[i].emp_no;
                    element["name"] = user_data[i].emp_name_th;
                    element["email"] = user_data[i].e_mail || '';
                    element["company"] = user_data[i].company_name;
                    element['oem'] = user_data[i].oem_name;
                    element["point"] = point_data[index].ep_point;
                }
            }
        }
        row_data.push(element);
    }

    const data = {
        columns: [
            {
                label: "username",
                field: "username",
                sort: "asc",
                width: 50,
            },
            {
                label: "point",
                field: "point",
                sort: "asc",
                width: 50,
            },
            {
                label: "firstname_lastname",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "email",
                field: "email",
                sort: "asc",
                width: 50,
            },
            {
                label: "company",
                field: "company",
                sort: "asc",
                width: 50,
            },
            {
                label: "oem",
                field: "oem",
                sort: "asc",
                width: 10,
            },
        ],
        rows: row_data,
    };

    const row_award_data = [];
    console.log('award_point_data', award_point_data, award_user_data);
    for (let index = 0; index < award_point_data.length; index++) {
        const element = {};
        for (let i = 0; i < award_user_data.length; i++) {
            if (award_user_data[i] != null) {
                if (award_user_data[i].id == award_point_data[index].gp_emp_id) {
                    element["no"] = index + 1;
                    element["ap_name"] = award_point_data[index].ap_point_name;
                    element["point"] = award_point_data[index].ap_point;
                    element["c_date"] = award_point_data[index].create_date;
                    element["u_date"] = award_point_data[index].update_date;
                    element["remark"] = award_point_data[index].gp_remark;
                    element["username"] = award_user_data[i].emp_no;
                    element["name"] = award_user_data[i].emp_name_th;
                    element["email"] = award_user_data[i].e_mail;
                    element["company"] = award_user_data[i].company_name;
                    element['oem'] = award_user_data[i].oem_name;
                }
            }
        }
        row_award_data.push(element);
    }

    const award_data = {
        columns: [
            {
                label: "no.",
                field: "no",
                sort: "asc",
                width: 50,
            },
            {
                label: "username",
                field: "username",
                sort: "asc",
                width: 50,
            },
            {
                label: "award point name",
                field: "ap_name",
                sort: "asc",
                width: 50,
            },
            {
                label: "award point",
                field: "point",
                sort: "asc",
                width: 50,
            },
            {
                label: "firstname_lastname",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "email",
                field: "email",
                sort: "asc",
                width: 50,
            },
            {
                label: "company",
                field: "company",
                sort: "asc",
                width: 50,
            },
            {
                label: "oem",
                field: "oem",
                sort: "asc",
                width: 50,
            },
            {
                label: "create_date",
                field: "c_date",
                sort: "asc",
                width: 50,
            },
            {
                label: "update_date",
                field: "u_date",
                sort: "asc",
                width: 50,
            },
            {
                label: "remark",
                field: "remark",
                sort: "asc",
                width: 50,
            },
        ],
        rows: row_award_data,
    };

    const row_thank_data = [];
    console.log('thank_point_data', thank_point_data, thank_user_data);
    for (let index = 0; index < thank_point_data.length; index++) {
        const element = {};
        for (let i = 0; i < thank_user_data.length; i++) {
            if (thank_user_data[i] != null) {
                if (thank_user_data[i].id == thank_point_data[index].user_give) {
                    element["userGive"] = thank_user_data[i].emp_no;
                    element["name"] = thank_user_data[i].emp_name_th;
                    element["email"] = thank_user_data[i].e_mail;
                    element["company"] = thank_user_data[i].company_name;
                    element['oem'] = thank_user_data[i].oem_name;
                    for (let j = 0; j < user_data_receive.length; j++) {
                        if (user_data_receive[j] != null) {
                            if (user_data_receive[j].id == thank_point_data[index].user_receive) {
                                element["userReceive"] = user_data_receive[j].emp_name_th;
                            }
                        }
                    }
                    element["no"] = index + 1;
                    element["th_name"] = thank_point_data[index].tp_point_name;
                    element["point"] = thank_point_data[index].tp_point;
                    element["c_date"] = thank_point_data[index].create_date;
                    element["u_date"] = thank_point_data[index].update_date;
                    element["remark"] = thank_point_data[index].tph_remark;
                }
            }
        }
        row_thank_data.push(element);
    }

    const thank_data = {
        columns: [
            {
                label: "no.",
                field: "no",
                sort: "asc",
                width: 50,
            },
            {
                label: "give_username",
                field: "userGive",
                sort: "asc",
                width: 50,
            },
            {
                label: "receive_username",
                field: "userReceive",
                sort: "asc",
                width: 50,
            },
            {
                label: "thank point name",
                field: "th_name",
                sort: "asc",
                width: 50,
            },
            {
                label: "thank point",
                field: "point",
                sort: "asc",
                width: 50,
            },
            {
                label: "firstname_lastname",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "email",
                field: "email",
                sort: "asc",
                width: 50,
            },
            {
                label: "company",
                field: "company",
                sort: "asc",
                width: 50,
            },
            {
                label: "oem",
                field: "oem",
                sort: "asc",
                width: 50,
            },
            {
                label: "create_date",
                field: "c_date",
                sort: "asc",
                width: 50,
            },
            {
                label: "update_date",
                field: "u_date",
                sort: "asc",
                width: 50,
            },
            {
                label: "remark",
                field: "remark",
                sort: "asc",
                width: 50,
            },
        ],
        rows: row_thank_data,
    };

    const row_redeem_data = [];
    console.log("row_redeem_data", redeem_point_data, redeem_user_data);
    for (let index = 0; index < redeem_point_data.length; index++) {
        const element = {};
        for (let i = 0; i < redeem_user_data.length; i++) {
            if (redeem_user_data[i] != null) {
                if (redeem_user_data[i].id == redeem_point_data[index].ol_emp_id) {
                    element["username"] = redeem_user_data[i].emp_no;
                    element["name"] = redeem_user_data[i].emp_name_th;
                    element["email"] = redeem_user_data[i].e_mail;
                    element["company"] = redeem_user_data[i].company_name;
                    element['oem'] = redeem_user_data[i].oem_name;
                    element["no"] = index + 1;
                    element["add"] = redeem_point_data[index].ea_address;
                    element["pd_name"] = redeem_point_data[index].product_name;
                    element["point"] = redeem_point_data[index].product_point;
                    element["c_date"] = redeem_point_data[index].create_date;
                    element["u_date"] = redeem_point_data[index].update_date;
                }
            }
        }
        row_redeem_data.push(element);
    }

    const redeem_data = {
        columns: [
            {
                label: "no.",
                field: "no",
                sort: "asc",
                width: 50,
            },
            {
                label: "username",
                field: "username",
                sort: "asc",
                width: 50,
            },
            {
                label: "product name",
                field: "pd_name",
                sort: "asc",
                width: 50,
            },
            {
                label: "product point",
                field: "point",
                sort: "asc",
                width: 50,
            },
            {
                label: "firstname_lastname",
                field: "name",
                sort: "asc",
                width: 50,
            },
            {
                label: "email",
                field: "email",
                sort: "asc",
                width: 50,
            },
            {
                label: "address",
                field: "add",
                sort: "asc",
                width: 50,
            },
            {
                label: "company",
                field: "company",
                sort: "asc",
                width: 50,
            },
            {
                label: "oem",
                field: "oem",
                sort: "asc",
                width: 50,
            },
            {
                label: "create_date",
                field: "c_date",
                sort: "asc",
                width: 50,
            },
            {
                label: "update_date",
                field: "u_date",
                sort: "asc",
                width: 50,
            },
        ],
        rows: row_redeem_data,
    };

    async function ChackfileName() {
        console.log(report_data);
        if (report_data.date_start != null && report_data.date_end != null) {
            if (report_data.table == 'award') {
                GetAwardPointDetail();
            } else if (report_data.table == 'thank') {
                GetThankPointDetail();
            } else if (report_data.table == 'redeem') {
                GetRedeemPointDetail();
            }
        }
    }

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Summary Report</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>

                                    <li className="breadcrumb-item active">Human Resource</li>
                                    <li className="breadcrumb-item active">Summary Report</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Summary Report</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <div className="form-group">
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="btn btn-block btn-primary inputButton"
                                            table={"table-to-xls-export"}
                                            filename={"user_detail_" + moment(new Date()).format('DDMMyyyy')}
                                            sheet="tablexls"
                                            buttonText="User detail point (.xlsx)"
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            id="btn_clear"
                                            className="btn btn-block btn-primary inputButton"
                                            data-toggle="modal"
                                            data-target="#modal-export"
                                            data-backdrop="static"
                                            data-keyboard="false"
                                            onClick={(e) => {
                                                setreport_data({
                                                    ...report_data,
                                                    name: 'Award Point History',
                                                    table: 'award',
                                                    file_name: 'award_point_history_',
                                                });
                                            }}
                                        >
                                            Award Point History (.xlsx)
                                        </button>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            id="btn_clear"
                                            className="btn btn-block btn-primary inputButton"
                                            data-toggle="modal"
                                            data-target="#modal-export"
                                            data-backdrop="static"
                                            data-keyboard="false"
                                            onClick={(e) => {
                                                setreport_data({
                                                    ...report_data,
                                                    name: 'Thank Point History',
                                                    table: 'thank',
                                                    file_name: 'thank_point_history_',
                                                });
                                            }}
                                        >
                                            Thank Point History (.xlsx)
                                        </button>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            id="btn_clear"
                                            className="btn btn-block btn-primary inputButton"
                                            data-toggle="modal"
                                            data-target="#modal-export"
                                            data-backdrop="static"
                                            data-keyboard="false"
                                            onClick={(e) => {
                                                setreport_data({
                                                    ...report_data,
                                                    name: 'Redeem Point',
                                                    table: 'redeem',
                                                    file_name: 'redeem_point_',
                                                });
                                            }}
                                        >
                                            Redeem Point (.xlsx)
                                        </button>
                                    </div>
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
                                    data={
                                        report_data.table == 'award' ? award_data
                                            : report_data.table == 'thank' ? thank_data
                                                : report_data.table == 'redeem' ? redeem_data
                                                    : data
                                    }
                                />
                            </div>
                        </div>
                        <div className="card-footer"></div>
                    </div>
                </section>
            </div>
            {/*  <Footter/> */}


            <div class="modal fade show" id="modal-export">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Report : {report_data.name}</h4>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={async () => {
                                    setreport_data({
                                        ...report_data,
                                        name: "",
                                        date_start: null,
                                        date_end: null,
                                        file_name: "",
                                        table: "",
                                        data_table_by: data,
                                    });
                                    report_data.name = '';
                                    report_data.date_start = null;
                                    report_data.date_end = null;
                                    report_data.file_name = '';
                                    report_data.table = '';
                                    setload_date(false)
                                    GetPointDetail();
                                }}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="ml-2" style={{ textAlign: "right" }}>
                                    <label className="mt-3" htmlFor="">Start Date
                                        <span style={{ color: "red" }}> *</span>
                                    </label>
                                </div>
                                <div className="mt-2 ml-2">
                                    <DatePicker
                                        style={{ "z-index": "9999" }}
                                        selected={report_data.date_start}
                                        id="start_date"
                                        dateFormat={"dd-MM-yyyy"}
                                        onChange={async (date) => {
                                            if (report_data.date_end != '' && date > report_data.date_end) {
                                                setreport_data({
                                                    ...report_data,
                                                    date_end: null
                                                });
                                                report_data.date_end = null;
                                            }
                                            setreport_data({
                                                ...report_data,
                                                date_start: date
                                            });
                                            report_data.date_start = date;
                                            ChackfileName();
                                        }}
                                        showYearDropdown
                                        showMonthDropdown
                                        customInput={<CustomInput />}
                                    ></DatePicker>
                                </div>
                            </div>

                            <div className="row">
                                <div className="ml-2" style={{ textAlign: "right" }}>
                                    <label className="mt-3" htmlFor="">End Date
                                        <span style={{ color: "red" }}> *</span>
                                    </label>
                                </div>
                                <div className="mt-2 ml-3">
                                    <DatePicker
                                        style={{ "z-index": "99" }}
                                        selected={report_data.date_end}
                                        id="end_date"
                                        dateFormat={"dd-MM-yyyy"}
                                        onChange={async (date) => {
                                            setreport_data({
                                                ...report_data,
                                                date_end: date
                                            });
                                            report_data.date_end = date;
                                            ChackfileName();
                                        }}
                                        minDate={report_data.date_start}
                                        showYearDropdown
                                        showMonthDropdown
                                        customInput={<CustomInput />}
                                    ></DatePicker>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            {report_data.date_start != null
                                && report_data.date_end != null ?
                                <div>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-block btn-success"
                                        table="table-to-xls-export"
                                        filename={report_data.file_name + moment(new Date()).format('DDMMyyyy')}
                                        sheet="tablexls"
                                        buttonText="Excel"
                                    />
                                </div>
                                : <button
                                    type="button"
                                    class="btn btn-success"
                                    disabled={true}>
                                    Excel
                                </button>
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div >
    );
}

export default SummaryReport;