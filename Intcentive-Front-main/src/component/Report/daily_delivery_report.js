
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
function daily_delivery_report(company, addressOEM, data, date, oem, Oemlist) {
  var oem_target = addressOEM.filter((e)=>{ 
    return e.oem_id === oem;
  })
  var name_full = "";
  var name_oem_id = "";

  if (oem_target[0].oem_name === "บริษัท สตูลค้าเหล็ก จำกัด") {
  
    name_full ="บริษัท สตูลค้าเหล็ก จำกัด";
    name_oem_id = "SST";
  }else if (oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) จำกัด") {
  
    name_full ="บริษัท เอสทีสตีล(2001) จำกัด";
    name_oem_id = "STS";
  }else if (oem_target[0].oem_name === "บริษัท เอสทีสตีล(2001) ปัตตานี จำกัด") {
  
    name_full ="บริษัท เอสทีสตีล(2001) ปัตตานี จำกัด";
    name_oem_id = "STP";
  }else if (oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
  
    name_full ="บริษัท เอสที คอนกรีตโปรดักส์ จำกัด";
    name_oem_id = "STC";
  }else if (oem_target[0].oem_name === "บริษัท เอสทีซีวิล(2001) จำกัด") {
  
    name_full ="บริษัท เอสทีซีวิล(2001) จำกัด";
    name_oem_id = "ST CIVIL";
  }

 console.log("before",data)
 data.sort((a,b)=> a.plate_number.localeCompare(b.plate_number));
 console.log("after",data)
  if (data < 1) {
   
 
    let loop = {bill_no: "",
    bill_values: ""};
   
    data.push(loop)

  }


/*   console.log(";;",data) */
var now = 0
var nameall = [];
for (let index = 0; index < data.length; index ++) {

  if (data[index].nameall) {
    
  }
  nameall = data[index].nameall || ""
  now = now+1
}

/* console.log(nameall,"ss") */

  
  const doc = new jsPDF("l", "mm", "a4");
  var oem_target = addressOEM.filter((e) => {
    return e.oem_id === oem;
  })
  var part_oem = Oemlist.filter((e2) => { return e2.id === oem; })
 
/*   console.log("ข้อมูล",data); */

  var y = 0;
  var sum_value = 0;
  var sum_weight = 0;
  var counts = 0;
  for (let index = 0; index < data.length; index = index + 20) {

    

  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(12)

  //logo

  var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  doc.addImage(Com_logo, 'JPEG', 10, 5, 30, 30)







 

  doc.text(112, 42, moment(date).add('year', 543).format('DD/MM/yyyy').toString(), "center")




  doc.text(48, 15, oem_target[0].oem_name.toString())


  doc.text(48, 19, oem_target[0].address.toString())


   
  doc.setFontSize(18);
  //////////////////////////////////////////////
  doc.text(95, 30, "รายงานการตรวจสอบสินค้าและส่งสินค้าประจำวัน");
  doc.text(95, 30, "รายงานการตรวจสอบสินค้าและส่งสินค้าประจำวัน");



  doc.setFontSize(12)
  ///////////////////////////////////
  doc.text(9, 42, "ฝ่ายตรวจสอบ");
 


  doc.setFont("THSarabunNew");
  doc.text(46, 42, "ผู้รับผิดชอบ");
  doc.text(96, 42, "วันที่");

  //หัวข้อตาราง
  doc.rect(8, 44, 11, 14);
  doc.text(13, 50, "ลำดับ", "center");
  doc.text(13, 55, "เที่ยว", "center");

  doc.rect(8, 44, 26, 14);
  doc.text(27, 52, "เลขที่บิล", "center");

  doc.rect(8, 44, 76, 14);
  doc.text(59, 52, "รายการ", "center");

  doc.rect(8, 44, 90, 14);
  doc.text(91, 52, "มูลค่า", "center");


  if (oem_target[0].oem_name === "บริษัท เอสที คอนกรีตโปรดักส์ จำกัด") {
    doc.rect(8, 44, 104, 14);
    doc.text(105, 50, "จำนวนคิว", "center");
    doc.text(104, 55, " (คิว)", "center");
  } else {

    doc.rect(8, 44, 104, 14);
    doc.text(105, 50, "น้ำหนัก", "center");
    doc.text(104, 55, " (ตัน)", "center");

  }
  doc.rect(8, 44, 137, 14);
  doc.text(129, 52, "ลูกค้า", "center");

  doc.rect(8, 44, 159, 14);
  doc.text(156, 52, "หน้างาน", "center");

  doc.rect(8, 44, 172, 14);
  doc.text(173, 52, "ทะเบียน", "center");

  doc.rect(8, 44, 190, 14);
  doc.text(188, 52, "ผู้ส่ง", "center");

  doc.rect(8, 44, 202, 14);
  doc.text(204, 52, "ผู้ตรวจ", "center");

  doc.rect(8, 44, 226, 14);
  doc.text(222, 49, "เวลา", "center");

  doc.rect(210, 51, 12, 7);
  doc.rect(222, 51, 12, 7);
  doc.text(216, 55, "ออก", "center");
  doc.text(228, 55, "เข้า", "center");

/*   doc.rect(226, 51, 30, 7); */
  

  doc.rect(234, 44, 12, 14);
  doc.text(240, 52, "สถานะ", "center");
  // doc.rect(8,44,248,14);
  // doc.text(247,52,"สถานะ GPS","center");
  doc.rect(8, 44, 281, 14);
  doc.text(266, 52, "หมายเหตุ", "center");
  //กรอบล่างตาราง



  var ur = 0
 
 
  var num = 0;
  var row = 0;
 


  for (let i = 0; row < 20 ; i = i + 20) {

    
  

 
    var allremark = ""
    var delivery_sort = "";
    var bill_no = "";
    var product_and_category = "";
    var bill_values = "";
    var weight = "";
    var plate_number = "";
    var customer_name = "";
    var bill_destination = "";
    var nickname = "";
    var start_time = "";
    var finish_time = "";
    var approve_person ="";
    var remark = "";
    if (!data[index+row]) {
    
    }else{
        
    if(data[index+row].product_and_category && data[index+row].product_and_category.length > 0){
      for(let i =0; i < data[index+row].product_and_category.length;i++  /* of data[index+row].product_and_category1 || "" */){
        if(i+1 === data[index+row].product_and_category.length ){
          product_and_category += data[index+row].product_and_category[i].label;
        }else{
          product_and_category += data[index+row].product_and_category[i].label+ ",";
        }
       
      }
    }
    
    if(data[index+row].driver_persons.length > 0){
      for(let i =0; i < data[index+row].driver_persons.length;i++  /* of data[index+row].product_and_category1 || "" */){
        if(i+1 === data[index+row].driver_persons.length ){
          nickname += data[index+row].driver_persons[i].nickname || data[index+row].driver_persons[i].remark ;
        }else{
          nickname += (data[index+row].driver_persons[i].nickname || data[index+row].driver_persons[i].remark )+ ",";
        }
       
      }
    }
    
    
      delivery_sort = data[index+row].delivery_sort || "";
      bill_no = data[index+row].bill_no || "";
      if (data[index+row].bill_values !== ""   ) {
      bill_values = data[index+row].bill_values || 0;
    }
      sum_value = sum_value + parseFloat(bill_values);
      weight = data[index+row].weight || "ไม่ระบุ";
      sum_weight = sum_weight + parseFloat(weight);
      customer_name = data[index+row].customer_name || "";
      bill_destination = data[index+row].bill_destination || "";
      plate_number = data[index+row].plate_number || "";
      
      approve_person = data[index+row].approve_person || "";
      if (data[index+row].bill_no !== "" && data[index+row].start_time !== null ) {
      start_time = moment(data[index+row].start_time ).format('HH:mm น')
    }else{
      start_time = "";
    };
      if (data[index+row].bill_no !== "" && data[index+row].finish_time !== null ) {
      finish_time = moment(data[index+row].finish_time ).format('HH:mm น')
    }else{
      finish_time = "";
    };
    
      remark = data[index+row].remark || "";
    
     
    for (let i = 0; i < remark.length; i++) {
      if (i <40) {
        allremark += remark[i]
      } else 
      if (i == 41) {
        allremark += "..."
      }

    }
    console.log(allremark)
    
    }
     
    
    var merge_plate_number = data.filter((e)=>{
      return e.plate_number === plate_number;
    });
    
    /* var merge_delivery_sort = data.filter((e)=>{
      return e.delivery_sort === delivery_sort;
    }); */
    
    
    var merge_delivery_sort = data.filter((e)=>{
      return e.delivery_sort === delivery_sort && e.plate_number === plate_number;
    });
    /* console.log(merge_delivery_sort) */
    
    var len_y = merge_plate_number.length;
    
    
    var len_y_sort = merge_delivery_sort.length;
    //console.log(len_y,len_y_sort)
    
    if(row == 0){
      var yy_sort = 0 ;
    /*   console.log(delivery_sort) */
        if(len_y_sort+row > 19){ 
          var yy_sort = (len_y_sort+row) - 20;
    /*       console.log(delivery_sort,"   ",yy_sort) */
        }
    /*     console.log(delivery_sort,"   ",len_y_sort) */
        doc.rect(8, 58 + num, 11, 7*len_y_sort-(yy_sort*7));
    }
    
    /* console.log(delivery_sort) */
    
        doc.rect(19, 58 + num, 15, 7)
        doc.rect(34, 58 + num, 50, 7)
        doc.rect(84, 58 + num, 14, 7)
        doc.rect(98, 58 + num, 14, 7)
        doc.rect(112, 58 + num, 33, 7)
        doc.rect(145, 58 + num, 22, 7)
        /* if(plate_number === "80-3824"){
          console.log("row",row)
        } */
      if((data[index+row-1] && data[index+row-1].plate_number !== plate_number)){
    y = y+1
        
    /*     doc.setFillColor(153, 204, 255); */
    var yy = 0 ;
        if(len_y+row > 19){ 
          var yy = (len_y+row) - 20;
          console.log(plate_number,"   ",yy)
        }
        doc.rect(167, 58 + num, 13, 7*len_y-(yy*7))
      /*   console.log(len_y,"   ",yy) */
        doc.rect(8, 58 + num, 11, 7*len_y-(yy*7))
      }
    
      
      if((data[index+row-1] && data[index+row-1].delivery_sort !== delivery_sort  && data[index+row-1].plate_number == plate_number )){
        var yy_sort = 0 ;
        y = y+1
        if(len_y_sort+row > 19){ 
          var yy_sort = (len_y_sort+row) - 20;
         // console.log(delivery_sort,"   ",yy_sort)
        }
    /*     console.log(delivery_sort,"   ",yy_sort) */
        doc.rect(8, 58 + num, 11, 7*len_y_sort-(yy_sort*7))
    
      }
    
      if(!data[index+row]){
    
        doc.rect(8, 58 + num, 11, 7)
        doc.rect(167, 58 + num, 13, 7)
      }
    
        doc.rect(180, 58 + num, 18, 7)
        doc.rect(198, 58 + num, 12, 7)
        doc.rect(210, 58 + num, 12, 7)
        doc.rect(222, 58 + num, 12, 7)
        doc.rect(234,58+num,12,7)
        doc.rect(246, 58 + num, 43, 7)
    
    
    
    
        doc.setFontSize(10)
        if(!data[index+row-1]){
          doc.text(13.5, 62 + num, delivery_sort.toString(), "center")
          }
          if((data[index+row-1] && data[index+row-1].delivery_sort !== delivery_sort) || (row == 0 && index !== 0 )){
            doc.text(13.5, 62 + num, delivery_sort.toString(), "center")
            }
        doc.setFontSize(10)
        doc.text(27, 62 + num, bill_no.toString(), "center")
        doc.setFontSize(10)
        doc.text(59, 62 + num, product_and_category.toString(), "center")
        doc.setFontSize(10)
        doc.text(97, 62 + num, bill_values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "right")
        doc.setFontSize(10)
        doc.text(105, 62 + num, weight.toString(), "center")
        doc.setFontSize(10)
        doc.text(129, 62 + num, customer_name.toString(), "center")
        doc.setFontSize(10)
        doc.text(156, 62 + num, bill_destination.toString(), "center")
        doc.setFontSize(10)
        if(!data[index+row-1]){
          doc.text(173, 62 + num, plate_number.toString(), "center")
          }
        if((data[index+row-1] && data[index+row-1].plate_number !== plate_number) || (row == 0 && index !== 0 )){
        doc.text(173, 62 + num, plate_number.toString(), "center")
    
        doc.text(13.5, 62 + num, delivery_sort.toString(), "center")
        }
        doc.setFontSize(10)
         doc.text(189, 62 + num, nickname.toString(), "center") 
        doc.setFontSize(10)
         doc.text(204,62+num,approve_person.toString(),"center") //ผู้ตรวจ
        doc.setFontSize(10)
        doc.text(216, 62 + num, start_time.toString(), "center")
        doc.setFontSize(10)
        doc.text(228, 62 + num, finish_time.toString(), "center")
        doc.setFontSize(10)
        // //  doc.text(247,62+num,status_DTC.toString(),"center")
        //  doc.setFontSize(10)
        doc.text(248, 62 + num, allremark.toString(), "left")
    
    /*     console.log("row",row) */
       /*  y = y + sumY; */
        num = num + 7;
        row = row+1;
        counts = data.length-20;
     /*    console.log(row,index, counts)  */
    
      }


/* console.log(sum_value) */

/*   doc.setFontSize(12)
  doc.rect(84, 58 + num, 14, 7)
  doc.text(77, 63 + num, "รวม")
  if (sum_value !== NaN) {
    doc.setFontSize(10)
    doc.text(87, 63 + num, sum_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",", "right"))
  }else{
    doc.text(89, 63 + num, "".toString(), "right")
  }
  
  doc.setFontSize(12)
  doc.text(102, 63 + num, "บาท")
 */
//////////////////////////////

  
  if (index <= counts)
      {  doc.addPage("l");}

  }


  doc.setDrawColor(77, 77, 77); 
  doc.setFillColor(77, 77, 77);
  doc.setFontSize(18)
    doc.rect(8, 58 + num, 281, 8,'FD');
    doc.setDrawColor(255, 0, 0); 
    doc.setFillColor(255, 0, 0);
    doc.rect(8, 58 + num, 32, 8,'FD');
    doc.setTextColor(255, 255, 255);
    doc.text(23.5, 63 + num,"สรุป", "center")
    doc.text(23.5, 63 + num,"สรุป", "center")
    doc.text(23.5, 63 + num,"สรุป", "center")
  
    doc.setFontSize(13)
    doc.setDrawColor(255, 255, 255); 
    doc.setFillColor(255, 255, 255);
    doc.rect(41, 58.7 + num, 40, 6.5,'FD');
    doc.rect(82, 58.7 + num, 40, 6.5,'FD');
   
    doc.setTextColor(0, 0, 0);
    doc.text(60,  63 + num,"รวมจำนวนเที่ยว "+y+" เที่ยว", "center")
    doc.text(60,  63 + num,"รวมจำนวนเที่ยว "+y+" เที่ยว", "center")
    if (sum_value !== NaN) {
    doc.text(102,  63 + num,"รวมมูลค่า "+sum_value.toFixed(2)  .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" บาท", "center")
    doc.text(102,  63 + num,"รวมมูลค่า "+sum_value.toFixed(2)  .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" บาท", "center")
  
  }else{
    doc.text(102,  63 + num,"รวมมูลค่า "+"0"+" บาท", "center")
    doc.text(102,  63 + num,"รวมมูลค่า "+"0"+" บาท", "center")
  }
  if (name_oem_id === "STC") {
    doc.setDrawColor(255, 255, 255); 
    doc.setFillColor(255, 255, 255);
    doc.rect(123, 58.6 + num, 40, 6.5,'FD');
    if (sum_weight !== NaN) {
      doc.text(142,  63 + num,"จำนวนคิว "+sum_weight.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" คิว", "center")
      doc.text(142,  63 + num,"จำนวนคิว "+sum_weight.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" คิว", "center")
   
    }else{
      doc.text(142,  63 + num,"จำนวนคิว "+"0"+" คิว", "center")
      doc.text(142,  63 + num,"จำนวนคิว "+"0"+" คิว", "center")
    }
  } 
  
/*   doc.setProperties({
    title: "This is my title"
}); */

  window.open(doc.output('bloburl'));


}


export default daily_delivery_report;
