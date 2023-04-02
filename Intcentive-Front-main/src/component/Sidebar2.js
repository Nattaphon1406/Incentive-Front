import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect ,Route ,useLocation} from "react-router-dom";
import "../assets/css/Sidebar.css";
import { getUser, getToken, setOemlist,getOemlist_, getOem ,getCurrentPath,setMenu,setFeature,getComConfig} from "../Utils/Common";
import {
  logo_smz,
  logo_kubota,
  down_menulogoTTT_02,
  LogoPMRP_TTT_08,

  Icon_Materailplaning,
  Icon_productionplanning,
  Icon_warehousemanage,
  Icon_deliveryaddon,
  Icon_quality_control,
  menu_bt_blank,
  Icon_costmonitoring,
  userdefault_img,
} from "../routes/imgRoute/imgUrl";
import Configs from "../config";
import axios from "axios";
import { setUserSession, getRememberme, setComConfig } from "../Utils/Common";
import { nullFormat } from "numeral";
const prod_icon = "far fa-calendar-check nav-icon";
const mate_icon = "fas fa-pen-square nav-icon";
const ware_icon = "fas fa-industry nav-icon";
const qc_icon = "fas far fa-check-circle nav-icon";

function Sidebar() {

  //console.log(getCurrentPath());
  const [params, setparams] = useState({menu:'', activemenu:'', submenu:''})
  const [fixwarehousemenu, setFixwarehousemenu] = useState("");
  const [fixppmenu, setFixppmenu] = useState("");
  const [fixmrpmenu, setFixmrpmenu] = useState("");
  const [fixsnhmenu, setFixsnhmenu] = useState("");
  const [fixqcmenu, setFixqcmenu] = useState("");
  const [fixppapprove, setFixppapprove] = useState("");
  const [fixppuof, setFixppuof] = useState("");
  const [fixmrpapprove, setFixmrpapprove] = useState("");
  const [fixosl, setfixosl] = useState("");
  const [fixmrparm, setFixmrparm] = useState("");
  const [matactive, setMatactive] = useState("");
  const [pro_group, setpro_group] = useState("");
  const [suppmenu, setsuppmenu] = useState("");
  const [pro_line, setpro_line] = useState("");

  const [wipinout, setWipinout] = useState("");
  const [history, setHistory] = useState("");
  const [fginout, setFginout] = useState("");
  const [rawmatinout, setRawmatinout] = useState("");
  const [cuttinginout, setCuttinginout] = useState("");
  const [fixsubmenu, setFixsubmenu] = useState("");
  const [productactive, setProductactive] = useState("");
  const [snhdr, setSnhdr] = useState("");
  const [snhmc, setSnhmc] = useState("");
  const [qcqc, setQCc] = useState("");
  const [qcqi, setQCqi] = useState("");
  const [qclm, setQClm] = useState("");
  const [qcmt, setQCmt] = useState("");
  const [oem, setOem] = useState(getOem());
  const [oem_data, setOem_data] = useState([]);
  const [company, setcompany] = useState();

  const [menu, setMenu] = useState([]);
  const [menuL1, setMenuL1] = useState([]);
  const [menuL2, setMenuL2] = useState([]);
  const [menuL3, setMenuL3] = useState([]);
  const location = useLocation();
 /*  const [current, setcurrent] = useState(getCurrentPath()); */
  const [current_menuL1, setCurrent_MenuL1] = useState(location.pathname.split("/")[1]/* ===null?getCurrentPath().split("/")[1]:"" */);
  const [current_menuL2, setCurrent_MenuL2] = useState(location.pathname.split("/")[2]/* ===null?getCurrentPath().split("/")[1]:"" */);
  const [current_menuL3, setCurrent_MenuL3] = useState(location.pathname.split("/")[3]/* ===null?getCurrentPath().split("/")[1]:"" */);
  
  function GetMenu(params) {
   
    axios({
      method: "get",
      url: Configs.API_URL + "/permission/getMenuByUserID?user_id="+getUser().fup,
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        //console.log(response.data);
        const menu_temp = [];
        for (let index = 0; index < response.data.length; index++) {
          let element = {};
          element["created_by"] = response.data[index].created_by;
          element["created_date"] = response.data[index].created_date;
          element["id"] = response.data[index].id;
          element["is_use"] = response.data[index].is_use;
          element["level"] = response.data[index].level;
          element["name"] = response.data[index].name;
          element["display_name"] = response.data[index].display_name;
          element["parent_id"] = response.data[index].parent_id;
          element["path"] = response.data[index].path;
          element["sort"] = response.data[index].sort;
          element["update_by"] = response.data[index].update_by;
          element["update_date"] = response.data[index].update_date;
          element["icon"] = response.data[index].icon;
          element["image_name"] = response.data[index].image_name;
          element["image_path"] = response.data[index].image_path;
          element["is_image"] = response.data[index].is_image;
          element["academy"] = response.data[index].academy || "http://pmrp-academy.com/academy";


          element["has_child"] = fine_child3(
            response.data[index].id,
            response.data
          );
          menu_temp.push(element);
        }
        const l1 = menu_temp.filter((data) => {
          if (data.level === 1) {
            return data;
          }
        });

        const l2 = menu_temp.filter((data) => {
          if (data.level === 2) {
            return data;
          }
        });

        const l3 = menu_temp.filter((data) => {
          if (data.level === 3) {
            return data;
          }
        });

        if(getOemlist_() === "Komatsu" && getComConfig().com_name === "SHIMIZU Manufacturing Co., Ltd."){
          
     /*      var indexK = l2.findIndex((e1)=>  e1.name === "Raw Mat IN/OUT");
          console.log(l2[indexK].name)
          l2.splice(indexK,1); */
          var indexK2 = l3.findIndex((e3)=>  e3.name === "Raw Material");
          console.log(l3[indexK2].name)
          l3.splice(indexK2,1);
        }
        if(getOemlist_() === "KPTT ( Japan, America )" && getComConfig().com_name === "Central Spring co., Ltd."){
          
          /*      var indexK = l2.findIndex((e1)=>  e1.name === "Raw Mat IN/OUT");
               console.log(l2[indexK].name)
               l2.splice(indexK,1); */
               var indexK2 = l3.findIndex((e3)=>  e3.name === "Raw Material");
               console.log(l3[indexK2].name)
               l3.splice(indexK2,1);
             }
        if(getOemlist_() !== "บจก.เอสทีสตีล(2001) ปัตตานี"){
          //console.log("no pattani")
          var check1 = l2.filter((e1)=> {return e1.name === "RawMatSTP_InOut"});
          if(check1.length > 0){
            var index1 = l2.findIndex((e1)=>  e1.name === "RawMatSTP_InOut");
            l2.splice(index1,1);
          }
          var check2 = l2.filter((e2)=> {return e2.name === "FG STP IN/OUT"});
          if(check2.length > 0){
            var index2 = l2.findIndex((e2)=>  e2.name === "FG STP IN/OUT");
            l2.splice(index2,1);
          }
          var check3 = l2.filter((e3)=> {return e3.name === "Deflux & WIP IN/OUT"});
          if(check3.length > 0){
            var index3 = l2.findIndex((e3)=>  e3.name === "Deflux & WIP IN/OUT");
            l2.splice(index3,1);
          }
        }else{
          var check1 = l2.filter((e1)=> {return e1.name === "Raw Mat IN/OUT"});
          if(check1.length > 0){
            var index1 = l2.findIndex((e1)=>  e1.name === "Raw Mat IN/OUT");
            l2.splice(index1,1);
          }
          var check2 = l2.filter((e2)=> {return e2.name === "F/G IN/OUT"});
          if(check2.length > 0){
            var index2 = l2.findIndex((e2)=>  e2.name === "F/G IN/OUT");
            l2.splice(index2,1);
          }
        
        }
        setMenuL1(l1);
        setMenuL2(l2);
        setMenuL3(l3);
        //console.log(l1);
       // console.log(l2);
        //console.log(l3);
        setMenu(menu_temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  var permission_oem = {
    method: "get",
    url: Configs.API_URL + "/company/viewOemByUserId",
    headers: {
      Authorization: getToken(),
      'X-TTT': Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    GetMenu();
    axios(permission_oem)
    .then(function (response) {
      //console.log(response.data);
     
      if(response.data.length === 1){
        setOem(response.data[0].oem_id);
        axios(config_getOem)
        .then(function (response2) {
          //console.log(response.data)
          response2.data.map((el) => {
            if (el.id === response.data[0].oem_id) {
              return setOem_data(el);
        
            }
          });
        })

        .catch(function (error) {
          console.log(error);
        });
 
      //  setOemlist(response.data[0].oem_id)
      }
  
    })
    .catch(function (error) {
      console.log(error);
    });
    axios({
      method: "get",
      url: Configs.API_URL + "/permission/getFeatureByUserID?user_id="+getUser().fup,
      headers: {
        Authorization: getToken(),
        "X-TTT": Configs.API_TTT,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        //console.log(response.data)
        setFeature(response.data)
       
      }).catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = `js/Product`;
    document.body.appendChild(script);

    if (params.menu === "warehouse") {
      setFixwarehousemenu("menu-open");

      if (params.submenu === "factmaster") {
        setFixsubmenu("menu-open");

        if (params.activemenu === "product") {
          setProductactive("active");
        } else if (params.activemenu === "materail") {
          setMatactive("active");
        } else if (params.activemenu === "pro_group") {
          setpro_group("active");
        } else if (params.activemenu === "suppmenu") {
          setsuppmenu("active");
        } else if (params.activemenu === "pro_line") {
          setpro_line("active");
        }
      } else if (params.activemenu === "cuttinginout") {
        setCuttinginout("active");
      } else if (params.activemenu === "wipinout") {
        setWipinout("active");
      } else if (params.activemenu === "history") {
        setHistory("active");
      } else if (params.activemenu === "fginout") {
        setFginout("active");
      } else if (params.activemenu === "rawmatinout") {
        setRawmatinout("active");
      }
    } else if (params.menu === "pp") {
      setFixppmenu("menu-open");

      if (params.activemenu === "approve") {
        setFixppapprove("active");
      } else if (params.activemenu === "uof") {
        setFixppuof("active");
      } else if (params.activemenu === "osl") {
        setfixosl("active");
      }
    } else if (params.menu === "mrp") {
      setFixmrpmenu("menu-open");
      if (params.activemenu === "ami") {
        setFixmrpapprove("active");
      } else if (params.activemenu === "arm") {
        setFixmrparm("active");
      }
    } else if (params.menu === "snh") {
      setFixsnhmenu("menu-open");

      if (params.activemenu === "dr") {
        setSnhdr("active");
      } else if (params.activemenu === "mc") {
        setSnhmc("active");
      }
    } else if (params.menu === "qc") {
      setFixqcmenu("menu-open");
      if (params.activemenu === "lm") {
        setQClm("active");
      } else if (params.activemenu === "mt") {
        setQCmt("active");
      } else if (params.activemenu === "qcm") {
        setQCc("active");
      } else if (params.activemenu === "qiai") {
        setQCqi("active");
      }
    }
  }, []);

  var config_getOem = {
    method: "get",
    url: Configs.API_URL + "/company/findOEMByCompanyId?id=" + getUser().com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
      "X-TTT": Configs.API_TTT,
    },
  };

  useEffect(() => {
    //console.log(oem)
    if (oem !== undefined && oem !== null && oem !== "") {
      axios(config_getOem)
        .then(function (response) {
          //console.log(response.data)
          response.data.map((el) => {
            if (el.id === oem) {
              return setOem_data(el);
        
            }
          });
        })

        .catch(function (error) {
          console.log(error);
        });
    }


  }, []);

  var config_com = {
    method: "get",
    url: Configs.API_URL + "/company/findById?id=" + getUser().com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
      "X-TTT": Configs.API_TTT,
    },
  };
  useEffect(() => {
    axios(config_com)
      .then(function (response) {
        //console.log(response.data);
        setcompany(response.data);

        setComConfig(JSON.stringify(response.data.config));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function fine_child3(menu_parent_id, menu_child) {
    /* console.log(menuId); */
    const temp = menu_child.filter((data) => {
      if (data.parent_id === menu_parent_id) {
        return data;
      }
    });
    //console.log(temp)
    /* console.log("fine menu 3 =" + temp.length); */
    if (temp.length < 1) {
      return false;
    } else {
      return true;
    }
  }
  if (oem) {
    return (
     
        <aside className="main-sidebar sidebar-dark-primary elevation-4 set-bg">
          {/* Brand Logo */}
          <a
            href="/Welcome"
            className="brand-link"
            style={{
              backgroundImage: "url(" + LogoPMRP_TTT_08.imgs + ")",
            }}
          >
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ visibility: "hidden" }}
            />
            <span
              style={{ visibility: "hidden" }}
              className="brand-text font-weight-light"
            >
              TTTTTT
            </span>
          </a>

          <a
            href="/Welcome"
            className="brand-link"
            style={{ textAlign: "center" }}
          >
            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                company !== undefined && company !== null && company !== ""
                  ? Configs.API_URL_IMG + company.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px", height: "75px" }}
            />
             <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                oem_data !== undefined && oem_data !== null && oem_data !== ""
                  ? Configs.API_URL_IMG + oem_data.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px" , height:"75px" }}
            />
          {/*   <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                oem_data !== undefined && oem_data !== null && oem_data !== ""
                  ? Configs.API_URL_IMG + oem_data.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px", height: "75px" }}
            /> */}
          </a>
          {/* Sidebar */}
          <div
            className="sidebar sidebar-font"
            style={{ marginBottom: "35px" }}
          >
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/*  loop Lv1 */}
                {menuL1.map((el, i) => {
                  var icon;
                  if(el.name === "Dashboard"){
                    icon = Icon_costmonitoring.imgs;
                  }else if(el.name === "Production Planing"){
                    icon = Icon_productionplanning.imgs;
                  }else if(el.name === "Material Requirement Planning"){
                    icon = Icon_Materailplaning.imgs;
                  }else if(el.name === "Warehouse Management"){
                    icon = Icon_warehousemanage.imgs;
                  }else if(el.name === "Statistic & History"){
                    icon = Icon_deliveryaddon.imgs;
                  }else if(el.name === "Quanlity Control"){
                    icon = Icon_quality_control.imgs;
                  }else if(el.name === "Human Resource"){
                    icon = Icon_Materailplaning.imgs;
                  }else if(el.name === "Accounting"){
                    icon = Icon_Materailplaning.imgs;
                  }
                  return (
                   
                    <li
                    
                      className= {current_menuL1 === el.path ? "nav-item has-treeview menu-open":"nav-item has-treeview"}/* {"nav-item has-treeview"} */
                      key={el.id}
                    >
                      {/* {el.has_child ? (
                        
                      )} */}
                      <a
                      //onClick={setMenu(el.id)}
                      href={"/"+ el.path}
                      
                        className="nav-link ttt-menu-bg"
                        style={{
                          backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                        }}
                      >
                        {el.is_image === true ? (
                          <>
                           <span className="nav-icon fas " >
                          
                          <img
                            alt="..."
                            className="img-fluid rounded img-size-50 mr-3"
                            src={
                              el.image_name !== null
                                ? Configs.API_URL_IMG + el.image_path
                                : el.image_path
                            }
                            //src={icon || el.image_path}
                           
                          />
                        </span>
                          </>
                        ) : (
                          <><i className={el.icon} /></>
                        )}
                        
                       
                        <p>
                          {el.display_name}
                          {el.has_child && (
                            <i className="right fas fa-angle-left" />
                          )}
                        </p>
                      </a>
                      { el.has_child && <ul className="nav nav-treeview  ">
                        {menuL2.map((el2, i) => {
                          if (el2.parent_id === el.id) {
                 
                            if(el2.name === "Approve Raw Material for PO"){
                             // console.log(el2)
                            }
                            return (
                              <li className={current_menuL2 === el2.path ? "nav-item menu-open":"nav-item"}  key={el2.id}>
                                
                                <a
                                  href={"/" + el.path + "/" + el2.path}
                                  onClick={()=>{sessionStorage.setItem('academyLink',el2.academy);}}
                                  className={!el2.has_child && current_menuL2 === el2.path ? "nav-link active":"nav-link "}
                                >
                                
                                  <i className={el2.icon} />
                                  <p>{el2.display_name}</p>
                                  {el2.has_child && (
                                    <i className="right fas fa-angle-left" />
                                  )}
                                </a>
                                { el2.has_child && <ul className="nav nav-treeview">
                        {menuL3.map((el3, i) => {
                          if (el3.parent_id === el2.id) {
                            return (
                              <li className="nav-item sub2-menu" key={el3.id}>
                                <a
                                  href={"/" + el.path + "/" + el2.path+ "/" + el3.path}
                                  onClick={()=>{sessionStorage.setItem('academyLink',el3.academy);}}
                                  className={current_menuL3 === el3.path ? "nav-link active":"nav-link "}
                                >
                                  <span className="spacing"> </span>
                                  <i className={el3.icon} />
                                  <p>{el3.display_name}</p>
                                  {el3.has_child && (
                                    <i className="right fas fa-angle-left" />
                                  )}
                                </a>
                                
                              </li>
                            );
                          }
                        })}
                      </ul> } 
                                    
                                
                              </li>
                            );
                          }
                        })}
                      </ul> } 
                    </li>
                  );
                })}

               
                
                
                
              </ul>
            </nav>
          </div>

          <img
            alt="..."
            className="img-fluid botton-img"
            src={down_menulogoTTT_02.imgs}
          />
        </aside>
      
    );
  } else {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4 set-bg">
          {/* Brand Logo */}
          <a
            href="/Welcome"
            className="brand-link"
            style={{
              backgroundImage: "url(" + LogoPMRP_TTT_08.imgs + ")",
            }}
          >
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ visibility: "hidden" }}
            />
            <span
              style={{ visibility: "hidden" }}
              className="brand-text font-weight-light"
            >
              TTTTTT
            </span>
          </a>

          <a
            href="/Welcome"
            className="brand-link"
            style={{ textAlign: "center" }}
          >
            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                company !== undefined && company !== null && company !== ""
                  ? Configs.API_URL_IMG + company.logo_path
                  : userdefault_img.imgs
              }
              style={{ width: "80px", height: "75px" }}
            />

            <img
              alt="..."
              className="img-fluid rounded img-size-50 mr-3"
              src={
                oem_data !== undefined && oem_data !== null && oem_data !== ""
                  ? userdefault_img.imgs
                  : Configs.API_URL_IMG + oem_data.logo_path
              }
              style={{ width: "80px", height: "75px" }}
            />
          </a>
          {/* Sidebar */}
          <div className="sidebar sidebar-font">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item has-treeview">
                  <a
                    href="/"
                    className="nav-link ttt-menu-bg"
                    style={{
                      backgroundImage: "url(" + menu_bt_blank.imgs + ")",
                    }}
                  >
                    <span className="nav-icon fas "></span>
                    <p>Please Select OEM</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
            <img
              alt="..."
              className="img-fluid botton-img"
              src={down_menulogoTTT_02.imgs}
            />
          </div>

          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
export default Sidebar;
