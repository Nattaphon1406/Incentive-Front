import React, { useState, useEffect } from "react";
import "../../assets/css/Input.css";
import "../../assets/css/Login.css";
import JWT_Decode from "jwt-decode";
import { Login_BG, Login_BG2, logoTTT } from "../../routes/imgRoute/imgUrl";
import Configs from "../../config";
import {
  setUserSession,
  getRememberme,
  setRemembermetosess,
  getUser,
  removeUserSession,
  removeOem
} from "../../Utils/Common";
/* import Login_BG from "../../assets/img/Login/Login_BG.png";
import Login_BG2 from "../../assets/img/Login/Login_BG2.png";
import logoTTT from "../../assets/img/button_menu/logoTTT.png"; */
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import Swal from "sweetalert2";
function Login(params) {
  useEffect(() => {}, []);

  const [datarememberme, setRemembermeData] = useState(getRememberme());
  const [loading, setLoading] = useState(false);
  const username = useFormInput(datarememberme.username);
  const password = useFormInput(datarememberme.password);
  const [error, setError] = useState(null);
  const [rememberme, setRememberme] = useState(datarememberme.remember);


  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    var axios = require("axios");
    var data = JSON.stringify({
      user: username.value,
      password: password.value,
    });

    var config = {
      method: "post",
      url: Configs.API_URL + "/auth/login",
      headers: {
        'X-TTT': Configs.API_TTT,
        "Content-Type": "application/json",
      },
      data: data,
    };
    /*   console.log(data);
     console.log(rememberme);
     console.log(datarememberme); */

    Swal.fire({
      title: "Now loading",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      onOpen: () => {
        Swal.showLoading();
      },
    })
      .then((result) => {
        axios(config).then(function (response) {
          console.log(config);
          if (response.data.message === "login sucess") {
            var user = JWT_Decode(response.data.token);
            setRemembermetosess(username.value, password.value, rememberme);
            setUserSession(response.data.token, 1, user);
            var balance_day = getUser().balance_time;
           
            Swal.fire({
              icon: "success",
              title: "Sign in success",
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              params.history.push("/");
              //console.log(getUser().inform)
              if(getUser().status_inform === "true"){
                Swal.fire({
                  title: 'ประกาศ',
                  text: getUser().inform,
                  imageUrl: logoTTT.imgs,
                  imageWidth: 50,
                  imageHeight: 50,
                  imageAlt: 'Custom image',
                }).then((result) => {
                 if(balance_day > 0){
                    // console.log("ยังไม่หมดอายุการใช้งาน", balance_day)
                      //console.log("มีอายุการใช้งาน" , "อีกจำนวน ",moment(exp2).format('HH')+ " ชม. " + moment(exp2).format('mm')+" นาที")
                     
                      //อายุการใช้งานต่ำกว่า 30 วัน
                      if(balance_day <= 30 && balance_day > 29){
                        Swal.fire({
                          title: 'แจ้งเตือน',
                          html:'<pre>'+'อายุการใช้งานเหลือน้อยกว่า 30 วัน \n คงเหลือ '+getUser().balance_day+'\nและจะหมดลงใน\n'+ getUser().exp_date+'</pre>',
                          imageUrl: logoTTT.imgs,
                          imageWidth: 50,
                          imageHeight: 50,
                          imageAlt: 'Custom image',
                        })
                         //console.log("อายุการใช้งานใกล้จะหมด 30", balance_day)
                     }
                     //อายุการใช้งานต่ำกว่า 7 วัน
                     if(balance_day <= 7){
                      Swal.fire({
                        title: 'แจ้งเตือน',
                        html:'<pre>'+'อายุการใช้งานเหลือน้อยกว่า 7 วัน \n คงเหลือ '+getUser().balance_day+'\nและจะหมดลงใน\n'+ getUser().exp_date+'</pre>',
                        //text: 'อายุการใช้งานเหลือน้อยกว่า 7 วัน และจะหมดลงในวันที่ \n'+ getUser().exp,
                        
                        imageUrl: logoTTT.imgs,
                        imageWidth: 50,
                        imageHeight: 50,
                        imageAlt: 'Custom image',
                      })
                         //console.log("อายุการใช้งานใกล้จะหมด < 7", balance_day)
                     }
                    /*   if(balance_day <= 24){
                          console.log("อายุการใช้งานคงเหลือน่อยกว่า 1 วัน", balance_day)
                      } */
             
                    }else{
                      Swal.fire({
                        title: 'แจ้งเตือน',
                        text: "หมดอายุการใช้งาน",
                        imageUrl: logoTTT.imgs,
                        imageWidth: 50,
                        imageHeight: 50,
                        imageAlt: 'Custom image',
                      }).then((result) => {
                      removeUserSession();
                      removeOem();
                      window.location.href = "/login";
                      })
                      //console.log("หมดอายุการใช้งาน", exp2)
                    }
                      
                 
               
                  
                  
                 
                })
              }else{
                if(balance_day > 0){
                  // console.log("ยังไม่หมดอายุการใช้งาน", balance_day)
                    //console.log("มีอายุการใช้งาน" , "อีกจำนวน ",moment(exp2).format('HH')+ " ชม. " + moment(exp2).format('mm')+" นาที")
                   
                    //อายุการใช้งานต่ำกว่า 30 วัน
                    if(balance_day <= 30 && balance_day > 29){
                      Swal.fire({
                        title: 'แจ้งเตือน',
                        html:'<pre>'+'อายุการใช้งานเหลือน้อยกว่า 30 วัน \n คงเหลือ '+getUser().balance_day+'\nและจะหมดลงใน\n'+ getUser().exp_date+'</pre>',
                        imageUrl: logoTTT.imgs,
                        imageWidth: 50,
                        imageHeight: 50,
                        imageAlt: 'Custom image',
                      })
                       //console.log("อายุการใช้งานใกล้จะหมด 30", balance_day)
                   }
                   //อายุการใช้งานต่ำกว่า 7 วัน
                   if(balance_day <= 7){
                    Swal.fire({
                      title: 'แจ้งเตือน',
                      html:'<pre>'+'อายุการใช้งานเหลือน้อยกว่า 7 วัน \n คงเหลือ '+getUser().balance_day+'\nและจะหมดลงใน\n'+ getUser().exp_date+'</pre>',
                      imageUrl: logoTTT.imgs,
                      imageWidth: 50,
                      imageHeight: 50,
                      imageAlt: 'Custom image',
                    })
                       //console.log("อายุการใช้งานใกล้จะหมด < 7", balance_day)
                   }
                  /*   if(balance_day <= 24){
                        console.log("อายุการใช้งานคงเหลือน่อยกว่า 1 วัน", balance_day)
                    } */
           
                  }else{
                    Swal.fire({
                      title: 'แจ้งเตือน',
                      text: "หมดอายุการใช้งาน",
                      imageUrl: logoTTT.imgs,
                      imageWidth: 50,
                      imageHeight: 50,
                      imageAlt: 'Custom image',
                    }).then((result) => {
                    removeUserSession();
                    removeOem();
                    window.location.href = "/login";
                    })
                    //console.log("หมดอายุการใช้งาน", exp2)
                  }
              }
             
            })/* .then((result) => {
              Swal.fire({
                title: 'แจ้งเตือน',
                text: "แจ้งเตือนวันหมดอายุ",
                imageUrl: Configs.API_URL_IMG+'media/logoTTT.a5bad84a.png',
                imageWidth: 50,
                imageHeight: 50,
                imageAlt: 'Custom image',
              })
              
              
             
            }) */
          } else {
            setError(response.data.message);
            Swal.fire({
              icon: "error",
              title: "Sign in fail",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function Getchecked() {
    if (rememberme === true) {
      setRememberme(false);
    } else {
      setRememberme(true);
    }
  }
  
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    //console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
    if(code === "Enter"){
      handleLogin();
    }
  }, false);
  return (
    <div
      className="img-bg"
      style={{
        backgroundImage: "url(" + Login_BG.imgs + ")",
      }}
    >
      <section
        className="test section-padding section section-shaped section-sm"
        style={{ minHeight: "100%" }}
      >
        <Container className="fix-padding ">
          <Row className="justify-content-first border-0">
            <Col className="img-1 border-0" lg={{ size: "auto" }}>
              <img
                alt="..."
                className="img-fluid rounded shadow border-0"
                src={Login_BG2.imgs}
                style={{ width: "750px", height: "545px" }}
              />
            </Col>

            <Col className="">
              <Card className=" bg-secondary shadow border-0">
                <CardBody className=" body-text  px-lg-5 py-lg-5">
                  <Row className="justify-content-end">
                    <img
                      alt="..."
                      className="img-fluid rounded"
                      src={logoTTT.imgs}
                      style={{ width: "65px" }}
                    />
                  </Row>

                  <Row className="justify-content-center">
                    <div className=" font-weight-bold text-center">
                      <h3 style={{ fontWeight: "bold" }}>Login</h3>
                    </div>
                  </Row>

                  <Form role="form" onSubmit={
                            (e) => {
                                /**
                                 * Prevent submit from reloading the page
                                 */
                                e.preventDefault();
                                e.stopPropagation();
                                handleLogin();
                            }
                        }>
                    {/*  <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        {...username}
                        required
                      ></input>
                      <label>Username </label>
                    </div> */}
                    <label>
                      <span>Username</span>
                    </label>
                    <FormGroup className="mb-3 ">
                      <InputGroup className="input-group-alternative">
                        <Input type="text" {...username} id = "username" />
                      </InputGroup>
                    </FormGroup>
                    {/*  <div className="form-group">
                      <input
                        type="password"
                        autoComplete="off"
                        className="form-control"
                        {...password}
                        required
                      ></input>
                      <label>Password </label>
                    </div> */}
                    <label>
                      <span>Password</span>
                    </label>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <Input
                          type="password"
                          autoComplete="off"
                          {...password}
                          id = "password"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      {/*   <input
                        className="custom-control-input"
                        id="rememberme"
                        type="checkbox"
                        checked={rememberme}
                        onChange={Getchecked}
                      />
                       <input className="form-check-input " type="checkbox" />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label> */}
                      <input
                        className="form-check-input "
                        type="checkbox"
                        onChange={Getchecked}
                        checked={rememberme}
                        id = "chk_remember"
                      />
                      <label
                        className="form-check-label"
                        style={{ fontWeight: "bold" }}
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-center">
                      {error && (
                        <>
                          <small style={{ color: "red" }}>{error}</small>
                          <br />
                        </>
                      )}
                      <Button
                      type="submit"
                        className="my-4"
                        color="primary"
                        onClick={handleLogin}
                        id = "btn_login"
                      >
                        Sign in
                      </Button>
                   
                    </div>
                   
                  </Form>
                  <span><small>V. 1.4.62</small></span>
                </CardBody>
                {/* <br></br><br></br><br></br><br></br><br></br> */}
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="https://tttbrother.com/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%B2-7820-1-%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%B2.html"
                  >
                    <small>Request Demo Please Contact</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="https://tttbrother.com/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2-218253-production-material-requirement-planning-%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94.html"
                  >
                    <small>PMRP Feature</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};
export default Login;
