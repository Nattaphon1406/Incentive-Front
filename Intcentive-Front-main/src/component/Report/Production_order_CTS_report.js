
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
import QRCode2 from "qrcode";

//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function Production_order_CTS_report(data,img_qr) {
 console.log(data)
 var nameloop =  "freghtfnikrdhbkrnjlnblkedr5659";
 console.log(nameloop.length);
 let nemelie = ""
 for (let index = 0; index < nameloop.length; index++) {
 if (index < 20) {
  console.log(nameloop[index]);
  nemelie += nameloop[index];
 } 
 
 }
 console.log(nemelie)
  for (let index = 0; index < data.length; index++) {

      var CTS_no = data[index].no || ""
      if (data[index].product_list.length > 0) {
        var product_no = data[index].product_list[0].no || ""
        var product_name = data[index].product_list[0].product_name || ""
        var nw_number = parseFloat(data[index].product_list[0].nw_number) || 0 
        /* var nw_number = parseFloat(data[index].product_list[0].nw_number) || "" */
       /*  var product_country = ("-"+data[index].product_list[0].country) || "" */
       var name_customer = data[index].product_list[0].full_name || ""
       } else {
        var product_no = ""
        var product_name = ""
        var nw_number = 0
        var name_customer = ""
       /*  var nw_number = "" */
        /* var product_country = "" */
       }
      /*  gw_number */

    

     if (data[index].material_list.length > 0) {
      var material_name = data[index].material_list[0].name 
      var material_no = data[index].material_list[0].no 
     
     } else {
      var material_name = ""
      var material_no = ""
     }
      var sum_amount_mat = (parseFloat(data[index].amount) * nw_number) || ""
     /* console.log(sum_amount_mat,"sss") */
      
     var finish_date_plan  = data[index].finish_date_plan || ""
     var finish_date_producer = data[index].finish_date_producer || ""
     var producer_date = data[index].producer_date || ""
     var setup_ng_record = data[index].setup_ng_record || ""
     var time_per_product = data[index].time_per_product || ""
     var total_time_producer = data[index].total_time_producer || ""
      
       
        var material_amount = data[index].amount || ""

      var plated = data[index].plated || ""
      var remark = data[index].remark || ""

      var user_document = data[index].user_document || ""
      var user_producer = data[index].user_producer || ""
  }

    const doc = new jsPDF("p", "mm", "a4");
 
  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
 
  doc.setFontSize(17)
  doc.text(104.6,13,"ใบสั่งผลิต","center");
  doc.text(30,14,"CENTRAL SPRING CO., LTD.","center");
  doc.text(188.6,13,"Lot NO. : "+CTS_no,"center");
 
       /* doc.rect(0.7,13,208.5,8); */
       /* doc.rect(0.7,23,208.5,8); */
       /* doc.rect(0.7,33,208.5,8); */
     /*   doc.rect(0.7,43,208.5,8); */
     doc.setFontSize(14)
     doc.addImage(img_qr, 'JPEG',170,72, 40,40);
       doc.text(63.35,25,"CUSTOMER","center");
       doc.rect(0.7,20,126,8);
       doc.text(63.35,33,name_customer.toString(),"center");
       doc.text(63.35,41,"PART NO. / PART NAME","center");
       doc.text(63.35,49,product_no.toString()+" / "+product_name.toString(),"center");
       doc.rect(126.7,20,41.25,8);
       doc.text(147.325,25,"วันที่สั่งผลิต","center");
       doc.rect(167.95,20,41.25,8);
       doc.text(188.575,25,"กำหนดเสร็จ","center");

       doc.rect(0.7,28,126,8);
       doc.rect(126.7,28,41.25,8);
       doc.text(147.325,33,moment(producer_date).add(543 , "year").format('DD/MM/YY').toString(),"center");
       doc.rect(167.95,28,41.25,8);
       doc.text(188.575,33,moment(finish_date_plan).add(543 , "year").format('DD/MM/YY').toString(),"center");

       doc.rect(0.7,36,126,8);
       doc.rect(126.7,36,41.25,8);
       doc.text(147.325,41,"จำนวน","center");
       doc.rect(167.95,36,41.25,8);
       doc.text(188.575,41,"MATERIAL","center");

       doc.rect(0.7,44,126,8);
       doc.rect(126.7,44,41.25,8);
       doc.text(147.325,49,material_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),"center");
       doc.rect(167.95,44,41.25,8);
       if (material_no == "" || material_name == "") {
        doc.text(188.575,49,"".toString(),"center");
       } else {
        doc.text(188.575,49,material_no+","+material_name.toString(),"center");
       }
      

       doc.setFontSize(11)
       doc.setTextColor(255, 0, 0)
       doc.rect(0.7,52,85.45,25);
       doc.text(2,56,"เวลาที่ใช้ในการผลิตทั้งหมด "+ material_amount.toString()+" ชิ้น.","left");
       doc.text(55,60,time_per_product.toString(),"right");
       doc.text(55,64,total_time_producer.toString(),"right");
       doc.setTextColor(0, 0, 0)
       doc.text(2,60,"ผลิต/ตัว (M/C)","left");
       doc.text(2,64,"ผลิต/ตัว (Process)","left");
       doc.text(78,60,"Sec.","left");
       doc.text(78,64,"Sec.","left");
       doc.rect(0.7,52,85.45,14);
       doc.text(2,73,"ผิวชุบ : "+plated.toString(),"left");
       /* doc.rect(0.7,84,85.45,7); */

       doc.setFontSize(14)
       doc.rect(86.15,52,40.55,8);
       doc.text(106.425,57,"MATERIAL (KG.)","center");
       if (sum_amount_mat !== "") {
        doc.text(106.425,68,sum_amount_mat.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"  กก.","center");
       } else {
        doc.text(106.425,68,"","center");
       }
      
       doc.rect(126.7,52,41.25,8);
       doc.text(147.325,57,"ผู้ผลิต","center");
       doc.text(147.325,68,user_producer.toString(),"center");
       doc.rect(167.95,52,41.25,8);
       doc.text(188.575,57,"วันผลิตเสร็จ","center");
       doc.text(188.575,68,moment(finish_date_producer).add(543 , "year").format('DD/MM/YY').toString(),"center");
       doc.setFontSize(11)
       doc.rect(86.15,60,40.55,13);
       doc.rect(126.7,60,41.25,13);
       doc.rect(167.95,60,41.25,13);

       doc.rect(0.7,77,85.45,33);
       doc.text(2,93,"หมายเหตุ : "+remark.toString(),"left");
       doc.rect(86.15,73,123,37);

       doc.setTextColor(255, 0, 0)
       doc.text(102.15,78,"Setup NG Record :","center");
       doc.setTextColor(0, 0, 0)
       doc.text(130.15, 86, setup_ng_record.toString(),{ maxWidth: 83 , align: 'center'})
      
       doc.setFontSize(14)
       doc.rect(0.7,110,51.95,8);
       doc.text(26.675,115,"ผู้ออกเอกสาร","center");
       doc.text(26.675,123,user_document.toString(),"center");
       doc.rect(52.65,110,51.95,8);
       doc.text(78.625,115,"ผู้อนุมัติการผลิต","center");
       doc.rect(104.6,110,51.95,8);
       doc.text(128.125,115,"ผู้รับผิดชอบการผลิต","center");
       doc.rect(156.55,110,52.5,8);
       doc.text(182.8,115,"ผู้ตรวจสอบก่อนผลิต","center");

       doc.rect(0.7,118,51.95,7);
       doc.rect(52.65,118,51.95,7);
       doc.rect(104.6,118,51.95,7);
       doc.rect(156.55,118,52.5,7);

       
       doc.rect(0.7,125,208.5,10);
       doc.text(104.6,132,"CAPACITY PRODUCT PLAN","center");

       doc.rect(0.7,135,15,31);
       doc.text(8.2,142,"No.","center");
       doc.rect(15.7,135,25,31);
       doc.text(28.2,142,"No. M/C","center");
       doc.rect(40.7,135,32,31);
       doc.text(56.7,142,"Plan M/C","center");
       doc.rect(72.7,135,32,31);
       doc.text(88.7,142,"Product Plan","center");
       doc.rect(104.7,135,15,31);
       doc.text(112.2,142,"Man","center");
       doc.rect(119.7,135,70,31);
       doc.text(154.7,142,"Item","center");
       doc.rect(189.7,135,208.5,31);
       doc.text(199.1,142,"Approve","center");

       doc.rect(0.7,135,208.5,10);
       doc.rect(0.7,145,208.5,7);
       doc.rect(0.7,152,208.5,7);
       doc.rect(0.7,159,208.5,7);


       doc.rect(0.7,166,208.5,10);
       doc.text(104.6,172,"MATERIAL","center");

       doc.rect(0.7,176,208.5,10);
       
       doc.rect(0.7,186,208.5,7);
       doc.rect(0.7,193,208.5,7);

       doc.rect(0.7,176,37,24);
       doc.text(19.2,183,"เลขที่ใบเบิก","center");
       doc.rect(37.7,176,37,24);
       doc.text(56.2,183,"วันที่เบิก","center");
       doc.rect(74.7,176,60.5,24);
       doc.text(104.95,183,"เลขที่ COIL  No.","center");
       doc.rect(135.2,176,37,24);
       doc.text(153.7,183,"จำนวนที่เบิก","center");
       doc.rect(172.2,176,37,24);
       doc.text(190.7,183,"จำนวนใช้ผลิต","center");

       doc.rect(0.7,200,208.5,12);
       doc.rect(172.2,200,37,12);
       doc.text(153.7,207,"รวม","center");
       doc.rect(135.2,200,37,12);

       doc.rect(0.7,212,208.5,78);
       doc.text(4,222,"วัตถุดิบ วันที่รับจากMK   ............./............./.............  เวลา............. น.       วันที่รับจากคลัง   ............./............./.............  เวลา............. น.","left");
       doc.text(4,232,"เบิกวัตถุดิบ          วันที่  ............./............./.............  เวลา............. น.         ถึง         วันที่   ............./............./.............  เวลา............. น. สรุป............ ชม.","left");
       doc.text(4,242,"ตั้งเครื่อง             วันที่  ............./............./.............  เวลา............. น.         ถึง         วันที่   ............./............./.............  เวลา............. น. สรุป............ ชม.","left");
       doc.text(4,252,"ผลิตงานต่อเนื่องM/C.     ............./............./.............  เวลา............. น.         ถึง         วันที่   ............./............./.............  เวลา............. น. สรุป............ ชม.","left");
       doc.text(4,262,"สรุปแผนผลิต M/C      แผนที่กำหนด ............. วัน  ระยะเวลาที่ผลิตจริง ............. วัน  ผลสรุป ...............  ","left");
       doc.text(4,272,"Drawing    วันที่เบิก  ............./............./.............  เวลา............. น.  วันที่จ่าย  ............./............./.............   เวลา............. น.  ผู้จ่าย...........................","left");
       doc.text(36,282,"CHECK SHEET  จำนวน....................   แผนวันที่คืน  ............./............./.............   เวลา............. น.  ผู้รับ....................................","left");
       /* doc.text(153.7,207,"รวม","center");
       doc.text(153.7,207,"รวม","center"); */



      window.open(doc.output('bloburl'));
  
    
  }
  
  export default Production_order_CTS_report;