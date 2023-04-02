import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Configs from "../../config";
import { getOem, getToken, getUser, getAcademy } from "../../Utils/Common";
import NumberFormat from "react-number-format";
import { useParams } from "react-router";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";
import th from "date-fns/locale/th";
registerLocale("th", th);
function Employee_add(mode) {
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);

  const [employee, setemployee] = useState({
    oem_id: getOem(),
    company_id: getUser().com,
    id: "",
    emp_name_th: "",
    emp_name_eng: "",
    emp_email: "",
    emp_mobile: "",
    emp_birthday: "",
    emp_nickname: "",
    emp_department_id: "",
    emp_position: "",
    emp_no: "",
    emp_start_work: "",
    emp_end_work: "",
    emp_work_year: "",
    emp_work_month: "",
    emp_work_day: "",
    emp_social_security_date: "",
    emp_hospital: "",
    emp_ent_sick_leave: "",
    emp_sick_leave: "",
    emp_balance_leave: "",
    emp_ent_personal_leave: "",
    emp_person_leave: "",
    emp_balanee_pesonal: 0,
    emp_ent_vacation_leave: "",
    emp_vacation_leave: "",
    emp_balanee_vacalion: "",
    emp_period_time_id: "",
    account_name: "",
    account_number: "",
    emp_nation_id: "",
    emp_line_id: "",
    emp_salary: "",
    emp_citizen_id: "",
  });
  const [chaek_DMY, setchaek_DMY] = useState({
    sum_day: "",
    sum_monyh: "",
    sum_yaeh: "",
  });
  const [check_sick_leave, setcheck_sick_leave] = useState({
    sum_sick_ent: "",
    sum_sick: "",
    sum_sick_balanee: 0,
  });
  const [check_personal_leave, setcheck_personal_leave] = useState({
    sum_personal_ent: "",
    sum_personal: "",
    sum_personal_balanee: 0,
  });
  const [check_vacation_leave, setcheck_vacation_leave] = useState({
    sum_vacation_ent: "",
    sum_vacation: "",
    sum_vacation_balanee: 0,
  });

  const [filler_start_work, setfiller_start_work] = useState({
    start_work: "",
  });
  const [filler_end_work, setfiller_end_work] = useState({
    end_work: "",
  });
  async function SetDate_start(date) {
    setfiller_start_work({ ...filler_start_work, start_work: date });
    checkYMD(date, true);
  }
  async function SetDate_end(date) {
    setfiller_end_work({ ...filler_end_work, end_work: date });
    checkYMD(date, false);
  }
  const [getemployeeType, setgetemployeeType] = useState([]);
  const [getMasterEmployeeType, setgetMasterEmployeeType] = useState([]);
  const [department, setdepartment] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (mode.mode === "read") {
      setdisable(true);
      setPageMode("Read");
    } else if (mode.mode === "add") {
      setdisable(false);
      setPageMode("Add");
    } else {
      setdisable(false);
      setPageMode("Edit");
    }
  }, []);

  useEffect(() => {
    //console.log("id:"+id);
    GetMasterEmployeeType();
    GetEmployeeType();
    Getdepartment();
    GetEmployee();
  }, []);

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

  const CustomInput2 = ({ value, onClick }) => (
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

  const GetEmployee = async () => {
    if (mode.mode == "read" || mode.mode == "edit") {
      axios({
        method: "post",
        url:
          Configs.API_URL_hrMagenatement +
          "/api/hrManagement/getEmployeeById?id=" +
          id,
        headers: {
          Authorization: getToken(),
          "X-TTT": Configs.API_TTT,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          /*  console.log(response.data.data,"sad",response.data.data[0].emp_balanee_pesonal); */
          setchaek_DMY({
            sum_day: response.data.data[0].emp_work_day || 0,
            sum_monyh: response.data.data[0].emp_work_month || 0,
            sum_yaeh: response.data.data[0].emp_work_year || 0,
          });

          setcheck_sick_leave({
            sum_sick: response.data.data[0].emp_sick_leave,
            sum_sick_ent: response.data.data[0].emp_ent_sick_leave,
          });

          setcheck_personal_leave({
            sum_personal: response.data.data[0].emp_personal_leave,
            sum_personal_ent: response.data.data[0].emp_ent_personal_leave,
          });

          setcheck_vacation_leave({
            sum_vacation: response.data.data[0].emp_vacation_leave,
            sum_vacation_ent: response.data.data[0].emp_ent_vacation_leave,
          });
          if (response.data.data[0].emp_birthday !== null) {
            var chaekemp_birthday = new Date(
              response.data.data[0].emp_birthday
            );
          } else {
            var chaekemp_birthday = "";
          }
          if (response.data.data[0].emp_start_work !== null) {
            var chaekemp_start_work = new Date(
              response.data.data[0].emp_start_work
            );
          } else {
            var chaekemp_start_work = "";
          }
          if (response.data.data[0].emp_end_work !== null) {
            var chaekemp_end_work = new Date(
              response.data.data[0].emp_end_work
            );
          } else {
            var chaekemp_end_work = "";
          }
          if (response.data.data[0].emp_social_security_date !== null) {
            var chaekemp_social_security_date = new Date(
              response.data.data[0].emp_social_security_date
            );
          } else {
            var chaekemp_social_security_date = "";
          }

          setemployee({
            id: response.data.data[0].id,
            emp_name_th: response.data.data[0].emp_name_th,
            emp_name_eng: response.data.data[0].emp_name_eng || null,
            emp_email: response.data.data[0].emp_email || "",
            emp_mobile: response.data.data[0].emp_mobile || "",
            emp_birthday: chaekemp_birthday,
            emp_nickname: response.data.data[0].emp_nickname || "",
            emp_department_id: response.data.data[0].emp_department_id,
            emp_position: response.data.data[0].emp_position || "",
            emp_no: response.data.data[0].emp_no || "",
            emp_start_work: chaekemp_start_work,
            emp_end_work: chaekemp_end_work,
            emp_social_security_date: chaekemp_social_security_date,
            emp_hospital: response.data.data[0].emp_hospital || "",
            emp_ent_sick_leave: response.data.data[0].emp_ent_sick_leave || "0",
            emp_sick_leave: response.data.data[0].emp_sick_leave || "0",
            emp_balance_leave: parseFloat(
              response.data.data[0].emp_balance_leave || "0"
            ),
            emp_ent_personal_leave:
              response.data.data[0].emp_ent_personal_leave || "0",
            emp_person_leave: response.data.data[0].emp_person_leave || "0",
            emp_balanee_pesonal: parseFloat(
              response.data.data[0].emp_balance_personal || "0"
            ),
            emp_ent_vacation_leave:
              response.data.data[0].emp_ent_vacation_leave || "0",
            emp_vacation_leave: response.data.data[0].emp_vacation_leave || "0",
            emp_balanee_vacalion: parseFloat(
              response.data.data[0].emp_balance_vacation || "0"
            ),
            emp_period_time_id: response.data.data[0].emp_period_time_id,
            account_name: response.data.data[0].account_name || "",
            account_number: response.data.data[0].account_number || "",
            emp_nation_id: response.data.data[0].emp_nation_id || "",
            emp_line_id: response.data.data[0].emp_line_id || "",
            emp_salary: response.data.data[0].emp_salary || "",
            emp_citizen_id: response.data.data[0].citizen_id || "",
          });
          Check_sick_leave();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const Getdepartment = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
    };

    axios({
      method: "post",
      url:
        Configs.API_URL_hrMagenatement + "/api/hrManagement/filterDepartment",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        /* console.log(response.data.data,"sadj",); */
        setdepartment(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetEmployeeType = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
    };

    axios({
      method: "post",
      url: Configs.API_URL_hrMagenatement + "/api/hrManagement/getEmployeeType",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        /* console.log(response.data.data,"ddd",); */
        setgetemployeeType(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const GetMasterEmployeeType = async () => {
    let get_com_oem = {
      oem_id: getOem(),
      company_id: getUser().com,
    };

    axios({
      method: "post",
      url:
        Configs.API_URL_hrMagenatement +
        "/api/hrManagement/getMasterEmployeeType",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: get_com_oem,
    })
      .then(function (response) {
        /* console.log(response.data.data,"xx",); */
        setgetMasterEmployeeType(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*  console.log(employee,"sasssd"); */

  function saveOption(params) {
    const error_list = [];
    if (employee.emp_name_th == "") {
      let temp_err = {
        message: "กรุณากรอก ชื่อ - นามสกุล(ไทย หรือ อังกฤษ)",
      };
      error_list.push(temp_err);
    }
    /* if(employee.emp_name_eng == ""){
      let temp_err ={
        message:"กรุณากรอก ชื่อ - นามสกุล(อังกฤษ)"
      }
      error_list.push(temp_err);
    } */
    if (employee.emp_no == "") {
      let temp_err = {
        message: "กรุณากรอก รหัสพนักงาน",
      };
      error_list.push(temp_err);
    }
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
          emp_name_th: employee.emp_name_th.trim(),
          emp_name_eng: employee.emp_name_eng || null,
          emp_email: employee.emp_email.trim() || null,
          emp_mobile: employee.emp_mobile.trim() || null,
          emp_birthday: employee.emp_birthday || null,
          emp_nickname: employee.emp_nickname.trim() || null,
          emp_department_id: employee.emp_department_id || null,
          emp_position: employee.emp_position.trim(),
          emp_no: employee.emp_no.trim(),
          emp_start_work: employee.emp_start_work || null,
          emp_end_work: employee.emp_end_work || null,
          emp_work_year: chaek_DMY.sum_yaeh || "0",
          emp_work_month: chaek_DMY.sum_monyh || "0",
          emp_work_day: chaek_DMY.sum_day || "0",
          emp_social_security_date: employee.emp_social_security_date || null,
          emp_hospital: employee.emp_hospital.trim(),
          emp_ent_sick_leave:
            employee.emp_ent_sick_leave || setcheck_sick_leave.sum_sick_ent,
          emp_sick_leave:
            employee.emp_sick_leave || setcheck_sick_leave.sum_sick,
          emp_balanee_leave:
            employee.emp_balance_leave || setcheck_sick_leave.sum_sick_balanee,
          emp_ent_personal_leave:
            employee.emp_ent_personal_leave ||
            setcheck_personal_leave.sum_personal_ent,
          emp_personal_leave:
            employee.emp_person_leave || setcheck_personal_leave.sum_personal,
          emp_balanee_pesonal:
            employee.emp_balanee_pesonal ||
            setcheck_personal_leave.sum_personal_balanee,
          emp_ent_vacation_leave:
            employee.emp_ent_vacation_leave ||
            setcheck_vacation_leave.sum_vacation_ent,
          emp_vacation_leave:
            employee.emp_vacation_leave || setcheck_vacation_leave.sum_vacation,
          emp_balanee_vacalion:
            employee.emp_balanee_vacalion ||
            setcheck_vacation_leave.sum_vacation_balanee,
          emp_period_time_id: employee.emp_period_time_id,
          account_name: employee.account_name.trim(),
          account_number: employee.account_number.trim(),
          employee_nation_id: employee.emp_nation_id,
          emp_line_id: employee.emp_line_id.trim(),
          emp_salary: Number(String(employee.emp_salary).replace(/,/g, "")),
          emp_citizen_id: employee.emp_citizen_id,
        };
        console.log(employee.emp_work_month, employee.emp_work_year);
      }
      if (mode.mode === "edit") {
        const temp = {
          emp_id: id,
          oem_id: getOem(),
          company_id: getUser().com,
          emp_name_th: employee.emp_name_th.trim(),
          emp_name_eng: employee.emp_name_eng || null,
          emp_email: employee.emp_email.trim() || null,
          emp_mobile: employee.emp_mobile.trim() || null,
          emp_birthday: employee.emp_birthday,
          emp_nickname: employee.emp_nickname.trim() || null,
          emp_department_id: employee.emp_department_id,
          emp_position: employee.emp_position.trim() || null,
          emp_no: employee.emp_no.trim() || null,
          emp_start_work: employee.emp_start_work,
          emp_end_work: employee.emp_end_work,
          emp_work_year: chaek_DMY.sum_yaeh || "0",
          emp_work_month: chaek_DMY.sum_monyh || "0",
          emp_work_day: chaek_DMY.sum_day || "0",
          emp_social_security_date: employee.emp_social_security_date,
          emp_hospital: employee.emp_hospital.trim() || null,
          emp_ent_sick_leave:
            employee.emp_ent_sick_leave || setcheck_sick_leave.sum_sick_ent,
          emp_sick_leave:
            employee.emp_sick_leave || setcheck_sick_leave.sum_sick,
          emp_balanee_leave:
            employee.emp_balance_leave || setcheck_sick_leave.sum_sick_balanee,
          emp_ent_personal_leave:
            employee.emp_ent_personal_leave ||
            setcheck_personal_leave.sum_personal_ent,
          emp_person_leave:
            employee.emp_person_leave || setcheck_personal_leave.sum_personal,
          emp_balanee_pesonal:
            employee.emp_balanee_pesonal ||
            setcheck_personal_leave.sum_personal_balanee,
          emp_ent_vacation_leave:
            employee.emp_ent_vacation_leave ||
            setcheck_vacation_leave.sum_vacation_ent,
          emp_vacation_leave:
            employee.emp_vacation_leave || setcheck_vacation_leave.sum_vacation,
          emp_balanee_vacalion:
            employee.emp_balanee_vacalion ||
            setcheck_vacation_leave.sum_vacation_balanee,
          emp_period_time_id: employee.emp_period_time_id,
          account_name: employee.account_name.trim() || null,
          account_number: employee.account_number.trim() || null,
          emp_nation_id: employee.emp_nation_id,
          emp_line_id: employee.emp_line_id.trim() || null,
          emp_salary: Number(String(employee.emp_salary).replace(/,/g, "")),
          emp_citizen_id: employee.emp_citizen_id.trim() || null,
        };
         console.log("Ss",temp);
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
              Configs.API_URL_hrMagenatement + "/api/hrManagement/editEmployee",
            headers: {
              Authorization: getToken(),
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
                  window.location.href = "/Human_Resource/Employee";
                });
              }

              //console.log(response.data);
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

  function checkYMD(date, check) {
    var sum_day = 0;
    var sum_monyh = 0;
    var sum_yaeh = 0;
    if (check === false) {
      employee.emp_end_work = moment(date).format();
      var emp_s_d = moment(
        filler_start_work.start_work || employee.emp_start_work
      ).format("DD-MM-YYYY");
      var emp_e_y = moment(date).format("DD-MM-YYYY");
    } else {
      employee.emp_start_work = moment(date).format();
      var emp_s_d = moment(date).format("DD-MM-YYYY");
      var emp_e_y = moment(
        filler_end_work.end_work || employee.emp_end_work
      ).format("DD-MM-YYYY");
    }
    var date1 = moment(emp_s_d, "DD-MM-YYYY");
    var date2 = moment(emp_e_y, "DD-MM-YYYY");

    var sum_yaeh = date2.diff(date1, "years");
    date1.add(sum_yaeh, "years");
    var sum_monyh = date2.diff(date1, "months");
    date1.add(sum_monyh, "months");
    var sum_day = date2.diff(date1, "days");

    setchaek_DMY({
      sum_day: sum_day,
      sum_monyh: sum_monyh,
      sum_yaeh: sum_yaeh,
    });
    /* console.log(years,months,days,"sss") */
  }

  function Check_sick_leave(num1, check) {
    if (check === true) {
      var sum_sick = parseFloat(num1 || 0);
      var sum_sick_ent = 0;
    } else {
      var sum_sick = 0;
      var sum_sick_ent = parseFloat(num1 || 0);
    }

    /* console.log(sum_sick,sum_sick_ent,check_sick_leave.sum_sick_ent,check_sick_leave.sum_sick_balanee,"sss2")  */
    if (sum_sick_ent === 0 && sum_sick === 0) {
      if (check_sick_leave.sum_sick !== 0 && check === true) {
        var sum_sick_balanee = parseFloat(0 - check_sick_leave.sum_sick_ent);
      } else if (check_sick_leave.sum_sick_ent !== 0 && check === false) {
        var sum_sick_balanee =
          parseFloat(check_sick_leave.sum_sick_ent) +
          parseFloat(employee.emp_balance_leave);
      } else {
        var sum_sick_balanee = 0;
      }
    } else if (sum_sick === 0 && sum_sick_ent !== 0) {
      var sum_sick_balanee = parseFloat(
        check_sick_leave.sum_sick - sum_sick_ent
      );
    } else if (sum_sick_ent === 0 && sum_sick !== 0) {
      var sum_sick_balanee = parseFloat(
        sum_sick - check_sick_leave.sum_sick_ent
      );
    }

    if (sum_sick == 0 && sum_sick_ent !== 0) {
      employee.emp_ent_sick_leave = sum_sick_ent;
      employee.emp_sick_leave = check_sick_leave.sum_sick;
      employee.emp_balance_leave = sum_sick_balanee;
    } else if (sum_sick_ent == 0 && sum_sick !== 0) {
      employee.emp_ent_sick_leave = check_sick_leave.sum_sick_ent;
      employee.emp_sick_leave = sum_sick;
      employee.emp_balance_leave = sum_sick_balanee;
    } else if (
      sum_sick_ent == 0 &&
      sum_sick === 0 &&
      check_sick_leave.sum_sick_ent !== 0
    ) {
      employee.emp_ent_sick_leave = sum_sick_ent;
      employee.emp_sick_leave = check_sick_leave.sum_sick;
      employee.emp_balance_leave = sum_sick_balanee;
    } else if (
      sum_sick_ent == 0 &&
      sum_sick === 0 &&
      check_sick_leave.sum_sick !== 0
    ) {
      employee.emp_ent_sick_leave = check_sick_leave.sum_sick_ent;
      employee.emp_sick_leave = sum_sick;
      employee.emp_balance_leave = sum_sick_balanee;
    } else if (
      sum_sick_ent == 0 &&
      sum_sick === 0 &&
      (check_sick_leave.sum_sick_ent === 0 ||
        check_sick_leave.sum_sick_ent == 0)
    ) {
      employee.emp_ent_sick_leave = sum_sick_ent;
      employee.emp_sick_leave = sum_sick;
      employee.emp_balance_leave = sum_sick_balanee;
    }

    check_sick_leave.sum_sick_balanee = sum_sick_balanee;
    check_sick_leave.sum_sick = sum_sick;
    check_sick_leave.sum_sick_ent = sum_sick_ent;
    console.log(check_sick_leave, "sss");
  }

  function Check_personal_leave(num1, check) {
    if (check === true) {
      var sum_personal = parseFloat(num1 || 0);
      var sum_personal_ent = 0;
    } else {
      var sum_personal = 0;
      var sum_personal_ent = parseFloat(num1 || 0);
    }

    if (sum_personal_ent === 0 && sum_personal === 0) {
      if (check_personal_leave.sum_personal !== 0 && check === true) {
        var sum_personal_balanee = parseFloat(
          0 - check_personal_leave.sum_personal_ent
        );
      } else if (
        check_personal_leave.sum_personal_ent !== 0 &&
        check === false
      ) {
        var sum_personal_balanee =
          parseFloat(check_personal_leave.sum_personal_ent) +
          parseFloat(employee.emp_balanee_pesonal);
      } else {
        var sum_personal_balanee = 0;
      }
    } else if (sum_personal === 0 && sum_personal_ent !== 0) {
      var sum_personal_balanee = parseFloat(
        check_personal_leave.sum_personal - sum_personal_ent
      );
    } else if (sum_personal_ent === 0 && sum_personal !== 0) {
      var sum_personal_balanee = parseFloat(
        sum_personal - check_personal_leave.sum_personal_ent
      );
    }
    if (sum_personal == 0 && sum_personal_ent !== 0) {
      employee.emp_ent_personal_leave = sum_personal_ent;
      employee.emp_person_leave = check_personal_leave.sum_personal;
      employee.emp_balanee_pesonal = sum_personal_balanee;
    } else if (sum_personal_ent == 0 && sum_personal !== 0) {
      employee.emp_ent_personal_leave = check_personal_leave.sum_personal_ent;
      employee.emp_person_leave = sum_personal;
      employee.emp_balanee_pesonal = sum_personal_balanee;
    } else if (
      sum_personal_ent == 0 &&
      sum_personal === 0 &&
      check_personal_leave.sum_personal_ent !== 0
    ) {
      employee.emp_ent_personal_leave = sum_personal_ent;
      employee.emp_person_leave = check_personal_leave.sum_personal;
      employee.emp_balanee_pesonal = sum_personal_balanee;
    } else if (
      sum_personal_ent == 0 &&
      sum_personal === 0 &&
      check_personal_leave.sum_personal !== 0
    ) {
      employee.emp_ent_personal_leave = check_personal_leave.sum_personal_ent;
      employee.emp_person_leave = sum_personal;
      employee.emp_balanee_pesonal = sum_personal_balanee;
    } else if (
      sum_personal_ent == 0 &&
      sum_personal === 0 &&
      (check_personal_leave.sum_personal === 0 ||
        check_personal_leave.sum_personal_ent === 0)
    ) {
      employee.emp_ent_personal_leave = sum_personal_ent;
      employee.emp_person_leave = sum_personal;
      employee.emp_balanee_pesonal = sum_personal_balanee;
    }
    check_personal_leave.sum_personal_balanee = sum_personal_balanee;
    check_personal_leave.sum_personal = sum_personal;
    check_personal_leave.sum_personal_ent = sum_personal_ent;
  }

  function Check_vacation_leave(num1, check) {
    if (check === true) {
      var sum_vacation = parseFloat(num1 || 0);
      var sum_vacation_ent = 0;
    } else {
      var sum_vacation = 0;
      var sum_vacation_ent = parseFloat(num1 || 0);
    }

    if (sum_vacation_ent === 0 && sum_vacation === 0) {
      if (check_vacation_leave.sum_vacation !== 0 && check === true) {
        var sum_vacation_balanee = parseFloat(
          0 - check_vacation_leave.sum_vacation_ent
        );
      } else if (
        check_vacation_leave.sum_vacation_ent !== 0 &&
        check === false
      ) {
        var sum_vacation_balanee =
          parseFloat(check_vacation_leave.sum_personal_ent) +
          parseFloat(employee.sum_vacation_balanee);
      } else {
        var sum_vacation_balanee = 0;
      }
    } else if (sum_vacation === 0 && sum_vacation_ent !== 0) {
      var sum_vacation_balanee = parseFloat(
        check_vacation_leave.sum_vacation - sum_vacation_ent
      );
    } else if (sum_vacation_ent === 0 && sum_vacation !== 0) {
      var sum_vacation_balanee = parseFloat(
        sum_vacation - check_vacation_leave.sum_vacation_ent
      );
    }
    if (sum_vacation == 0 && sum_vacation_ent !== 0) {
      employee.emp_ent_vacation_leave = sum_vacation_ent;
      employee.emp_vacation_leave = check_vacation_leave.sum_vacation;
      employee.emp_balanee_vacalion = sum_vacation_balanee;
    } else if (sum_vacation_ent == 0 && sum_vacation !== 0) {
      employee.emp_ent_vacation_leave = check_vacation_leave.sum_vacation_ent;
      employee.emp_vacation_leave = sum_vacation;
      employee.emp_balanee_vacalion = sum_vacation_balanee;
    } else if (
      sum_vacation_ent == 0 &&
      sum_vacation === 0 &&
      check_vacation_leave.sum_vacation_ent !== 0
    ) {
      employee.emp_ent_vacation_leave = sum_vacation_ent;
      employee.emp_vacation_leave = check_vacation_leave.sum_vacation;
      employee.emp_balanee_vacalion = sum_vacation_balanee;
    } else if (
      sum_vacation_ent == 0 &&
      sum_vacation === 0 &&
      check_vacation_leave.sum_vacation !== 0
    ) {
      employee.emp_ent_vacation_leave = check_vacation_leave.sum_vacation_ent;
      employee.emp_vacation_leave = sum_vacation;
      employee.emp_balanee_vacalion = sum_vacation_balanee;
    } else if (
      sum_vacation_ent == 0 &&
      sum_vacation === 0 &&
      (check_vacation_leave.sum_vacation === 0 ||
        check_vacation_leave.sum_vacation_ent === 0)
    ) {
      employee.emp_ent_vacation_leave = sum_vacation_ent;
      employee.emp_vacation_leave = sum_vacation;
      employee.emp_balanee_vacalion = sum_vacation_balanee;
    }

    check_vacation_leave.sum_vacation_balanee = sum_vacation_balanee;
    check_vacation_leave.sum_vacation = sum_vacation;
    check_vacation_leave.sum_vacation_ent = sum_vacation_ent;
  }

  function cancleOption(params) {
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
        window.location.href = "/Human_Resource/Employee";
      }
    });
  }
  return (
    <div className="wrapper">
      {/* <Header />
    <Sidebar menu="warehouse" activemenu="projmenu" submenu="factmaster" /> */}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Employee {pageMode}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Employee</li>
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
                    onClick={cancleOption}
                    class="btn btn-block btn-danger "
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <div className="row mb-2">
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={saveOption}
                    class="btn btn-block btn-success "
                  >
                    บันทึก
                  </button>
                </div>
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={cancleOption}
                    class="btn btn-block btn-danger "
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Employee {pageMode}</h3>
            </div>

            <div className="card-body">
              <h3 className="mb-2  mt-5-head">ข้อมูลพนักงาน</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_name_th"
                      value={employee.emp_name_th}
                      placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_name_th: e.target.value,
                        });
                      }}
                    />
                    <label>
                      ชื่อ - นามสกุล (ไทย หรือ อังกฤษ)
                      {employee.emp_name_th === "" ? (
                        <span style={{ color: "red" }}> *</span>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    {/* <input
                      type="text"
                      className="form-control"
                      required
                      id="text_name_eng"
                      value={employee.emp_name_eng}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_name_eng: e.target.value,
                        });
                      }}
                    />
                    <label>
                    ชื่อ - นามสกุล (อังกฤษ)
                    {employee.emp_name_eng === "" ? (
                        <span style={{ color: "red" }}> *</span>
                      ) : (
                        ""
                      )}
                    </label> */}
                   {/*  <input
                      type="text"
                      className="form-control"
                      required
                      id="text_emp_no"
                      value={employee.emp_citizen_id}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_citizen_id: e.target.value,
                        });
                      }}
                    /> */}
                      <NumberFormat
                      className="form-control"
                      required
                      id="text_mobile"
                      thousandSeparator={false}
                      format={"#-####-#####-##-#"}
                      value={employee.emp_citizen_id}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_citizen_id: e.target.value,
                        });
                      }}
                    />
                    <label>
                      หมายเลขบัตรประชาชน
                      {employee.emp_citizen_id === "" ? (
                        <span style={{ color: "red" }}> *</span>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-2">
                  <div class="form-group">
                    {/* <input
                      type="text"
                      className="form-control"
                      required
                      id="text_name_eng"
                      value={employee.emp_name_eng}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_name_eng: e.target.value,
                        });
                      }}
                    />
                    <label>
                    ชื่อ - นามสกุล (อังกฤษ)
                    {employee.emp_name_eng === "" ? (
                        <span style={{ color: "red" }}> *</span>
                      ) : (
                        ""
                      )}
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_emp_no"
                      value={employee.emp_no}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_no: e.target.value,
                        });
                      }}
                    />
                    <label>
                      รหัสพนักงาน
                      {employee.emp_no === "" ? (
                        <span style={{ color: "red" }}> *</span>
                      ) : (
                        ""
                      )}
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-2">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_nickname"
                      value={employee.emp_nickname}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_nickname: e.target.value,
                        });
                      }}
                    />
                    <label>ชื่อเล่น</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-2">
                  <div class="form-group">
                    <DatePicker
                      selected={employee.emp_birthday}
                      disabled={disable}
                      id="text_birthday"
                      dateFormat={"dd-MM-yyyy"}
                      locale="th"
                      onChange={async (date) => {
                        setemployee({
                          ...employee,
                          emp_birthday: date,
                        });
                        console.log(date, "aaa");
                      }}
                      startDate={employee.emp_birthday}
                      showYearDropdown
                      showMonthDropdown
                      customInput={<CustomInput />}
                    ></DatePicker>
                    <label>วันเกิด</label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-2">
                  <div class="form-group ">
                    <select
                      className="form-control custom-select select2"
                      type="text"
                      required
                      id="text_nation_id"
                      value={employee.emp_nation_id}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_nation_id: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled selected>
                        ----เลือก----
                      </option>
                      {getMasterEmployeeType.map((el) => {
                        return (
                          <option value={el.emp_nation_id}>
                            {el.emp_nation}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor=""> สัญชาติ</label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_email"
                      value={employee.emp_email}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_email: e.target.value,
                        });
                      }}
                    />
                    <label>E-mail</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_line_id"
                      value={employee.emp_line_id}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_line_id: e.target.value,
                        });
                      }}
                    />
                    <label>Line id</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      className="form-control"
                      required
                      id="text_mobile"
                      thousandSeparator={false}
                      format={"###-###-#############"}
                      value={employee.emp_mobile}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_mobile: e.target.value,
                        });
                      }}
                    />

                    <label>เบอร์โทรศัพท์</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_account_name"
                      value={employee.account_name}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          account_name: e.target.value,
                        });
                      }}
                    />
                    <label>ชื่อบัญชี</label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_account_number"
                      value={employee.account_number}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          account_number: e.target.value,
                        });
                      }}
                    />
                    <label>เลขบัญชี</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div className="form-group ">
                    <select
                      className="form-control custom-select "
                      type="text"
                      required
                      id="drop_department"
                      value={employee.emp_department_id}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_department_id: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled selected>
                        ----เลือก----
                      </option>
                      {department.map((el) => {
                        return (
                          <option value={el.department_id}>
                            {el.department_name}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor=""> แผนก</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_position"
                      value={employee.emp_position}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_position: e.target.value,
                        });
                      }}
                    />
                    <label>ตำแหน่ง</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <select
                      className="form-control custom-select select2"
                      type="text"
                      required
                      id="drop_emptype"
                      disabled={disable}
                      value={employee.emp_period_time_id}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_period_time_id: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled selected>
                        ----เลือก----
                      </option>
                      {getemployeeType.map((el) => {
                        return (
                          <option value={el.period_time_id}>
                            {el.period_time}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor=""> ประเภทพนักงาน</label>
                  </div>
                </div>
              </div>

              {/* <h3 className="mt-5 mt-5-head">
                   ข้อมูลพนักงาน
                  </h3> */}
              <div className="row">
                <div className="col-6 col-md-3 col-xl-2">
                
                  <div class="form-group">
                  
                    <DatePicker
                      // disabled={true}

                      selected={employee.emp_start_work}
                      disabled={disable}
                      locale="th"
                      id="text_start_work"
                      dateFormat={"dd-MM-yyyy"}
                      onChange={async (date) => {
                        setemployee({
                          ...employee,
                          emp_start_work: date,
                        });
                        SetDate_start(date);
                      }}
                      selectsStart
                      showYearDropdown
                      showMonthDropdown
                      startDate={employee.emp_start_work}
                      endDate={employee.emp_end_work}
                      maxDate={employee.emp_end_work}
                      customInput={<CustomInput />}
                    ></DatePicker>
                    <label>เริ่มบรรจุพนักงาน</label>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-xl-2">
                <div class="custom-control custom-switch"  >
                     
                     <input type="checkbox" class="custom-control-input" id="is_fifo"
                     /*  disabled={disable}
                     
                      onChange={(event) => {
                     
                       chcek_box(event);
                      
                     
                     }} */
                   />
                   <label class="custom-control-label " for="is_fifo">
                   ประเภทหลัก
               
                   </label>
                   
                 </div>
                  
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                <div class="form-group">
                    <DatePicker
                      // disabled={true}
                      selected={employee.emp_end_work}
                      locale="th"
                      disabled={disable}
                      id="text_end_work"
                      dateFormat={"dd-MM-yyyy"}
                      onChange={async (date) => {
                        setemployee({
                          ...employee,
                          emp_end_work: date,
                        });
                        SetDate_end(date);
                      }}
                      selectsStart
                      showYearDropdown
                      showMonthDropdown
                      endDate={employee.emp_end_work}
                      minDate={employee.emp_start_work}
                      customInput={<CustomInput2 />}
                    ></DatePicker>
                    <label>สิ้นสุดบรรจุพนักงาน</label>
                  </div>
                  <div className="form-group ">
                    {/*  <select className="form-control custom-select select2"
                   type="text"
                   required
                   id = "drop_emptype"
                   value={employee.emp_period_time_id}
                   onChange={(e) => {
                    setemployee({
                      ...employee,
                      emp_period_time_id: e.target.value,
                    });
                   }}
                  >
                     <option value="" disabled selected>
                                           ----เลือก----
                                        </option>
                     {getemployeeType.map((el) => {
                      return (
                      <option value={el.period_time_id}>{el.period_time}
                      </option>
                      );
                    })} 
                   </select>
                   <label htmlFor=""> ประเภทพนักงาน</label> */}

                    <input
                      type="text"
                      className="form-control"
                      required
                      id="text_hospitai"
                      value={employee.emp_hospital}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_hospital: e.target.value,
                        });
                      }}
                    />
                    <label>โรงพยาบาล</label>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-xl-2">
                  <div class="form-group">
                    <DatePicker
                      selected={employee.emp_social_security_date}
                      disabled={disable}
                      id="text_social_security_date"
                      dateFormat={"dd-MM-yyyy"}
                      locale="th"
                      onChange={async (date) => {
                        setemployee({
                          ...employee,
                          emp_social_security_date: date,
                        });
                        //SetDate_end(date)
                      }}
                      showYearDropdown
                      showMonthDropdown
                      startDate={employee.emp_social_security_date}
                      customInput={<CustomInput />}
                    ></DatePicker>
                    <label>แจ้งเข้า ประกันสังคม</label>
                  </div>
                </div>
                <div className="col-6 col-md-3 col-xl-2">
                  <div class="form-group">
                    <NumberFormat
                      className="form-control"
                      required
                      id="text_salary"
                      thousandSeparator={true}
                      allowNegative={false}
                      value={employee.emp_salary}
                      decimalScale={2}
                      disabled={disable}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_salary: e.target.value,
                        });
                      }}
                    />

                    <label>อัตราเงินเดือน (บาท)</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_work_year"
                      value={chaek_DMY.sum_yaeh}
                      disabled={true}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_work_year: e.target.value,
                        });
                      }}
                    />
                    <label>อายุงานปี</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_work_month"
                      value={chaek_DMY.sum_monyh}
                      disabled={true}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_work_month: e.target.value,
                        });
                      }}
                    />
                    <label>อายุงานเดือน</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_work_day"
                      value={chaek_DMY.sum_day}
                      disabled={true}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_work_day: e.target.value,
                        });
                      }}
                    />
                    <label>อายุงานวัน</label>
                  </div>
                </div>
              </div>

              {/*  <h3 className="mt-5 mt-5-head">
                    ข้อมูลพนักงาน
                  </h3> */}

              <h3 className="mb-2 mt-5-head">สิทธิ์สวัสดิการ</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_sick_leave"
                      value={check_sick_leave.sum_sick}
                      disabled={disable}
                      onChange={(e) => {
                        setcheck_sick_leave({
                          ...check_sick_leave,
                          sum_sick: e.target.value,
                        });
                        if (e.target.value === "") {
                          Check_sick_leave(0, true);
                        } else {
                          Check_sick_leave(e.target.value, true);
                        }
                      }}
                    />
                    <label>ลาป่วย (ได้สิทธิ์)</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_ent_sick_leave"
                      value={check_sick_leave.sum_sick_ent}
                      disabled={disable}
                      onChange={(e) => {
                        setcheck_sick_leave({
                          ...check_sick_leave,
                          sum_sick_ent: e.target.value,
                        });
                        Check_sick_leave(e.target.value, false);
                      }}
                    />
                    <label>ลาป่วย (ใช้ไป)</label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_balance_leave"
                      value={employee.emp_balance_leave || 0}
                      disabled={true}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_balance_leave: e.target.value,
                        });
                      }}
                    />
                    <label>ลาป่วย (เหลือ)</label>
                  </div>
                </div>
              </div>

              {/* <h3 className="mt-5 mt-5-head">
                ข้อมูลพนักงาน
                  </h3> */}
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_ent_personal_leave"
                      value={check_personal_leave.sum_personal}
                      disabled={disable}
                      onChange={(e) => {
                        setcheck_personal_leave({
                          ...check_personal_leave,
                          sum_personal: e.target.value,
                        });
                        Check_personal_leave(e.target.value, true);
                      }}
                    />
                    <label>ลากิจ (ได้สิทธิ์)</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_person_leave"
                      value={check_personal_leave.sum_personal_ent}
                      disabled={disable}
                      onChange={(e) => {
                        setcheck_personal_leave({
                          ...check_personal_leave,
                          sum_personal_ent: e.target.value,
                        });
                        Check_personal_leave(e.target.value, false);
                      }}
                    />
                    <label>ลากิจ (ใช้ไป)</label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_balance_personal"
                      value={employee.emp_balanee_pesonal || 0}
                      disabled={true}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_balanee_pesonal: e.target.value,
                        });
                      }}
                    />
                    <label>ลากิจ (เหลือ)</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_vacation_leave"
                      value={check_vacation_leave.sum_vacation}
                      disabled={disable}
                      onChange={(e) => {
                        setcheck_vacation_leave({
                          ...check_vacation_leave,
                          sum_vacation: e.target.value,
                        });
                        Check_vacation_leave(e.target.value, true);
                      }}
                    />
                    <label>ลาพักร้อน (ได้สิทธิ์)</label>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_ent_vacation_leave"
                      value={check_vacation_leave.sum_vacation_ent}
                      disabled={disable}
                      onChange={(e) => {
                        setcheck_vacation_leave({
                          ...check_vacation_leave,
                          sum_vacation_ent: e.target.value,
                        });
                        Check_vacation_leave(e.target.value, false);
                      }}
                    />
                    <label>ลาพักร้อน (ใช้ไป)</label>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div class="form-group">
                    <NumberFormat
                      type="text"
                      className="form-control"
                      required
                      id="text_balance_vacation"
                      value={employee.emp_balanee_vacalion || 0}
                      disabled={true}
                      onChange={(e) => {
                        setemployee({
                          ...employee,
                          emp_balanee_vacalion: e.target.value,
                        });
                      }}
                    />
                    <label>ลาพักร้อน (เหลือ)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/*  <Footter/> */}
    </div>
  );
}

export default Employee_add;
