
/* import React, { useState, useEffect } from "react";
import "../../assets/css/Oem.css";

import Configs from "../../config"; */
import React, { Component, useEffect, useState } from "react";
import Footter from "../../component/Footter";
import Header from "../../component/Header";
import sortJsonArray from "sort-json-array";
import Sidebar from "../../component/Sidebar";
import jsPDF from "jspdf";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import { Get_font_pdf_th, Get_font_pdf_th2 } from "../../assets/font/pdf_font";
import Configs from "../../config";
import { getOem, getToken, getUser, getFeature, getComConfig } from "../../Utils/Common";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";
import { ValueService } from "ag-grid-community";
//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function Wire_mace_STP(company,addressOEM,oem,Oemlist,date,data,fg,stp,hr_data,cus_,end_,def_stp) {
 
    console.log(hr_data)
        var personal_leave = ""
        var sick_leave = ""
        var day_shift = ""
        var night_shift = ""
        var all_employee = ""
    for(let hr of hr_data){
       

        if(hr.oem_id === "STP รวม" ){
       
          personal_leave =hr.personal_leave || "-"
          sick_leave = hr.sick_leave || "-"
          day_shift = hr.day_shift || "-"
          night_shift = hr.night_shift || "-"
          all_employee = hr.all_employee || "-"
        }
      
      }


var  fg_data = []
var a = 0
var a = 0
for (let i = 0; i < data.length; i++) {
    var check = fg.filter((e) => { return e.product_id === data[i].id });

    if (check.length > 0) {
        

        var as = {
            id: data[i].id,
            current_amount:  0,
            amount_1:  0,
            amount_2:  0,
            blade_head: parseInt(data[i].blade_head || 0),
            name: data[i].name || null,
            oem: data[i].oem_id,
            product_id: null,
          }     
          fg_data.push(as);

    }else{

    }
}
console.log("xsz",fg_data)


var amount_1all = 0
var amount_2all = 0
for (let o = 0; o < fg.length; o++) {
    var check = fg_data.filter((e) => { return e.id === fg[o].product_id });
    if (check.length > 0) {
    var index5 = fg_data.findIndex((e2)=> e2.id === fg[o].product_id );
    var amount_1 = 0
    var amount_2 = 0
    if ( fg[o].edit_type  == true && fg[o].product_id == fg_data[index5].id) {
        amount_1 =  parseFloat( fg[o].amount || 0) 
        amount_1all = amount_1 + amount_1all
       /*  console.log("a",amount_1all,amount_1,fg[o].product_id) */

    } else  if ( fg[o].edit_type  == false && fg[o].product_id == fg_data[index5].id){
        amount_2 =  parseFloat(fg[o].amount || 0) 
        amount_2all = amount_2 + amount_2all
     /*    console.log("b",amount_1all,amount_2,fg[o].product_id) */

    }



    fg_data[index5].current_amount = fg[o].current_amount || 0;
    fg_data[index5].amount_1 = amount_1all;
    fg_data[index5].amount_2 = amount_2all;
    fg_data[index5].product_id = fg[o].product_id
        
    }else{
        amount_1all = 0
        amount_2all = 0
    }
};



var stp_data = []
for (let y = 0; y < data.length; y++) {
    var check = stp.filter((e) => { return e.product_id === data[y].id });

    if (check.length > 0) {
        

        var as = {
            id: data[y].id,
            name: data[y].name || null,
            oem: data[y].oem_id,
            product_id: null,
            stp_type: data[y].stp_type || false,
            width: data[y].width,
            height: data[y].height,
            cus_pro: null,
            end_pro: null,
            edit_type: null,
            amountstp: 0,
            amount_01: 0,
            amount_02: 0,
            stp_machine: null,
          }     
          stp_data.push(as);
          console.log("stp1", data[y].name || null)
          console.log("width", data[y].width)
          console.log("height", data[y].height)
        

    }else{
       
    }
};

var all_sum_1 = 0
var all_sum_2 = 0
for (let o = 0; o < stp.length; o++) {
    var sum_1 = 0
    var sum_2 = 0
    var check = stp_data.filter((e) => { return e.id === stp[o].product_id });
    if (check.length > 0) {
    var index5 = stp_data.findIndex((e2)=> e2.id === stp[o].product_id );
    if (stp[o].stp_machine == "เครื่องทอที่ 1") {
        if (stp[o].edit_type === true) {
            all_sum_1 = all_sum_1 +  parseFloat(stp[o].amount)
            sum_1 = sum_1 +  parseFloat(stp[o].amount)
        } else if (stp[o].edit_type === false){
            all_sum_1 = all_sum_1 -  parseFloat(stp[o].amount)
            sum_1 = sum_1 +  parseFloat(stp[o].amount)
        }
       
    } else if (stp[o].stp_machine == "เครื่องทอที่ 2"){
        if (stp[o].edit_type === true) {
            all_sum_2 = all_sum_2 -  parseFloat(stp[o].amount)
            sum_2 = sum_2 +  parseFloat(stp[o].amount)
        } else if (stp[o].edit_type === false){
            all_sum_2 = all_sum_2 -  parseFloat(stp[o].amount)
            sum_2 = sum_2 +  parseFloat(stp[o].amount)
        }
    }
    stp_data[index5].amount_01 = sum_1 
    stp_data[index5].amount_02 = sum_2 
 /* if (stp_data[index5].name === "ลวดไวร์รอท 5.5มม. M8"){
    M8_5_5  = parseFloat(stp[o].amount)
   } else if (stp_data[index5].name === "ลวดไวร์รอท 5.5มม. M12"){
    M12_5_5  = parseFloat(stp[o].amount)
   } else if (stp_data[index5].name === "ลวดไวร์รอท 6.5มม. M8"){
    M8_6_5  = parseFloat(stp[o].amount)
    } else if (stp_data[index5].name === "ลวดไวร์รอท 6.5มม. M12"){
        M12_6_5  = parseFloat(stp[o].amount)
    } else if (stp_data[index5].name === "ลวดไวร์รอท 7.0มม. M8"){
        M8_7_0  = parseFloat(stp[o].amount)
    } else if (stp_data[index5].name === "ลวดไวร์รอท 7.0มม. M12"){
        M12_7_0  = parseFloat(stp[o].amount)
    } */
    stp_data[index5].product_id = stp[o].product_id 
   
    stp_data[index5].stp_machine = stp[o].stp_machine 
    stp_data[index5].amountstp = parseFloat(stp[o].amount)
    }else{
      
    }
};

/* var all_sum_1
var all_sum_2
var stp_data = []
for (let y = 0; y < stp.length; y++) {
    var check = data.filter((e) => { return e.id === stp[y].product_id });

    if (check.length > 0) {
       
        if (stp[y].edit_type === true) {
            all_sum = all_sum +  parseFloat(stp[y].amount)
        } else if (stp[y].edit_type === false){
            all_sum = all_sum -  parseFloat(stp[y].amount)
        }

        var as = {
            id: null,
            name: null,
            oem: null,
            product_id: stp[y].product_id,
            stp_type: null,
            width: null,
            height: null,
            cus_pro: null,
            end_pro: null,
            amountstp: all_sum,
            stp_machine: stp[y].stp_machine
          }     
          stp_data.push(as);
          console.log("stp1", stp[y].product_id)

    }else{
       
    }
};


for (let o = 0; o < data.length; o++) {
    var check = stp_data.filter((e) => { return e.product_id === data[o].id });
    if (check.length > 0) {
    var index5 = stp_data.findIndex((e2)=> e2.product_id === data[o].id );

    stp_data[index5].id = data[o].id ;
    stp_data[index5].name = data[o].name || null;
    stp_data[index5].oem = data[o].oem_id ;
    stp_data[index5].stp_type = data[o].stp_machine || false;
    stp_data[index5].width = data[o].width;
    stp_data[index5].height = data[o].height;
   
    }else{
      
    }
}; */

for (let o = 0; o < cus_.length; o++) {
var check = stp_data.filter((e)=> e.id === cus_[o].product_id );
if (check.length > 0) {
    var index5 = stp_data.findIndex((e2)=> e2.id === cus_[o].product_id  );
    stp_data[index5].cus_pro = cus_[o].full_name_customer
}else{
      
}
};

for (let o = 0; o < end_.length; o++) {
    var check = stp_data.filter((e)=> e.id === end_[o].product_id );
    if (check.length > 0) {
        var name_end = ""
        name_end = end_[o].full_name_end_user
        var index5 = stp_data.findIndex((e2)=> e2.id === end_[o].product_id  );
        stp_data[index5].end_pro =  null
        console.log("stp1",name_end)
    }else{
          
    }
    };


    var M8_5_5 = 0
    var w_M8_5_5 = 0
    var M12_5_5 = 0
    var  w_M12_5_5 = 0
    var M8_6_5 = 0
    var  w_M8_6_5 = 0
    var M12_6_5 = 0
    var  w_M12_6_5 = 0
    var M8_7_0 = 0
    var  w_M8_7_0 = 0
    var M12_7_0 = 0
    var  w_M12_7_0 = 0

    var M8_5_5all = 0
    var w_M8_5_5all = 0
    var M12_5_5all = 0
    var  w_M12_5_5all = 0
    var M8_6_5all = 0
    var  w_M8_6_5all = 0
    var M12_6_5all = 0
    var  w_M12_6_5all = 0
    var M8_7_0all = 0
    var  w_M8_7_0all = 0
    var M12_7_0all = 0
    var  w_M12_7_0all = 0
    
    var check_1 = ""
    var check_2 = ""
    var check_3 = ""
    var check_4 = ""
    var check_5 = ""
    var check_6 = ""



for (let index = 0; index < def_stp.length; index++) {

    if (def_stp[index].diameter === "ลวดไวร์รอท 5.5มม. M8"){
        
        if (def_stp[index].edit_type === true) {
            M8_5_5all  = M8_5_5all + parseFloat(def_stp[index].amount)
            w_M8_5_5all  =w_M8_5_5all + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M8_5_5all  = M8_5_5all - parseFloat(def_stp[index].amount)
            w_M8_5_5all  =w_M8_5_5all - parseFloat(def_stp[index].weight)
        }
       
   } else if (def_stp[index].diameter === "ลวดไวร์รอท 5.5มม. M12"){
    if (def_stp[index].edit_type === true) {
        M12_5_5all   = M12_5_5all + parseFloat(def_stp[index].amount)
        w_M12_5_5all  = w_M12_5_5all + parseFloat(def_stp[index].weight)
    } else  if (def_stp[index].edit_type === false){
        M12_5_5all   = M12_5_5all - parseFloat(def_stp[index].amount)
        w_M12_5_5all  = w_M12_5_5all - parseFloat(def_stp[index].weight)
    }
   
   } else if (def_stp[index].diameter=== "ลวดไวร์รอท 6.5มม. M8"){
    if (def_stp[index].edit_type === true) {
        M8_6_5all   = M8_6_5all + parseFloat(def_stp[index].amount)
        w_M8_6_5all  = w_M8_6_5all + parseFloat(def_stp[index].weight)
    } else  if (def_stp[index].edit_type === false){
        M8_6_5all   = M8_6_5all - parseFloat(def_stp[index].amount)
    w_M8_6_5all  = w_M8_6_5all - parseFloat(def_stp[index].weight)
    }
    
    } else if (def_stp[index].diameter === "ลวดไวร์รอท 6.5มม. M12"){
        if (def_stp[index].edit_type === true) {
            M12_6_5all   = M12_6_5all + parseFloat(def_stp[index].amount)
        w_M12_6_5all  = w_M12_6_5all + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M12_6_5all   = M12_6_5all - parseFloat(def_stp[index].amount)
        w_M12_6_5all  = w_M12_6_5all - parseFloat(def_stp[index].weight)
        }
        
    } else if (def_stp[index].diameter === "ลวดไวร์รอท 7.0มม. M8"){
        if (def_stp[index].edit_type === true) {
            M8_7_0all   = M8_7_0all + parseFloat(def_stp[index].amount)
            w_M8_7_0all  = w_M8_7_0all + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M8_7_0all   = M8_7_0all - parseFloat(def_stp[index].amount)
            w_M8_7_0all  = w_M8_7_0all - parseFloat(def_stp[index].weight)
        }
       
    } else if (def_stp[index].diameter === "ลวดไวร์รอท 7.0มม. M12"){
        if (def_stp[index].edit_type === true) {
            M12_7_0all  = M12_7_0all + parseFloat(def_stp[index].amount)
            w_M12_7_0all  = w_M12_7_0all + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M12_7_0all  = M12_7_0all - parseFloat(def_stp[index].amount)
            w_M12_7_0all  = w_M12_7_0all - parseFloat(def_stp[index].weight)
        }
      
    }

    if (moment(date).format('YYYY-MM-DD')+" 00:00:00+07" < moment(date).format('YYYY-MM-DD')+" 23:59:59+07") {
        
   
    if (def_stp[index].diameter === "ลวดไวร์รอท 5.5มม. M8"){
        if (def_stp[index].edit_type === true) {
            M8_5_5  = M8_5_5 + parseFloat(def_stp[index].amount)
            w_M8_5_5  =w_M8_5_5 + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M8_5_5  = M8_5_5 - parseFloat(def_stp[index].amount)
            w_M8_5_5  =w_M8_5_5 - parseFloat(def_stp[index].weight)
        }
        check_1 = def_stp[index].edit_type 
       } else if (def_stp[index].diameter === "ลวดไวร์รอท 5.5มม. M12"){
        if (def_stp[index].edit_type === true) {
            M12_5_5   = M12_5_5 + parseFloat(def_stp[index].amount)
            w_M12_5_5  = w_M12_5_5 + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M12_5_5   = M12_5_5 - parseFloat(def_stp[index].amount)
            w_M12_5_5  = w_M12_5_5 - parseFloat(def_stp[index].weight)
        }
        check_2 = def_stp[index].edit_type 
       } else if (def_stp[index].diameter=== "ลวดไวร์รอท 6.5มม. M8"){
        if (def_stp[index].edit_type === true) {
            M8_6_5   = M8_6_5 + parseFloat(def_stp[index].amount)
            w_M8_6_5  = w_M8_6_5 + parseFloat(def_stp[index].weight)
        } else  if (def_stp[index].edit_type === false){
            M8_6_5   = M8_6_5 - parseFloat(def_stp[index].amount)
            w_M8_6_5  = w_M8_6_5 - parseFloat(def_stp[index].weight)
        }
        check_3 = def_stp[index].edit_type 
        } else if (def_stp[index].diameter === "ลวดไวร์รอท 6.5มม. M12"){
            if (def_stp[index].edit_type === true) {
                M12_6_5   = M12_6_5 + parseFloat(def_stp[index].amount)
            w_M12_6_5  = w_M12_6_5 + parseFloat(def_stp[index].weight)
            } else  if (def_stp[index].edit_type === false){
                M12_6_5   = M12_6_5 - parseFloat(def_stp[index].amount)
                w_M12_6_5  = w_M12_6_5 - parseFloat(def_stp[index].weight)
            }
            check_4 = def_stp[index].edit_type 
        } else if (def_stp[index].diameter === "ลวดไวร์รอท 7.0มม. M8"){
            if (def_stp[index].edit_type === true) {
                M8_7_0   = M8_7_0 + parseFloat(def_stp[index].amount)
                w_M8_7_0  = w_M8_7_0 + parseFloat(def_stp[index].weight)
            } else  if (def_stp[index].edit_type === false){
                M8_7_0   = M8_7_0 - parseFloat(def_stp[index].amount)
                w_M8_7_0  = w_M8_7_0 - parseFloat(def_stp[index].weight)
            }
            check_5 = def_stp[index].edit_type 
        } else if (def_stp[index].diameter === "ลวดไวร์รอท 7.0มม. M12"){
            if (def_stp[index].edit_type === true) {
                M12_7_0 = M12_7_0 + parseFloat(def_stp[index].amount)
                w_M12_7_0  = w_M12_7_0 + parseFloat(def_stp[index].weight)
            } else  if (def_stp[index].edit_type === false){
                M12_7_0  = M12_7_0 - parseFloat(def_stp[index].amount)
                w_M12_7_0  = w_M12_7_0 - parseFloat(def_stp[index].weight)
            }
            check_6 = def_stp[index].edit_type 
        }
      
    } else {
        

    }

}




console.log("stp1",stp_data)
console.log("xzc",fg_data)

const stock_month = [
    {"th":"มกราคม","eng":"๋January"},
    {"th":"กุมภาพันธ์","eng":"February"},
    {"th":"มีนาคม","eng":"March"},
    {"th":"เมษายน","eng":"April"},
    {"th":"พฤษภาคม","eng":"May"},
    {"th":"มิถุนายน","eng":"June"},
    {"th":"กรกฎาคม","eng":"July"},
    {"th":"สิงหาคม","eng":"August"},
    {"th":"กันยายน","eng":"September"},
    {"th":"ตุลาคม","eng":"October"},
    {"th":"พฤศจิกายน","eng":"November"},
    {"th":"ธันวาคม","eng":"December"},
  ]






    const doc = new jsPDF("l", "mm", "a4");
    var oem_target = addressOEM.filter((e) => {
        return e.oem_id === oem;
      })
      var part_oem = Oemlist.filter((e2) => { return e2.id === oem; })
      var month_th = stock_month.filter((e)=>{ return e.eng === moment(date).format('MMMM');})
      var year_th =  parseInt(moment(date).format('yyyy')) +543;
      var year_th_all =  parseInt(moment(date).format('YY')) +43;

    doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.addFont('Rocki', 'bold');
    doc.setFont("THSarabunNew");
    doc.setFontSize(12)
    var counts = 0;
    var rowall = 0;
  /*   stp_data =[{name: "ddd"},{name: "sss"}] */
    for (let index = 0; index < stp_data.length; index = index + 7) {
  
    //logo
    var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
    doc.addImage(Com_logo, 'JPEG', 5, 5, 25, 25)
    doc.text(33, 19, oem_target[0].oem_name.toString(),"left");
    doc.text(33, 19, oem_target[0].oem_name.toString(),"left");
    doc.setFontSize(20)
    doc.text(33, 27,"รายงานไวร์เมช STP ณ วัน"+" "+moment(date).format('DD').toString()+" "+month_th[0].th+" พ.ศ. "+year_th.toString(),"left");
    doc.text(33, 27, "รายงานไวร์เมช STP ณ วัน"+" "+moment(date).format('DD').toString()+" "+month_th[0].th+" พ.ศ. "+year_th.toString(),"left");
    doc.setFontSize(12)
    doc.rect(3, 3, 291, 204,);

    doc.setFillColor(255, 204, 0);
    doc.rect(8, 31, 283, 5,'FD');
    doc.setFontSize(13)
    doc.text(142,35," ไวร์แมช STP","center");

    doc.setFontSize(8)
    doc.setFillColor(255, 255, 153);
    doc.rect(8, 36, 8, 10,'FD');
    doc.text(12,42," รายการ","center");

    doc.setFillColor(255, 255, 153);
    doc.rect(8, 46, 8, 5,'FD');
    doc.text(12,50," ลำดับ","center");
 
    doc.setFillColor(153, 255, 204);
    doc.rect(16, 36, 115, 5,'FD');
    doc.text(72,39," รายการผลิต ณ วันที่"+moment(date).format('DD-MM-').toString()+year_th_all.toString(),"center");

    doc.setFillColor(204, 153, 255);
    doc.rect(16, 41, 40, 10,'FD');
    doc.text(35,47,"ขนาด","center"); 

    doc.setFillColor(204, 102, 255);
    doc.rect(56, 41, 27, 5,'FD');
    doc.text(70,44," รายการผลิต (เครื่องทอที่ 1)","center");

    doc.setFillColor(204, 153, 255);
    doc.rect(56, 46, 9, 5,'FD');
    doc.text(60.5,49,"ตรม.","center");
    doc.setFillColor(204, 153, 255);
    doc.rect(65, 46, 9, 5,'FD');
    doc.text(69.5,49,"ม้วน","center");
    doc.setFillColor(204, 153, 255);
    doc.rect(74, 46, 9, 5,'FD');
    doc.text(78.5,49,"แผง","center");


    doc.setFillColor(255, 153, 0);
    doc.rect(83, 41, 27, 5,'FD');
    doc.text(97,44," รายการผลิต (เครื่องทอที่ 2)","center");
    
    doc.setFillColor(255, 255, 204);
    doc.rect(83, 46, 9, 5,'FD');
    doc.text(87.5,49,"ตรม.","center");
    doc.setFillColor(255, 255, 204);
    doc.rect(92, 46, 9, 5,'FD');
    doc.text(96.5,49,"ม้วน","center");
    doc.setFillColor(255, 255, 204);
    doc.rect(101, 46, 9, 5,'FD');
    doc.text(105.5,49,"แผง","center");

    doc.setFillColor(255, 153, 204);
    doc.rect(110, 41, 21, 10,'FD');
    doc.text(121,47," ลูกค้า/stock","center");


    var count = 0
    var row = 0;
    var rownum = 0;
    rownum = rownum +rowall
    var sum_stpamount1_1 = 0
    var sum_stpamount1_2 = 0
    var sum_stpamount2_1 = 0
    var sum_stpamount2_2 = 0
    var stpamount1 = 0
    var stpamount2 = 0
    var sum_trm = 0
    var sum_m = 0
    var sum_p = 0
    var amount_01 = 0
    var amount_02 = 0
    doc.setFontSize(6)
    for (let i = 0; row < 7 ; i = i + 7) {
   var sumstp1 = 0
   var sumstp2 = 0

        if (!stp_data[index+row]) {


        }else{
            amount_01 = stp_data[index+row].amount_01
            amount_02 = stp_data[index+row].amount_02
            sumstp1 = parseFloat((stp_data[index+row].height*stp_data[index+row].width)*amount_01) 
            sumstp2 = parseFloat((stp_data[index+row].height*stp_data[index+row].width)*amount_02) 
            doc.text(12,53.5+count,(rownum+1).toString(),"center");
            doc.text(16.5,53.5+count,stp_data[index+row].name.toString(),"left"); 
/* if (stp_data[index+row].stp_machine == "เครื่องทอที่ 1") { */
   
    stpamount1 = parseFloat(stpamount1 + sumstp1) || 0
    if (sumstp1 == 0) {
        doc.text(60.5,53.5+count,"-","center");
    } else {
        doc.text(60.5,53.5+count,sumstp1.toFixed(2).toString(),"center");
    }
   
    if (stp_data[index+row].stp_type === true) {
        sum_stpamount1_1 = sum_stpamount1_1 + amount_01
        doc.text(69.5,53.5+count,amount_01.toString(),"center");
        doc.text(78.5,53.5+count,"-","center");
    } else if (stp_data[index+row].stp_type === false) {
        sum_stpamount1_2 = sum_stpamount1_2 + amount_01
        doc.text(78.5,53.5+count,amount_01.toString(),"center");
        doc.text(69.5,53.5+count,"-","center");
    }
   
  
/* } else if (stp_data[index+row].stp_machine == "เครื่องทอที่ 2") { */
  
    stpamount2 = parseFloat(stpamount2 + sumstp2) || 0
    if (sumstp2 == 0) {
        doc.text(87.5,53.5+count,"-","center");
} else {
    doc.text(87.5,53.5+count,sumstp2.toFixed(2).toString(),"center");
}
    if (stp_data[index+row].stp_type === true) {
        sum_stpamount2_1 = sum_stpamount2_1 + amount_02
    doc.text(96.5,53.5+count,amount_02.toString(),"center");
    doc.text(105.5,53.5+count,"-".toString(),"center");
} else if (stp_data[index+row].stp_type === false) {
    sum_stpamount2_2 = sum_stpamount2_2 + amount_02
    doc.text(105.5,53.5+count,amount_02.toString(),"center");
    doc.text(96.5,53.5+count,"-".toString(),"center");
}
/* } */

if (stp_data[index+row].cus_pro == null) {
    doc.text(121,53.5+count,"","center"); 
} else {
    doc.text(121,53.5+count,stp_data[index+row].cus_pro.toString(),"center"); 
}


if (stp_data[index+row].end_pro == null) {
    doc.text(121,53.5+count,"","center"); 
} else {
    doc.text(121,53.5+count,stp_data[index+row].end_pro.toString(),"center"); 
}

        }
        count = count + 3
        row = row+1
        rownum = rownum+1;
        counts = stp_data.length-7;
        sum_trm = stpamount1 + stpamount2
        sum_m  = sum_stpamount1_1 + sum_stpamount2_1
        sum_p  = sum_stpamount1_2 + sum_stpamount2_2
    }


   var num = 0
 
for (let I = 0; I < 7; I++) {
   
    doc.rect(8, 51+num, 8, 3);
    doc.rect(16, 51+num, 40, 3);
    doc.rect(56, 51+num, 27, 3);
    doc.rect(56, 51+num, 9, 3);
    doc.rect(65, 51+num, 9, 3);
    doc.rect(74, 51+num, 9, 3);
    doc.rect(83, 51+num, 9, 3);
    doc.rect(92, 51+num, 9, 3);
    doc.rect(101, 51+num, 9, 3);
    doc.rect(110, 51+num, 21, 3);
   
    num = num +3
}

doc.setFontSize(6)
doc.setFillColor(255, 255, 153);
doc.rect(8, 51+num, 48, 3,'FD');
doc.text(32,53+num,"รายการแต่ละวัน","center")

/* doc.setFillColor(204, 153, 255);
doc.rect(56, 51+num, 27, 3,'FD'); */


doc.setFillColor(204, 153, 255);
doc.rect(56, 51+num, 9, 3,'FD');
doc.text(60.5,53+num,stpamount1.toFixed(2).toString(),"center");

doc.setFillColor(204, 153, 255);
doc.rect(65, 51+num, 9, 3,'FD');
doc.text(69.5,53+num,sum_stpamount1_1.toString(),"center");

doc.setFillColor(204, 153, 255);
doc.rect(74, 51+num, 9, 3,'FD');
doc.text(78.5,53+num,sum_stpamount1_2.toString(),"center");

doc.setFillColor(255, 255, 204);
doc.rect(83, 51+num, 9, 3,'FD');
doc.text(87.5,53+num,stpamount2.toFixed(2).toString(),"center");

doc.setFillColor(255, 255, 204);
doc.rect(92, 51+num, 9, 3,'FD');
doc.text(96.5,53+num,sum_stpamount2_1.toString(),"center");

doc.setFillColor(255, 255, 204);
doc.rect(101, 51+num, 9, 3,'FD');
doc.text(105.5,53+num,sum_stpamount2_2.toString(),"center");

doc.setFillColor(255, 153, 204);
doc.rect(110, 51+num, 21, 3,'FD');
/* doc.text(121,53,stp_data[index+row].cus_pro.toString(),"center");  */
////////////แทบล่าง/////////////
doc.setFillColor(153, 153, 255);
doc.rect(65, 57+num, 9, 6,'FD');
doc.setTextColor(255, 0, 0);
doc.text(69.5,60.5+num,"รวมทั้งหมด","center")

doc.setFillColor(204, 204, 255);
doc.rect(74, 57+num, 9, 3,'FD');
doc.setTextColor(0, 0, 0);
doc.text(78.5,59+num,"ตรม.","center")

doc.setFillColor(204, 204, 255);
doc.rect(83, 57+num, 9, 3,'FD');
doc.text(87.5,59+num,"ม้วน","center")

doc.setFillColor(204, 204, 255);
doc.rect(92, 57+num, 9, 3,'FD');
doc.text(96.5,59+num,"แผง","center")

doc.setFillColor(242, 242, 242);
doc.rect(74, 60+num, 9, 3);
doc.text(78.5,62+num,sum_trm.toFixed(2).toString(),"center")

doc.setFillColor(242, 242, 242);
doc.rect(83, 60+num, 9, 3);
doc.text(87.5,62+num,sum_m.toString(),"center")

doc.setFillColor(242, 242, 242);
doc.rect(92, 60+num, 9, 3);
doc.text(96.5,62+num,sum_p.toString(),"center")

   
   /////////////////////////////////////////////////////////1 
    doc.setFillColor(255, 153, 255);
    doc.rect(8, 87, 123, 5,'FD');
    doc.text(68,89,"รายการเบิกใช้วัตถุดิบ","center");

    doc.setFillColor(255, 128, 128);
    doc.rect(8, 90, 61.5, 3,'FD');
    doc.text(37,92,"ลวดไวร์รอท 5.5มม. M8","center");
    

    doc.setFillColor(255, 204, 204);
    doc.rect(8, 93,20.5, 3,'FD');
    doc.text(18.25,95,"รับ","center");
    
    

    doc.setFillColor(255, 204, 204);
    doc.rect(28.5, 93, 20.5, 3,'FD');
    doc.text(38.75,95,"จ่าย","center");
    
    doc.setFillColor(255, 204, 204);
    doc.rect(49, 93, 20.5, 3,'FD');
    doc.text(59.25,95,"คงเหลือ","center");
 



    doc.setFillColor(64, 191, 64);
    doc.rect(69.5, 90, 61.5, 3,'FD');
    doc.text(100,92,"ลวดไวร์รอท 5.5มม. M12","center");

    doc.setFillColor(140, 217, 140);
    doc.rect(69.5, 93,20.5, 3,'FD');
    doc.text(79.75,95,"รับ","center");
    
    doc.setFillColor(140, 217, 140);
    doc.rect(90, 93, 20.5, 3,'FD');
    doc.text(100.25,95,"จ่าย","center");
    
    doc.setFillColor(140, 217, 140);
    doc.rect(110.5, 93, 20.5, 3,'FD');
    doc.text(120.75,95,"คงเหลือ","center");

    var a1 = 0
    var a2 = 0
    for (let n = 0; n < 6; n++) {
        if (n > 2) {
            doc.setFillColor(64, 191, 64);
        } else {
            doc.setFillColor(255, 128, 128);
        }
       
        doc.rect(8+a1, 96,8.5, 3,'FD');
        doc.text(12.5+a1,98,"ม้วน","center");

        doc.rect(8+a1, 99,8.5,4);
        if (n > 2) {
            doc.setFillColor(140, 217, 140);
        } else {
            doc.setFillColor(255, 204, 204);
        }
       
        doc.rect(16.5+a2, 96,12, 3,'FD');
        doc.text(22.5+a2,98,"กก.","center");

        doc.rect(16.5+a2, 99,12,4);
    a1 = a1 + 20.5 
    a2 = a2 + 20.5 
    }
   var go = 0
   
       if (check_1 === true) {
        doc.text(12.5+go,101,M8_5_5.toString(),"center");
        doc.text(22.5+go,101,w_M8_5_5.toString(),"center");
       
       } else
       go = go + 20.5 
        if (check_1 === false){
        doc.text(12.5+go,101,M8_5_5.toString(),"center");
        doc.text(22.5+go,101,w_M8_5_5.toString(),"center");
       
       } go = go + 20.5 
    doc.text(12.5+go,101,M8_5_5all.toString(),"center");
    doc.text(22.5+go,101,w_M8_5_5all.toString(),"center");
    go = go + 20.5 

    if (check_2 === true) {
        doc.text(12.5+go,101,M12_5_5.toString(),"center");
        doc.text(22.5+go,101,w_M12_5_5.toString(),"center");
        
       } else 
       go = go + 20.5
       if (check_2 === false){
        doc.text(12.5+go,101,M12_5_5.toString(),"center");
        doc.text(22.5+go,101,w_M12_5_5.toString(),"center");

       } go = go + 20.5
    doc.text(12.5+go,101,M12_5_5all.toString(),"center");
    doc.text(22.5+go,101,w_M12_5_5all.toString(),"center");
    go = 0
      /////////////////////////////////////////////////////////2
 var loop = 20
    
    doc.setFillColor(255, 153, 255);
    doc.rect(8, 87+loop, 123, 3,'FD');
    doc.text(68,89+loop,"รายการเบิกใช้วัตถุดิบ","center");

    doc.setFillColor(153, 221, 255);
    doc.rect(8, 90+loop, 61.5, 3,'FD');
    doc.text(37,92+loop,"ลวดไวร์รอท 6.5มม. M8","center");
    

    doc.setFillColor(204, 238, 255);
    doc.rect(8, 93+loop,20.5, 3,'FD');
    doc.text(18.25,95+loop,"รับ","center");
    
    

    doc.setFillColor(204, 238, 255);
    doc.rect(28.5, 93+loop, 20.5, 3,'FD');
    doc.text(38.75,95+loop,"จ่าย","center");
    
    doc.setFillColor(204, 238, 255);
    doc.rect(49, 93+loop, 20.5, 3,'FD');
    doc.text(59.25,95+loop,"คงเหลือ","center");
    

    doc.setFillColor(255, 255, 102);
    doc.rect(69.5, 90+loop, 61.5, 3,'FD');
    doc.text(100,92+loop,"ลวดไวร์รอท 6.5มม. M12","center");

    doc.setFillColor(255, 255, 204);
    doc.rect(69.5, 93+loop,20.5, 3,'FD');
    doc.text(79.75,95+loop,"รับ","center");
    
    doc.setFillColor(255, 255, 204);
    doc.rect(90, 93+loop, 20.5, 3,'FD');
    doc.text(100.25,95+loop,"จ่าย","center");
    
    doc.setFillColor(255, 255, 204);
    doc.rect(110.5, 93+loop, 20.5, 3,'FD');
    doc.text(120.75,95+loop,"คงเหลือ","center");

    var a1 = 0
    var a2 = 0
    for (let n = 0; n < 6; n++) {
        if (n > 2) {
            doc.setFillColor(255, 255, 102);
        } else {
            doc.setFillColor(153, 221, 255);
        }
        
        doc.rect(8+a1, 96+loop,8.5, 3,'FD');
        doc.text(12.5+a1,98+loop,"ม้วน","center");

        doc.rect(8+a1, 99+loop,8.5,4);

        if (n > 2) {
            doc.setFillColor(255, 255, 204);
        } else {
            doc.setFillColor(204, 238, 255);
        }
      
        doc.rect(16.5+a2, 96+loop,12, 3,'FD');
        doc.text(22.5+a2,98+loop,"กก.","center");

        doc.rect(16.5+a2, 99+loop,12,4);
    a1 = a1 + 20.5 
    a2 = a2 + 20.5 
    }
    
    
    if (check_3 === true) {
        doc.text(12.5+go,101+loop,M8_6_5.toString(),"center");
        doc.text(22.5+go,101+loop,w_M8_6_5.toString(),"center");
       
       } else
       go = go + 20.5 
        if (check_1 === false){
        doc.text(12.5+go,101+loop,M8_6_5.toString(),"center");
        doc.text(22.5+go,101+loop,w_M8_6_5.toString(),"center");
        
       }go = go + 20.5 
    doc.text(12.5+go,101+loop,M8_6_5all.toString(),"center");
    doc.text(22.5+go,101+loop,w_M8_6_5all.toString(),"center");
    go = go + 20.5 

    if (check_4 === true) {
        doc.text(12.5+go,101+loop,M12_6_5.toString(),"center");
        doc.text(22.5+go,101+loop,w_M12_6_5.toString(),"center");
        
       } else 
       go = go + 20.5
       if (check_2 === false){
        doc.text(12.5+go,101+loop,M12_6_5.toString(),"center");
        doc.text(22.5+go,101+loop,w_M12_6_5.toString(),"center");
      
       }  go = go + 20.5
    doc.text(12.5+go,101+loop,M12_6_5all.toString(),"center");
    doc.text(22.5+go,101+loop,w_M12_6_5all.toString(),"center");
    go = 0
   /////////////////////////////////////////////////////////3   
   loop = 40
    
    doc.setFillColor(255, 153, 255);
    doc.rect(8, 87+loop, 123, 3,'FD');
    doc.text(68,89+loop,"รายการเบิกใช้วัตถุดิบ","center");

    doc.setFillColor(128, 128, 255);
    doc.rect(8, 90+loop, 61.5, 3,'FD');
    doc.text(37,92+loop,"ลวดไวร์รอท 7.0มม. M8","center");
    

    doc.setFillColor(179, 179, 255);
    doc.rect(8, 93+loop,20.5, 3,'FD');
    doc.text(18.25,95+loop,"รับ","center");
    
    

    doc.setFillColor(179, 179, 255);
    doc.rect(28.5, 93+loop, 20.5, 3,'FD');
    doc.text(38.75,95+loop,"จ่าย","center");
    
    doc.setFillColor(179, 179, 255);
    doc.rect(49, 93+loop, 20.5, 3,'FD');
    doc.text(59.25,95+loop,"คงเหลือ","center");
    
   
    doc.setFillColor(255, 212, 128);
    doc.rect(69.5, 90+loop, 61.5, 3,'FD');
    doc.text(100,92+loop,"ลวดไวร์รอท 7.0มม. M12","center");

    doc.setFillColor(255, 230, 179);
    doc.rect(69.5, 93+loop,20.5, 3,'FD');
    doc.text(79.75,95+loop,"รับ","center");
    
    doc.setFillColor(255, 230, 179);
    doc.rect(90, 93+loop, 20.5, 3,'FD');
    doc.text(100.25,95+loop,"จ่าย","center");
    
    doc.setFillColor(255, 230, 179);
    doc.rect(110.5, 93+loop, 20.5, 3,'FD');
    doc.text(120.75,95+loop,"คงเหลือ","center");

    var a1 = 0
    var a2 = 0
    for (let n = 0; n < 6; n++) {
        if (n > 2) {
            doc.setFillColor(255, 212, 128);
        } else {
            doc.setFillColor(128, 128, 255);
        }
       
        doc.rect(8+a1, 96+loop,8.5, 3,'FD');
        doc.text(12.5+a1,98+loop,"ม้วน","center");

        doc.rect(8+a1, 99+loop,8.5,4);

        if (n > 2) {
            doc.setFillColor(255, 230, 179);
        } else {
            doc.setFillColor(179, 179, 255);
        }
       
        doc.rect(16.5+a2, 96+loop,12, 3,'FD');
        doc.text(22.5+a2,98+loop,"กก.","center");

        doc.rect(16.5+a2, 99+loop,12,4);
    a1 = a1 + 20.5 
    a2 = a2 + 20.5 
    }
  
    if (check_5 === true) {
        doc.text(12.5+go,101,M8_7_0.toString(),"center");
        doc.text(22.5+go,101,w_M8_7_0.toString(),"center");
        
       } else 
       go = go + 20.5 
       if (check_1 === false){
        doc.text(12.5+go,101+loop,M8_7_0.toString(),"center");
        doc.text(22.5+go,101+loop,w_M8_7_0.toString(),"center");
       
       } go = go + 20.5 
    doc.text(12.5+go,101+loop,M8_7_0all.toString(),"center");
    doc.text(22.5+go,101+loop,w_M8_7_0all.toString(),"center");
    go = go + 20.5 

    if (check_6 === true) {
        doc.text(12.5+go,101+loop,M12_7_0.toString(),"center");
        doc.text(22.5+go,101+loop,w_M12_7_0.toString(),"center");
       
       } else 
       go = go + 20.5
       if (check_2 === false){
        doc.text(12.5+go,101+loop,M12_7_0.toString(),"center");
        doc.text(22.5+go,101+loop,w_M12_7_0.toString(),"center");
        
       } go = go + 20.5
    doc.text(12.5+go,101+loop,M12_7_0all.toString(),"center");
    doc.text(22.5+go,101+loop,w_M12_7_0all.toString(),"center");
    go = 0
      /////////////////////////////////////////////////////////4
    loop = 60
    
    doc.setFillColor(255, 153, 255);
    doc.rect(8, 87+loop, 123, 3,'FD');
    doc.text(68,89+loop,"รายการเบิกใช้วัตถุดิบ","center");

    doc.setFillColor(255, 179, 179);
    doc.rect(8, 90+loop, 30, 3,'FD');
    doc.text(23,92+loop,"ป้ายแท็ก","center");
    doc.setFillColor(255, 179, 179);
    doc.rect(38, 90+loop, 31.5, 3,'FD');
    doc.text(53.75,92+loop,"หนวดปลาหมึก","center");

    doc.setFillColor(255, 204, 204);
    doc.rect(8, 93+loop,10, 3,'FD');
    doc.text(13,95+loop,"รับ","center");
    
    doc.setFillColor(255, 204, 204);
    doc.rect(18, 93+loop, 10, 3,'FD');
    doc.text(23,95+loop,"จ่าย","center");
    
    doc.setFillColor(255, 204, 204);
    doc.rect(28, 93+loop, 10, 3,'FD');
    doc.text(33,95+loop,"คงเหลือ","center");
   
    doc.setFillColor(204, 230, 255);
    doc.rect(38, 93+loop,10.5, 3,'FD');
    doc.text(43.25,95+loop,"รับ","center");
    
    doc.setFillColor(204, 230, 255);
    doc.rect(48.5, 93+loop, 10.5, 3,'FD');
    doc.text(53.5,95+loop,"จ่าย","center");
    
    doc.setFillColor(204, 230, 255);
    doc.rect(59, 93+loop, 10.5, 3,'FD');
    doc.text(64.25,95+loop,"คงเหลือ","center");

    doc.rect(8, 96+loop,10, 7,);
    
    doc.rect(18, 96+loop, 10, 7,);
    
    doc.rect(28, 96+loop, 10, 7,);
  
    doc.rect(38, 96+loop,10.5, 7,);
   
    doc.rect(48.5, 96+loop, 10.5, 7,);
    
    doc.rect(59, 96+loop, 10.5, 7,);
   
    doc.rect(69.5, 96+loop, 61.5, 7,);

    doc.rect(69.5, 96+loop,20.5, 7,);
    
    doc.rect(90, 96+loop, 20.5, 7,);
   
    doc.rect(110.5, 96+loop, 20.5, 7,);

    doc.setFillColor(230, 115, 0);
    doc.rect(69.5, 90+loop, 61.5, 3,'FD');
    doc.text(100,92+loop,"แป้งรีดลวด","center");

    doc.setFillColor(255, 204, 153);
    doc.rect(69.5, 93+loop,20.5, 3,'FD');
    doc.text(79.75,95+loop,"รับ","center");
    
    doc.setFillColor(255, 204, 153);
    doc.rect(90, 93+loop, 20.5, 3,'FD');
    doc.text(100.25,95+loop,"จ่าย","center");
    
    doc.setFillColor(255, 204, 153);
    doc.rect(110.5, 93+loop, 20.5, 3,'FD');
    doc.text(120.75,95+loop,"คงเหลือ","center");

    var a1 = 0
    var a2 = 0
    for (let n = 0; n < 3; n++) {
        doc.setFillColor(230, 115, 0);
        doc.rect(69.5+a1, 96+loop,8.5, 3,'FD');
        doc.text(74+a1,98+loop,"ม้วน","center");

        doc.rect(69.5+a1, 99+loop,8.5,4);

        doc.setFillColor(255, 204, 153);
        doc.rect(78+a2, 96+loop,12, 3,'FD');
        doc.text(84+a2,98+loop,"กก.","center");

        doc.rect(78+a2, 99+loop,12,4);
    a1 = a1 + 20.5 
    a2 = a2 + 20.5 
    }
  



doc.setFillColor(204, 255, 153);
doc.rect(136, 36, 75, 5,'FD');
doc.text(174,39,"พนักงานไวร์เมช (กะเช้า)","center");

doc.rect(136, 41, 15, 4,);
doc.text(143.5,44,"วัน/เดือน/ปี","center");
doc.rect(151, 41, 10, 4,);
doc.text(156,44,"ทั้งหมด","center");
doc.rect(161, 41, 10, 4,);
doc.text(166,44,"มาทำงาน","center");
doc.rect(171, 41, 10, 4,);
doc.text(176,44,"ลาป่วย","center");
doc.rect(181, 41, 10, 4,);
doc.text(186,44,"ล่ากิจ","center");
doc.rect(136, 41, 75, 4,);
doc.text(201,44,"หมายเหตุ","center");

doc.rect(136, 45, 15, 6,);
doc.text(143.5,48,moment(date).format('DD/MM/')+year_th_all.toString(),"center");
doc.rect(151, 45, 10, 6,);
doc.text(156,48,all_employee.toString(),"center");
doc.rect(161, 45, 10, 6,);
doc.text(166,48,day_shift.toString(),"center");
doc.rect(171, 45, 10, 6,);
doc.text(176,48,sick_leave.toString(),"center");
doc.rect(181, 45, 10, 6,);
doc.text(186,48,personal_leave.toString(),"center");
doc.rect(136, 45, 75, 6,);
doc.text(201,39,"","center");

var n = 80

doc.setFillColor(51, 204, 51);
doc.rect(216, 36, 75, 5,'FD');
doc.text(252,39,"พนักงานไวร์เมช (กะกลางคืน)","center");

doc.rect(136+n, 41, 15, 4,);
doc.text(143.5+n,44,"วัน/เดือน/ปี","center");
doc.rect(151+n, 41, 10, 4,);
doc.text(156+n,44,"ทั้งหมด","center");
doc.rect(161+n, 41, 10, 4,);
doc.text(166+n,44,"มาทำงาน","center");
doc.rect(171+n, 41, 10, 4,);
doc.text(176+n,44,"ลาป่วย","center");
doc.rect(181+n, 41, 10, 4,);
doc.text(186+n,44,"ล่ากิจ","center");
doc.rect(136+n, 41, 75, 4,);
doc.text(201+n,44,"หมายเหตุ","center");

doc.rect(136+n, 45, 15, 6,);
doc.text(143.5+n,48,moment(date).format('DD/MM/')+year_th_all.toString(),"center");
doc.rect(151+n, 45, 10, 6,);
doc.text(156+n,48,all_employee.toString(),"center");
doc.rect(161+n, 45, 10, 6,);
doc.text(166+n,48,night_shift.toString(),"center");
doc.rect(171+n, 45, 10, 6,);
doc.text(176+n,48,sick_leave.toString(),"center");
doc.rect(181+n, 45, 10, 6,);
doc.text(186+n,48,personal_leave.toString(),"center");
doc.rect(136+n, 45, 75, 6,);
doc.text(201+n,39,"","center");


doc.setFillColor(204, 0, 255);
doc.rect(136, 87, 75, 3,'FD');
doc.text(175,89,"รายการเบิกใช้วัตถุดิบ ณ วันที่"+" "+moment(date).format('DD-MM-').toString()+year_th_all.toString(),"center");

doc.setFillColor(153, 102, 255);
doc.rect(136, 90, 10, 6,'FD');
doc.text(141,93.5,"ลำดับ","center");
doc.setFillColor(153, 204, 255);
doc.rect(146, 90, 25, 6,'FD');
doc.text(158,93.5,"รายการหัวรีด (ใหม่)","center");

doc.setFillColor(204, 102, 255);
doc.rect(171, 90, 13, 3,'FD');
doc.text(178,92,"รับ","center");
doc.setFillColor(204, 102, 255);
doc.rect(171, 93, 13, 3,'FD');
doc.text(178,95,"(ลูก)","center");


doc.setFillColor(102, 255, 102);
doc.rect(184, 90, 13, 3,'FD');
doc.text(190,92,"จ่าย","center");
doc.setFillColor(102, 255, 102);
doc.rect(184, 93, 13, 3,'FD');
doc.text(190,95,"(ลูก)","center");

doc.setFillColor(153, 102, 255);
doc.rect(197, 90, 14, 3,'FD');
doc.text(204,92,"คงเหลือ","center");
doc.setFillColor(153, 102, 255);
doc.rect(197, 93, 14, 3,'FD');
doc.text(204,95,"(ลูก)","center");

var no1 = 1
var no2 = 1
var li = 0
var lo = 0
var amountsum1_1 = 0
var amountsum1_2 = 0
var amountsum2_1 = 0
var amountsum2_2 = 0
var sum_allsum1 = 0
var sum_allsum2 = 0
console.log(fg_data)
for (let your = 0; your < fg_data.length; your++) {
   var allsum = 0
   allsum = fg_data[your].amount_1 - fg_data[your].amount_2
   
    

    if (fg_data[your].blade_head === 1 ) {
        sum_allsum1 = sum_allsum1+ allsum
        amountsum1_1 = amountsum1_1+ fg_data[your].amount_1
        amountsum1_2 = amountsum1_2+ fg_data[your].amount_2
        doc.rect(136, 96+li, 10, 3);
        doc.text(141,98+li,no1.toString(),"center");
        doc.rect(146, 96+li, 25, 3);
        doc.text(158,98+li,fg_data[your].name.toString(),"center");
        doc.rect(171, 96+li, 13, 3);
        if (fg_data[your].amount_1 == null) {
            doc.text(178,98+li,"-".toFixed(2).toString(),"center");
        } else {
            doc.text(178,98+li,fg_data[your].amount_1.toFixed(2).toString(),"center");
        }
        
        doc.rect(184, 96+li, 13, 3);
        if (fg_data[your].amount_2 == null) {
            doc.text(178,98+li,"-".toFixed(2).toString(),"center");
        } else {
            doc.text(190,98+li,fg_data[your].amount_2.toFixed(2).toString(),"center");
        }
        doc.rect(197, 96+li, 14, 3);
        doc.text(204,98+li,allsum.toFixed(2).toString(),"center")
        li = li +3
        no1 = no1 +1
    } else if (fg_data[your].blade_head === 2 ) {
        sum_allsum2 = sum_allsum2+ allsum
        amountsum2_1 = amountsum2_1+ fg_data[your].amount_1
        amountsum2_2 = amountsum2_2+ fg_data[your].amount_2
        doc.rect(216, 96+lo, 10, 3); 
        doc.text(221,98+lo,no2.toString(),"center");
        doc.rect(226, 96+lo, 25, 3);
        doc.text(238,98+lo,fg_data[your].name.toString(),"center");
        doc.rect(251, 96+lo, 13, 3);
        if (fg_data[your].amount_1 == null) {
            doc.text(178,98+lo,"-".toFixed(2).toString(),"center");
        } else {
            doc.text(258,98+lo,fg_data[your].amount_1.toFixed(2).toString(),"center");
        }
        
        doc.rect(264, 96+lo, 13, 3);
        if (fg_data[your].amount_2 == null) {
            doc.text(178,98+lo,"-".toFixed(2).toString(),"center");
        } else {
            doc.text(270,98+lo,fg_data[your].amount_2.toFixed(2).toString(),"center");
        }
       
        doc.rect(277, 96+lo, 14, 3);
        doc.text(284,98+lo,allsum.toFixed(2).toString(),"center");
        lo = lo +3
        no2 = no2 +1
    }

    
}


 
    doc.setFillColor(153, 102, 255);
    doc.rect(136, 96+li, 10, 3,'FD'); 
    /* doc.text(140,97+li,"ลำดับ","center"); */
    doc.setFillColor(153, 204, 255);
    doc.rect(146, 96+li, 25, 3,'FD');
    doc.text(158,98+li,"รวม","center");
   doc.setFillColor(204, 102, 255);
    doc.rect(171, 96+li, 13, 3,'FD');
    doc.text(178,98+li,amountsum1_1.toFixed(2).toString(),"center");
   doc.setFillColor(153, 255, 102);
    doc.rect(184, 96+li, 13, 3,'FD');
    doc.text(190.5,98+li,amountsum1_2.toFixed(2).toString(),"center");
   doc.setFillColor(153, 102, 255);
    doc.rect(197, 96+li, 14, 3,'FD');
    doc.text(204,98+li,sum_allsum1.toFixed(2).toString(),"center");

    doc.setFillColor(153, 102, 255);
    doc.rect(216, 96+lo, 10, 3,'FD'); 
   /*  doc.text(140,97+li,"ลำดับ","center"); */
    doc.setFillColor(255, 255, 153);
    doc.rect(226, 96+lo, 25, 3,'FD');
    doc.text(238,98+lo,"รวม".toString(),"center");
   doc.setFillColor(255, 102, 102);
    doc.rect(251, 96+lo, 13, 3,'FD');
    doc.text(258,98+lo,amountsum2_1.toFixed(2).toString(),"center");
   doc.setFillColor(153, 204, 255);
    doc.rect(264, 96+lo, 13, 3,'FD');
    doc.text(270,98+lo,amountsum2_2.toFixed(2).toString(),"center");
   doc.setFillColor(230, 115, 0);
    doc.rect(277, 96+lo, 14, 3,'FD');
    doc.text(284,98+lo,sum_allsum2.toFixed(2).toString(),"center");




doc.setFillColor(153, 51, 255);
doc.rect(216, 87, 75, 3,'FD');
doc.text(253,89,"รายการเบิกใช้วัตถุดิบ ณ วันที่"+" "+moment(date).format('DD-MM-').toString()+year_th_all.toString(),"center");

doc.setFillColor(153, 102, 255);
doc.rect(216, 90, 10, 6,'FD');
doc.text(221,93.5,"ลำดับ","center");
doc.setFillColor(255, 255, 153);
doc.rect(226, 90, 25, 6,'FD');
doc.text(238,93.5,"รายการหัวรีด (ซ่อม)","center");

doc.setFillColor(255, 102, 102);
doc.rect(251, 90, 13, 3,'FD');
doc.text(258,92,"รับ","center");
doc.setFillColor(255, 102, 102);
doc.rect(251, 93, 13, 3,'FD');
doc.text(258,95,"(ลูก)","center");


doc.setFillColor(153, 204, 255);
doc.rect(264, 90, 13, 3,'FD');
doc.text(270,92,"จ่าย","center");
doc.setFillColor(153, 204, 255);
doc.rect(264, 93, 13, 3,'FD');
doc.text(270,95,"(ลูก)","center");

doc.setFillColor(230, 115, 0);
doc.rect(277, 90, 14, 3,'FD');
doc.text(284,92,"คงเหลือ","center");
doc.setFillColor(230, 115, 0);
doc.rect(277, 93, 14, 3,'FD');
doc.text(284,95,"(ลูก)","center");




   
rowall = rowall+7
     
if (index <= counts)
{  doc.addPage("l");}



}



      window.open(doc.output('bloburl'));
  
    
  }
  
  export default Wire_mace_STP;