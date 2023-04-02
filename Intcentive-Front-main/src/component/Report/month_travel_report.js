
/* import React, { useState, useEffect } from "react";
import "../../assets/css/Oem.css";

import Configs from "../../config"; */
import React, { Component, useEffect, useState,useRef } from "react";
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

 



//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function month_travel_report(company,addressOEM,data,date,oem,Oemlist,chart_url) {


  console.log(chart_url)

 




/* html2canvas(document.getElementById("print_to_pdf")).then(canvas => {
  chart_pf = canvas.toDataURL();
  console.log(chart_pf) */






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
  ];

  var month_th = stock_month.filter((e)=>{ return e.eng === moment(date).format('MMMM');})
  var year_th =  parseInt(moment(date).format('yyyy')) +543;
  var sumDay_ofMonth = moment(date).daysInMonth();

    const doc = new jsPDF("p", "mm", "a4");
    var oem_target = addressOEM.filter((e)=>{
      return e.oem_id === oem;
    })
    var part_oem = Oemlist.filter((e2)=>{ return e2.id === oem;})
    //console.log(data)

  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(12)

//logo

  var Com_logo = `${Configs.API_URL_IMG + part_oem[0].logo_path}`;
  doc.addImage(Com_logo, 'JPEG', 25, 5, 20, 20)
  
  doc.text(48,14,oem_target[0].oem_name.toString())

  /////////////////////////////////////////
  doc.text(48,19,oem_target[0].address.toString())
  
  
  
  

  
  doc.setFontSize(12)
  ///////////////////////////////////
   
  
    //หัวข้อตาราง
  
      doc.setFillColor(189, 49, 49);
      doc.rect(8,30,195,10,'FD');
      doc.setTextColor(255, 255, 255);
      doc.text(100,36,"เที่ยววิ่งรถของ "+oem_target[0].oem_name+ " ประจำเดือน "+month_th[0].th+" "+year_th,"center");
      doc.text(100,36,"เที่ยววิ่งรถของ "+oem_target[0].oem_name+ " ประจำเดือน "+month_th[0].th+" "+year_th,"center");
      doc.text(100,36,"เที่ยววิ่งรถของ "+oem_target[0].oem_name+ " ประจำเดือน "+month_th[0].th+" "+year_th,"center");
    
      doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
      doc.setTextColor(0, 0, 0);
      doc.rect(8,40,17.5,10,'FD');
      doc.text(17,46,"ทะเบียนรถ","center");
  
  
      doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
      doc.setTextColor(0, 0, 0);
      doc.rect(25.5,40,17.5,10,'FD');
      doc.text(34,46,"ประเภทรถ","center");
  
  
    
      doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
      doc.setTextColor(0, 0, 0);
      doc.rect(43,40,24,10,'FD');
      doc.text(55,46,"วันที่ 1 - 6","center");
  
/*       doc.text(119.5,43.5,"จำนวนบิล","center"); */
  
doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
doc.setTextColor(0, 0, 0);
      doc.rect(67,40,24,10,'FD');//1
      doc.text(79,46,"วันที่ 7 - 13","center");
  
      
      doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
      doc.setTextColor(0, 0, 0);
      doc.rect(91,40,24,10,'FD');//2
      doc.text(103,46,"วันที่ 14 - 20","center");
      
      doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
      doc.setTextColor(0, 0, 0);
      doc.rect(115,40,24,10,'FD');//3
      doc.text(127,46,"วันที่ 21 - 27","center");
  

      
      doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
      doc.setTextColor(0, 0, 0);
      doc.rect(139,40,24,10,'FD');//4
      var day = "วันที่ 28 - "+sumDay_ofMonth;
      if(sumDay_ofMonth === 28){
        day ="วันที่ 28"
      }
      doc.text(152,46,day,"center");
  
      doc.setFillColor(102, 178, 255);
      doc.setTextColor(0, 0, 0);
      doc.rect(163,40,24,10,'FD');//5
      doc.text(175,46,"รวมเที่ยววิ่งทั้งเดือน","center");
  
      doc.setFillColor(190, 131, 223);
      doc.setTextColor(0, 0, 0);
      doc.rect(187,40,16,10,'FD');//6
      doc.text(195,46,"คิดเป็น %","center");
  
    /*   doc.rect(142,40,15,10);//7
      doc.text(149.5,46,"7","center");
  
      doc.rect(157,45,15,5);//8
      doc.text(164.5,48.5,"8","center");
      
      doc.rect(172,45,15,5);//9 
      doc.text(179.5,48.5,"9","center");
  
  
      doc.rect(187,40,16,10);
      doc.text(195,46,"สถานะ","center"); */
  
  
  
       /////////////////////// data lgistic ///////////////////////
      
  /*      doc.rect(8,50,14,5,'FD');
      doc.text(15,53.5,"ทดสอบ","center"); */
      var y_data_txt = 0;
      var y_data = 0;
      var sum_row = 0;

      var sum1 = 0;
      var sum2 = 0;
      var sum3 = 0;
      var sum4 = 0;
      var sum5 = 0;
      for(let i of data){
        sum_row = sum_row + i.bill_logistic.length;
      }
          for(let index = 0; index < data.length; index++){
              var carType = "";
              if(data[index].car_type !== null){
                  carType = data[index].car_type;
              }
              //sum_row = sum_row + data[index].bill_logistic.length;
              
              doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(8);
              doc.rect(8,50+y_data,17.5,5,'FD');
              doc.text(17,53.5+y_data,data[index].plate_number,"center");
  
             
              doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
              doc.setTextColor(0, 0, 0);
              doc.rect(25.5,50+y_data,17.5,5,'FD');
              doc.text(34,53.5+y_data,carType,"center");
  
  


              let date1 = moment(date).startOf('month').startOf('day');
              let date2 = moment(date).startOf('month').endOf('day').add(5, 'days');
              console.log(moment(date1).format('DD/MM/yyyy'))
              console.log(moment(date2).format('DD/MM/yyyy'))
              var travel1 = data[index].bill_logistic.filter((t1)=>{return date1 <= moment(t1.date) && moment(t1.date) <= date2 });
              sum1 = sum1 + travel1.length;
              //console.log(travel1)
            
  
              doc.rect(43,50+y_data,24,5);
              doc.text(55,53.5+y_data,travel1.length.toString(),"center"); //1-6
             


              let date3 = moment(date2).startOf('day').add(1, 'days');
              let date4 = moment(date3).endOf('day').add(6, 'days');
              console.log(moment(date3).format('DD/MM/yyyy'));
              console.log(moment(date4).format('DD/MM/yyyy'));
              var travel2 = data[index].bill_logistic.filter((t2)=>{return date3 <= moment(t2.date) && moment(t2.date) <= date4 });
              sum2 = sum2 + travel2.length;
              doc.rect(67,50+y_data,24,5);//7-13
              doc.text(79,53.5+y_data,travel2.length.toString(),"center");
          

              let date5 = moment(date4).startOf('day').add(1, 'days');
              let date6 = moment(date5).endOf('day').add(6, 'days');
                   console.log(moment(date5).format('DD/MM/yyyy'))
              console.log(moment(date6).format('DD/MM/yyyy'))
              var travel3 = data[index].bill_logistic.filter((t3)=>{return date5 <= moment(t3.date) && moment(t3.date) <= date6 });
              sum3 = sum3 + travel3.length;
              doc.rect(91,50+y_data,24,5);//14-20
              doc.text(103,53.5+y_data,travel3.length.toString(),"center");
          

              let date7 = moment(date6).startOf('day').add(1, 'days');
              let date8 = moment(date7).endOf('day').add(6, 'days');
              console.log(moment(date7).format('DD/MM/yyyy'))
              console.log(moment(date8).format('DD/MM/yyyy'))
              var travel4 = data[index].bill_logistic.filter((t4)=>{return date7 <= moment(t4.date) && moment(t4.date) <= date8 });
              sum4 = sum4 + travel4.length;
              doc.rect(115,50+y_data,24,5);//21-27
              doc.text(127,53.5+y_data,travel4.length.toString(),"center");



              let date9 = moment(date8).startOf('day').add(1, 'days');
              let date10 = moment(date9).endOf('month').endOf('day');
              console.log(moment(date9).format('DD/MM/yyyy'))
              console.log(moment(date10).format('DD/MM/yyyy'))
              var travel5 = data[index].bill_logistic.filter((t5)=>{return date9 <= moment(t5.date) && moment(t5.date) <= date10 });
              sum5 = sum5 + travel5.length;
              doc.rect(139,50+y_data,24,5);//28 - สิ้นเดือน
              doc.text(151,53.5+y_data,travel5.length.toString(),"center");



              doc.setFillColor(102, 178, 255);
              doc.setTextColor(0, 0, 0);
              doc.rect(163,50+y_data,24,5,'FD');//5
              doc.text(175,53.5+y_data,(data[index].bill_logistic.length).toString(),"center");
              var percen = "";
     
              if(sum_row > 0){
                percen = (data[index].bill_logistic.length/sum_row * 100).toFixed(2) +" %";
              }
    
              doc.setFillColor(190, 131, 223);
              doc.setTextColor(0, 0, 0);
      doc.rect(187,50+y_data,16,5,'FD');
      doc.text(195,53.5+y_data,percen.toString(),"center");
 
    
  
  
  
  
  
  
  
  
  
  
  
  
  
              y_data = y_data + 5;
              y_data_txt = y_data_txt +2.5;
          }
  
          doc.setFillColor(oem_target[0].r, oem_target[0].g, oem_target[0].b);
          doc.setTextColor(0, 0, 0);
          doc.rect(8,50+y_data,35,5,'FD');
          doc.text(25.5,53.5+y_data,"รวม","center");
  
          doc.rect(43,50+y_data,24,5);
          doc.text(55,53.5+y_data,sum1.toString(),"center"); //1-6
  
          doc.rect(67,50+y_data,24,5);//7-13
          doc.text(79,53.5+y_data,sum2.toString(),"center");

          doc.rect(91,50+y_data,24,5);//14-20
          doc.text(103,53.5+y_data,sum3.toString(),"center");

          doc.rect(115,50+y_data,24,5);//21-27
          doc.text(127,53.5+y_data,sum4.toString(),"center");

          doc.rect(139,50+y_data,24,5);//28 - สิ้นเดือน
          doc.text(151,53.5+y_data,sum5.toString(),"center");

          doc.setFillColor(0,102, 204);
          doc.setTextColor(0, 0, 0);
          doc.rect(163,50+y_data,24,5,'FD');//รวมเที่ยว
          doc.text(175,53.5+y_data,sum_row.toString(),"center");

          doc.setFillColor(167, 71, 223);
          doc.setTextColor(0, 0, 0);
          doc.rect(187,50+y_data,16,5,'FD');
          doc.text(195,53.5+y_data,"100 %","center"); //%
       /*    var c = 0;
          if(data.length > 30 && c == 0){
            c =1;
            doc.addPage("p");
          } */
      
          doc.rect(8, 59+y_data, 195, 90);
          doc.addImage(chart_url, 'JPEG', 9, 60+y_data,193, 88); 
       
  
          doc.setFontSize(16);
          doc.text(8,170+y_data,'ผู้จัดทำ....................................พนักงาน Logistics',"left");
          doc.text(8,180+y_data,'    วันที่....................................',"left");

          doc.text(130,170+y_data,'รับทราบ....................................กรรมการผู้จัดการ',"left");
          doc.text(130,180+y_data,'      วันที่....................................',"left");
        
  
   
    
      
      
      
      window.open(doc.output('bloburl'));
  
/*     }); */
  }
  
  export default month_travel_report;