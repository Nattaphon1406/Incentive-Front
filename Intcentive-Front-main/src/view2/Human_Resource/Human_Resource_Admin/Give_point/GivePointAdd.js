import React, { Component, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import Checkbox from "@mui/material/Checkbox";
// import { Catalogues } from "./mock";
import axios from "axios";
import { userdefault_img } from "../../../../routes/imgRoute/imgUrl";
import Configs from "../../../../config";
import {
  getOem,
  getToken,
  getUser,
  getFeature,
  getAcademy,
} from "../../../../Utils/Common";
import { useParams } from "react-router";
import Resizer from "react-image-file-resizer";
import { default as ReactSelect } from "react-select";
import Select from "react-select";

function GivePointAdd(mode) {
  const [pageMode, setPageMode] = useState("");
  const [disable, setdisable] = useState(null);
  const [usertable, setusertable] = useState([]);
  const [emp_select, setEmp_select] = useState([]);
  const [dep_select, setDep_select] = useState([]);
  const [MDBT, setMDBT] = useState(true);
  const [company, setCompany] = useState([]);
  const { id } = useParams();
  const [test, settest] = useState({
    test: "",
  });
  const [defaultselected, setdefaultselected] = useState([]);
  const [give_point_data, setgive_point_data] = useState({
    gp_id: "",
    gp_award_point_id: "",
    gp_emp_id: "",
    gp_remark: "",
  });
  const [count, setCount] = useState({
    count: 0,
  });

  const [filteruser, setfilteruser] = useState({
    membership_name: "",
    department: "",
    group: "",
    position: "",
  });
  const [departmentlist, setdepartmentlist] = useState([]);
  const [awardpointlist, setawardpointlist] = useState([]);
  const [grouplist, setgrouplist] = useState([]);
  const [Selectmode, setSelectmode] = useState("Department");
  const [awardpoint, setawardpoint] = useState({
    ap_point_id: "",
  });

  const GetCompany = async () => {
    axios({
      method: "get",
      url: Configs.API_URL + "/company/all",
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        //console.log(response.data);
        setCompany(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    GetCompany();
    // GetUsertable();
    GetAwardPointList();
    GetGroupList();
  }, []);

  const GetUsertable = async () => {
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
      emp_name_th: filteruser.membership_name.trim(),
      department: filteruser.department,
    };
    console.log(row);
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/givepoint/getUsergroup",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetUsertable");
        response.data.sort((a, b) =>
          a.membership_number.localeCompare(b.membership_number)
        );

        for (let item of response.data) {
          var check = emp_select.filter((e) => {
            return e.id === item.id;
          });
          if (check.length > 0) {
            item.isPush = true;
          } else {
            item.isPush = false;
          }
        }

        setusertable(response.data);
        setMDBT(true);
        // GetPositionList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetUsertableGroup = async (id) => {
    console.log("groupid", id);
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
      group_id: id,
    };
    console.log(row);
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/givepoint/filtergroupemployee",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetUsertable");
        response.data.sort((a, b) =>
          a.membership_number.localeCompare(b.membership_number)
        );

        for (let item of response.data) {
          var check = emp_select.filter((e) => {
            return e.id === item.id;
          });
          if (check.length > 0) {
            item.isPush = true;
          } else {
            item.isPush = false;
          }
        }

        setusertable(response.data);
        setMDBT(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetUsertableDepartment = async (id) => {
    console.log("groupid", id);
    const id_list = [];
    const id_selected = [];

    if (id) {
      for (let index = 0; index < id.length; index++) {
        let as = {
          id: id[index].value,
          dep_name: id[index].label,
        };
        id_list.push(as);
        id_selected.push(as.id);
      }
      setDep_select(id_selected);
      console.log("id_list", id_list);
    } else {
      GetUsertable();
    }

    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
      department_id_list: id_list,
    };
    console.log(row);
    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/givepoint/filterdepartmentemployee",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetUsertable");
        response.data.sort((a, b) =>
          a.membership_number.localeCompare(b.membership_number)
        );

        for (let item of response.data) {
          var check = emp_select.filter((e) => {
            return e.id === item.id;
          });
          if (check.length > 0) {
            item.isPush = true;
          } else {
            item.isPush = false;
          }
        }
        setusertable(response.data);
        setMDBT(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetUsertableDepartmentAwardPoint = async (id) => {
    console.log("groupid", id);
    const id_list = [];
    const id_selected = [];

    if (id) {
      for (let index = 0; index < id.length; index++) {
        let as = {
          id: id[index].id,
          dep_name: id[index].dep_name,
        };
        id_list.push(as);
        id_selected.push(as.id);
      }
      setDep_select(id_selected);
      console.log("id_list", id_list);
    } else {
      GetUsertable();
    }

    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
      department_id_list: id_list,
    };
    console.log(row);
    axios({
      method: "post",
      url:
        Configs.API_URL_incentive + "/api/givepoint/filterdepartmentemployee",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetUsertable");
        response.data.sort((a, b) =>
          a.membership_number.localeCompare(b.membership_number)
        );

        for (let item of response.data) {
          var check = emp_select.filter((e) => {
            return e.id === item.id;
          });
          if (check.length > 0) {
            item.isPush = true;
          } else {
            item.isPush = false;
          }
        }
        setusertable(response.data);
        setMDBT(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetDepartmerntList = async (id) => {
    console.log("award_point_id", id);

    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
      award_point_id: id,
    };
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/givepoint/departmentList",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data, "GetPositionList");
        setdepartmentlist(response.data);
        console.log("list id", response.data[0])
        GetUsertableDepartmentAwardPoint(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetAwardPointList = async () => {
    console.log("company_id",getUser().com)
    console.log("company_id",getOem())
    let row = {
      company_id: getUser().com,
      oem_id: getOem(),
    };
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/awardPoint/getawardpointList",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        console.log(response.data);
        setawardpointlist(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const GetGroupList = async () => {
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/givepoint/getgrouplist",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("grouplist", response.data);
        setgrouplist(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function cancle_add_give_point(params) {
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
        window.location.href = "/Human_Resource/incentive_hr_admin/Give_Point";
      }
    });
  }

  const [SelectedId, SetSelectedId] = useState([]);
  function pushEmp(e) {
    console.log("e", e);
    const emp_select_temp = emp_select;
    var data = usertable.filter((element) => {
      return element.id === e.target.id;
    });
    console.log("after data");
    const emp_p = usertable;
    setusertable([]);
    for (let i of emp_p) {
      if (i.id === e.target.id) {
        i.isPush = true;
      }
    }
    setusertable(emp_p);
    console.log("after set1");
    var checked = emp_select_temp.filter((e2) => {
      return e2.id === data[0].id;
    });
    console.log(data[0]);
    if (checked.length > 0) {
      console.log("ซ้ำ");
    } else {
      emp_select_temp.push(data[0]);
    }
    console.log("push", emp_select_temp);
    setEmp_select([]);
    setEmp_select(emp_select_temp);
    console.log("after set2");

    // GetUsertable();
    settest({ ...test, test: "" });
    test.test = "";

    console.log("push", usertable);
    console.log("push", emp_select);
  }

  function removeEmp(e) {
    //console.log(e.target.id)
    setCount({ ...count, count: count.count - 1 });
    settest({ ...test, test: "" });
    test.test = "";
    count.count = count.count - 1;
    console.log(count.count);
    const emp_p = usertable;
    setusertable([]);
    for (let i of emp_p) {
      if (i.id === e.target.id) {
        i.isPush = false;
      }
    }
    console.log(emp_p);
    setusertable(emp_p);
    const emp_select_temp = emp_select;
    setEmp_select([]);
    let indexOf = emp_select_temp.findIndex(
      (element) => element.id === e.target.id
    );
    emp_select_temp.splice(indexOf, 1);
    setEmp_select(emp_select_temp);
    // GetUsertable();
    console.log("remove", usertable);
    console.log("remove", emp_select);

    settest({ ...test, test: "" });
    test.test = "";
    console.log("count remove", count);
    setdisable(false);
    //console.log(data[0]);
  }

  const [selectEmp, setselectEmp] = useState([]);
  function CheckSelect(id, index) {
    console.log("loggggggggggg", id);
    console.log("loggggggggggg", index);
    let Button = document.getElementById(index);
    if (Button.innerText == "No Select") {
      Button.className = "btn btn-block btn-success";
      Button.innerText = "Selected";
    } else {
      Button.className = "btn btn-block btn-danger";
      Button.innerText = "No Select";
    }

    let temp = [];
    selectEmp.push(id);
    setselectEmp(selectEmp);
    GetUsertable();
  }

  function saveOption(params) {
    
    Swal.fire({
      title: "คุณต้องการที่จะบันทึกหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: `No`,
    }).then((result) => {
      // const error_list = [];
      if (result.isConfirmed) {
        const error_list = alert_null();
        if (error_list.length > 0) {
          var err_message = "";
          for (var e = 0; e < error_list.length; e++) {
            err_message += "<br/>" + error_list[e].message;
          }
          Swal.fire("Error", err_message, "error");
        } else if(checkLimitSave() == true){
          Swal.fire("Error", "ไม่สามารถบันทึกได้ เนื่องจากเกิน Budget แล้ว", "error");
        }else {
          const temp = {
            award_point_id: give_point_data.gp_award_point_id.trim(),
            emp: emp_select,
            remark: give_point_data.gp_remark.trim() || "",
            point: check_budget_limit.Point,
            create_by: getUser().fup,
            update_by: getUser().fup,
          };
          console.log(temp);
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
              url: Configs.API_URL_incentive + "/api/givepoint/addgivepoint",
              headers: {
                Authorization: "Bearer " + getToken(),
                "X-TTT": Configs.API_TTT,
                "Content-Type": "application/json",
              },
              data: temp,
            })
              .then(function (response) {
                if (response.data) {
                  Swal.fire({
                    icon: "success",
                    text: "เสร็จสิ้น",
                    showConfirmButton: false,
                    timer: 1500,
                  }).then((result) => {
                    window.location.href =
                      "/Human_Resource/incentive_hr_admin/Give_Point";
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
                Swal.fire(
                  "Error",
                  "เกิดข้อผิดพลาด: " + error.response.data.error[0].errorDis,
                  "error"
                );
              });
          });
        }
      }
    });
  }
  function alert_null() {
    var error_list = [];
    if (give_point_data.gp_award_point_id.trim() == "") {
      let temp_err = {
        message: "กรุณาเลือก award point",
      };
      error_list.push(temp_err);
      // setgroup_name_null(true);
    }
    if (emp_select.length == 0) {
      let temp_err = {
        message: "กรุณาเลือก Employee",
      };
      error_list.push(temp_err);
    }
    return error_list;
  }
  const row_data = [];
  for (let index = 0; index < usertable.length; index++) {
    const element = {};
    element["no"] = index + 1;
    element["id"] = usertable[index].id;
    element["name"] = usertable[index].membership_name;
    element["department"] = usertable[index].department;
    element["mgt"] = (
      <>
        <div className="row">
          {usertable[index].isPush === true ? (
            <>
              <div className="col-12">
                <button
                  type="button"
                  id={usertable[index].id}
                  onClick={removeEmp.bind(this)}
                  class="btn btn-block btn-success "
                >
                  Selected
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-12">
                <button
                  type="button"
                  id={usertable[index].id}
                  disabled={disable}
                  onClick={
                    CheckBudgetLimit.bind(this)
                    // pushEmp.bind(this)
                  }
                  class="btn btn-block btn-danger "
                >
                  No Select
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );

    row_data.push(element);
  }
  // console.log(selectEmp.length);
  const data = {
    columns: [
      {
        label: "No",
        field: "no",
        sort: "asc",
        width: 50,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 50,
      },
      {
        label: "Department",
        field: "department",
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
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const onOptionChange = (e) => {
    setSelectmode(e.target.value);
  };
  const [value, setvalue] = useState("");
  // const handleChange = (val) => setvalue(val);
  const nodes = [];
  for (let index = 0; index < departmentlist.length; index++) {
    nodes.push({
      value: departmentlist[index].id,
      label: departmentlist[index].dep_name,
    });
  }
  const selected = [];
  const [userChoice, setUserChoice] = useState("");
  const [tmpselect, settmpselect] = useState([]);
  const handleChange = (selected) => {
    let result = [];
    console.log("selected",selected);
    if(selected == null){
      GetUsertableDepartmentAwardPoint(departmentlist)
    }else{
      GetUsertableDepartment(selected);
    }
    
  };

  async function handleCheckChange(e) {
    const emp_p = usertable;
    setusertable([]);
    const emp_select_temp = emp_select;
    if (e.target.checked) {
      var data = usertable.filter((element) => {
        return element.id;
      });
      console.log("data (id)", data);
      for (let i of emp_p) {
        i.isPush = true;
      }
      console.log("push", emp_p);
      setusertable(emp_p);
      console.log("push", usertable);
      for (let index = 0; index < data.length; index++) {
        emp_select_temp.push(data[index]);
      }
      setEmp_select([]);
      setEmp_select(emp_select_temp);
      settest({ ...test, test: "" });
      test.test = "";
      console.log("push", usertable);
      console.log("push", emp_select);
      console.log("push", emp_select.length);
    } else {
      for (let i of emp_p) {
        i.isPush = false;
      }
      console.log(emp_p);
      setusertable(emp_p);
      // const emp_select_temp = emp_select;
      setEmp_select([]);
      // let indexOf = emp_select_temp.findIndex(
      //   (element) => element.id === e.target.id
      // );
      // emp_select_temp.splice(indexOf, 1);
      // setEmp_select(emp_select_temp);
      console.log("remove", usertable);
      console.log("remove", emp_select);
      settest({ ...test, test: "" });
      test.test = "";
      console.log("remove", emp_select.length);

      settest({ ...test, test: "" });
      test.test = "";
    }
  }

  const [check_budget_limit, setcheck_budget_limit] = useState("");
  const [budget_over_limit, setbudget_over_limit] = useState(false);
  const [temp_count, settemp_count] = useState([]);
  const temp = [];
  function CheckBudgetLimit(e) {
    console.log(count.count);
    setCount({ ...count, count: count.count + 1 });
    settest({ ...test, test: "" });
    test.test = "";
    count.count = count.count + 1;
    console.log(count.count);
    console.log("temp", temp_count);
    console.log("temp_count", temp_count.length);
    console.log(
      "give_point_data.gp_award_point_id",
      give_point_data.gp_award_point_id
    );
    let row = {
      company_id: getUser().com,
      ap_id: give_point_data.gp_award_point_id,
    };
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/givepoint/checkbudgetlimit",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        setcheck_budget_limit(response.data);
        settest({ ...test, test: "" });
        test.test = "";
      })
      .catch(function (error) {
        console.log(error);
      });
    if (
      count.count * check_budget_limit.Point + check_budget_limit.Total_point >
        check_budget_limit.Budget ||
      check_budget_limit.Total_point > check_budget_limit.Budget
    ) {
      setCount({ ...count, count: count.count - 1 });
      count.count = count.count - 1;
      settest({ ...test, test: "" });
      test.test = "";
      Swal.fire("Error", "กรุณาทำการเลือกใหม่ เนื่องจากเกิน Budget แล้ว", "error");
    } else {
      if (e) {
        pushEmp(e);
      }
    }
  }

  function checkLimitSave(){
    let row = {
      company_id: getUser().com,
      ap_id: give_point_data.gp_award_point_id,
    };
    axios({
      method: "post",
      url: Configs.API_URL_incentive + "/api/givepoint/checkbudgetlimit",
      headers: {
        Authorization: "Bearer " + getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: row,
    })
      .then(function (response) {
        setcheck_budget_limit(response.data);
        settest({ ...test, test: "" });
        test.test = "";
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log("emp_select.length",emp_select.length)
      if((emp_select.length * check_budget_limit.Point) + check_budget_limit.Total_point > check_budget_limit.Budget){
        return true
      }else{
        return false
      }
  }

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Give Point</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Human Resource</li>
                  <li className="breadcrumb-item active">
                    {/* <a href="/Human_Resource/incentive_hr_admin/thank_point"> */}
                    Give Point
                    {/* </a> */}
                  </li>
                  {/* <li className="breadcrumb-item active">{pageMode}</li> */}
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
                    // onClick={cancle_add_thank_point}
                    className="btn btn-block btn-danger "
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
                    onClick={saveOption}
                    className="btn btn-block btn-success"
                    id="btn-save"
                  >
                    Save
                  </button>
                </div>
                <div className="col-6 col-md-3 col-xl-1">
                  <button
                    type="button"
                    onClick={cancle_add_give_point}
                    className="btn btn-block btn-danger"
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
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-xl-12">
                  <div className="row">
                    <div className="form-group col-12 col-md-8 col-xl-8">
                      <select
                        className="form-control custom-select select2"
                        type="text"
                        required
                        id="award_point"
                        value={awardpointlist.ap_id}
                        // disabled={disable}
                        onChange={(e) => {
                          setgive_point_data({
                            ...give_point_data,
                            gp_award_point_id: e.target.value,
                          });
                          give_point_data.gp_award_point_id = e.target.value;
                          settest({ ...test, test: "" });
                          test.test = "";
                          GetDepartmerntList(e.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          ----Select----
                        </option>
                        {awardpointlist.map((el) => {
                          return (
                            <option value={el.ap_id}>{el.ap_point_name}</option>
                          );
                        })}
                      </select>
                      <label>
                        Select Award Point
                        <span style={{ color: "red" }}>*</span>
                      </label>{" "}
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="">
                      Choose type<span style={{ color: "red" }}>*</span>:{" "}
                    </label>
                    <div className="col-12 col-md-12 col-xl-8">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className=""
                          name="choose_type"
                          id="Department"
                          required
                          // disabled={disable}
                          value="Department"
                          checked={Selectmode === "Department"}
                          onChange={onOptionChange}
                        />
                        <label htmlFor="">
                          &nbsp;&nbsp;Department&nbsp;&nbsp;{" "}
                        </label>{" "}
                        <input
                          type="radio"
                          className=""
                          name="choose_type"
                          id="Group"
                          required
                          // disabled={disable}
                          value="Group"
                          checked={Selectmode === "Group"}
                          onChange={onOptionChange}
                        />
                        <label htmlFor="">&nbsp;&nbsp;Group</label>
                      </div>
                    </div>
                  </div>

                  {Selectmode == "Department" ? (
                    <div className="row">
                      <div className="col-12 col-md-10 col-xl-8">
                        <div className="form-group" style={{ zIndex: "99" }}>
                          <div>
                            <Select
                              // defaultValue={defaultselected}
                              // value={defaultselected}
                              isMulti
                              name="colors"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              id="departmentlist"
                              onChange={handleChange}
                              options={nodes}
                            />
                            <label>
                              Select Department
                              <span style={{ color: "red" }}>*</span>
                            </label>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-12 col-md-12 col-xl-8">
                        <div className="form-group ">
                          <select
                            className="form-control custom-select select2"
                            type="text"
                            required
                            id="grouplist"
                            value={grouplist.mg_id}
                            // disabled={disable}
                            onChange={(e) => {
                              setfilteruser({
                                ...filteruser,
                                group: e.target.value,
                              });
                              GetUsertableGroup(e.target.value);
                            }}
                          >
                            <option value="" disabled selected>
                              ----Select----
                            </option>
                            {grouplist.map((el) => {
                              return (
                                <option value={el.mg_id}>
                                  {el.mg_group_name}
                                </option>
                              );
                            })}
                          </select>
                          <label>
                            Select Group<span style={{ color: "red" }}>*</span>
                          </label>{" "}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row mb-12 col-12 col-md-12 col-xl-8">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required
                        id="award_point_id"
                        // value={award_point.ap_point_id}
                        // placeholder="ตัวอย่าง สมศรี เรืองศักดา,Somsri Ruangsakda"
                        // disabled={disable}
                        onChange={(e) => {
                          setgive_point_data({
                            ...give_point_data,
                            gp_remark: e.target.value,
                          });
                        }}
                      />
                      <label>Remark</label>
                    </div>
                  </div>
                  <div className="row mb-4 col-12 col-md-12 col-xl-8">
                    <div>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          handleCheckChange(e);
                        }}
                      ></input>
                      <label>&nbsp;&nbsp; Select All</label>
                      {/* {catalog} */}
                    </div>
                  </div>
                </div>
                <div className="row col-md-12 col-xl-8">
                  <div className="form-group"></div>
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
                      // style={{"z-index":"1000"}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer"></div>
        </section>
      </div>
    </div>
  );
}

export default GivePointAdd;
