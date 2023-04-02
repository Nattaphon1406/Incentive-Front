
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
import { userdefault_img, logo_smz } from "../../routes/imgRoute/imgUrl";

var img_qr = "";
QRCode2.toDataURL("GGJA", function (err, url) {
  img_qr = url
})
var Com_logo = `http://150.95.27.52:4001/static/Li91cGxvYWRzL0NlbnRyYWwgU3ByaW5nIGNvLiwgTHRkLi8yMDNhOGI5MC1hMzQ4LTRmNzEtOGQzMy1hYzY2Yzc5OWU3OWJfbG9nby5qcGc=`;
var loopchcek = [3,5,4,6,2,1,9,4]

function tag_point_cts(data) {
    const doc = new jsPDF("l", "mm", "a4");
              
    doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.addFont('Rocki', 'bold');
    doc.setFont("THSarabunNew");
    doc.setFontSize(15)

    var counts = 0;
    for (let loop = 0; loop < loopchcek.length; loop = loop + 4) {
    
    /*  console.log(numloop) */
    
        
        var row = 0;
        for (let i = 0; row < 4 ; i = i + 4) {
    
    
          if (!loopchcek[loop+row]) {
    
    
    
          }else{
    
    
      
            var x = 0
            var y = 0
            if (row == 0) {
             x = 0
             y = 0
            } else  
            if (row == 1){
             x = 148.5
             y = 0
            } else  
            if (row == 2){
             x = 0
             y = 105 
            } else  
            if (row == 3){
             x = 148.5
             y = 105
            }
    
          
            doc.addImage(Com_logo, 'JPEG',8.5+x,8.5+y, 20,10);
            doc.setDrawColor(255, 255, 255); 
            doc.setFillColor(255, 255, 255);
            doc.rect(115.5+x,77+y,10,10,"FD"); 
            doc.setDrawColor(0, 0, 0); 
            doc.addImage(img_qr, 'JPEG',113+x,45+y, 30,30);
            doc.setLineDash([3, 4], 0);
            doc.rect(0+x,0+y,148.5,105); 
            doc.setLineDash([0, 0], 0);
            /* doc.rect(8+x,5+y,90,8);  */
            doc.setFontSize(16)
            /* doc.text(25+x,10+y,"บริษัท ชิมิสึ แมนนิวแฟคเจอร์ริ่ง จำกัด");
            doc.text(25+x,10+y,"บริษัท ชิมิสึ แมนนิวแฟคเจอร์ริ่ง จำกัด"); */
           /*  doc.rect(8+x,13+y,35,8);  */
           doc.rect(7+x,7+y,134.5,91);
           doc.rect(7+x,7+y,23,84.5);
           doc.text(58+x,16+y,"ป้ายชี้บ่งสถานะงาน","center");
           doc.rect(7+x,7+y,134.5,13);
           doc.setFontSize(11)
           doc.rect(7+x,20+y,134.5,6.5);
           doc.text(18+x,25+y,"CUSTOMER","center");
           doc.rect(7+x,26.5+y,83,6.5);
           doc.text(18+x,31.5+y,"PART NO.","center");
           doc.rect(7+x,33+y,83,6.5);
           doc.text(18+x,38+y,"PART NAME","center");

           doc.rect(7+x,39.5+y,134.5,6.5);
           doc.rect(83+x,39.5+y,7,19.5);
           doc.text(18+x,44+y,"งานคัด / งานแต่ง","center");
           doc.text(56+x,44+y,"1  2  3  4  5  6  7  8  9  10  11  12  13  14","center");
           doc.rect(7+x,46+y,83,6.5);
           doc.text(18+x,51+y,"งานตัด / งานปั้ม","center");
           doc.text(53+x,51+y,"P...... P...... P...... P...... P...... P...... P......","center");
           doc.rect(7+x,52.5+y,83,6.5);
           doc.text(18+x,57.5+y,"งานเจียร","center");
           doc.text(56+x,57.5+y,"1  2  3  4  5  6  7  8  9  10  11  12  13  14","center");
           doc.rect(7+x,59+y,83,6.5);
           doc.text(18+x,64+y,"อบ","center");
           doc.rect(7+x,65.5+y,106.5,6.5);
           doc.text(18+x,70.5+y,"ชิ้นงานปัจุบัน","center");
           doc.rect(7+x,72+y,60,6.5);
           doc.text(18+x,77.5+y,"ขั้นตอนต่อไป","center");
           doc.rect(7+x,78.5+y,60,6.5);
           doc.text(18+x,83.5+y,"เลขที่ PO","center");
           doc.rect(7+x,85+y,60,6.5);
           doc.text(18+x,90+y,"วันที่","center");


           doc.setFontSize(16)
           doc.text(78.5+x,77.5+y,"SoC FREE","center");
           doc.setFontSize(11)

           doc.rect(90+x,7+y,23.5,91);
           doc.text(101+x,12+y,"LOT NO","center");
           doc.rect(90+x,7+y,23.5,13);
           doc.text(127+x,12+y,"Tag ID","center");
           doc.rect(90+x,7+y,51.5,7);
           doc.rect(90+x,72+y,23.5,13);
           doc.text(101+x,25+y,"QTY","center");
           doc.text(127+x,25+y,"Loss","center");

           doc.text(101+x,44+y,"ผู้บันทึก/ผู้แจ้ง","center");
           doc.text(127+x,44+y,"Tag ID","center");

           doc.text(101+x,70+y,"QC CHECKED","center");
           
           
           
         




           doc.rect(7+x,91.5+y,83,6.5);
           doc.text(18+x,96.5+y,"หมายเหตุ:","center");
           doc.setFontSize(32)
           doc.text(35+x,96.5+y,"๐","center");
           doc.setFontSize(9)
           doc.text(40+x,95.5+y,"OK","center");

           
           doc.setFontSize(32)
           doc.text(55+x,96.5+y,"๐","center");
           doc.setFontSize(9)
           doc.text(60+x,95.5+y,"NG","center");

    






          /*  var num = 0
           for (let index = 0; index < 1; index++) {
            doc.rect(7+x,20+num+y,70,6.5);
            num = num +6.5
           } */
          
         
            
          
         


            counts = loopchcek.length- 4;


          }
          
    
          row = row+1;
         
      
          /*  console.log(material_lot_list_qc_passed_list,"กฟห") */
         
        }
    
      if (loop < counts)
      {  doc.addPage("l");}
    
      }
    
  /*   } */
      window.open(doc.output('bloburl'));
    

        }
       export default tag_point_cts