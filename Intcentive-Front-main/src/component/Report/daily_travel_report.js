
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
function daily_travel_report(company,addressOEM,data,date,oem,Oemlist) {
 
    console.log(Oemlist)
    const doc = new jsPDF("p", "mm", "a4");
    var oem_target = addressOEM.filter((e)=>{
      return e.oem_id === oem;
    })
    var part_oem = Oemlist.filter((e2)=>{ return e2.id === oem;})
    console.log(data)

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
      doc.text(100,36,"รายงานเที่ยววิ่ง "+oem_target[0].oem_name+ " วันที่ "+moment(date).format('DD/MM/YYYY'),"center");
      doc.text(100,36,"รายงานเที่ยววิ่ง "+oem_target[0].oem_name+ " วันที่ "+moment(date).format('DD/MM/YYYY'),"center");
      doc.text(100,36,"รายงานเที่ยววิ่ง "+oem_target[0].oem_name+ " วันที่ "+moment(date).format('DD/MM/YYYY'),"center");
    
      doc.setFillColor(102, 204, 0);
      doc.setTextColor(0, 0, 0);
      doc.rect(8,40,15,10,'FD');
      doc.text(15,46,"ทะเบียนรถ","center");
  
  
      doc.setFillColor(102, 204, 0);
      doc.setTextColor(0, 0, 0);
      doc.rect(22,40,15,10,'FD');
      doc.text(29,46,"ประเภทรถ","center");
  
  
    
      doc.rect(37,40,15,10);
      doc.text(44.5,46,"จำนวนเที่ยว","center");
  
      doc.text(119.5,43.5,"จำนวนบิล","center");
  
      doc.rect(52,45,15,5);//1
      doc.text(59.5,48.5,"1","center");
  
      doc.rect(67,45,15,5);//2
      doc.text(74.5,48.5,"2","center");
  
      doc.rect(82,45,15,5);//3
      doc.text(89.5,48.5,"3","center");
  
      doc.rect(97,45,15,5);//4
      doc.text(104.5,48.5,"4","center");
  
      doc.rect(112,45,15,5);//5
      doc.text(119.5,48.5,"5","center");
  
      doc.rect(127,45,15,5);//6
      doc.text(134.5,48.5,"6","center");
  
      doc.rect(142,45,15,5);//7
      doc.text(149.5,48.5,"7","center");
  
      doc.rect(157,45,15,5);//8
      doc.text(164.5,48.5,"8","center");
      
      doc.rect(172,45,15,5);//9
      doc.text(179.5,48.5,"9","center");
  
  
      doc.rect(187,40,16,10);
      doc.text(195,46,"สถานะ","center");
  
  
  
       /////////////////////// data lgistic ///////////////////////
      
  /*      doc.rect(8,50,14,5,'FD');
      doc.text(15,53.5,"ทดสอบ","center"); */
      var y_data_txt = 0;
      var y_data = 0;
      var sum_row = 0;
      var sum_row_ = 0;
          for(let index = 0; index < data.length; index++){
              var carType = "123";
              if(data[index].car_type !== null){
                  carType = data[index].car_type;
              }
              sum_row = sum_row + data[index].bill_logistic.length;

             console.log(data[index].bill_logistic);
             var sum_r = 0;
             for(let row1 = 0; row1 < data[index].bill_logistic.length; row1++){
              if(row1 - 1 >= 0){
                if(data[index].bill_logistic[row1].delivery_sort !== data[index].bill_logistic[row1-1].delivery_sort){
                  sum_r++;
                }
              }else{
                  sum_r++;
              }
             }

             sum_row_ = sum_row_+sum_r;

              
              doc.setFillColor(102, 204, 0);
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(8);
              doc.rect(8,50+y_data,14,5,'FD');
              doc.text(15,53.5+y_data,data[index].plate_number,"center");
  
             
              doc.setFillColor(102, 204, 0);
              doc.setTextColor(0, 0, 0);
              doc.rect(22,50+y_data,15,5,'FD');
              doc.text(29,53.5+y_data,carType,"center");
  
  
  
  
              doc.rect(37,50+y_data,15,5);
              doc.text(44.5,53.5+y_data,(sum_r).toString(),"center");
  
              let x_data = 0;
      for(let index2 = 0; index2 < data[index].bill_logistic.length; index2++){
         var name_driver = "";
     
         if(data[index].bill_logistic[index2].customer_name){
          name_driver = data[index].bill_logistic[index2].customer_name;
          var first_name = name_driver.split(" ");
          name_driver = first_name[0];
         }
          doc.setFillColor(255, 255, 0);
              doc.setTextColor(0, 0, 0);
              doc.rect(52+x_data,50+y_data,15,5,'FD');
              doc.text(59.5+x_data,53.5+y_data,name_driver,"center");
              x_data = x_data +15;
      }
  
      doc.rect(52,50+y_data,15,5);//1
      //doc.text(59.5,48.5,"1","center");
  
      doc.rect(67,50+y_data,15,5);//2
      //doc.text(74.5,48.5,"2","center");
  
      doc.rect(82,50+y_data,15,5);//3
      //doc.text(89.5,48.5,"3","center");
  
      doc.rect(97,50+y_data,15,5);//4
     // doc.text(104.5,48.5,"4","center");
  
      doc.rect(112,50+y_data,15,5);//5
      //doc.text(119.5,48.5,"5","center");
  
      doc.rect(127,50+y_data,15,5);//6
      //doc.text(134.5,48.5,"6","center");
  
      doc.rect(142,50+y_data,15,5);//7
     // doc.text(149.5,48.5,"7","center");
  
      doc.rect(157,50+y_data,15,5);//8
      //doc.text(164.5,48.5,"8","center");
      
      doc.rect(172,50+y_data,15,5);//9
      //doc.text(179.5,48.5,"9","center");
  
  
      doc.rect(187,50+y_data,16,5);
    /*   if(data[index].bill_logistic.length > 0){ */
  
      /*   doc.text(164.75,53.5+y_data,"/","center");
        doc.text(164.75,53.5+y_data,"/","center");
        doc.setFontSize(6);
        doc.text(164.30,53.75+y_data,"v","center");
        doc.text(164.30,53.75+y_data,"v","center"); */
  
      /*   doc.text(195.75,53.5+y_data,"/","center");
        doc.text(195.75,53.5+y_data,"/","center");
        doc.setFontSize(6);
        doc.text(195.30,53.75+y_data,"v","center");
        doc.text(195.30,53.75+y_data,"v","center");
      }else{
        doc.setTextColor(255, 0, 0);
        doc.text(195,53.5+y_data,"รถไม่วิ่ง","center");
       
      } */
     // doc.text(195,46,"สถานะ","center");
    
  
  
  
  
  
  
  
  
  
  
  
  
  
              y_data = y_data + 5;
              y_data_txt = y_data_txt +2.5;
          }
  
          doc.setFillColor(102, 204, 0);
          doc.setTextColor(0, 0, 0);
          doc.rect(8,50+y_data,14,5,'FD');
          doc.text(15,53.5+y_data,"รวม","center");
  
          doc.setFillColor(102, 204, 0);
          doc.setTextColor(0, 0, 0);
          doc.rect(22,50+y_data,15,5,'FD');
  
  
          doc.rect(37,50+y_data,15,5);
          doc.text(44.5,53.5+y_data,sum_row_.toString(),"center");
  
          doc.rect(52,50+y_data,15,5);//1
          doc.text(59.5,53.5+y_data,"เที่ยว","center");
      
          doc.rect(67,50+y_data,15,5);//2
          doc.text(74.5,53.5+y_data,sum_row.toString(),"center");
      
          doc.rect(82,50+y_data,15,5);//3
          doc.text(89.5,53.5+y_data,"บิล","center");
          //var txt = "🗸";
          doc.rect(97,50+y_data,60,5);//4
   
         /*  doc.rect(112,50+y_data,15,5);//5
          //doc.text(119.5,48.5,"5","center");
      
          doc.rect(127,50+y_data,15,5);//6
          //doc.text(134.5,48.5,"6","center");
      
          doc.rect(142,50+y_data,15,5);//7
         // doc.text(149.5,48.5,"7","center"); */
      
          doc.rect(157,50+y_data,15,5);//8
          //doc.text(164.5,48.5,"8","center");
          doc.text(164.75,53.5+y_data,"/","center");
          doc.text(164.75,53.5+y_data,"/","center");
          doc.setFontSize(6);
          doc.text(164.30,53.75+y_data,"v","center");
          doc.text(164.30,53.75+y_data,"v","center");
  
  
  
          doc.setFontSize(8);
          doc.rect(172,50+y_data,31,5);//9
          doc.text(187,53.5+y_data,"เที่ยววิ่งรถตามบิล","center");
      
          doc.text(164.5,58.5+y_data,"หมายเหตุ","center");
  
          doc.setFillColor(255, 255, 0);
          doc.rect(172,55+y_data,15,5,'FD');
          doc.text(179.5,58.5+y_data,"ทะเบียนถูกต้อง","center");
  
          doc.setFillColor(255, 0, 0);
          doc.rect(187,55+y_data,16,5,'FD');
          doc.text(195,58.5+y_data,"ทะเบียนไม่ถูกต้อง","center");
  
    
      
        
  
   
    
      
      
      
      window.open(doc.output('bloburl'));
  
    
  }
  
  export default daily_travel_report;