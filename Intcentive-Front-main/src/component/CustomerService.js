import React from "react";
import "../assets/css/CusService.css";
import Icon_support from "../assets/img/Landing_Page/Icon_support.png";
 function CustomerService() {
  return (
    <div className="customre-service">
     <a  data-toggle="collapse" href="#collapseExample"  aria-expanded="false" aria-controls="collapseExample">
     <img
              
                alt="..."
                className="img-fluid img-sm img-icon"
                src={Icon_support}
              />
  </a>
      <div class="collapse" id="collapseExample">
     <div className="card card-outline">
        <div className="card-header cus-card-header">
          <div className="row">
            <div className="ttt">Customer Service   </div>
            
              <img
                alt="..."
                className="img-fluid img-sm img-icon"
                src={Icon_support}
              />
          
          </div>

  
        </div>

        <div className="card-body cus-card-body">
          ระบบใช้งานมีปัญหา ติดต่อได้ที่
          <br />
          <div className="ttt"> TTT Brother Co.,Ltd</div>
          Tel:084-677-7505
          <br />
          Line: @tttbrother
          <br />
          Email: w.pubadee@tttbrother.com
          <br />
        </div>
        </div>
      </div> 
   
    </div>
  );
}
export default  CustomerService;