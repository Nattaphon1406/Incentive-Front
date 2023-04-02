
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


function Repair_Cost_Report(company,addressOEM, dataAll, date, oem, Oemlist, chary_pdf_repair_cost,chary_pdf_repair_cost2) {

/* console.log("dataAll: =",dataAll);
console.log("addressOEM = ",addressOEM);
console.log("date = ",date);
console.log("Oemlist = ",Oemlist);
console.log("oem = ",oem);

console.log("oem = ",oem); */



const doc = new jsPDF("l", "mm", "a4");

//   //console.log(oem_target)
//   console.log("ข้อมูล",data);
const stock_month = [
  {"th":"มกราคม","eng":"January"},
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
/* console.log("เดือนสเตก",stock_month); */
var oem_target = addressOEM.filter((e) => {
  return e.oem_id === oem;
})
var part_oem = Oemlist.filter((e2) => { return e2.id === oem; })
var month_th = stock_month.filter((e)=>{ return e.eng === moment(date).format('MMMM');})
var year_th =  parseInt(moment(date).format('yyyy')) +543;
var all_car = [];
var data = [];
var sumprice = [];
var sumMonth = [];
sumprice = dataAll.cheak;
all_car = dataAll.getplate;
/* console.log(dataAll.alldata) */
data = dataAll.alldata;


data.sort((a,b)=> a.plate_number.localeCompare(b.plate_number));
/* console.log(data) */
/* let sorted = response.data.sort((a, b) => b.amount - a.amount); */
//response.data.sort((a, b) => b.amount - a.amount);
sumMonth = dataAll.getsummonth;

/* console.log("sumMonth",sumMonth);
console.log("sumprice",sumprice); */
let name_oem_ = "";

if (oem_target[0].oem_name === "บจก.สตูลค้าเหล็ก จำกัด" || oem_target[0].oem_name === "บริษัท สตูลค้าเหล็ก จำกัด") {
  name_oem_ = "SST";
}else if (oem_target[0].oem_name  === "บจก.เอสทีสตีล(2001) จำกัด" || oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) จำกัด") {
 name_oem_ = "STS";
}else if (oem_target[0].oem_name  === "บจก.เอสทีสตีล(2001) ปัตตานี จำกัด" || oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) ปัตตานี จำกัด") {
 name_oem_ = "STP";
}else if (oem_target[0].oem_name  === "บจก.เอสที คอนกรีตโปรดักส์ จำกัด" || oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
 name_oem_ = "STC";
}else if (oem_target[0].oem_name  === "บจก.เอสทีซีวิล(2001) จำกัด" || oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด") {
 name_oem_ = "ST CIVIL";
}
/* console.log("oem_target",name_oem_);
console.log("oem_target2",oem_target[0].oem_name); */

var array = [];
var sumss = data;

for (let item of sumss){
 var check = array.filter((e)=>{return e.plate_number1 === item.plate_number && e.maintenance_number1 === item.maintenance_number});
 if (check.length > 0){
  var index5 = array.findIndex((e2)=> e2.plate_number1 === item.plate_number && e2.maintenance_number1 === item.maintenance_number);
  array[index5].price1 = array[index5].price1 + item.price;
 }else{
  var as = {
    plate_number1: item.plate_number,
    maintenance_number1: item.maintenance_number,
    price1: item.price,
  }                                                                                                       
  array.push(as);  
 }                                                                     
}


// let sumplate = 0;

var sum = 0;
var loopop = 0;

for(let i=0; i < data.length; i++) {
  console.log("price",data[i].price);
  sum = sum + data[i].price;
  loopop = loopop +1
}

var iloop = [];
var numo = 0;
var now = 0;

for( let i=0; i < sumprice.length; i++ ) {

  numo = sumprice[i] 
  iloop.push(numo)
  now = now + 1
}

// var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
//logo
  

//--------------------------------- PDF ----------------------------------
//------------------------------------------------------------------------
doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
doc.addFont('Rocki', 'bold');
doc.setFont("THSarabunNew");
doc.setFontSize(10)

doc.setFontSize(12);

doc.setTextColor(0, 0, 0);
doc.text(206, 17, "กราฟแสดงค่าซ่อม/อะไหล่   "+name_oem_.toString(), "center");
doc.text(206, 17, "กราฟแสดงค่าซ่อม/อะไหล่   "+name_oem_.toString(), "center");

doc.addImage(chary_pdf_repair_cost, 'JPEG', 159,22, 131, 65);
doc.addImage(chary_pdf_repair_cost2, 'JPEG', 159,90, 131, 65);


var row = 0;
var counts = 0;

if (data.length < 1) {
  
  for (let index = 0; index < sumprice.length; index = index + 25) {
    


var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;

if (oem_target[0].oem_name  === "บจก.เอสที คอนกรีตโปรดักส์ จำกัด" || oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
  doc.addImage(Com_logo, 'JPEG', 11, 7, 11, 10)
}else if (oem_target[0].oem_name  === "บจก.เอสทีซีวิล(2001) จำกัด" || oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด"){
  doc.addImage(Com_logo, 'JPEG', 11, 7, 11, 10)
}else{
  doc.addImage(Com_logo, 'JPEG', 9, 5, 14, 14)
}

// doc.addImage(Com_logo, 'JPEG', 5, 5, 25, 25)
doc.text(27, 12, oem_target[0].oem_name.toString(),"left");
doc.text(27, 12, oem_target[0].oem_name.toString(),"left");
doc.text(27, 16, oem_target[0].address.toString(),"left");
doc.text(27, 16, oem_target[0].address.toString(),"left");

doc.rect(10, 19, 119, 5); // แถวที่ 1 ตัวเเรก
doc.text(72, 23, "รายงานค่าใช้จ่ายในการซ่อมรถ " + name_oem_.toString(), "center");
doc.rect(10, 24, 119, 5); // ช่องแถวที่ 2
doc.text(72, 28, "ประจำเดือน"+month_th[0].th+"พ.ศ."+year_th.toString(), "center");

 
    doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.addFont('Rocki', 'bold');
    doc.setFont("THSarabunNew");
    doc.setFontSize(9)
    doc.setTextColor(0, 0, 0);
    // ส่วนเติม รถทั้งหมดของ STC ทางขวาก่อนกราฟ
    doc.rect(129, 19, 27, 5); //แถวที่ 1 เเยก ของรถทั้งหมด STC  +5
    doc.text(142, 23, "รถทั้งหมด" + " " +name_oem_.toString(), "center");
    doc.text(142, 23, "รถทั้งหมด" + " " +name_oem_.toString(), "center");
    
    doc.setFillColor(102, 102, 255);
    doc.rect(129, 24, 14, 5,'FD'); // ช่องแถวที่ 2 ทะเบียนรถ   แยก ของรถทังหมด STC
    if (name_oem_ === 'ST CIVIL'){
      doc.setFontSize(7.6);
      doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
      doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
    }else{
      doc.setFontSize(9);
      doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
      doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
    }
    
    doc.setFillColor(102, 102, 255);
    doc.rect(143, 24, 13, 5,'FD'); // ช่องแถวที่ 2 มูลค่า      แยก ของรถทังหมด STC 
    doc.text(149, 28, "มูลค่า", "center");
    doc.text(149, 28, "มูลค่า", "center");
    
    
    
    let num =0;
    // ทะเบียนรถทั้งหมดของ OEM นั้นๆ
    var row = 0;
    console.log(row,sumprice, counts) 
    /* for (let index1 = index; index1 < sumprice.length;  index1++) { */
    now = now-1
    for (let i = 0; row < 25 ; i = i + 25) {
       if (!sumprice[index+row] || sumprice[index+row] == now) {
    
    
    }else{ 
      console.log("ทดสอบ",sumprice[index+row].sumplate1)
    doc.rect(129, 29+num, 14, 5);
    doc.text(137, 33+num, sumprice[index+row].plate_number1.toString(),"center");
    doc.rect(143, 29+num, 13, 5);
    doc.text(155, 33+num, sumprice[index+row].sumplate1.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
    
    num = num+5;
    /*  counts=counts+12; */
    
    /* console.log(row,index1+row, counts)  */
    
    }
    row = row+1;
    counts = sumprice.length-25;
    /* for(let index2 = 0; index2 < sumprice.length; index2++){
    doc.rect(129, 29+num, 14, 5);
    doc.text(137, 33+num, sumprice[index2].plate_number1.toString(),"center");
    doc.rect(143, 29+num, 13, 5);
    doc.text(155, 33+num, sumprice[index2].sumplate1.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
    num = num+5
    }
    */
    /* } */
    }
    if (index <= counts)

    {  doc.addPage("l");}
    }
}else{
 
  var yall = 0;
  var counts = 0;
  var goloop = 0;
  var hookloop = 0;
  for (let index = 0; index < data.length; index = index + 25) {
  
    doc.setFontSize(12);
    var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  
    if (oem_target[0].oem_name  === "บจก.เอสที คอนกรีตโปรดักส์ จำกัด" || oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
      doc.addImage(Com_logo, 'JPEG', 11, 7, 11, 10)
    }else if (oem_target[0].oem_name  === "บจก.เอสทีซีวิล(2001) จำกัด" || oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด"){
      doc.addImage(Com_logo, 'JPEG', 11, 7, 11, 10)
    }else{
      doc.addImage(Com_logo, 'JPEG', 9, 5, 14, 14)
    }
   
  // doc.addImage(Com_logo, 'JPEG', 5, 5, 25, 25)
  doc.text(27, 12, oem_target[0].oem_name.toString(),"left");
  doc.text(27, 12, oem_target[0].oem_name.toString(),"left");
  doc.text(27, 16, oem_target[0].address.toString(),"left");
  doc.text(27, 16, oem_target[0].address.toString(),"left");
  
  doc.rect(10, 19, 119, 5); // แถวที่ 1 ตัวเเรก
  doc.text(72, 23, "รายงานค่าใช้จ่ายในการซ่อมรถ " + name_oem_.toString(), "center");
  doc.rect(10, 24, 119, 5); // ช่องแถวที่ 2
  doc.text(72, 28, "ประจำเดือน"+month_th[0].th+"พ.ศ."+year_th.toString(), "center");
  
  
  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(9)
  doc.setTextColor(0, 0, 0);
  // ส่วนเติม รถทั้งหมดของ STC ทางขวาก่อนกราฟ
  doc.rect(129, 19, 27, 5); //แถวที่ 1 เเยก ของรถทั้งหมด STC  +5
  doc.text(142, 23, "รถทั้งหมด" + " " +name_oem_.toString(), "center");
  doc.text(142, 23, "รถทั้งหมด" + " " +name_oem_.toString(), "center");
  
  doc.setFillColor(102, 102, 255);
  doc.rect(129, 24, 14, 5,'FD'); // ช่องแถวที่ 2 ทะเบียนรถ   แยก ของรถทังหมด STC
  if (name_oem_ === 'ST CIVIL'){
    doc.setFontSize(7.6);
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
  }else{
    doc.setFontSize(9);
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
  }
  
  doc.setFillColor(102, 102, 255);
  doc.rect(143, 24, 13, 5,'FD'); // ช่องแถวที่ 2 มูลค่า      แยก ของรถทังหมด STC 
  doc.text(149, 28, "มูลค่า", "center");
  doc.text(149, 28, "มูลค่า", "center");
  
  
  
  
  if (sumprice.length > index) {
    
    for (let dex = hookloop; dex < sumprice.length; dex = goloop + 25) {
     
    let num =0;
    // ทะเบียนรถทั้งหมดของ OEM นั้นๆ
    var rowx = 0;
    console.log(row,sumprice, counts) 
    
    now = now-1
      for (let i = 0; rowx < 25 ; i = i + 25) {
         if (!sumprice[dex+rowx] || sumprice[dex+rowx] == now) {
    
    
      }else{ 
        console.log("ทดสอบ",sumprice[dex+rowx].sumplate1)
      doc.rect(129, 29+num, 14, 5);
      doc.text(137, 33+num, sumprice[dex+rowx].plate_number1.toString(),"center");
      doc.rect(143, 29+num, 13, 5);
      doc.text(155, 33+num, sumprice[dex+rowx].sumplate1.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
    
      num = num+5;
     
    }
    rowx = rowx+1;
    goloop = sumprice.length-25;
    
      }
    }
    
   
  }
  
   
  
    
  var y_ = 0
  var suma = 0;
  var row = 0;
  var y = 0;
  
  for (let i = 0; row < 25 ; i = i + 25) {
  
    var logistic_car_id = "";
    var detail_order = "";
    var spare_part = "";
    var location_maintenance = "";
    var plate_number = "";
    var person_sirname_car = "";
    var maintenance_number = "";
    var price = 0;
    
  
  
  
  if (!data[index+row]) {
  
  }else{
    
    logistic_car_id = data[index+row].logistic_car_id || "";
    detail_order = data[index+row].detail_order || "";
    spare_part = data[index+row].spare_part || "";
    location_maintenance = data[index+row].location_maintenance || "";
    plate_number = data[index+row].plate_number || "";
    person_sirname_car = data[index+row].person_sirname_car || "";
    maintenance_number = data[index+row].maintenance_number || "";
    price = data[index+row].price;
  
    var check1 = array.filter((e5)=>{return e5.plate_number1 === data[index+row].plate_number /* && e5.maintenance_number1 === data[index3+row1].maintenance_number */});
    if(check1.length > 0){
      
      for(let i of check1){
        if (data[index+row].plate_number != i.plate_number) {
          suma = 0
        }
        suma += i.price1
      }
      
    }
    doc.setFontSize(7)
  doc.rect(10, 29+y, 6, 5 ); // no
  doc.text(13, 33 +y, (index+row+1).toString(),"center");
  
  var merge_logistic_car_id = data.filter((e)=>{
    return e.logistic_car_id === logistic_car_id;
  });
  
  var merge_plate_number = data.filter((e)=>{
    return e.plate_number === plate_number;
  });
  
  var merge_maintenance_number = data.filter((e)=>{
    return e.merge_maintenance_number === merge_maintenance_number;
  });
  
  var loopp_s_c = merge_logistic_car_id.length;
  var loopp_m = merge_plate_number.length;
  var loopm_n = merge_maintenance_number.length;
  console.log(row,"  ggg ",)
  if(index+row -1 >-1 ){
    var yy = 0 ;
    var yyp_s_c = 0 ;
    var yy_m_n = 0 ;
   
  if((data[index+row-1] && data[index+row-1].plate_number !== plate_number)){
  
      
    /*     doc.setFillColor(153, 204, 255); */
    
        if(loopp_m+row > 24){ 
          var yy = (loopp_m+row) - 25;
         /*  console.log(plate_number,"   ",yy) */
        }
        doc.rect(16, 29 + y, 10, 5*loopp_m -(yy*5))
        doc.rect(16, 29 + y, 113, 5*loopp_m -(yy*5))
      
      }
      
      if((data[index+row-1] && data[index+row-1].logistic_car_id !== logistic_car_id  ) ){
  
        console.log(row,"   ",yyp_s_c)
     
        
            if(loopp_s_c+row > 24){ 
              var yyp_s_c = (loopp_s_c+row) - 25;
              console.log(person_sirname_car,"   ",yyp_s_c)
            }
            console.log(row,loopp_s_c,yyp_s_c,"ddd")
            doc.rect(26, 29 + y, 10, 5*loopp_s_c -(yyp_s_c*5))
            doc.rect(116, 29 + y, 13, 5*loopp_s_c -(yyp_s_c*5))
        
          
          }
      
      if((data[index+row-1] && data[index+row-1].maintenance_number !== maintenance_number )){
  
      
       
            if(loopm_n+row > 24){ 
              var yy_m_n = (loopm_n+row) - 25;
             /*  console.log(maintenance_number,"   ",yy_m_n) */
            }
            doc.rect(36, 29 + y, 10, 5*loopm_n -(yy_m_n*5))
            
          
          }
  
    }else{
      var loopfor = loopp_s_c;
      
        doc.rect(16, 29 + y, 10, 5*loopfor)
        doc.rect(16, 29 + y, 113, 5*loopfor)
        doc.rect(26, 29 + y, 10, 5*loopfor)
        doc.rect(116, 29 + y, 13, 5*loopfor)
        doc.rect(36, 29 + y, 10, 5*loopfor)
    }
    console.log(loopp_m,loopp_s_c,loopm_n,"   sssa",)
    if(!data[index+row-1]){
      doc.text(31, 33 + y, person_sirname_car.toString(), "center")
      doc.text(128.6,33+y, suma.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
       }
     if((data[index+row-1] && data[index+row-1].person_sirname_car !== person_sirname_car) || (row == 0 && index !== 0  )){
      doc.text(31, 33 + y, person_sirname_car.toString(), "center")
      doc.text(128.6,33+y, suma.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
      }
   
   /* 
   doc.rect(16, 29 + y, 10, 5);//ทะเบียน
   doc.text(21, 33 + y, (plate_number).toString(), "center"); */
   if(!data[index+row-1]){
     doc.text(21, 33 + y, plate_number.toString(), "center")
     }
   if((data[index+row-1] && data[index+row-1].plate_number !== plate_number) || (row == 0 && index !== 0 )){
   doc.text(21, 33 + y, plate_number.toString(), "center")
   
   }
   
   /* doc.rect(36, 29 + y, 10, 5); // เลขที่บิล
   doc.text(41, 33 + y, (maintenance_number).toString(),"center"); */
   if(!data[index+row-1]){
     doc.text(41, 33 + y, maintenance_number.toString(), "center")
     }
   if((data[index+row-1] && data[index+row-1].maintenance_number !== maintenance_number) || (row == 0 && index !== 0 )){
   doc.text(41, 33 + y, maintenance_number.toString(), "center")
   
   }
   doc.rect(46, 29 + y, 57, 5); // รายการซ่อม
   
   doc.text(47, 33 + y, detail_order.toString()+"/"+spare_part.toString()+"/"+location_maintenance.toString(),"left");
   doc.rect(103,29 + y, 13, 5); // มูลค่า
   doc.text(115,33 + y, price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
   
  
  
  }
  
  
  
    
  
  /*     console.log("row",row) */
   /*  y = y + sumY; */
    y = y + 5;
    row = row+1;
    counts = data.length-25;
    
     console.log(row,y, counts,"dsd") 
  
  }
  
  console.log(row,"zzzzzz") 
  if (yall < 26 && data.length < 26) {
    
  var yx_ = (5*((row+counts)-1))
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8 );
    doc.rect(103, 29+ yx_+5 , 13, 5); // มูลค่า
    doc.text(110, 33+ yx_+5 , "รวมมูลค่า", "center");
    doc.rect(116,29+ yx_+5 , 13, 5); // รวมคัน
    doc.setTextColor(255, 51, 0);
    doc.text(128, 33+ yx_+5, sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "right");
    
  }
  
  
  
   y_ = (5*(counts-1))
  if(index == yall && index !== 0  ){
    doc.rect(26, 29 , 10, 5+y_ )
    doc.rect(36, 29 , 10, 5+y_)
    doc.rect(116, 29 , 13, 5+y_ )
  
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8 );
    doc.rect(103, 29+ y_+5 , 13, 5); // มูลค่า
    doc.text(110, 33+ y_+5 , "รวมมูลค่า", "center");
    
    doc.rect(116,29+ y_+5 , 13, 5); // รวมคัน
    doc.setTextColor(255, 51, 0);
    doc.text(128, 33+ y_+5, sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "right");
    /* console.log(sum_value) */
    }
  
   
  
  
  yall  = yall + 25
  
  if (index <= counts || hookloop <= goloop)
  
      {  hookloop= hookloop+25;
         doc.addPage("l");}
  
  }
  
              ////////////////////////////////
  
  if (data.length < 25) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  
    if (oem_target[0].oem_name  === "บจก.เอสที คอนกรีตโปรดักส์ จำกัด" || oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
      doc.addImage(Com_logo, 'JPEG', 11, 7, 11, 10)
    }else if (oem_target[0].oem_name  === "บจก.เอสทีซีวิล(2001) จำกัด" || oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด"){
      doc.addImage(Com_logo, 'JPEG', 11, 7, 11, 10)
    }else{
      doc.addImage(Com_logo, 'JPEG', 9, 5, 14, 14)
    }
   
  // doc.addImage(Com_logo, 'JPEG', 5, 5, 25, 25)
  doc.text(27, 12, oem_target[0].oem_name.toString(),"left");
  doc.text(27, 12, oem_target[0].oem_name.toString(),"left");
  doc.text(27, 16, oem_target[0].address.toString(),"left");
  doc.text(27, 16, oem_target[0].address.toString(),"left");
  
  doc.rect(10, 19, 119, 5); // แถวที่ 1 ตัวเเรก
  doc.text(72, 23, "รายงานค่าใช้จ่ายในการซ่อมรถ " + name_oem_.toString(), "center");
  doc.rect(10, 24, 119, 5); // ช่องแถวที่ 2
  doc.text(72, 28, "ประจำเดือน"+month_th[0].th+"พ.ศ."+year_th.toString(), "center");
    
  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(9)
  doc.setTextColor(0, 0, 0);
  // ส่วนเติม รถทั้งหมดของ STC ทางขวาก่อนกราฟ
  doc.rect(129, 19, 27, 5); //แถวที่ 1 เเยก ของรถทั้งหมด STC  +5
  doc.text(142, 23, "รถทั้งหมด" + " " +name_oem_.toString(), "center");
  doc.text(142, 23, "รถทั้งหมด" + " " +name_oem_.toString(), "center");
  
  doc.setFillColor(102, 102, 255);
  doc.rect(129, 24, 14, 5,'FD'); // ช่องแถวที่ 2 ทะเบียนรถ   แยก ของรถทังหมด STC
  if (name_oem_ === 'ST CIVIL'){
    doc.setFontSize(7.6);
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
  }else{
    doc.setFontSize(9);
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
    doc.text(136, 28, "ทะเบียน " + name_oem_.toString(), "center");
  }
  
  doc.setFillColor(102, 102, 255);
  doc.rect(143, 24, 13, 5,'FD'); // ช่องแถวที่ 2 มูลค่า      แยก ของรถทังหมด STC 
  doc.text(149, 28, "มูลค่า", "center");
  doc.text(149, 28, "มูลค่า", "center");
  
    
    for (let dex = hookloop; dex < sumprice.length; dex = goloop + 25) {
     
    let num =0;
    // ทะเบียนรถทั้งหมดของ OEM นั้นๆ
    var rowx = 0;
    console.log(row,sumprice, counts) 
    
    now = now-1
      for (let i = 0; rowx < 25 ; i = i + 25) {
         if (!sumprice[dex+rowx] || sumprice[dex+rowx] == now) {
    
    
      }else{ 
        console.log("ทดสอบ",sumprice[dex+rowx].sumplate1)
      doc.rect(129, 29+num, 14, 5);
      doc.text(137, 33+num, sumprice[dex+rowx].plate_number1.toString(),"center");
      doc.rect(143, 29+num, 13, 5);
      doc.text(155, 33+num, sumprice[dex+rowx].sumplate1.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"right");
    
      num = num+5;
     
    }
    rowx = rowx+1;
    goloop = sumprice.length-25;
    
      }
    }
  
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8 );
    doc.rect(103, 29 , 13, 5); // มูลค่า
    doc.text(110, 33, "รวมมูลค่า", "center");
    
    doc.rect(116,29 , 13, 5); // รวมคัน
    doc.setTextColor(255, 51, 0);
    doc.text(128, 33, sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "right");
    
  }
  
  
}







// ตารางล่างรายชื่อ เดือน ==========
doc.setFillColor(0, 0, 0);
doc.rect(28,  166, 12, 5);
doc.text(34, 170, "เดือน", "center");

doc.rect(40,  166, 12, 5); 
doc.text(46, 170, "ม.ค.", "center");

doc.rect(52,  166, 12, 5); 
doc.text(58, 170, "ก.พ.", "center");

doc.rect(64,  166, 12, 5); 
doc.text(70, 170, "มี.ค.", "center");

doc.rect(76,  166, 12, 5); 
doc.text(82, 170, "เม.ย.", "center");

doc.rect(88,  166, 12, 5); 
doc.text(94, 170, "พ.ค.", "center");

doc.rect(100, 166, 12, 5); 
doc.text(106, 170, "มิ.ย.", "center");

doc.rect(112, 166, 12, 5); 
doc.text(118, 170, "ก.ค.", "center");

doc.rect(124, 166, 12, 5); 
doc.text(130, 170, "ส.ค.", "center");

doc.rect(136, 166, 12, 5); 
doc.text(142, 170, "ก.ย.", "center");

doc.rect(148, 166, 12, 5); 
doc.text(154, 170, "ต.ค.", "center");

doc.rect(160, 166, 12, 5); 
doc.text(166, 170, "พ.ย.", "center");

doc.rect(172, 166, 12, 5); 
doc.text(178, 170, "ธ.ค.", "center");

doc.rect(184, 166, 12, 5); 
doc.text(190, 170, "เฉลี่ย/เดือน", "center");
// ======================================================

// ตารางล่างแถว 2 ชื่อ OEM ราคา ========================================
doc.rect(28, 171, 12, 5); 
doc.text(34, 175,name_oem_.toString(), "center");
let countmonth = 0;
var p = 0;
var sum1 = 0;
var sum2 = 0;
var sum3 = 0;
var sum4 = 0;
var sum5 = 0;
var sum6 = 0;
let date1 = 1;
let date2 = 3;
let date3 = 4;
let date4 = 6;
let date5 = 7;
let date6 = 9;
let date7 = 10;
let date8 = 11;

let date9 = 1;
let date10 = 12;

let date11 = 1;
let date12 = 12;

var trimat1 = sumMonth.filter((t1)=>{return date1 <= moment(t1.month) && moment(t1.month) <= date2 });
for(let l of trimat1){
  sum1 = sum1 + l.price;
}
var trimat2 = sumMonth.filter((t1)=>{return date3 <= moment(t1.month) && moment(t1.month) <= date4 });
for(let l of trimat2){
  sum2 = sum2 + l.price;
}
var trimat3 = sumMonth.filter((t1)=>{return date5 <= moment(t1.month) && moment(t1.month) <= date6 });
for(let l of trimat3){
  sum3 = sum3 + l.price;
}
var trimat4 = sumMonth.filter((t1)=>{return date7 <= moment(t1.month) && moment(t1.month) <= date8 });
for(let l of trimat4){
  sum4 = sum4 + l.price;
}
var trimat5 = sumMonth.filter((t1)=>{return date9 <= moment(t1.month) && moment(t1.month) <= date10 });
for(let l of trimat5){
  sum5 = sum5 + l.price /12;
}
var trimat6 = sumMonth.filter((t1)=>{return date11 <= moment(t1.month) && moment(t1.month) <= date12 });
for(let l of trimat6){
  sum6 = sum6 + l.price;
}

/* console.log("sum1",sum1);
console.log("sum2",sum2);
console.log("sum3",sum3);
console.log("sum4",sum4);
console.log("sum5",sum5); */


  for(let item4 = 0; item4 < sumMonth.length; item4++){
      countmonth = sumMonth[item4].price;
    doc.text(46 + p, 175, countmonth.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"center");
    p = p+12;
  }

 


doc.rect(40,  171, 12, 5); 
// doc.text(46, 175, "มกราคม","center");
doc.rect(52,  171, 12, 5); 

doc.rect(64,  171, 12, 5); 
// doc.text(70, 175, "มีคม","center")
doc.rect(76,  171, 12, 5); 
// doc.text(82.50, 175, "เมษยม","center")
doc.rect(88,  171, 12, 5); 
// doc.text(94, 175, "พสภา","center")
doc.rect(100, 171, 12, 5); 
// doc.text(106, 175, "มิถุนา","center")
doc.rect(112, 171, 12, 5); 
// doc.text(118, 175, "กรกคม","center")
doc.rect(124, 171, 12, 5); 
// doc.text(130, 175, "สิงคม","center")
doc.rect(136, 171, 12, 5); 
// doc.text(143, 175, "กันยา","center")
doc.rect(148, 171, 12, 5); 
// doc.text(154, 175, "ตุลาคม","center")
doc.rect(160, 171, 12, 5); 
// doc.text(166, 175, "พศจิการ","center")
doc.rect(172, 171, 12, 5); 
// doc.text(178, 175, "ธันวาคม","center")


doc.setFillColor(128,128,128);
doc.rect(184, 171, 12, 5,'FD'); 
// ============================================================
  doc.text(190, 175, sum5.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"center");


// ตารางล่างแถว 3-4 รวม กับ ไตรมาส
doc.rect(28,  176, 12, 5); 
doc.setTextColor(255, 51, 0);
doc.text(34, 180, "รวม", "center");
doc.text(34, 180, "รวม", "center");
doc.setTextColor(0, 0, 0);

doc.setFillColor(128,128,128);
doc.rect(40,  176, 36, 5,'FD'); 
doc.rect(76,  176, 36, 5,'FD'); 
doc.rect(112, 176, 36, 5,'FD'); 
doc.rect(148, 176, 36, 5,'FD'); 
doc.rect(184, 176, 12, 5,'FD'); 

doc.text(59, 180, sum1.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "center");
doc.text(94, 180, sum2.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "center");
doc.text(133, 180, sum3.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "center");
doc.text(164, 180, sum4.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(), "center");
doc.text(190, 180, sum6.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString(),"center");
doc.rect(40,  181, 36, 5,); 
doc.text(57, 185, "ไตรมาสที่ 1", "center");

doc.rect(76,  181, 36, 5,); 
doc.text(93, 185, "ไตรมาสที่ 2", "center");
doc.rect(112, 181, 36, 5,); 
doc.text(130, 185, "ไตรมาสที่ 3", "center");
doc.rect(148, 181, 36, 5,); 
doc.text(162, 185, "ไตรมาสที่ 4", "center");


// doc.text(107, 37,plate_number.toString(),"center");

// if (index3 <= y)
// { doc.addPage("l");}

  window.open(doc.output('bloburl'));


}


export default Repair_Cost_Report;
