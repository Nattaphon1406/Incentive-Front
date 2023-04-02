import React from 'react';
import BG_CON from "../assets/img/Landing_Page/constaruction_img.jpg";
import "../assets/css/comingsoon.css";
function Construccomponent(params) {
    
    return(
        <div>

<div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
    <h1>{params.name}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">{params.name}</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{params.name}</h3>
            </div>
            <div className="card-body">
             <img alt="..."
            className="img-fluid construct"
            src={BG_CON}></img>
            </div>
           
          </div>
         
        </section>
      </div>
        </div>
    );
}

export default Construccomponent;