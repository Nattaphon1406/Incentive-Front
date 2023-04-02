
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
//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function daily_sale_report(company,addressOEM,data,dataall,dataday,datadriver,date,oem,Oemlist,sale_data,hr_data,allvalue) {
 /*  console.log("hr",hr_data) */

  var oem_target = addressOEM.filter((e)=>{
    return e.oem_id === oem;
  })

  var name_oem_ = "";

if (oem_target[0].oem_name === "บริษัท สตูลค้าเหล็ก จำกัด") {

   name_oem_ = "SST";
}else if (oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) จำกัด") {

  name_oem_ = "STS";
}else if (oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) ปัตตานี จำกัด") {

  name_oem_ = "STP";
}else if (oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {

  name_oem_ = "STC";
}else if (oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด") {

  name_oem_ = "ST CIVIL";
}
/* console.log( name_oem_) */
 
 var sum_driverPerson = 0;
 var sum_holiday = 0;
 var sum_dont_come = 0;
 var sum_work_leave = 0;
 var sum_sick_leave = 0;
 var come_ = 0;
 var kick_off = 0;
 var reportdata = data
  
  if (reportdata < 1) {
    
 
    let loop = {bill_no: ""};
   
  reportdata.push(loop)

  }
 
  console.log("sss",reportdata)
  for(let hr of hr_data){
    if (hr.Company === name_oem_) {
    if(hr.Department === "ฝ่ายขนส่ง" || hr.Department === "ฝ่ายโลจิสติกส์" ){
      sum_driverPerson = sum_driverPerson + parseInt(hr.sum || 0);
      sum_holiday = sum_holiday + parseInt(hr.stop_leave || 0) + parseInt(hr.summer_leave || 0);
      sum_dont_come = sum_dont_come + parseInt(hr.dont_come || 0);
      sum_sick_leave = sum_sick_leave + parseInt(hr.sick_leave || 0);
      sum_work_leave = sum_work_leave + parseInt(hr.work_leave || 0);
      come_ = come_ + parseInt(hr.come || 0) + parseInt(hr.afternoon_phase || 0);
      kick_off = kick_off + parseInt(hr.resign || 0);
    }
  }
  }
  sum_driverPerson = sum_driverPerson - kick_off;
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

  var yo = 0
  if (datadriver.length < 1) {
  yo = 0
    
  }else{
    for (let index = 0; index < datadriver.length; index++) {
    var  remark ="";
    
    remark = datadriver[index].remark1;
    yo = yo+1
   
      
    }
  }
  console.log("ss",allvalue)


 var sum_pro = 0;
 sum_pro =  parseFloat(allvalue)

/* for (let index = 0; index < dataall.length; index++) {
  sum_pro = sum_pro + parseFloat(dataall[index].bill_values1 || 0);
  
} */


var datebill1 =  moment(date).add(-2,'month').startOf('month').startOf('day').format();
var datebill2 =  moment(date).add(-1,'day').endOf('day').format();


    
var sum_sale1 =0;
var sum_sale2 =0;
var sum_sale3 =0;

  /* for (let index = 0; index < dataday.length; index++) {
  
sum_sale1 = sum_sale1 + parseFloat(dataday[index].bill_values || 0);
  
}  */

for (let index = 0; index < data.length; index++) {

  if(data[index].delivery_bill > datebill1 && data[index].delivery_bill < datebill2) {
    sum_sale1 = sum_sale1 + parseFloat(data[index].bill_values || 0);
  }
 
   
 }
 console.log("ss",sum_sale1)
 console.log(datebill1)
 console.log(datebill2)
 for (let index = 0; index < sale_data.length; index++) {
  sum_sale2 = sum_sale2 + parseFloat(sale_data[index].sale_value || 0);
  
}
for (let index = 0; index < data.length; index++) {

  sum_sale3 = sum_sale3 + parseFloat(data[index].bill_values || 0);
  
}

var allsum = 0;
if (come_ ===  0 && yo === 0) {
  allsum = 0
}else{
  allsum = sum_pro/(come_+yo)
}

var loopend = 0;
for (let index = 0; index < reportdata.length; index++) {
  var bill = "";
 bill = reportdata[index].bill_no || "";
 loopend = loopend+1
}
loopend = loopend-12



  const doc = new jsPDF("l", "mm", "a4");
  
  var part_oem = Oemlist.filter((e2)=>{ return e2.id === oem;})

   var month_th = stock_month.filter((e)=>{ return e.eng === moment(date).format('MMMM');})
   var year_th =  parseInt(moment(date).format('yyyy')) +543;
   var counts = 0;
   var rowall = 0;
 
 
   for (let index = 0; index < reportdata.length; index = index + 12) {
     
  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  
  //รูป
  // var Com_logo = `${Configs.API_URL_IMG + company.logo_path}`;
  // doc.addImage(Com_logo, 'JPEG', 20, 10, 25, 25) // 
  
  doc.setFontSize(14);
  doc.text(23, 37, "รายงานบิลค้างส่งประจำวันที่");
  doc.text(67, 37,moment(date).format('DD').toString(),"center");
  doc.text(73, 37, "เดือน");
  doc.text(88, 37,month_th[0].th,"center");
  doc.text(96, 37, "พ.ศ.");
  doc.text(107, 37,year_th.toString(),"center");





/*   doc.text(23, 37, "รายงานบิลค้างส่งประจำวันที่");
  doc.text(73, 37, "เดือน");
  doc.text(95, 37, "พ.ศ."); */
  var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  doc.addImage(Com_logo, 'JPEG', 5, 5, 25, 25)
  doc.text(33, 19, oem_target[0].oem_name.toString(),"left");
  doc.text(33, 27, oem_target[0].address.toString(),"left");

  doc.text(33, 19, oem_target[0].oem_name.toString(),"left");
  doc.text(33, 27, oem_target[0].address.toString(),"left");

  doc.rect(7, 38, 10, 13);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13);
  doc.text(12, 46, "No.","center");
  doc.text(12, 46, "No.","center");

  doc.rect(17,38, 20, 13);
  doc.setTextColor(0, 0, 0);
 
  doc.text(27, 46, "เลขที่บิลขาย","center");
  doc.text(27, 46, "เลขที่บิลขาย","center");
  

  doc.rect(37,38,49, 13);
  doc.setTextColor(0, 0, 0);
  
  doc.text(60, 46, "ชื่อลูกค้า","center");
  doc.text(60, 46, "ชื่อลูกค้า","center");
  

  doc.rect(86,38, 25, 13);
  doc.setTextColor(0, 0, 0);
  
  doc.text(98, 46, "หน้างาน","center");
  doc.text(98, 46, "หน้างาน","center");
  

  doc.rect(111,38, 18, 13);
  doc.setTextColor(0, 0, 0);
  
  doc.text(120, 46, "วันที่ออกบิล","center");
  doc.text(120, 46, "วันที่ออกบิล","center");
  
  doc.rect(129,38, 20, 13);
  doc.text(139,46, "วันที่นัดส่งสินค้า","center");
  doc.text(139,46, "วันที่นัดส่งสินค้า","center");

  doc.rect(149,38, 14, 13);
  doc.setTextColor(0, 0, 0);
  doc.text(156, 43, "เวลา","center");
  doc.text(156, 43, "เวลา","center");
  doc.text(156, 49, "ออกบิล","center");
  doc.text(156, 49, "ออกบิล","center");

  doc.rect(163,38, 19, 13);
  doc.setTextColor(0, 0, 0);
  
  doc.text(172.5, 46, "มูลค่า","center");
  doc.text(172.5, 46, "มูลค่า","center");

  doc.rect(182,38, 24, 6);
  doc.rect(182,44, 12, 7);
  doc.rect(194,44, 12, 7);
  doc.text(194,43, "การจัดบิล","center");
  doc.text(188,49, "จัดเเล้ว","center");
  doc.text(200,49, "ไม่ได้จัด","center");
  doc.text(194,43, "การจัดบิล","center");
  doc.text(188,49, "จัดเเล้ว","center");
  doc.text(200,49, "ไม่ได้จัด","center");
  
  doc.rect(206,38, 11, 13);
  doc.text(211.5,46, "จน.คน","center");
  doc.text(211.5,46, "จน.คน","center");

  doc.rect(217,38, 14, 13);
  doc.text(224,46, "ทะเบียน","center");
  doc.text(224,46, "ทะเบียน","center");
  


  doc.rect(231,38, 12, 13); // ค่าเดิม 242
  doc.text(237,43, "น้ำหนัก","center");
  doc.text(237,49, "(ตัน)","center");
  doc.text(237,43, "น้ำหนัก","center");
  doc.text(237,49, "(ตัน)","center");

  doc.rect(243,38, 46, 13); //+15
  doc.text(265,46, "หมายเหตุ","center");
  doc.text(265,46, "หมายเหตุ","center");



 
  var row = 0;
  var rownum = 0;
  let count = 0;
  rownum = rownum +rowall
  
  for (let i = 0; row < 12 ; i = i + 12) {
    
   var bill_no = "";

   var customer_name = "";

   var bill_destination = "";
  
   var create_bill = "";
 
   var create_time = "";
  
   var bill_values = 0;

   var weight = 0;

   var is_pack = "";

   var plate_number = "";

   var delivery_bill = "";

   var remark_bill = "";
 

    if (!reportdata[index+row]) {


  }else{
    bill_no = reportdata[index+row].bill_no || "";
    customer_name = reportdata[index+row].customer_name || "";
    bill_destination = reportdata[index+row].bill_destination || "";

    if (reportdata[index+row].bill_no !== "" && reportdata[index+row].delivery_bill !== null  ) {
      delivery_bill =  moment(reportdata[index+row].delivery_bill).add('year',543).add('day',-1).format('DD/MM/YY')|| "";
  }else if (reportdata[index+row].bill_no === null && reportdata[index+row].delivery_bill === null) {
    delivery_bill ="";
  }
  
  if (reportdata[index+row].bill_no !== "" ) {
    create_bill = moment(reportdata[index+row].create_bill).add('year',543).format('DD/MM/YY') || "";
  }else if (reportdata[index+row].bill_no === null ) {
    
    create_bill ="";
  }
    
    create_time = reportdata[index+row].create_time || "";
    bill_values =  parseFloat(reportdata[index+row].bill_values || 0);
    
    weight =  parseFloat(reportdata[index+row].weight || 0);
    is_pack = reportdata[index+row].is_pack ;
    plate_number = reportdata[index+row].plate_number || "";
  
    remark_bill = reportdata[index+row].remark_bill || "";
  }
  doc.rect(7, 51+count, 10, 8);
  doc.text(12, 57+count, (rownum+1).toString(),"center");


  doc.rect(17,51+count, 20, 8);
 /*  doc.setFontSize(15); */
  doc.text(27, 57+count, bill_no.toString(),"center");




  doc.rect(37,51+count, 49, 8);
/*   doc.setFontSize(15); */
  doc.text(60,57+count, customer_name.toString(),"center");

  doc.rect(86,51+count, 25, 8);
 /*  doc.setFontSize(15); */
  doc.text(98, 57+count, bill_destination.toString(),"center");



  doc.rect(111,51+count, 18, 8)
/*   doc.setFontSize(15); */
  doc.text(120, 57+count, create_bill.toString(),"center");

  doc.rect(129,51+count, 20, 8);

 doc.text(140,57+count, delivery_bill.toString(),"center");

  doc.rect(149,51+count, 14, 8);
/*   doc.setFontSize(15); */
  doc.text(156,57+count, create_time.toString(),"center");

  doc.rect(163,51+count, 19, 8);
/*   doc.setFontSize(15); */
  if (bill_values === 0 && plate_number === "") {
    doc.text(181, 57+count,"","right");
  }else if (bill_values === 0 ){
    doc.text(181, 57+count,"0.00","right");
  }else{
     doc.text(181, 57+count, bill_values.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");}
 

  /*  doc.text(163,57+count,"FALSE","center"); */
   doc.rect(182,51+count, 12, 8);

  /*  doc.text(151,57+count, "TRUE","center"); */
   doc.rect(194,51+count, 12, 8);
 

 if (is_pack === false) {
   
  doc.setFontSize(25);
  doc.text(198.7,57+count,"/",5);
  doc.setFontSize(16);
  doc.text(197.7,57.3+count,"v");
  doc.text(197.7,57.3+count,"v");
  doc.text(197.7,57.3+count,"v");
  

 }  else if (is_pack === true){
  
  doc.setFontSize(25);
   doc.text(187.7,57+count,"/",5);
   doc.setFontSize(16);
   doc.text(186.7,57.3+count,"v");
   doc.text(186.7,57.3+count,"v");
   doc.text(186.7,57.3+count,"v");
 
 } else{
  doc.setFontSize(13);
  
 }
 doc.setFontSize(13);
 doc.text(224, 57+count, plate_number.toString(),"center");
/*  doc.setFontSize(15); */

/*  doc.setFontSize(15); */
 if (weight === 0 && plate_number === "") {
  doc.text(242,57+count,"","right");
}else if (weight === 0 ){
  doc.text(242, 57+count,"0.00","right");
}else{
 doc.text(242,57+count,  weight.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
}
/*  doc.setFontSize(15); */
 doc.text(245,57+count,  remark_bill.toString(),"left");
 

 
 
   doc.rect(206,51+count, 11, 8); 
  doc.rect(217,51+count, 14, 8);

  
  // doc.text(235,46, "วันที่ส่งสินค้า","center");
  doc.rect(231,51+count, 12, 8); // ค่าเดิม 24

  doc.rect(243,51+count, 46, 8); //+15
/*   doc.text(265,57+count,  remark.toString(),"center"); */
    count=count+8;


    if(index == 10){
      doc.rect(123,139, 22, 8);
      doc.rect(123,139, 22, 8);
    }
    row = row+1;
    rownum = rownum+1;
    counts = reportdata.length-12;

/*    console.log(rownum,row,index, counts)  */
   
  }
  doc.setTextColor(0, 0, 0);
/*   doc.setFontSize(14);
 */
 
  
rowall = rowall+12
     
            if (index < counts)
            {  doc.addPage("l");}

}
if ( reportdata.length >= loopend) {
  doc.text(40,154, "จน.พนักงานขนส่ง", "right");

doc.text(55,154, sum_driverPerson.toString(),"center");
doc.text(65,154, "คน");
doc.text(80,154, "จน.พนักงานเสริม");
doc.text(110,154, yo.toString(),"center");
doc.text(117,154, "คน");

// 2 รอบ


doc.text(40,161, "วันหยุด", "right");
doc.text(55,161, sum_holiday.toString(),"center");
doc.text(65,161, "คน");
doc.text(80,161, "สินค้า");
doc.text(104,161, "คน");

// 2
doc.text(40,168, "ขาด", "right"); //+7\
doc.text(55,168, sum_dont_come.toString(),"center");
doc.text(65,168, "คน");
doc.text(80,168, "อื่นๆ");
doc.text(104,168, "คน");

// 2


doc.text(40,175, "ลากิจ", "right");
doc.text(55,175, sum_work_leave.toString(),"center");
doc.text(65,175, "คน");
doc.text(80,175, "รวม");
doc.text(104,175, "คน");

//2



doc.text(40,182, "ลาป่วย", "right");
doc.text(55,182, sum_sick_leave.toString(),"center");
doc.text(65,182, "คน");

//2



doc.text(40,189, "จน.ที่มาทำงานวันนี้", "right");
doc.text(55,189, come_.toString(),"center");
doc.text(65,189, "คน");

doc.text(40,189, "จน.ที่มาทำงานวันนี้", "right");
doc.text(65,189, "คน");
//2
doc.text(24,196, "ลงชื่อ", "right");
doc.text(25,196, ".............................................", "left");
doc.text(65,196, "ผู้จัดทำ", "center");
doc.text(26,203, ".......................", "left");

doc.text(26,203, "ตำแหน่ง", "right");
doc.text(45,203, "ฝ่ายขนส่ง");

doc.text(24,196, "ลงชื่อ", "right");
doc.text(25,196, ".............................................", "left");
doc.text(65,196, "ผู้จัดทำ", "center");
doc.text(26,203, ".......................", "left");

doc.text(26,203, "ตำแหน่ง", "right");
doc.text(45,203, "ฝ่ายขนส่ง");
//2

doc.text(119,161, "เที่ยว");
doc.text(119,168, "เที่ยว");
doc.text(119,175, "เที่ยว");


doc.text(185,154, "มูลค่าค้างส่งยกมา","right");
doc.text(228,154,  sum_sale1.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
doc.text(230,154, "บาท","left");

doc.text(185,161, "ยอดขายวันนี้","right");
doc.text(228,161,  sum_sale2.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
doc.text(230,161, "บาท");

doc.text(185,168, "มูลค่ายอดค้างค่าส่งยกไปพรุ่งนี้","right");
doc.text(228,168,  sum_sale3.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
doc.text(230,168, "บาท");

doc.text(185,175, "มูลค่าสินค้าขนส่งวันนี้","right");
doc.text(228,175,  sum_pro.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
doc.text(230,175, "บาท");

doc.text(185,182, "KPI มูลค่าการขนส่ง","right");
doc.text(228,182,  allsum.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
doc.text(230,182, "บาท/คน/วัน");

doc.text(119,161, "เที่ยว");
doc.text(119,168, "เที่ยว");
doc.text(119,175, "เที่ยว");

doc.text(185,154, "มูลค่าค้างส่งยกมา","right");
doc.text(230,154, "บาท","left");

doc.text(185,161, "ยอดขายวันนี้","right");
doc.text(230,161, "บาท");

doc.text(185,168, "มูลค่ายอดค้างค่าส่งยกไปพรุ่งนี้","right");
doc.text(230,168, "บาท");

doc.text(185,175, "มูลค่าสินค้าขนส่งวันนี้","right");
doc.text(230,175, "บาท");

doc.text(185,182, "KPI มูลค่าการขนส่ง","right");
doc.text(230,182, "บาท/คน/วัน");
//2


doc.text(185,196, "ลงชื่อ", "right");
doc.text(184,196, "..........................................................", "left");
doc.text(230,196, "ผู้ตรวจสอบ");

doc.text(185,203, "ตำแหน่ง", "right");
doc.text(185,203, "...............................", "left");

doc.text(220,203, "ผู้จัดการทั่วไป","center");


doc.text(185,196, "ลงชื่อ", "right");
doc.text(184,196, "..........................................................", "left");
doc.text(230,196, "ผู้ตรวจสอบ");

doc.text(185,203, "ตำแหน่ง", "right");
doc.text(185,203, "...............................", "left");

doc.text(220,203, "ผู้จัดการทั่วไป","center");

}
  window.open(doc.output('bloburl'));

  
}


export default daily_sale_report;
