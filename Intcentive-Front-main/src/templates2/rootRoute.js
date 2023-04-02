import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Headers from "../component/Header";
import Footter from "../component/Footter";
import Sidebar from "../component/Sidebar2";
import PrivateRoute from "../routes/PrivateRoute";
import Login from "../view2/Auth/Login";
import {
  Langingview,
  ProdLineMGT,
  ProcessMgt,
  MachineSetup,
  Dashboard,
  Product,
  Product_add,
  Materail_add,
  Materail,
  Supplier,
  Supplier_add,
  FGInOut,
  WIPInOut,
  RawMatInOut,
  Warehouse_history,
  Mat_Approve,
  Product_Approve,
  Uploadorderforecast,
  MateForPO,
  DeleveryRecord,
  MaterailCon,
  LogMonitory,
  ModeTranning,
  CuttingInOut,
  Product_Grouping,
  Production_Line,
  QCM,
  TrackingHistory,
  POHistory,
  OrderSummaryReport,
  QIAI,
} from "../view";
function rootRoute() {
  return (
    <div className="wrapper">
      <Headers />
      <Sidebar />
      <div >
        <Router>
          <Switch>
            <Route
              
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/`}
              component={Langingview}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Welcome`}
              component={Langingview}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/dashbord`}
              component={Dashboard}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Quanlity_Control/Log_Monitor`}
              component={LogMonitory}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Quanlity_Control/Model_Traning`}
              component={ModeTranning}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Quanlity_Control/AI`}
              component={QIAI}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Quanlity_Control/Manual`}
              component={QCM}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Statistic_n_History/Materail_Consumtion`}
              component={MaterailCon}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Statistic_n_History/Delivery_Record`}
              component={Langingview}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Product`}
              component={Product}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Product/add`}
              component={() => <Product_add mode="add" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Product/edit/:id`}
              component={() => <Product_add mode="edit" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Product/read/:id`}
              component={() => <Product_add mode="read" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Raw_Materail`}
              component={Materail}
            />

            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Product_Grouping`}
              component={Product_Grouping}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Production_Line`}
              component={Production_Line}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Raw_Materail/add`}
              component={() => <Materail_add mode="add" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Raw_Materail/read/:id`}
              component={() => <Materail_add mode="read" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Raw_Materail/edit/:id`}
              component={() => <Materail_add mode="edit" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Supplier`}
              component={Supplier}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Supplier/add`}
              component={() => <Supplier_add mode="add" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Supplier/read/:id`}
              component={() => <Supplier_add mode="read" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Factory_Master_Data/Supplier/edit/:id`}
              component={() => <Supplier_add mode="edit" />}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/F_G_In_Out`}
              component={FGInOut}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/WIP_IN_OUT`}
              component={WIPInOut}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/Raw_Mat_In_Out`}
              component={RawMatInOut}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Warehouse_Management/CuttingInOut`}
              component={CuttingInOut}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Statistic_n_History/Warehouse_History`}
              component={Warehouse_history}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Material_Requirement_Planning/Approve_Raw_Material_for_PO`}
              component={MateForPO}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Material_Requirement_Planning/Approve_Material_item`}
              component={Mat_Approve}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Production_Planing/Approve_Production_Item`}
              component={Product_Approve}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Production_Planing/Upload_Order_Forecast`}
              component={Uploadorderforecast}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Production_Planing/Order_Summary_Report`}
              component={OrderSummaryReport}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Statistic_n_History/POHistory`}
              component={POHistory}
            />
            <PrivateRoute
              
              path={`${process.env.PUBLIC_URL}/Statistic_n_History/TrackingHistory`}
              component={TrackingHistory}
            />
          </Switch>
        </Router>
      </div>
      <Footter />
    </div>
  );
}

export default rootRoute;
