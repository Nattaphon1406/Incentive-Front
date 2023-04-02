import React, { useState, useEffect } from "react";
import Headers from "../../component/Header";
import {
  setCurrentPath,
  removeUserSession,
  removeOem,
} from "../../Utils/Common";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Footter from "../../component/Footter";
import Sidebar from "../../component/Sidebar2";
import Swal from "sweetalert2";
import {
  Langingview,
  dashboard,
  Employee,
  Employee_add,
  ThankPointTable,
  ThankPointAdd,
  ManageProductTable,
  ManageProductAdd,
  PointHistory,
  AwardPointTable,
  Award_Point_Add,
  News,
  NewsAdd,
  SummaryPoint,
  Department_Management,
  Department_Management_add,
  Manage_grouptable,
  Manage_groupAdd,
  ManageGroupProductTable,
  ManageGroupProductRead,
  Company_Budget,
  SummaryReport,
  Give_Point_Add,
  ManageProductCategoryTable,
  ManageProductCategoryAdd,
  ReportSystem,
  PurchaseOrder,
  TrackingStatusTable,
} from "../../view2";

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("timeline", 0);
    setCurrentPath(location.pathname);

    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keydown",
    ];
    var fiveMinutes = 60 * 31;

    var myInterval = setInterval(myTimer, 1000);
    //countdown(fiveMinutes);
    var timer = fiveMinutes,
      minutes,
      seconds;
    function myTimer() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      // console.log(timer)
      if (timer === 60) {
        //console.log("timer")
        Swal.fire({
          position: "top",
          allowOutsideClick: false,
          icon: "info",
          title: "คุณไม่ได้ทำรายการใดๆ เป็นเวลา 30 นาที",
          text: "หากไม่ทำรายการใดๆต่อ \n จะออกจากระบบอัตโนมัติภายใน 1 นาที",
          showConfirmButton: true,
        }).then((result) => { });
      }
      if (--timer < 0) {
        removeUserSession();
        removeOem();
        sessionStorage.removeItem("setupTime");
        sessionStorage.removeItem("feature");
        sessionStorage.removeItem("com_config");
        window.location.href = "/login";
      } else {
        //console.log( minutes + ":" + seconds)

        sessionStorage.setItem("setupTime", minutes + ":" + seconds);
      }
    }
    for (var e = 0; e < events.length; e++) {
      //console.log(events);
      document.addEventListener(
        events[e],
        (event) => {
          clearInterval(myInterval);
          timer = 60 * 31;
          myInterval = setInterval(myTimer, 1000);
        },
        false
      );
    }
  }, []);
  return (
    <div className="wrapper">
      <Headers />
      <Sidebar />

      <Switch>
        {/*       <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/> */}
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={Langingview}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Welcome`}
          component={Langingview}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/dashbord`}
          component={dashboard}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Employee`}
          component={Employee}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Employee/add`}
          component={() => <Employee_add mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Employee/read/:id`}
          component={() => <Employee_add mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Employee/edit/:id`}
          component={() => <Employee_add mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/thank_point`}
          component={() => <ThankPointTable />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/thank_point/add`}
          component={() => <ThankPointAdd mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/thank_point/read/:id`}
          component={() => <ThankPointAdd mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/thank_point/edit/:id`}
          component={() => <ThankPointAdd mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_product_system`}
          component={() => <ManageProductTable />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_product_system/add`}
          component={() => <ManageProductAdd mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_product_system/read/:id`}
          component={() => <ManageProductAdd mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_product_system/edit/:id`}
          component={() => <ManageProductAdd mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/point_history`}
          component={() => <PointHistory />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/award_point`}
          component={() => <AwardPointTable />}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/award_point_add`}
          component={() => <Award_Point_Add mode="add" />}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/award_point/read/:id`}
          component={() => <Award_Point_Add mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/award_point/edit/:id`}
          component={() => <Award_Point_Add mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/news`}
          component={() => <News />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/news_add`}
          component={() => <NewsAdd mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/news_add/read/:id`}
          component={() => <NewsAdd mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/news_add/edit/:id`}
          component={() => <NewsAdd mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/summary_point`}
          component={() => <SummaryPoint />}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/organization_config/department_management`}
          component={() => <Department_Management />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Department_Management_add`}
          component={() => <Department_Management_add mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Department_Management_add/read/:id`}
          component={() => <Department_Management_add mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/Department_Management_add/edit/:id`}
          component={() => <Department_Management_add mode="edit" />}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/manage_group`}
          component={Manage_grouptable}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/Manage_groupAdd`}
          component={() => <Manage_groupAdd mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/Manage_groupAdd/read/:id`}
          component={() => <Manage_groupAdd mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/Manage_groupAdd/edit/:id`}
          component={() => <Manage_groupAdd mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/manage_group_product`}
          component={() => <ManageGroupProductTable />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/manage_group_product_read/:id`}
          component={() => <ManageGroupProductRead />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/company_budget`}
          component={() => <Company_Budget />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/summary_report`}
          component={() => <SummaryReport />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/incentive_hr_admin/Give_Point`}
          component={() => <Give_Point_Add />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_category_roduct`}
          component={() => <ManageProductCategoryTable />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_category_product_add`}
          component={() => <ManageProductCategoryAdd mode="add" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_category_product/read/:id`}
          component={() => <ManageProductCategoryAdd mode="read" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/manage_category_product/edit/:id`}
          component={() => <ManageProductCategoryAdd mode="edit" />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/report_system`}
          component={() => <ReportSystem />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/null`}
          component={() => <PurchaseOrder />}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/Human_Resource/intensive_TTT/tracking_status`}
          component={() => <TrackingStatusTable />}
        />

      </Switch>
      <Footter />
    </div>
  );
};

export default Homepage;
