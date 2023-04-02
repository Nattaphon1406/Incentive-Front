import React, { useState,useEffect } from "react";
import "../assets/css/Header.css";
import Swal from 'sweetalert2'
import {Icon_settings,
  Icon_logout} from '../routes/imgRoute/imgUrl';
import {removeUserSession, getUser, removeOem} from '../Utils/Common';
function Header(params) {
  
  const [user, setUsere] = useState({});

  useEffect(() => {
    setUsere(getUser);
  }, [])

  
    const handleLogout = () => {
     
  /*    console.log(user.sub);*/
       Swal.fire({
          title: 'Are you sure?',
          text: "Are you sure you want to log out?",
          icon: 'warning',
          width:400,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Log Out!'
        }).then((result) => {
          if (result.isConfirmed) {
            removeUserSession();
            removeOem();

            Swal.fire(
            {icon: 'success',
            title: 'Sigh out success',
            showConfirmButton: false,
            timer: 1500}
            ).then((results=>{
              window.location.href = "/login";
            }))
    
          }
        }) 
    
       
      };
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/Welcome" className="nav-link" style={{fontWeight:"bold"}}>
            Switch OEM
          </a>
        </li>
      </ul>
   
        
        <ul className="navbar-nav ml-auto logout-size" style={{ textAlign: "center" }}>
        <img
          alt="User Avatar"
          className="img-fluid rounded img-size-50 "
          src={Icon_settings.imgs}
          style={{ width: "25px", height: "25px" , paddingRight:"2px"}}
        />{" "}
           {/* Khun Teewin*/} {user.sub} 
        <div className="log-out-line"></div>
{/*         <a className="btn logout-btn"  value="Logout"> */}
<li class="nav-item dropdown show">
<a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="true">
          <img
            alt="User Avatar"
            className="img-fluid rounded img-size-50 "
            src={Icon_logout.imgs}
            style={{ width: "20px", height: "20px" }}
            //onClick={handleLogout}
            value="Logout"
          />
        </a>
        <div class="dropdown-menu dropdown-menu-md dropdown-menu-center"style={{left: "-120px"}}>


<a href="/Profile" class="dropdown-item">
<i class="fa fa-user mr-2"></i>
Profile
</a>
<div class="dropdown-divider"></div>
<a href="#" class="dropdown-item" onClick={handleLogout}>
<i class="fas fa-sign-out-alt mr-2"></i>
{/* <i class="fas fa-users"></i> */}Log out
</a>


</div>
</li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
