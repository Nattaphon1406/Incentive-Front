import React, { useState, useEffect } from "react";

import "../assets/css/Content.css";
import "../assets/css/LandingPage.css";
import Oem from "../component/OEM";
import CustomerService from "../component/CustomerService";
import { getUser, getToken,setOemlist,setOemlist_ ,getOem,removeUserSession,removeOem } from "../Utils/Common";
import Configs from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { logoTTT } from "../routes/imgRoute/imgUrl";

import {
  Icon_factory,
  factory,
  userdefault_img,
  Icon_contact,
  Icon_Choose,
} from "../routes/imgRoute/imgUrl";
function Langingpage(params) {
  const [user, setUser] = useState(getUser());
  const [user_detail, setUser_detail] = useState({});
  const [company, setCompany] = useState({});
  const [oem, setOem] = useState([]);

  const [user_oem, setUser_oem] = useState([]);
  var config_user = {
    method: "get",
    url: Configs.API_URL + "/company/findUserById?id=" + user.fup,
    headers: {
      Authorization: getToken(),
      'X-TTT': Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

  var config_com = {
    method: "get",
    url: Configs.API_URL + "/company/findById?id=" + user.com,
    headers: {
      Authorization: getToken(),
      'X-TTT': Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

  var permission_oem = {
    method: "get",
    url: Configs.API_URL + "/company/viewOemByUserId",
    headers: {
      Authorization: getToken(),
      'X-TTT': Configs.API_TTT,
      "Content-Type": "application/json",
    },
  };

   var config_oem = {
    method: "get",
    url: Configs.API_URL + "/company/findOEMByCompanyId?id=" + user.com,
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
  };
  
  useEffect(() => {
    var balance_day = getUser().balance_time;
    if(balance_day < 0){
      Swal.fire({
        title: 'แจ้งเตือน',
        text: "หมดอายุการใช้งาน",
        imageUrl: logoTTT.imgs,
        imageWidth: 50,
        imageHeight: 50,
        imageAlt: 'Custom image',
      }).then((result) => {
      removeUserSession();
      removeOem();
      window.location.href = "/login";
      })
    }
    axios(config_user)
      .then(function (response) {
        setUser_detail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(config_com)
      .then(function (response) {
        const data = response.data;
        setCompany(data);
        data.oem.sort((a,b)=>a.sort - b.sort);
        setOem(data.oem);
      
        
      })
      .catch(function (error) {
        console.log(error);
      });

      axios(permission_oem)
      .then(function (response) {
        //console.log(response.data);
        setUser_oem(response.data)
        if(response.data.length === 1){
          
          setOemlist(response.data[0].oem_id);
          
        //  href="/";
             //button.form.submit();

        }
    
      })
      .catch(function (error) {
        console.log(error);
      });
    /*  axios(config_oem)
      .then(function (response) {
        console.log(oem)
        setOem(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
 */
/* console.log(getOem()); */

  }, []);
//console.log(company.company_name)
if(user_oem.length ===  1 && company.company_name !== undefined && company.company_name === "ธนาทรัพย์ ค้าไม้"){
    window.location.href="/Warehouse_Management/F_G_In_Out";
}
/* if(user_oem.length ===  1 && getOem() === null && getOem() ===  "480479b6-dcd3-4a4f-89a7-95c5e8f275bc"){
  window.location.href="/Warehouse_Management/F_G_In_Out";
} */

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                Welcome {user.sub}
               {/* {user_detail.name}  Khun Teewin*/}
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/Welcome">Home</a>
                </li>
                <li className="breadcrumb-item active">OEM</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {/* Profile Image */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title blank-space">About us</h3>{" "}
                  <img
                    alt="..."
                    className="img-fluid img-icon "
                    src={Icon_factory.imgs}
                  />
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <img
                    alt="..."
                    className="img-fluid about-img"
                    src={company.logo_path !== null &&
                      company.logo_path !== "" &&
                      company.logo_path !== undefined ?Configs.API_URL_IMG + company.logo_path :userdefault_img.imgs}
                  />

                  <p>
                    {/*  บริษัทที่ให้บริการด้านไอที โซลูชั่น
                      แนะนำแนวทางการประยุกต์ใช้ระบบสารสนเทศเพื่อการบริหารจัดการ
                      และการฝึกอบรม เน้นการพัฒนากระบวนการแบบก้าวกระโดด
                      เพิ่มประสิทธิภาพการทำงาน
                      ลดระยะเวลาการดำเนินการอย่างมีนัยสำคัญ รวมทั้งแก้ปัญหา
                      Human error
                      เพื่อให้ธุรกิจของลูกค้าทุกท่านบรรลุเป้าหมายอย่างรวดเร็ว
                      และมั่นคงแข็งแรงยั่งยืน */}
                    {company.company_detail}
                  </p>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* About Me Box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title blank-space">
                    Contact us {"    "}
                  </h3>{" "}
                  <img
                    alt="..."
                    className="img-fluid img-icon"
                    src={Icon_contact.imgs}
                  />
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <p>
                    บริษัท ทีทีที บราเธอร์ส จำกัด 852/8 ถนนหลวงแพ่ง แขวงทับยาว
                    เขตลาดกระบัง กรุงเทพฯ 10520 (สำนักงานใหญ่)
                  </p>
                  
                  <CustomerService/>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
            <div className="col-md-8">
              <div className="card">
                <div className="card-header ">
                  <h3 className="card-title blank-space">
                    Please Select OEM {"    "}
                  </h3>{" "}
                  <img
                    alt="..."
                    className="img-fluid img-icon"
                    src={Icon_Choose.imgs}
                  />
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content">
                    <div className="row">
                       
                          
               
                             {oem.map((b)=>{
                            return (
                            
                              <>
                          
                      {user_oem.map((a)=>{
                                if(a.oem_id === b.id){
                                  //console.log(b)
                                  return(
                                    <div className="col-12 col-md-6 col-xl-4">
                             <div key={b.id}>
                                 <a href="/" onClick={()=>{setOemlist(b.id); setOemlist_(b.name);}}>
                                   
                                <Oem  oem={b} />
                               </a>
                              </div> 
                              </div> 
                                  );
                                }
                              })}
                                
                              </>
                            
                              );
                        
                      })}
                    
                    {/* { oem.map((el) => { 
                      //console.log(oem);
                      return (
                    <div key={el.id}>
                       <a href="/" onClick={()=>{setOemlist(el.id)}}>
                         
                      <Oem  oem={el} />
                     </a>
                    </div> 
                    ); }) } */}
                    
                    </div>
                  </div>
                  {/* /.tab-content */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.nav-tabs-custom */}
            </div>
            {/* /.col */}
          </div>

          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}
export default Langingpage;
