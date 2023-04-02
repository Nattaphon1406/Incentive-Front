
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
import Chart from "react-google-charts";
import html2canvas from "html2canvas";

function monthly_fuel_consumption_summary(company,addressOEM,data,dataall,datasale,datasaleall,date,oem,Oemlist,fuelday,chart_url) {
/* console.log(chart_url) */
console.log("ss",data)
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

 
 
    const doc = new jsPDF("6", "mm", "a4");
   
  /*   console.log( "d",data)
    console.log( "dd",dataall) */
   
    var part_oem = Oemlist.filter((e2)=>{ return e2.id === oem;})
    var month_th = stock_month.filter((e)=>{ return e.eng === moment(date).format('MMMM');})
   var year_th =  parseInt(moment(date).format('yyyy')) +543;
   var counts = 0;



  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(15)

  
  var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  doc.addImage(Com_logo, 'JPEG', 5, 5, 25, 25)
  doc.text(100,25,"รายงานสรุปอัตราการใช้น้ำมันประจำเดือน"+" "+month_th[0].th+" "+year_th,"center");
  doc.text(100,25,"รายงานสรุปอัตราการใช้น้ำมันประจำเดือน"+" "+month_th[0].th+" "+year_th,"center");
  doc.text(100,25,"รายงานสรุปอัตราการใช้น้ำมันประจำเดือน"+" "+month_th[0].th+" "+year_th,"center");

 
  doc.setFontSize(11)

  doc.setDrawColor(255, 255, 0); 
  doc.setFillColor(255, 255, 0);
  doc.rect(8,35,195,8,'FD');



  doc.setDrawColor(204, 204, 255); 
  doc.setFillColor(204, 204, 255);
  doc.setTextColor(0, 0, 0);
  doc.rect(8,35,48,8,'FD');
  
 
  doc.setFillColor(153, 153, 255);
  doc.setTextColor(0, 0, 0);
  doc.rect(8,35,20,8);
  doc.text(17,40,"ทะเบียนรถ","center");
  doc.text(17,40,"ทะเบียนรถ","center");
  doc.text(17,40,"ทะเบียนรถ","center");

  doc.setFillColor(153, 153, 255);
  doc.setTextColor(0, 0, 0);
  doc.rect(8,35,40,8);

  doc.text(34,40,"ประเภทรถ","center");
  doc.text(34,40,"ประเภทรถ","center");
  doc.text(34,40,"ประเภทรถ","center");
  
  doc.text(48,40,"สาขา","center");
  doc.text(48,40,"สาขา","center");
  doc.text(48,40,"สาขา","center");

  doc.text(67,40,"ใช้น้ำมันไป/L","center");
  doc.text(67,40,"ใช้น้ำมันไป/L","center");
  doc.text(67,40,"ใช้น้ำมันไป/L","center");

  doc.text(90,40,"ระยะทางที่วิ่งได้/Km","center");
  doc.text(90,40,"ระยะทางที่วิ่งได้/Km","center");
  doc.text(90,40,"ระยะทางที่วิ่งได้/Km","center");

  doc.setDrawColor(204, 153, 255); 
  doc.setFillColor(204, 153, 255);
  doc.setTextColor(0, 0, 0);
  doc.rect(105,35,10,8,'FD');
  doc.text(110,40,"kpi","center");
  doc.text(110,40,"kpi","center");
  doc.text(110,40,"kpi","center");
   
  doc.text(132,40,"อัตตราการสิ้นเปลือง Km/L","center");
  doc.text(132,40,"อัตตราการสิ้นเปลือง Km/L","center");
  doc.text(132,40,"อัตตราการสิ้นเปลือง Km/L","center");

  doc.text(169,40,"ผลการประเมินเทียบกับ KPI","center");
  doc.text(169,40,"ผลการประเมินเทียบกับ KPI","center");
  doc.text(169,40,"ผลการประเมินเทียบกับ KPI","center");

  doc.text(195,40,"ลิตร","center");
  doc.text(195,40,"ลิตร","center");
  doc.text(195,40,"ลิตร","center");

  if (data.length < 5) {
    doc.setFillColor(204, 153, 255);
    doc.setDrawColor(204, 153, 255); 
    doc.setTextColor(0, 0, 0);
     doc.rect(105,48,10,63,'FD'); 
  }else{

  }


  var checkp_n  = ""
  var fuel_all = 0;
  var num = 0
  var kpi_all_tabal = 0;
  for(let index = 0; index < data.length; index++){

    var plate_number = "";
    var name = "";
    var fuel_efficiency = 0;
    var name_oem_ = "";
    var mileage = 0;
    var kpi = "";
    var fuel_mileage = 0;
    var kpi_all = 0;
   var mileage_number2 = [];
   var arrayx = [];
 
    var mileage_monthday = 0;
    var mileage_monthofday = 0;

    plate_number = data[index].plate_number1 || "";
    name = data[index].name1 || "";

if (data[index].oem_name_id1 === "บจก.สตูลค้าเหล็ก") {

   name_oem_ = "SST";
}else if (data[index].oem_name_id1  === "บจก.เอสทีสตีล(2001)") {

  name_oem_ = "STS";
}else if (data[index].oem_name_id1  === "บจก.เอสทีสตีล(2001) ปัตตานี") {

  name_oem_ = "STP";
}else if (data[index].oem_name_id1  === "บจก.เอสที คอนกรีตโปรดักส์") {

  name_oem_ = "STC";
}else if (data[index].oem_name_id1  === "บจก.เอสทีซีวิล(2001)") {

  name_oem_ = "ST CIVIL";
}


    fuel_efficiency = 0
    fuel_efficiency =  parseFloat(data[index].liter1 || 0);
    console.log(checkp_n, "sxss",fuel_efficiency,data[index].liter1 )
  
  checkp_n = data[index].plate_number1 
fuel_all = fuel_all +  parseFloat(fuel_efficiency);

  mileage_number2 = data[index].mileage_number2 
  var sum_mileage = 0;
  console.log( data[index].mileage_number2 ,"Sss")
  for (let item of mileage_number2){
    var chcekname = item.plate_number
    var mileage_numbermonth =0;
    var check = arrayx.filter((e)=>{return e.plate_number1 === chcekname });
            if (check.length > -1 && chcekname === data[index].plate_number1){
             var index5 = arrayx.findIndex((e2)=> e2.plate_number1 === chcekname );
           
           sum_mileage = sum_mileage + parseFloat(item.mileage_number)
           console.log(chcekname,"เช็คzzz",sum_mileage,parseFloat(item.mileage_number))
            }
             if (chcekname === item.plate_number1) {
              sum_mileage = sum_mileage + parseFloat(item.mileage_number)
             }
            /*  console.log(chcekname,"เช็คzzzxxx",sum_mileage) */
                mileage_numbermonth = parseFloat(sum_mileage)
              
             
              var as = {
                plate_number1: item.plate_number ,
                chacksummonth: mileage_numbermonth
    
    
            }
            arrayx.push(as);
            if (chcekname !== data[index].plate_number1) {
            sum_mileage = 0
          } 
  }


console.log(mileage,"เช็ค",data[index].mileage_number1 )


  mileage_monthday = parseFloat(data[index].mileage_number1 || 0  ) 
  if (arrayx.length > 0) {
    for (let item of arrayx){
      if (item.plate_number1 === data[index].plate_number1) {
        mileage_monthofday = item.chacksummonth 
        console.log(mileage,"เช็คzzzasa",item.chacksummonth,mileage_monthday  )
        mileage = parseFloat(mileage_monthday - mileage_monthofday);
      /*   console.log(mileage,"เช็คs",mileage_monthofday,mileage_monthday) */
      }else{
        mileage = parseFloat(mileage_monthday - mileage_monthofday);
      }
      
        }
  } else {
    mileage = parseFloat(mileage_monthday - mileage_monthofday);
  }
 
  
console.log(mileage,"ssaaa" )
if (fuel_efficiency !== 0) {
  fuel_mileage = mileage / fuel_efficiency ;
}else{
  fuel_mileage = 0
}
 
  kpi = data[index].kpi1 || "-"; 
/*   console.log(kpi) */
if (kpi === "-") {
  kpi_all = 0
}else{
 
  kpi_all = parseFloat(((fuel_mileage - kpi) * fuel_efficiency) / kpi);
}
 kpi_all_tabal = kpi_all_tabal + kpi_all
  


doc.setFontSize(11)
doc.setTextColor(0, 0, 0);
doc.text(17,48+num,plate_number.toString(),"center");
doc.setTextColor(0, 0, 0);
doc.text(34,48+num,name.toString(),"center");
doc.setTextColor(0, 0, 0);
doc.text(48,48+num,name_oem_.toString(),"center");
doc.setTextColor(0, 0, 0);
doc.text(66,48+num,fuel_efficiency.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center");
doc.setTextColor(0, 0, 0);
doc.text(90,48+num,mileage.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center");
  doc.setDrawColor(204, 153, 255); 
  doc.setFillColor(204, 153, 255);
  doc.setTextColor(0, 0, 0);
  doc.rect(105,43+num,10,8,'FD');
 
if (fuel_mileage === Infinity) {
doc.text(132,48+num,"0","center");
}else{
  doc.text(132,48+num,fuel_mileage.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center");
}
doc.text(110,48+num,kpi.toString(),"center");
doc.setTextColor(0, 0, 0);

 if (kpi_all > 0) {

  doc.setFillColor(26, 255, 26);
  doc.setDrawColor(26, 255, 26); 
  doc.setTextColor(0, 0, 0);
  doc.rect(155,43+num,28,8,'FD'); 
  doc.text(169,48+num,"ประหยัดน้ำมัน".toString(),"center"); 


 }else
 if (kpi_all < 0) {
  doc.setDrawColor(255, 26, 26); 
  doc.setFillColor(255, 26, 26);
  doc.setTextColor(0, 0, 0);
  doc.rect(155,43+num,28,8,'FD'); 
  doc.text(169,48+num,"สิ้นเปลืองน้ำมัน".toString(),"center"); 


}else
if (kpi === "-" && kpi_all === 0) {
 doc.setDrawColor(242, 242, 242); 
 doc.setFillColor(242, 242, 242);
 doc.setTextColor(0, 0, 0);
 doc.rect(155,43+num,28,8,'FD'); 
 doc.text(169,48+num,"ไม่มี KPI".toString(),"center"); 



 }else
if (kpi_all === 0 ) {
 doc.setDrawColor(242, 242, 242); 
 doc.setFillColor(242, 242, 242);
 doc.setTextColor(0, 0, 0);
 doc.rect(155,43+num,28,8,'FD'); 
 doc.text(169,48+num,"ไม่เติมน้ำมัน".toString(),"center"); 


}
  


  doc.text(195,48+num,kpi_all.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center");  


/*  console.log(kpi_all) */
num = num+6

  }
  if (data.length < 5) {
    
    doc.setDrawColor(0, 0, 0); 
    doc.rect(8,35,195,8+60+2);
  
  
  }else{
    doc.setDrawColor(0, 0, 0); 
    doc.rect(8,35,195,8+num+2);
  }
 


  var array = []
  for (let item of datasale){
    var check = array.filter((e)=>{return e.bill_no1 === item.bill_no });
    if (check.length > 0){
     var index5 = array.findIndex((e2)=> e2.bill_no1 === item.bill_no );
     //  price = array[index5].price + item.price;
     array[index5].bill_values1 = array[index5].bill_values1 ;
    }else{
     var as = {
      bill_no1: item.bill_no,
      bill_values1: item.bill_values,
     }
     array.push(as);
    }
   }


  doc.setDrawColor(0, 0, 0); 
  doc.rect(8,35,195,8);

  doc.setDrawColor(0, 0, 0); 

  if (name_oem_id === "SST") {
    doc.setFillColor(255, 153, 102);
  }else
  if (name_oem_id === "STS") {
    doc.setFillColor(0, 102, 204);
  }else
  if (name_oem_id === "STP") {
    doc.setFillColor(0, 102, 255);
  }else
  if (name_oem_id === "STC") {
    doc.setFillColor(102, 204, 255);
  }else
  if (name_oem_id === "ST CIVIL") {
    doc.setFillColor(255, 204, 102);
  } 

  
  var bill_value = 0;
  for (let index = 0; index < array.length; index++) {
    
    bill_value = bill_value + parseFloat(array[index].bill_values1 || 0);
  } 

  if (data.length < 5) {
    
    doc.rect(8,35+60+10,195,8,'FD');
  doc.setTextColor(0, 0, 0);

  doc.text(30,50+60,name_oem_id.toString()+"  ใช้น้ำมันรวม","center");
  doc.text(30,50+60,name_oem_id.toString()+"  ใช้น้ำมันรวม","center");
  doc.text(30,50+60,name_oem_id.toString()+"  ใช้น้ำมันรวม","center");
  doc.text(66,50+60,fuel_all.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center"); 
  doc.text(90,50+60,"ลิตร","center"); 
  doc.text(168,50+60,bill_value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center"); 
  doc.text(195,50+60,"บาท","center"); 
  doc.text(132,50+60,name_oem_id.toString()+"  มียอดขาย","center");
  doc.text(132,50+60,name_oem_id.toString()+"  มียอดขาย","center");
  doc.text(132,50+60,name_oem_id.toString()+"  มียอดขาย","center");

  }else{
  doc.rect(8,35+num+10,195,8,'FD');
  doc.setTextColor(0, 0, 0);
  
  doc.text(30,50+num,name_oem_id.toString()+"  ใช้น้ำมันรวม","center");
  doc.text(30,50+num,name_oem_id.toString()+"  ใช้น้ำมันรวม","center");
  doc.text(30,50+num,name_oem_id.toString()+"  ใช้น้ำมันรวม","center");
  doc.text(66,50+num,fuel_all.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center"); 
  doc.text(90,50+num,"ลิตร","center"); 
  doc.text(168,50+num,bill_value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center"); 
  doc.text(195,50+num,"บาท","center"); 
  doc.text(132,50+num,name_oem_id.toString()+"  มียอดขาย","center");
  doc.text(132,50+num,name_oem_id.toString()+"  มียอดขาย","center");
  doc.text(132,50+num,name_oem_id.toString()+"  มียอดขาย","center");
  }


  doc.text(60,265,"ผู้จัดทำ.................................................พนง.Logistics","center");
  doc.text(53,275,"วันที่..............................................","center");
  doc.text(150,265,"รับทราบ................................................กรรมการผู้จัดการ","center");
  doc.text(142,275,"วันที่.............................................","center");

  {  doc.addPage("2");}
 

 /*  console.log(datasaleall) */
  var array1 = []

  for (let item of datasaleall){
    var check = array1.filter((e)=>{return e.bill_no1 === item.bill_no });
    if (check.length > 0){
     var index5 = array1.findIndex((e2)=> e2.bill_no1 === item.bill_no );
     //  price = array[index5].price + item.price;
     array1[index5].bill_values1 = array1[index5].bill_values1 
    }else{
     var as = {
      bill_no1: item.bill_no,
      bill_values1: item.bill_values,
     }
     array1.push(as);
    }
   }

/* console.log(array1) */


var bill_valueall = 0;
  for (let index = 0; index < array1.length; index++) {
    
    bill_valueall = bill_valueall + parseFloat(array1[index].bill_values1 || 0);
  } 





  
  var literall = 0;
  var mileage0 = 0;
  var fuel_efficiencyall = 0;
  var mileageall = 0;
  var fuel_mileageall = 0;

  for(let index = 0; index < dataall.length; index++){

    literall = parseFloat(dataall[index].liter1 || 0);
    fuel_efficiencyall = fuel_efficiencyall + parseFloat(literall);
    mileage0 = parseFloat(dataall[index].mileage_number1 || 0);
    mileageall = mileageall + parseFloat(mileage0);
    fuel_mileageall = mileageall / fuel_efficiencyall ;
    
/*    console.log(dataall) */
  }


  var fuelday_num = fuelday * fuel_efficiencyall;
  
var row = 0

  doc.setFillColor(153, 255, 204);
  doc.setTextColor(0, 0, 0);
  doc.rect(13,27+row,57,7,'FD');
  doc.rect(70,27+row,20,7);
  doc.rect(90,27+row,12,7);
  doc.text(69,32+row,name_full+" ใช้น้ำมัน","right");
  doc.text(69,32+row,name_full+" ใช้น้ำมัน","right");
  doc.text(69,32+row,name_full+" ใช้น้ำมัน","right");
  doc.text(91,32+row,"ลิตร","left");
  doc.text(91,32+row,"ลิตร","left");
  doc.text(89,32+row,fuel_efficiencyall.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
    
  
  row = row +7

  doc.setFillColor(153, 255, 204);
  doc.setTextColor(0, 0, 0);
  doc.rect(13,27+row,57,7,'FD');
  doc.rect(70,27+row,20,7);
  doc.rect(90,27+row,12,7);
  doc.text(69,32+row,"คิดเป็นมูลค่า","right");
  doc.text(69,32+row,"คิดเป็นมูลค่า","right");
  doc.text(69,32+row,"คิดเป็นมูลค่า","right");
  doc.text(91,32+row,"บาท","left");
  doc.text(91,32+row,"บาท","left");
  doc.text(89,32+row,fuelday_num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
  row = row +7
  
  doc.setFillColor(153, 255, 204);
  doc.setTextColor(0, 0, 0);
  doc.rect(13,27+row,57,7,'FD');
  doc.rect(70,27+row,20,7);
  doc.rect(90,27+row,12,7);
  doc.text(69,32+row,"ระยะทางรวมวิ่งได้","right");
  doc.text(69,32+row,"ระยะทางรวมวิ่งได้","right");
  doc.text(69,32+row,"ระยะทางรวมวิ่งได้","right");
  doc.text(91,32+row,"กิโลเมตร","left");
  doc.text(91,32+row,"กิโลเมตร","left");
  doc.text(89,32+row,mileageall.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
  row = row +7

  doc.setFillColor(153, 255, 204);
  doc.setTextColor(0, 0, 0);
  doc.rect(13,27+row,57,7,'FD');
  doc.rect(70,27+row,20,7);
  doc.rect(90,27+row,12,7);
  doc.text(69,32+row,"ยอดขายรวม","right");
  doc.text(69,32+row,"ยอดขายรวม","right");
  doc.text(69,32+row,"ยอดขายรวม","right");
  doc.text(91,32+row,"บาท","left");
  doc.text(91,32+row,"บาท","left");
  doc.text(89,32+row,bill_valueall.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
  row = row +7
/* 
  doc.setFillColor(153, 255, 204);
  doc.setTextColor(0, 0, 0);
  doc.rect(30,27+row,40,7,'FD');
  doc.rect(70,27+row,20,7);
  doc.text(69,32+row,"ค่าน้ำมันคิดเป็น","right");
  doc.text(69,32+row,"ค่าน้ำมันคิดเป็น","right");
  doc.text(69,32+row,"ค่าน้ำมันคิดเป็น","right");
  doc.text(91,32+row,"ของยอดขาย","left");
  doc.text(91,32+row,"ของยอดขาย","left");
  doc.text(89,32+row,fuel_efficiencyall.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
  row = row +7 */

  doc.setFillColor(153, 255, 204);
  doc.setTextColor(0, 0, 0);
  doc.rect(13,27+row,57,7,'FD');
  doc.rect(70,27+row,20,7);
  doc.rect(90,27+row,12,7);
  doc.text(69,32+row,"อัตราการใช้น้ำมันรวมเฉลี่ยอยู่ที่","right");
  doc.text(69,32+row,"อัตราการใช้น้ำมันรวมเฉลี่ยอยู่ที่","right");
  doc.text(69,32+row,"อัตราการใช้น้ำมันรวมเฉลี่ยอยู่ที่","right");
  doc.text(91,32+row,"Km/L","left");
  doc.text(91,32+row,"Km/L","left");
  if (fuel_mileageall === Infinity) {
    doc.text(89,32+row,"0.00","right");
    }else{
      doc.text(89,32+row,fuel_mileageall.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"right");
    }
 
  row = row +7


  doc.setDrawColor(255, 255, 0);
  doc.setFillColor(255, 255, 0);
  doc.setTextColor(0, 0, 0);
  doc.rect(150,34,25,7,'FD');
  doc.text(116,38,"ผลการประเมินรวม","left");
  doc.text(116,38,"ผลการประเมินรวม","left");
  doc.text(116,38,"ผลการประเมินรวม","left");
  doc.text(163,38,kpi_all_tabal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center");
  doc.text(177,38,"ลิตร","left");
  doc.text(177,38,"ลิตร","left");
  doc.setDrawColor(0, 0, 0);
  doc.rect(115,34,70,7);

 
 /*  console.log(fuelday) */
  var fuel_day = ""
 fuel_day = moment(date).format('DD/M/YY')

 doc.setTextColor(255, 0, 0);
doc.text(150,50,fuelday+" * ราคาน้ำมัน ณ วันที่"+fuel_day,"center");
doc.text(150,50,fuelday+" * ราคาน้ำมัน ณ วันที่"+fuel_day,"center");

 
 

doc.setTextColor(0, 0, 0);

  doc.text(60,265,"ผู้จัดทำ.................................................พนง.Logistics","center");
  doc.text(53,275,"วันที่..............................................","center");
  doc.text(150,265,"รับทราบ................................................กรรมการผู้จัดการ","center");
  doc.text(142,275,"วันที่.............................................","center");




  doc.addImage(chart_url, 'JPEG',15, 90, 179, 80)
  doc.setDrawColor(0, 0, 0);
  doc.rect(15,90,179,80);
  doc.setFontSize(50)
  doc.setTextColor(255, 0, 0);
  doc.addFont('bold');
  doc.text(18,100,name_oem_id);
  
 

  

/*   window.open(doc.output('dataurlnewwindow', )); */
  window.open(doc.output('bloburl'));
 
}

export default monthly_fuel_consumption_summary;
