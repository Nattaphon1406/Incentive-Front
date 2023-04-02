import React, { Component, useEffect, useState, useRef } from "react";
import "../assets/css/Oem.css";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Configs from "../config";

function Table(params,allPage) {
  const rowsData = params.data.rows;
  const columns = params.data.columns;

  const [show_entries, setshow_entries] = useState({
    entries:10,
  });

  
  const [this_page, setthis_page] = useState({
    page: 1,
  });


  const [countPage, setCountPage] = useState(true);
  const [all_page, setall_page] = useState([]);

 if (countPage && params.pageControl) {
  const page_arr = [];
  let page = 1;

  
  for(let i = 0; i < rowsData.length;i++){
    if(Math.ceil(i/10) >= page){
    /*   console.log(Math.ceil(i/10) , page) */
      let temp ={
        page:page,
      }
      page_arr.push(temp);
      page++;
    }
  } 
    
       setall_page(page_arr);

  setCountPage(false);
/*   console.log("allpagedata",countPage);
  console.log("countpage",params.pageControl); */
 }


  function setPage(page) {
   /*  console.log("this page : ", page); */
    setthis_page({ ...this_page, page: page });
  }

 const setAllPageData = async () =>{
 
 }
    

 

 
  async function setEntries(entries) {
    
    await setshow_entries({ ...show_entries, entries: entries });
    var page_arr = [];
    let page = 1;

    console.log("showAllPage",rowsData.length);
    for (let i = 0; i < rowsData.length; i++) {
      if (Math.ceil(i / entries) >= page) {
        console.log(Math.ceil(i / entries), page);
        let temp = {
          page: page,
        };
        page_arr.push(temp);
        page++;
      }
    }
    await setall_page(page_arr);
    await setPage(1);
  }



  var BN = 0;
  var FN = 0;
  function previous_page() {
    let page_ = this_page.page - 1;
    if (page_ >= 1) {
      setthis_page({ ...this_page, page: page_ });
    }
  }

  function next_page() {
    let page_ = this_page.page + 1;
    if (page_ <= all_page.length) {
      setthis_page({ ...this_page, page: page_ });
    }
  }

   
  return (
    <div>
      <div class="col-1">
        <div class="form-group">
          <select
            className="form-control custom-select select2"
            type="text"
            required
            onChange={(e) => setEntries(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={rowsData.length}>{rowsData.length} (ALL)</option>
          </select>
          <label htmlFor="">Show entries</label>
        </div>
      </div>

      <div className="table-responsive">
        <MDBTable
          className="table table-head-fixed"
          striped
          bordered
          hover
          fixedHeader
        >
          <MDBTableHead>
            <tr>
              {columns.map((el) => {
                return <th>{el.label}</th>;
              })}

              {/*  <th>Product No</th>
                      <th>Product Name</th>
                      <th>WIP</th>
                      <th>FG</th>
                      <th>In Hand</th>
                      <th>N1</th>
                      <th>N2</th>
                      <th>N3</th>
                      <th>N4</th>
                      <th>Steel Bar</th>
                      <th>Next Month Suggession</th>
                      <th>Next Month Order</th> */}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {rowsData.map((el, index) => {
              //console.log(rowsData);
              if (
                (this_page.page - 1) * show_entries.entries <= index && index < this_page.page * show_entries.entries
              ) {
                if (index < this_page.page * show_entries.entries) {
                  FN = index + 1;
                  if (FN == rowsData.length) {
                    BN = (this_page.page - 1) * show_entries.entries + 1;
                  } else {
                    BN = FN - show_entries.entries + 1;
                  }
                }

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.Part_No}</td>
                    <td>{el.Part_Name}</td>
                    <td>{el.WIP}</td>
                    <td>{el.FG}</td>
                    <td>{el.In_Hand}</td>
                    <td>{el.N1}</td>
                    <td>{el.N2}</td>
                    <td>{el.N3}</td>
                    <td>{el.N4}</td>
                    <td>{el.steel_bar}</td>
                    <td>{el.nms}</td>
                 {/*    <td>{el.nm_order}</td> */}
                  </tr>
                );
              }
            })}
          </MDBTableBody>
        </MDBTable>
      </div>

      <div className="row">
        <div className="col-5">
          Showing {BN} to {FN} of {rowsData.length} entries
        </div>
        <div className="col-0.5">
          <button
            type="button"
            className="btn btn-block btn-outline-primary  border"
            onClick={previous_page}
          >
            Previous
          </button>
        </div>
        {all_page.map((e, index) => {
          if (
            e.page + 1 == this_page.page ||
            e.page + 2 == this_page.page ||
            this_page.page == e.page - 1 ||
            this_page.page == e.page - 2 ||
            this_page.page == e.page
          ) {
            if (this_page.page == e.page) {
              return (
                <>
                  <div className="col-0.5">
                    <button
                      type="button"
                      className="btn btn-block btn-primary border"
                      key={index}
                      onClick={setPage.bind(this, e.page)}
                    >
                      {index + 1}
                    </button>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="col-0.5">
                    <button
                      type="button"
                      className="btn btn-block btn-outline-primary border"
                      //key={index}
                      onClick={setPage.bind(this, e.page)}
                    >
                      {index + 1}
                    </button>
                  </div>
                </>
              );
            }
          }
        })}
        <div className="col-0.5">
          <button
            type="button"
            className="btn btn-block btn-outline-primary  border"
            // key={index}
            onClick={next_page}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
